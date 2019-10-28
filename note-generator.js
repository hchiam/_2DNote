const noteGenerator = {
  audioCtx: new AudioContext(),
  // multiple oscillators can use this one context
  notes: [],

  playNote: function playNote(e) {
    // example usage: <body onmousemove="playNote(event)" style="width: 100vw; height: 100vh;"></body>
    // can play another note simultaneously with another playNote(e) call
    const frequency = this.getFrequencyFromX(e);
    const volume = this.getVolumeFromY(e);
    const volumeSetup = this.audioCtx.createGain();
    volumeSetup.connect(this.audioCtx.destination);
    volumeSetup.gain.value = volume;
    const oscillator = this.audioCtx.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    oscillator.connect(volumeSetup);
    // instead of oscillator.connect(audioCtx.destination);
    oscillator.start();
    // const delayThatAvoidsCrazyReverbs = 1;
    // oscillator.stop(audioCtx.currentTime + delayThatAvoidsCrazyReverbs);
    this.notes.push({oscillator, volumeSetup});
  },

  adjustNotes: function adjustNotes(e, callback) {
    for (let i in this.notes) {
      const frequency = this.getFrequencyFromX(e);
      const volume = this.getVolumeFromY(e);
      const volumeSetup = this.notes[i].volumeSetup;
      volumeSetup.gain.value = volume;
      const oscillator = this.notes[i].oscillator;
      oscillator.frequency.value = frequency;
      callback(volume, frequency);
    }
  },

  stopNotes: function stopNotes() {
    for (let i in this.notes) {
      const oscillator = this.notes[i].oscillator;
      oscillator.stop(this.audioCtx.currentTime);
    }
    this.notes = [];
  },

  getFrequencyFromX: function getFrequencyFromX(e) {
    const screenWidth = e.currentTarget.offsetWidth;
    const x = e.clientX;
    const minComfyFreq = 150;
    const maxComfyFreq = 400;
    const frequency = this.normalize(x, 
                                0,screenWidth, 
                                minComfyFreq,maxComfyFreq);
    return frequency;
  },

  getVolumeFromY: function getVolumeFromY(e) {
    // technically getting gain (which ranges 0 to 1)
    const screenHeight = e.currentTarget.offsetHeight;
    const y = e.clientY;
    const minComfyVolume = 0;
    const maxComfyVolume = 0.5;
    const volume = this.normalize(y, 
                            0,screenHeight, 
                            minComfyVolume,maxComfyVolume);
    return volume;
  },

  normalize: function normalize(value, inMin,inMax, outMin,outMax) {
    const inputBias = value - inMin;
    const ratioAdjustment = (outMax - outMin) / (inMax - inMin);
    const outputBias = outMin;
    return inputBias * ratioAdjustment + outputBias;
  }
};
