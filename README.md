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
<script src="https://cdn.jsdelivr.net/gh/hchiam/_2DNote@1.3.0/_2DNote.js"></script>
<script>
  _2DNote.setAs2DArea(document.getElementById('2d-area', callbackUponUpdate));
</script>
```

You can also get the latest at `https://cdn.jsdelivr.net/gh/hchiam/_2DNote@master/_2DNote.js` or `https://cdn.jsdelivr.net/gh/hchiam/_2DNote@latest/_2DNote.js`

By including `_2DNote.js`, you get an object `_2DNote`, which you can use in your HTML or JS code.

For example:

```html
<div onmousemove="_2DNote.update(event,colourSoundIcon);">...</div>
```

For a full working code example, see [`example-include.html`](https://github.com/hchiam/_2DNote/blob/master/example-include.html)

Here's an example of 2 notes playing simultaneously: [`example-two-notes.html`](https://github.com/hchiam/_2DNote/blob/master/example-two-notes.html)

## API

The things you're most likely to use are: [`.play(e)`](https://github.com/hchiam/_2DNote#_2dnoteplaye), [`.update(e)`](https://github.com/hchiam/_2DNote#_2dnoteupdatee-or-_2dnoteupdatee-callback), [`.stop()`](https://github.com/hchiam/_2DNote#_2dnotestop), and [`.copy()`](https://github.com/hchiam/_2DNote#_2dnotecopy).

(Full details in [`_2DNote.js`](https://github.com/hchiam/_2DNote/blob/master/_2DNote.js).)

### `_2DNote.audioContext`:

* This is the [AudioContext](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext) used by the `_2DNote` instance to do the work of actually creating the note.

### `_2DNote.note`:

* This holds the information about the note (oscillator, volumeSetup) that the `_2DNote` instance can play.

### `_2DNote.play(e)`:

* This plays a note based on the position of the element or mouse click event, which it figures out for you. (`e` is for event ***or*** element.)
* **Note:** The note automatically stops playing if the cursor moves outside the *window*. This avoids having users click something outside the window without realizing it.
* **UX reminder:** If you plan to use `_2DNote` in only one area of the page, you should let users know when the cursor moves outside of that area. To do that, try something like `<tag-name onmouseleave="_2DNote.stop();">` on the enclosing HTML element tag. See [`example-include.html`](https://github.com/hchiam/_2DNote/blob/master/example-include.html) or [`example-two-notes.html`](https://github.com/hchiam/_2DNote/blob/master/example-two-notes.html) for examples placed on the `body` tag.

### `_2DNote.update(e)` or `_2DNote.update(e, callback)`:

* This causes the note that the `_2DNote` instance is playing to update to the current position of the element or mouse click event, which it figures out for you. (`e` is for event ***or*** element.)
* `callback` is an optional parameter, and is a function that will be run from within `update()` with this signature: `callback(volume, frequency)`. See full details in [`_2DNote.js`](https://github.com/hchiam/_2DNote/blob/master/_2DNote.js). See usage example in [`example-include.html`](https://github.com/hchiam/_2DNote/blob/master/example-include.html) or [`example-two-notes.html`](https://github.com/hchiam/_2DNote/blob/master/example-two-notes.html).

### `_2DNote.stop()`:

* This stops the note that the `_2DNote` instance is currently playing.

### `_2DNote.copy()`:

* This returns a deep clone of the `_2DNote` instance. Extra instances make it more convenient to play multiple notes at the same time.

### `_2DNote.getFrequency(e)`:

* This returns the note frequency based on the x coordinate of the element ***or*** mouse click event, which it figures out for you. (`e` is for event ***or*** element.)

### `_2DNote.getVolume(e)`:

* This returns the note volume based on the y coordinate of the element ***or*** mouse click event, which it figures out for you. (`e` is for event ***or*** element.)

### `_2DNote.normalize(value, inputRange, outputRange)`:

* This maps the value found within the input range (`[inputRangeMin, inputRangeMax]`) to be in the chosen output range (`[outputRangeMin, outputRangeMax]`). It returns the re-mapped value.
