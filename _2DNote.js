// example usage: _2DNote.play(...) or _2DNote.update(...)

var _2DNote = {

  audioContext: new AudioContext(),
  note: null,

  viewXRange: [0, document.documentElement.clientWidth],
  viewYRange: [0, document.documentElement.clientHeight],

  comfyFrequencyRange: [150, 400],
  comfyVolumeRange: [0, 0.5], // technically gain (ranges from 0 to 1)

  setAs2DArea: function (e, callbackUponUpdate) { // e = event or element
    // example usage: _2DNote.setAs2DArea(document.getElementById('2d-area', callbackUponUpdate));
    this.callbackUponUpdate = callbackUponUpdate;
    document.body.addEventListener('mousedown', this.play.bind(this));
    document.body.addEventListener('mouseup', this.stop.bind(this));
    document.body.addEventListener('mousemove', this.update.bind(this));
    document.body.addEventListener('touchstart', this.play.bind(this));
    document.body.addEventListener('touchend', this.stop.bind(this));
    document.body.addEventListener('touchmove', this.update.bind(this));
    this.setupExitedViewDetection();
  },

  play: function (e) { // e = event or element
    // example usage: <body onmousedown="_2DNote.play(event);" style="width: 100vw; height: 100vh;" ontouchstart="_2DNote.play(event);"></body>
    this.stop();
    this.setupExitedViewDetection();
    var frequency = this.getFrequency(e);
    var volume = this.getVolume(e);
    var volumeSetup = this.audioContext.createGain();
    volumeSetup.connect(this.audioContext.destination);
    volumeSetup.gain.value = volume;
    var oscillator = this.audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    oscillator.connect(volumeSetup);
    // instead of oscillator.connect(this.audioContext.destination);
    oscillator.start();
    // var delayThatAvoidsCrazyReverbs = 1;
    // oscillator.stop(this.audioContext.currentTime + delayThatAvoidsCrazyReverbs);
    this.note = {
      oscillator: oscillator,
      volumeSetup: volumeSetup,
    };
  },

  callbackUponUpdate: null,
  update: function (e, callback) { // e = event or element
    if (!this.note) return;
    var frequency = this.getFrequency(e);
    var volume = this.getVolume(e);
    var volumeSetup = this.note.volumeSetup;
    volumeSetup.gain.value = volume;
    var oscillator = this.note.oscillator;
    oscillator.frequency.value = frequency;
    if (callback) {
      callback(volume, frequency);
    } else if (this.callbackUponUpdate) {
      this.callbackUponUpdate(volume, frequency);
    }
  },

  stop: function () {
    // example usage: <body onmouseup="_2DNote.stop();" style="width: 100vw; height: 100vh;" ontouchend="_2DNote.stop();"></body>
    if (this.note == null) return;
    var oscillator = this.note.oscillator;
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
    var screenWidth = document.documentElement.clientWidth;
    var screenHeight = document.documentElement.clientHeight;
    var simulatedCenterClick = { // center: guaranteed != edge
      currentTarget: true,
      clientX: screenWidth / 2,
      clientY: screenHeight / 2,
    };
    _2DNote.play(simulatedCenterClick);
    setTimeout(function() {
      _2DNote.stop();
      document.body.removeEventListener('mouseleave', _2DNote.warnExitedView);
      document.body.removeEventListener('touchcancel', _2DNote.warnExitedView);  
    }, 100);
  },

  getFrequency: function (e) { // e = event or element
    var x = this.getX(e);
    var frequency = this.normalize(x, this.viewXRange, this.comfyFrequencyRange);
    return frequency;
  },

  getVolume: function (e) { // e = event or element
    var y = this.getY(e);
    // technically getting gain (which ranges 0 to 1)
    var volume = this.normalize(y, this.viewYRange, this.comfyVolumeRange);
    return volume;
  },

  getX: function (e) { // e = event or element
    var isMouseEvent = (e.currentTarget && e.clientX);
    var isTouchEvent = (e.touches);
    if (isMouseEvent) {
      return e.clientX;
    } else if (isTouchEvent) {
      return e.touches[0].clientX;
    } else { // element
      return e.offsetLeft;
    }
  },

  getY: function (e) { // e = event or element
    var isMouseEvent = (e.currentTarget && e.clientY);
    var isTouchEvent = (e.touches);
    if (isMouseEvent) {
      return e.clientY;
    } else if (isTouchEvent) {
      return e.touches[0].clientY;
    } else { // element
      return e.offsetTop;
    }
  },

  normalize: function (value, [inputRangeMin,inputRangeMax], [outputRangeMin,outputRangeMax]) {
    var inputBias = value - inputRangeMin;
    var ratioAdjustment = (outputRangeMax - outputRangeMin) / (inputRangeMax - inputRangeMin);
    var outputBias = outputRangeMin;
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
        var arrayCopy = [];
        object.forEach(function(element) {
          arrayCopy.push(recursiveDeepCopy(element));
        });
        return arrayCopy;
      } else {
        var objectCopy = {};
        for (var property in object) {
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
