// example usage: noteGenerator.playNote(...) or noteGenerator.adjustNotes(...)

const noteGenerator = {

  audioContext: new AudioContext(),
  // multiple oscillators can use this one context
  note: null,

  play: function playNote(e) {
    // example usage: <body onmousemove="noteGenerator.playNote(event)" style="width: 100vw; height: 100vh;"></body>
    // can play another note simultaneously with another playNote(e) call
    const frequency = this.getFrequency(e);
    const volume = this.getVolume(e);
    const volumeSetup = this.audioContext.createGain();
    volumeSetup.connect(this.audioContext.destination);
    volumeSetup.gain.value = volume;
    const oscillator = this.audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    oscillator.connect(volumeSetup);
    // instead of oscillator.connect(this.audioContext.destination);
    oscillator.start();
    // const delayThatAvoidsCrazyReverbs = 1;
    // oscillator.stop(this.audioContext.currentTime + delayThatAvoidsCrazyReverbs);
    this.note = {oscillator, volumeSetup};
  },

  update: function adjustNotes(e, callback) {
    const frequency = this.getFrequency(e);
    const volume = this.getVolume(e);
    const volumeSetup = this.note.volumeSetup;
    volumeSetup.gain.value = volume;
    const oscillator = this.note.oscillator;
    oscillator.frequency.value = frequency;
    if (callback) callback(volume, frequency);
  },

  stop: function stopNotes() {
    const oscillator = this.note.oscillator;
    oscillator.stop(this.audioContext.currentTime);
    this.note = null;
  },

  getFrequency: function getFrequency(e) {
    if (e.currentTarget && e.clientX && e.clientY) {
      // event
      return this.getFrequencyFromMouseX(e);
    } else {
      // element
      const x = e.offsetLeft;
      return this.getFrequencyFromX(x);
    }
  },

  getVolume: function getVolume(e) {
    if (e.currentTarget && e.clientX && e.clientY) {
      // event
      return this.getVolumeFromMouseY(e);
    } else {
      // element
      const y = e.offsetTop;
      return this.getVolumeFromY(y);
    }
  },

  getFrequencyFromMouseX: function getFrequencyFromMouseX(e) {
    const screenWidth = e.currentTarget.offsetWidth;
    const x = e.clientX;
    const minComfyFreq = 150;
    const maxComfyFreq = 400;
    const frequency = this.normalize(x, 
                                0,screenWidth, 
                                minComfyFreq,maxComfyFreq);
    return frequency;
  },

  getVolumeFromMouseY: function getVolumeFromMouseY(e) {
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

  getFrequencyFromX: function getFrequencyFromX(x) {
    const screenWidth = document.documentElement.clientWidth;
    const minComfyFreq = 150;
    const maxComfyFreq = 400;
    const frequency = this.normalize(x, 
                                     0,screenWidth, 
                                     minComfyFreq,maxComfyFreq);
    return frequency;
  },

  getVolumeFromY: function getVolumeFromY(y) {
    // technically getting gain (which ranges 0 to 1)
    const screenHeight = document.documentElement.clientHeight;
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
  },

  copy: function copy() {
    return recursiveDeepCopy(this);
    function recursiveDeepCopy(object) {
      if (object === null || typeof object !== "object") {
        return object;
      } else if (Array.isArray(object)) {
        const arrayCopy = [];
        object.forEach(function(element) {
          arrayCopy.push(recursiveDeepCopy(element));
        });
        return arrayCopy;
      } else {
        const objectCopy = {};
        for (let property in object) {
          if (object.hasOwnProperty(property)) {
            if (property === 'audioContext') {
              objectCopy.audioContext = new AudioContext();
            } else {
              objectCopy[property] = recursiveDeepCopy(object[property]);
            }
          }
        }
        return objectCopy;
      }
    }
  },

};
