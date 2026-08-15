/** MediaPipe hand landmark indices */
export const LM = {
  WRIST: 0,
  THUMB_TIP: 4,
  INDEX_TIP: 8,
  INDEX_PIP: 6,
  INDEX_MCP: 5,
  MIDDLE_TIP: 12,
  MIDDLE_PIP: 10,
  RING_TIP: 16,
  PINKY_TIP: 20,
} as const;

export type Point2D = { x: number; y: number };
export type NormalizedLandmark = { x: number; y: number; z?: number };

export type SensitivityLevel = "low" | "medium" | "high";

export function dist(a: NormalizedLandmark, b: NormalizedLandmark): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function smoothPoint(prev: Point2D, next: Point2D, factor = 0.35): Point2D {
  return { x: lerp(prev.x, next.x, factor), y: lerp(prev.y, next.y, factor) };
}

export function landmarkToScreen(
  lm: NormalizedLandmark,
  width: number,
  height: number,
  mirror = true
): Point2D {
  return {
    x: mirror ? (1 - lm.x) * width : lm.x * width,
    y: lm.y * height,
  };
}

/** Hand size for adaptive thresholds */
export function getHandScale(landmarks: NormalizedLandmark[]): number {
  const wrist = landmarks[LM.WRIST];
  const middle = landmarks[LM.MIDDLE_TIP];
  if (!wrist || !middle) return 0.25;
  return Math.max(0.12, dist(wrist, middle));
}

export function isPinching(landmarks: NormalizedLandmark[], level: SensitivityLevel = "medium"): boolean {
  const thumb = landmarks[LM.THUMB_TIP];
  const index = landmarks[LM.INDEX_TIP];
  if (!thumb || !index) return false;

  const scale = getHandScale(landmarks);
  const pinchDist = dist(thumb, index);
  const base = { low: 0.09, medium: 0.075, high: 0.06 }[level];
  const threshold = base * (scale / 0.22);
  return pinchDist < threshold;
}

export function isFingerExtended(
  landmarks: NormalizedLandmark[],
  tipIdx: number,
  pipIdx: number
): boolean {
  const tip = landmarks[tipIdx];
  const pip = landmarks[pipIdx];
  const wrist = landmarks[LM.WRIST];
  if (!tip || !pip || !wrist) return false;
  return dist(tip, wrist) > dist(pip, wrist) * 1.05;
}

export function isIndexExtended(landmarks: NormalizedLandmark[]): boolean {
  return isFingerExtended(landmarks, LM.INDEX_TIP, LM.INDEX_PIP);
}

/** Open palm = good for scrolling */
export function isOpenPalm(landmarks: NormalizedLandmark[]): boolean {
  return (
    isFingerExtended(landmarks, LM.INDEX_TIP, LM.INDEX_PIP) &&
    isFingerExtended(landmarks, LM.MIDDLE_TIP, LM.MIDDLE_PIP) &&
    isFingerExtended(landmarks, LM.RING_TIP, LM.MIDDLE_PIP)
  );
}

export function getScrollAnchorY(landmarks: NormalizedLandmark[]): number {
  if (isOpenPalm(landmarks)) {
    const wrist = landmarks[LM.WRIST];
    const middle = landmarks[LM.MIDDLE_TIP];
    return (wrist.y + middle.y) / 2;
  }
  return landmarks[LM.INDEX_TIP]?.y ?? landmarks[LM.WRIST]?.y ?? 0.5;
}

export function getSensitivityConfig(level: SensitivityLevel) {
  return {
    low: {
      scrollMultiplier: 3.2,
      scrollMinDelta: 2.5,
      smoothFactor: 0.28,
      pinchFrames: 2,
      clickCooldownMs: 900,
    },
    medium: {
      scrollMultiplier: 5.5,
      scrollMinDelta: 1.2,
      smoothFactor: 0.42,
      pinchFrames: 1,
      clickCooldownMs: 550,
    },
    high: {
      scrollMultiplier: 8,
      scrollMinDelta: 0.6,
      smoothFactor: 0.55,
      pinchFrames: 1,
      clickCooldownMs: 400,
    },
  }[level];
}
