"use client";

import { useEffect, useRef, useCallback } from "react";
import {
  HandLandmarker,
  FilesetResolver,
  type HandLandmarkerResult,
} from "@mediapipe/tasks-vision";
import { useGestureControl } from "@/store/useGestureControl";
import { useLenis } from "@/context/LenisContext";
import { useGestureVideo } from "@/context/GestureVideoContext";
import {
  landmarkToScreen,
  smoothPoint,
  isPinching as detectPinch,
  isOpenPalm,
  getScrollAnchorY,
  getSensitivityConfig,
  type Point2D,
} from "@/lib/vision/gestureMath";

const WASM_CDN = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm";
const MODEL_URL =
  "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task";

export default function HandGestureTracker() {
  const { videoRef } = useGestureVideo();
  const enabled = useGestureControl((s) => s.enabled);
  const sensitivity = useGestureControl((s) => s.sensitivity);
  const setStatus = useGestureControl((s) => s.setStatus);
  const setError = useGestureControl((s) => s.setError);
  const setPointer = useGestureControl((s) => s.setPointer);
  const setPinching = useGestureControl((s) => s.setPinching);
  const setHandDetected = useGestureControl((s) => s.setHandDetected);
  const setGestureMode = useGestureControl((s) => s.setGestureMode);
  const setScrollDirection = useGestureControl((s) => s.setScrollDirection);
  const setVideoReady = useGestureControl((s) => s.setVideoReady);

  const lenis = useLenis();
  const landmarkerRef = useRef<HandLandmarker | null>(null);
  const rafRef = useRef<number>(0);
  const streamRef = useRef<MediaStream | null>(null);
  const smoothRef = useRef<Point2D>({ x: 0, y: 0 });
  const wasPinchingRef = useRef(false);
  const pinchFrameCountRef = useRef(0);
  const lastClickRef = useRef(0);
  const prevScrollYRef = useRef<number | null>(null);
  const scrollVelocityRef = useRef(0);
  const hoverTargetRef = useRef<Element | null>(null);

  const config = getSensitivityConfig(sensitivity);

  const dispatchPointerEvent = useCallback(
    (type: "mousemove" | "mousedown" | "mouseup" | "click", x: number, y: number) => {
      const target = document.elementFromPoint(x, y);
      if (!target) return;

      const opts: MouseEventInit = {
        bubbles: true,
        cancelable: true,
        clientX: x,
        clientY: y,
        view: window,
      };

      target.dispatchEvent(new MouseEvent(type, opts));

      if (type === "mousemove" && hoverTargetRef.current !== target) {
        hoverTargetRef.current?.dispatchEvent(
          new MouseEvent("mouseout", { bubbles: true, clientX: x, clientY: y })
        );
        target.dispatchEvent(
          new MouseEvent("mouseover", { bubbles: true, clientX: x, clientY: y })
        );
        hoverTargetRef.current = target;
      }
    },
    []
  );

  const performClick = useCallback(
    (x: number, y: number) => {
      const now = Date.now();
      if (now - lastClickRef.current < config.clickCooldownMs) return;
      lastClickRef.current = now;

      dispatchPointerEvent("mousemove", x, y);
      dispatchPointerEvent("mousedown", x, y);
      dispatchPointerEvent("mouseup", x, y);
      dispatchPointerEvent("click", x, y);

      const el = document.elementFromPoint(x, y) as HTMLElement | null;
      if (!el) return;

      const clickable =
        el.closest("button, a, [role='button'], input, textarea, select") ?? el;
      if (clickable instanceof HTMLElement) {
        clickable.click();
      }

      const link = el.closest("a") as HTMLAnchorElement | null;
      if (link) {
        const href = link.getAttribute("href");
        if (href?.startsWith("#")) {
          const target = document.querySelector(href);
          if (target && lenis) {
            lenis.scrollTo(target as HTMLElement, { offset: -90 });
          }
        }
      }
    },
    [config.clickCooldownMs, dispatchPointerEvent, lenis]
  );

  const applyScroll = useCallback(
    (deltaPixels: number) => {
      if (Math.abs(deltaPixels) < config.scrollMinDelta) return;

      if (deltaPixels < 0) setScrollDirection("up");
      else setScrollDirection("down");

      const amount = deltaPixels * config.scrollMultiplier;

      if (lenis) {
        lenis.scrollTo(lenis.scroll + amount, { immediate: true });
      } else {
        window.scrollBy({ top: amount, behavior: "auto" });
      }

      clearTimeout((applyScroll as { _t?: ReturnType<typeof setTimeout> })._t);
      (applyScroll as { _t?: ReturnType<typeof setTimeout> })._t = setTimeout(
        () => setScrollDirection(null),
        300
      );
    },
    [config.scrollMinDelta, config.scrollMultiplier, lenis, setScrollDirection]
  );

  const processFrame = useCallback(
    (result: HandLandmarkerResult) => {
      const landmarks = result.landmarks[0];
      if (!landmarks) {
        setHandDetected(false);
        setStatus("no-hand");
        setGestureMode("point");
        prevScrollYRef.current = null;
        scrollVelocityRef.current = 0;
        return;
      }

      setHandDetected(true);
      setStatus("active");

      const raw = landmarkToScreen(
        landmarks[8],
        window.innerWidth,
        window.innerHeight,
        true
      );
      const smoothed = smoothPoint(smoothRef.current, raw, config.smoothFactor);
      smoothRef.current = smoothed;
      setPointer(smoothed.x, smoothed.y);

      const pinching = detectPinch(landmarks, sensitivity);
      setPinching(pinching);

      if (pinching) {
        setGestureMode("pinch");
        pinchFrameCountRef.current += 1;
        prevScrollYRef.current = null;
        scrollVelocityRef.current = 0;

        if (pinchFrameCountRef.current >= config.pinchFrames && !wasPinchingRef.current) {
          performClick(smoothed.x, smoothed.y);
          wasPinchingRef.current = true;
        }
      } else {
        pinchFrameCountRef.current = 0;
        wasPinchingRef.current = false;

        dispatchPointerEvent("mousemove", smoothed.x, smoothed.y);

        const openPalm = isOpenPalm(landmarks);

        if (openPalm) {
          const scrollY = getScrollAnchorY(landmarks);
          if (prevScrollYRef.current !== null) {
            const deltaNorm = scrollY - prevScrollYRef.current;
            const deltaPx = deltaNorm * window.innerHeight;
            scrollVelocityRef.current = lerp(scrollVelocityRef.current, deltaPx, 0.5);

            if (Math.abs(scrollVelocityRef.current) > config.scrollMinDelta) {
              setGestureMode("scroll");
              applyScroll(scrollVelocityRef.current);
            } else {
              setGestureMode("point");
            }
          }
          prevScrollYRef.current = scrollY;
        } else {
          setGestureMode("point");
          prevScrollYRef.current = null;
          scrollVelocityRef.current = 0;
        }
      }
    },
    [
      applyScroll,
      config.pinchFrames,
      config.scrollMinDelta,
      config.smoothFactor,
      dispatchPointerEvent,
      performClick,
      sensitivity,
      setGestureMode,
      setHandDetected,
      setPinching,
      setPointer,
      setStatus,
    ]
  );

  function lerp(a: number, b: number, t: number) {
    return a + (b - a) * t;
  }

  const detectLoop = useCallback(() => {
    const video = videoRef.current;
    const landmarker = landmarkerRef.current;
    if (!video || !landmarker || video.readyState < 2) {
      rafRef.current = requestAnimationFrame(detectLoop);
      return;
    }

    const result = landmarker.detectForVideo(video, performance.now());
    processFrame(result);
    rafRef.current = requestAnimationFrame(detectLoop);
  }, [processFrame, videoRef]);

  const startCamera = useCallback(async () => {
    setStatus("loading");
    setError(null);
    setVideoReady(false);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false,
      });
      streamRef.current = stream;

      const video = videoRef.current;
      if (!video) throw new Error("Video element not ready");

      video.srcObject = stream;
      await video.play();
      setVideoReady(true);

      const vision = await FilesetResolver.forVisionTasks(WASM_CDN);
      let landmarker: HandLandmarker;
      try {
        landmarker = await HandLandmarker.createFromOptions(vision, {
          baseOptions: { modelAssetPath: MODEL_URL, delegate: "GPU" },
          runningMode: "VIDEO",
          numHands: 1,
        });
      } catch {
        landmarker = await HandLandmarker.createFromOptions(vision, {
          baseOptions: { modelAssetPath: MODEL_URL, delegate: "CPU" },
          runningMode: "VIDEO",
          numHands: 1,
        });
      }
      landmarkerRef.current = landmarker;

      smoothRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      setStatus("active");
      rafRef.current = requestAnimationFrame(detectLoop);
    } catch (err) {
      const msg =
        err instanceof DOMException && err.name === "NotAllowedError"
          ? "Camera permission denied. Allow camera access to use hand control."
          : err instanceof Error
            ? err.message
            : "Failed to start camera";
      setError(msg);
      setStatus(
        err instanceof DOMException && err.name === "NotAllowedError"
          ? "permission-denied"
          : "error"
      );
    }
  }, [detectLoop, setError, setStatus, setVideoReady, videoRef]);

  const stopCamera = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    landmarkerRef.current?.close();
    landmarkerRef.current = null;
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setHandDetected(false);
    setVideoReady(false);
    setStatus("idle");
    document.body.classList.remove("gesture-mode");
  }, [setHandDetected, setStatus, setVideoReady, videoRef]);

  useEffect(() => {
    if (enabled) {
      document.body.classList.add("gesture-mode");
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [enabled, startCamera, stopCamera]);

  return null;
}
