# _2DNote: 2D Note Generator

[![HitCount](http://hits.dwyl.com/hchiam/_2DNote.svg)](http://hits.dwyl.com/hchiam/_2DNote)

**Purpose:** An experiment in making visual interfaces more accessible to people who are blind. Screen readers linearize your page content, so they don't communicate 2-dimensional visuals very well. You can address that by mapping 2D positions to notes.

**Potential Uses:** Create 2D games and apps that people can use together, regardless of vision capabilities? Hear the contours of your signature as you write it? Enable people to "hear" what someone else is drawing? Locate elements on a page? Convert graphs into sound? Etc.

**Some Design Choices:** _2DNote does not rely on binaural audio, so devices with only 1 speaker can still communicate the 2D position of one or more elements simultaneously. It does that by relying on volume and pitch. Brain plasticity will take care of the rest.

You can think of the y dimension as the "proximity dimension" (louder = closer to you), and the x dimension as the "piano dimension" (left-to-right = low-to-high notes).

_2DNote.js is made from pure "vanilla" JavaScript. So no extra dependencies. :smile:

## [Live Demo](https://codepen.io/hchiam/full/eYYdVeX)

<https://codepen.io/hchiam/full/eYYdVeX>

(You can live edit the demo code in real time here: <https://codepen.io/hchiam/pen/eYYdVeX>)

## Can I include it in my own HTML code?

***Yes:***

```html
<script src="https://cdn.jsdelivr.net/gh/hchiam/_2DNote@latest/_2DNote.js"></script>
```

By including `_2DNote.js`, you get an object `_2DNote`, which you can use in your HTML or JS code.

For example:

```html
<div onmousemove="_2DNote.update(event,colourSoundIcon);">...</div>
```

For a full working code example, see [`example-include.html`](https://github.com/hchiam/_2DNote/blob/master/example-include.html)

Here's an example of 2 notes playing simultaneously: [`example-two-notes.html`](https://github.com/hchiam/_2DNote/blob/master/example-two-notes.html)

## API

(Full details in [`_2DNote.js`](https://github.com/hchiam/_2DNote/blob/master/_2DNote.js).)

### `_2DNote.audioContext`:

* This is the [AudioContext](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext) used by the `_2DNote` instance.

### `_2DNote.note`:

* This is the note that the `_2DNote` instance can play.

### `_2DNote.play(e)`:

* This plays a note based on the position of the element or mouse click event. (`e` is for event ***or*** element.)

### `_2DNote.update(e)` or `_2DNote.update(e, callback)`:

* This causes the note that the `_2DNote` instance is playing to update to the current position of the element or mouse click event. (`e` is for event ***or*** element.)
* `callback` is an optional parameter, and is a function that will be run from within `update()` with this signature: `callback(volume, frequency)`. See full details in [`_2DNote.js`](https://github.com/hchiam/_2DNote/blob/master/_2DNote.js).

### `_2DNote.stop()`:

* This stops the note that the `_2DNote` instance is currently playing.

### `_2DNote.getFrequency(e)`:

* This returns the note frequency based on the x coordinate of the element ***or*** mouse click event. (`e` is for event ***or*** element.)

### `_2DNote.getVolume(e)`:

* This returns the note volume based on the y coordinate of the element ***or*** mouse click event. (`e` is for event ***or*** element.)

### `_2DNote.getFrequencyFromMouseX(event)`:

* This returns the note frequency based on the x coordinate of the mouse click event.

### `_2DNote.getVolumeFromMouseY(event)`:

* This returns the note volume based on the y coordinate of the mouse click event.

### `_2DNote.getFrequencyFromX(x)`:

* This returns the note frequency based on the given x coordinate.

### `_2DNote.getVolumeFromY(y)`:

* This returns the note volume based on the given y coordinate.

### `_2DNote.normalize(value, inMin,inMax, outMin,outMax)`:

* This maps the value found within the input range (`inMin` to `inMax`) to be in the chosen output range (`outMin` to `outMax`). It returns the re-mapped value.

### `_2DNote.copy()`:

* This returns a deep clone of the `_2DNote` instance. Extra instances make it more convenient to play multiple notes at the same time.
