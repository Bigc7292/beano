/**
 * Web Audio API synthesizer for DJ Beano Interactive Deck
 * Generates authentic 170BPM UK Hardcore kicks, offbeat bass, rave stabs, airhorns, and live audio analysis
 */

class AudioEngine {
  private ctx: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private masterGain: GainNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private isLoopRunning = false;
  private loopInterval: number | null = null;
  private bpm = 170;
  private currentStep = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.75, this.ctx.currentTime);

      this.filterNode = this.ctx.createBiquadFilter();
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.setValueAtTime(18000, this.ctx.currentTime);
      this.filterNode.Q.setValueAtTime(1.5, this.ctx.currentTime);

      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 128;
      this.analyser.smoothingTimeConstant = 0.8;

      this.filterNode.connect(this.masterGain);
      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public getAnalyser(): AnalyserNode | null {
    this.initContext();
    return this.analyser;
  }

  public setMasterVolume(val: number) {
    this.initContext();
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(Math.max(0, Math.min(1, val)), this.ctx.currentTime, 0.05);
    }
  }

  public setFilterCutoff(hz: number) {
    this.initContext();
    if (this.filterNode && this.ctx) {
      this.filterNode.frequency.setTargetAtTime(Math.max(200, Math.min(20000, hz)), this.ctx.currentTime, 0.05);
    }
  }

  public setBpm(bpm: number) {
    this.bpm = Math.max(150, Math.min(185, bpm));
    if (this.isLoopRunning) {
      this.stopLoop();
      this.startLoop();
    }
  }

  public getBpm(): number {
    return this.bpm;
  }

  // 1. Distorted 909-style Hardcore Kick
  public playHardcoreKick(time?: number) {
    this.initContext();
    if (!this.ctx || !this.filterNode) return;

    const t = time ?? this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const drive = this.ctx.createWaveShaper();

    // Distortion curve for UKHC kick crunch
    const n_samples = 44100;
    const curve = new Float32Array(n_samples);
    const deg = Math.PI / 180;
    const k = 45;
    for (let i = 0; i < n_samples; ++i) {
      const x = (i * 2) / n_samples - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    drive.curve = curve;
    drive.oversample = '2x';

    // Pitch sweep (180Hz -> 36Hz)
    osc.type = 'sine';
    osc.frequency.setValueAtTime(190, t);
    osc.frequency.exponentialRampToValueAtTime(42, t + 0.12);

    // Click transient
    gain.gain.setValueAtTime(1.0, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);

    osc.connect(drive);
    drive.connect(gain);
    gain.connect(this.filterNode);

    osc.start(t);
    osc.stop(t + 0.3);
  }

  // 2. Offbeat Gabber / Hardcore Sub Bass ("Donk / Reverse bass")
  public playOffbeatBass(time?: number) {
    this.initContext();
    if (!this.ctx || !this.filterNode) return;

    const t = time ?? this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(65.41, t); // C2

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(250, t);
    filter.frequency.exponentialRampToValueAtTime(1800, t + 0.05);
    filter.frequency.exponentialRampToValueAtTime(200, t + 0.2);

    gain.gain.setValueAtTime(0.01, t);
    gain.gain.linearRampToValueAtTime(0.7, t + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.filterNode);

    osc.start(t);
    osc.stop(t + 0.25);
  }

  // 3. Classic 90s Rave Piano Chord (Korg M1 style minor chord stab)
  public playRavePiano(time?: number) {
    this.initContext();
    if (!this.ctx || !this.filterNode) return;

    const t = time ?? this.ctx.currentTime;
    // C minor 7 chord frequencies (C4, Eb4, G4, Bb4)
    const freqs = [261.63, 311.13, 392.00, 466.16];

    freqs.forEach((f) => {
      if (!this.ctx || !this.filterNode) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, t);

      gain.gain.setValueAtTime(0.28, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);

      osc.connect(gain);
      gain.connect(this.filterNode);

      osc.start(t);
      osc.stop(t + 0.5);
    });
  }

  // 4. Laser Sweep FX
  public playLaserSweep() {
    this.initContext();
    if (!this.ctx || !this.filterNode) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(2800, t);
    osc.frequency.exponentialRampToValueAtTime(150, t + 0.35);

    gain.gain.setValueAtTime(0.35, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.38);

    osc.connect(gain);
    gain.connect(this.filterNode);

    osc.start(t);
    osc.stop(t + 0.4);
  }

  // 5. Classic UK Rave Airhorn
  public playAirhorn() {
    this.initContext();
    if (!this.ctx || !this.filterNode) return;

    const t = this.ctx.currentTime;
    // Dissonant multi-tone frequencies for signature airhorn
    const tones = [369.99, 392.00, 466.16];

    tones.forEach((freq) => {
      if (!this.ctx || !this.filterNode) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, t);
      // vibrato / wobble
      osc.frequency.setValueAtTime(freq * 1.05, t + 0.08);
      osc.frequency.setValueAtTime(freq, t + 0.16);

      // Staccato burst envelope
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.25, t + 0.03);
      gain.gain.setValueAtTime(0.25, t + 0.22);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

      osc.connect(gain);
      gain.connect(this.filterNode);

      osc.start(t);
      osc.stop(t + 0.4);
    });
  }

  // 6. Vinyl Rewind / Scratch Effect
  public playRewind() {
    this.initContext();
    if (!this.ctx || !this.filterNode) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(150, t);
    osc.frequency.exponentialRampToValueAtTime(1400, t + 0.15);
    osc.frequency.exponentialRampToValueAtTime(80, t + 0.4);

    gain.gain.setValueAtTime(0.3, t);
    gain.gain.linearRampToValueAtTime(0.4, t + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);

    osc.connect(gain);
    gain.connect(this.filterNode);

    osc.start(t);
    osc.stop(t + 0.5);
  }

  // 7. Hi-Hat Sizzle
  public playHiHat(time?: number) {
    this.initContext();
    if (!this.ctx || !this.filterNode) return;

    const t = time ?? this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.05;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(8000, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.18, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.filterNode);

    noise.start(t);
    noise.stop(t + 0.06);
  }

  // 8. Voice / MC Shout using SpeechSynthesis with pitch up
  public playMcShout(phrase: string) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(phrase);
      utterance.pitch = 1.3;
      utterance.rate = 1.25;
      utterance.volume = 0.9;
      // Prefer en-GB if available
      const voices = window.speechSynthesis.getVoices();
      const gbVoice = voices.find(v => v.lang.includes('GB') || v.lang.includes('en-UK'));
      if (gbVoice) {
        utterance.voice = gbVoice;
      }
      window.speechSynthesis.speak(utterance);
    }
  }

  // Realtime 170 BPM UK Hardcore 4x4 Loop Sequencer
  public startLoop() {
    this.initContext();
    if (this.isLoopRunning) return;
    this.isLoopRunning = true;
    this.currentStep = 0;

    const stepDurationMs = (60 / this.bpm / 4) * 1000; // 16th note in ms

    this.loopInterval = window.setInterval(() => {
      if (!this.isLoopRunning) return;

      // 4 on the floor kick (steps 0, 4, 8, 12)
      if (this.currentStep % 4 === 0) {
        this.playHardcoreKick();
      }

      // Offbeat bass on 8th notes (steps 2, 6, 10, 14)
      if (this.currentStep % 4 === 2) {
        this.playOffbeatBass();
      }

      // Closed hihat on every 8th note
      if (this.currentStep % 2 === 0) {
        this.playHiHat();
      }

      // Rave piano stab on step 0 and step 10
      if (this.currentStep === 0 || this.currentStep === 10) {
        this.playRavePiano();
      }

      this.currentStep = (this.currentStep + 1) % 16;
    }, stepDurationMs);
  }

  public stopLoop() {
    this.isLoopRunning = false;
    if (this.loopInterval !== null) {
      clearInterval(this.loopInterval);
      this.loopInterval = null;
    }
  }

  public isLoopActive(): boolean {
    return this.isLoopRunning;
  }
}

export const soundEngine = new AudioEngine();
