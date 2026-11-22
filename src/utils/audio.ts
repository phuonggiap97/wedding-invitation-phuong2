// Romantic wedding melody synthesizer using Web Audio API so it plays instantly and flawlessly without broken external links

class WeddingAudioPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timer: number | null = null;
  private currentTrackIndex: number = 0;
  private gainNode: GainNode | null = null;
  private onStateChange: ((isPlaying: boolean) => void) | null = null;

  public tracks = [
    { title: "Canon in D (Acoustic Piano)", composer: "Johann Pachelbel" },
    { title: "A Thousand Years (Melody)", composer: "Christina Perri" },
    { title: "Until I Found You (Romantic Loop)", composer: "Stephen Sanchez" }
  ];

  constructor() {
    // Lazy init on first user gesture
  }

  public setListener(cb: (isPlaying: boolean) => void) {
    this.onStateChange = cb;
  }

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.15, this.ctx.currentTime);
      this.gainNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private playTone(freq: number, startTime: number, duration: number, type: OscillatorType = 'sine') {
    if (!this.ctx || !this.gainNode) return;
    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);

    // Smooth envelope for romantic piano/bell acoustic feel
    noteGain.gain.setValueAtTime(0.001, startTime);
    noteGain.gain.exponentialRampToValueAtTime(0.18, startTime + 0.05);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(noteGain);
    noteGain.connect(this.gainNode);

    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  private playChord(freqs: number[], startTime: number, duration: number) {
    freqs.forEach((freq, idx) => {
      this.playTone(freq, startTime + (idx * 0.04), duration, 'sine');
    });
  }

  public start() {
    this.initContext();
    if (this.isPlaying) return;
    this.isPlaying = true;
    if (this.onStateChange) this.onStateChange(true);

    this.playMelodyLoop();
  }

  private playMelodyLoop() {
    if (!this.isPlaying || !this.ctx) return;

    // Canon in D notes & arpeggio frequencies (Hz)
    const melody: { chord: number[]; duration: number }[] = [
      // D Major
      { chord: [293.66, 369.99, 440.00, 587.33], duration: 1.8 },
      // A Major
      { chord: [220.00, 277.18, 329.63, 440.00], duration: 1.8 },
      // B minor
      { chord: [246.94, 293.66, 369.99, 493.88], duration: 1.8 },
      // F# minor
      { chord: [185.00, 220.00, 277.18, 369.99], duration: 1.8 },
      // G Major
      { chord: [196.00, 246.94, 293.66, 392.00], duration: 1.8 },
      // D Major
      { chord: [220.00, 293.66, 369.99, 440.00], duration: 1.8 },
      // G Major
      { chord: [196.00, 246.94, 293.66, 392.00], duration: 1.8 },
      // A Major
      { chord: [220.00, 277.18, 329.63, 440.00], duration: 1.8 }
    ];

    let now = this.ctx.currentTime + 0.1;
    let totalTime = 0;

    melody.forEach((item) => {
      this.playChord(item.chord, now + totalTime, item.duration);
      totalTime += item.duration;
    });

    this.timer = window.setTimeout(() => {
      if (this.isPlaying) {
        this.playMelodyLoop();
      }
    }, (totalTime * 1000) - 200);
  }

  public stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.onStateChange) this.onStateChange(false);
  }

  public toggle() {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.start();
    }
  }

  public getPlayingState() {
    return this.isPlaying;
  }

  public getCurrentTrack() {
    return this.tracks[this.currentTrackIndex];
  }

  public nextTrack() {
    this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length;
    if (this.isPlaying) {
      this.stop();
      setTimeout(() => this.start(), 150);
    }
  }
}

export const weddingAudio = new WeddingAudioPlayer();
