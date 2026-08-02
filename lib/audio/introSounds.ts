class IntroSoundEngine {
  private ctx: AudioContext | null = null;
  private humOsc: OscillatorNode | null = null;
  private humGain: GainNode | null = null;
  private muted = false;

  init() {
    if (this.ctx) return;
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      this.ctx = new AudioContextClass();
    }
  }

  setMuted(muted: boolean) {
    this.muted = muted;
    if (muted) this.stopTouchHum();
  }

  isMuted() {
    return this.muted;
  }

  private canPlay() {
    return !this.muted && this.ctx;
  }

  playClick() {
    if (!this.ctx) this.init();
    if (!this.canPlay()) return;

    const osc = this.ctx!.createOscillator();
    const gain = this.ctx!.createGain();
    osc.connect(gain);
    gain.connect(this.ctx!.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(800, this.ctx!.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, this.ctx!.currentTime + 0.05);
    gain.gain.setValueAtTime(0.08, this.ctx!.currentTime);
    gain.gain.linearRampToValueAtTime(0.001, this.ctx!.currentTime + 0.05);
    osc.start();
    osc.stop(this.ctx!.currentTime + 0.06);
  }

  playNav() {
    if (!this.ctx) this.init();
    if (!this.canPlay()) return;

    const osc = this.ctx!.createOscillator();
    const gain = this.ctx!.createGain();
    osc.connect(gain);
    gain.connect(this.ctx!.destination);
    osc.type = "triangle";
    osc.frequency.setValueAtTime(300, this.ctx!.currentTime);
    osc.frequency.setValueAtTime(600, this.ctx!.currentTime + 0.08);
    osc.frequency.setValueAtTime(1200, this.ctx!.currentTime + 0.16);
    gain.gain.setValueAtTime(0.05, this.ctx!.currentTime);
    gain.gain.linearRampToValueAtTime(0.001, this.ctx!.currentTime + 0.24);
    osc.start();
    osc.stop(this.ctx!.currentTime + 0.25);
  }

  playReactorStartup() {
    if (!this.ctx) this.init();
    if (!this.canPlay()) return;

    const osc = this.ctx!.createOscillator();
    const gain = this.ctx!.createGain();
    const filter = this.ctx!.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(100, this.ctx!.currentTime);
    filter.frequency.exponentialRampToValueAtTime(1200, this.ctx!.currentTime + 3.0);
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(40, this.ctx!.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, this.ctx!.currentTime + 3.0);
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx!.destination);
    gain.gain.setValueAtTime(0.01, this.ctx!.currentTime);
    gain.gain.linearRampToValueAtTime(0.12, this.ctx!.currentTime + 2.0);
    gain.gain.linearRampToValueAtTime(0.001, this.ctx!.currentTime + 3.2);
    osc.start();
    osc.stop(this.ctx!.currentTime + 3.3);
  }

  startTouchHum() {
    if (!this.ctx) this.init();
    if (!this.canPlay()) return;

    this.humOsc = this.ctx!.createOscillator();
    this.humGain = this.ctx!.createGain();
    const filter = this.ctx!.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(200, this.ctx!.currentTime);
    this.humOsc.type = "sine";
    this.humOsc.frequency.setValueAtTime(80, this.ctx!.currentTime);
    this.humOsc.connect(filter);
    filter.connect(this.humGain);
    this.humGain.connect(this.ctx!.destination);
    this.humGain.gain.setValueAtTime(0.001, this.ctx!.currentTime);
    this.humGain.gain.linearRampToValueAtTime(0.06, this.ctx!.currentTime + 0.5);
    this.humOsc.start();
  }

  updateTouchHum(distRatio: number) {
    if (!this.ctx || !this.humOsc || !this.humGain || this.muted) return;
    const pitch = 80 + (1 - distRatio) * 350;
    const vol = 0.06 + (1 - distRatio) * 0.15;
    this.humOsc.frequency.setTargetAtTime(pitch, this.ctx.currentTime, 0.05);
    this.humGain.gain.setTargetAtTime(vol, this.ctx.currentTime, 0.05);
  }

  stopTouchHum() {
    if (this.humOsc) {
      try {
        this.humOsc.stop();
        this.humOsc.disconnect();
      } catch {
        /* already stopped */
      }
      this.humOsc = null;
    }
  }

  playEnergyBlast() {
    if (!this.ctx) this.init();
    if (!this.canPlay()) return;

    const bufferSize = this.ctx!.sampleRate * 2.0;
    const buffer = this.ctx!.createBuffer(1, bufferSize, this.ctx!.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noiseNode = this.ctx!.createBufferSource();
    noiseNode.buffer = buffer;
    const filter = this.ctx!.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1000, this.ctx!.currentTime);
    filter.frequency.exponentialRampToValueAtTime(80, this.ctx!.currentTime + 1.8);
    const gainNode = this.ctx!.createGain();
    gainNode.gain.setValueAtTime(0.25, this.ctx!.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + 1.9);
    noiseNode.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.ctx!.destination);
    noiseNode.start();
    noiseNode.stop(this.ctx!.currentTime + 2.0);

    const subOsc = this.ctx!.createOscillator();
    const subGain = this.ctx!.createGain();
    subOsc.type = "sine";
    subOsc.frequency.setValueAtTime(100, this.ctx!.currentTime);
    subOsc.frequency.linearRampToValueAtTime(30, this.ctx!.currentTime + 0.8);
    subGain.gain.setValueAtTime(0.35, this.ctx!.currentTime);
    subGain.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + 1.2);
    subOsc.connect(subGain);
    subGain.connect(this.ctx!.destination);
    subOsc.start();
    subOsc.stop(this.ctx!.currentTime + 1.3);
  }

  playBeep() {
    if (!this.ctx) this.init();
    if (!this.canPlay()) return;

    const osc = this.ctx!.createOscillator();
    const gain = this.ctx!.createGain();
    osc.connect(gain);
    gain.connect(this.ctx!.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(1500, this.ctx!.currentTime);
    gain.gain.setValueAtTime(0.02, this.ctx!.currentTime);
    gain.gain.linearRampToValueAtTime(0.001, this.ctx!.currentTime + 0.08);
    osc.start();
    osc.stop(this.ctx!.currentTime + 0.09);
  }
}

export const introSounds = new IntroSoundEngine();
