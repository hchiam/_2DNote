// example usage: _2DNote.play(...) or _2DNote.update(...)

const _2DNote = {

  audioContext: new AudioContext(),
  note: null,

  viewXRange: [0, document.documentElement.clientWidth],
  viewYRange: [0, document.documentElement.clientHeight],

  comfyFrequencyRange: [150, 400],
  comfyVolumeRange: [0, 0.5], // technically gain (ranges from 0 to 1)

  play: function (e) { // e = event or element
    // example usage: <body onmousedown="_2DNote.play(event);" style="width: 100vw; height: 100vh;" ontouchstart="_2DNote.play(event);"></body>
    this.stop();
    this.setupExitedViewDetection();
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

  update: function (e, callback) { // e = event or element
    if (!this.note) return;
    const frequency = this.getFrequency(e);
    const volume = this.getVolume(e);
    const volumeSetup = this.note.volumeSetup;
    volumeSetup.gain.value = volume;
    const oscillator = this.note.oscillator;
    oscillator.frequency.value = frequency;
    if (callback) callback(volume, frequency);
  },

  stop: function () {
    // example usage: <body onmouseup="_2DNote.stop();" style="width: 100vw; height: 100vh;" ontouchend="_2DNote.stop();"></body>
    if (this.note == null) return;
    const oscillator = this.note.oscillator;
    oscillator.stop(this.audioContext.currentTime);
    this.note = null;
  },

  setupExitedViewDetection: function () {
    // TODO: only continue if detect does not already exist
    document.body.removeEventListener('mouseleave', this.warnExitedView);
    document.body.removeEventListener('touchcancel', this.warnExitedView);
    document.body.addEventListener('mouseleave', this.warnExitedView);
    document.body.addEventListener('touchcancel', this.warnExitedView);
  },

  warnExitedView: function () {
    const screenWidth = document.documentElement.clientWidth;
    const screenHeight = document.documentElement.clientHeight;
    const simulatedCenterClick = { // center: guaranteed != edge
      currentTarget: true,
      clientX: screenWidth / 2,
      clientY: screenHeight / 2,
    };
    _2DNote.play(simulatedCenterClick);
    setTimeout(function() {
      _2DNote.stop();
    }, 100);
  },

  getFrequency: function (e) { // e = event or element
    const x = this.getX(e);
    const frequency = this.normalize(x, this.viewXRange, this.comfyFrequencyRange);
    return frequency;
  },

  getVolume: function (e) { // e = event or element
    const y = this.getY(e);
    // technically getting gain (which ranges 0 to 1)
    const volume = this.normalize(y, this.viewYRange, this.comfyVolumeRange);
    return volume;
  },

  getX: function (e) { // e = event or element
    const isMouseEvent = (e.currentTarget && e.clientX);
    const isTouchEvent = (e.touches);
    if (isMouseEvent) {
      return e.clientX;
    } else if (isTouchEvent) {
      return e.touches[0].clientX;
    } else { // element
      return e.offsetLeft;
    }
  },

  getY: function (e) { // e = event or element
    const isMouseEvent = (e.currentTarget && e.clientY);
    const isTouchEvent = (e.touches);
    if (isMouseEvent) {
      return e.clientY;
    } else if (isTouchEvent) {
      return e.touches[0].clientY;
    } else { // element
      return e.offsetLeft;
    }
  },

  normalize: function (value, [inputRangeMin,inputRangeMax], [outputRangeMin,outputRangeMax]) {
    const inputBias = value - inputRangeMin;
    const ratioAdjustment = (outputRangeMax - outputRangeMin) / (inputRangeMax - inputRangeMin);
    const outputBias = outputRangeMin;
    return inputBias * ratioAdjustment + outputBias;
  },

  copy: function () {
    /**
     * If you want to play multiple notes at the same time, 
     * you can use this to create more instances.
     */
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
