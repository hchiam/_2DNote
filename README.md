# \_2DNote: 2D Note Generator <!-- [![npm version](https://img.shields.io/npm/v/2dnote.svg?style=flat-square)](https://www.npmjs.com/package/2dnote) --> [![GitHub package version](https://img.shields.io/github/package-json/v/hchiam/_2DNote?style=flat-square)](https://github.com/hchiam/_2DNote/packages/320003) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

[Live Demo](https://github.com/hchiam/_2DNote#live-demo)

[Include in HTML](https://github.com/hchiam/_2DNote#can-i-include-it-in-my-own-html-code)

[API](https://github.com/hchiam/_2DNote#api)

**Purpose:** An experiment in making visual interfaces more accessible to people who are blind. Screen readers linearize your page content, so they don't communicate 2-dimensional visuals very well. You can address that by mapping 2D positions to notes.

**Potential Uses:** Create 2D games and apps that people can use together, regardless of vision capabilities? Hear the contours of your signature as you write it? Enable people to "hear" what someone else is drawing? Locate elements on a page? Convert graphs into sound? Etc.

**Some Design Choices:** \_2DNote does not rely on binaural audio, so devices with only 1 speaker can still communicate the 2D position of one or more elements simultaneously. It does that by relying on volume and pitch. Brain plasticity will take care of the rest.

You can think of the y dimension as the "proximity dimension" (louder = closer to you), and the x dimension as the "piano dimension" (left-to-right = low-to-high notes).

\_2DNote.js is made from pure "vanilla" JavaScript. So no special install steps required. :smile:

To keep things as flexible as possible, you'll need to handle keyboard-only interaction. That said, you might be interested in [hchiam/draggable](https://github.com/hchiam/draggable), which focuses on letting you moving elements around with mouse, touch, keyboard, or screen reader!

### Further reading

- [Sonification](https://en.wikipedia.org/wiki/Sonification)
- [Auditory display](https://en.wikipedia.org/wiki/Auditory_display)

## [Live Demo (requires mouse or touch)](https://codepen.io/hchiam/full/eYYdVeX)

<https://codepen.io/hchiam/full/eYYdVeX>

(You can live edit the demo code in real time here: <https://codepen.io/hchiam/pen/eYYdVeX>)

## Can I include it in my own HTML code?

**_Yes:_**

```html
<script
  src="https://cdn.jsdelivr.net/gh/hchiam/_2DNote@1.12.3/_2DNote.min.js"
  integrity="sha384-e0d2dNwg3F9WTJ3jZBF5iUeuVyAtx+zwMnCAvKMiCHtwO2l2dzo3cIMO4+Xqwn5p"
  crossorigin="anonymous"
></script>
```

While not recommended, you can auto-update to the latest by linking the `src` to:

- `https://cdn.jsdelivr.net/gh/hchiam/_2DNote@master/_2DNote.min.js` or
- `https://cdn.jsdelivr.net/gh/hchiam/_2DNote@latest/_2DNote.min.js`

By including `_2DNote.js`, you get an object `_2DNote`, which you can use in your HTML or JS code.

For example:

```html
<div onmousemove="_2DNote.update(event,colourSoundIcon);">...</div>
```

For quick setup on the `body` tag:

```html
<body>
  <script
    src="https://cdn.jsdelivr.net/gh/hchiam/_2DNote@1.12.3/_2DNote.min.js"
    integrity="sha384-e0d2dNwg3F9WTJ3jZBF5iUeuVyAtx+zwMnCAvKMiCHtwO2l2dzo3cIMO4+Xqwn5p"
    crossorigin="anonymous"
  ></script>
  <script>
    _2DNote.setAs2DArea(document.body, callbackUponUpdate);
    function callbackUponUpdate() {
      // do something whenever _2DNote.update() is triggered;
    }
  </script>
</body>
```

For quick setup of a custom 2D click/touch area:

```html
<body>
  <div id="2d-area" style="width: 100vw; height: 100vh;">...</div>
  ...
  <script
    src="https://cdn.jsdelivr.net/gh/hchiam/_2DNote@1.12.3/_2DNote.min.js"
    integrity="sha384-e0d2dNwg3F9WTJ3jZBF5iUeuVyAtx+zwMnCAvKMiCHtwO2l2dzo3cIMO4+Xqwn5p"
    crossorigin="anonymous"
  ></script>
  <script>
    _2DNote.setAs2DArea(document.getElementById("2d-area"), callbackUponUpdate);
    function callbackUponUpdate() {
      // do something whenever _2DNote.update() is triggered;
    }
  </script>
</body>
```

To disable the "exit" sound:

```js
var useExitDetection = false;

_2DNote.setAs2DArea(
  document.querySelector("#your_element"),
  callbackUponUpdate,
  useExitDetection
);
```

For a full working code example, see [`example-include.html`](https://github.com/hchiam/_2DNote/blob/master/example-include.html)

Here's an example of 2 notes playing simultaneously: [`example-two-notes.html`](https://github.com/hchiam/_2DNote/blob/master/example-two-notes.html)

## API

The things you're most likely to use are: [`.play(e)`](https://github.com/hchiam/_2DNote#_2dnoteplaye), [`.update(e)`](https://github.com/hchiam/_2DNote#_2dnoteupdatee-or-_2dnoteupdatee-callback), [`.stop()`](https://github.com/hchiam/_2DNote#_2dnotestop), and [`.copy()`](https://github.com/hchiam/_2DNote#_2dnotecopy).

(Full details in [`_2DNote.js`](https://github.com/hchiam/_2DNote/blob/master/_2DNote.js).)

### `_2DNote.audioContext`:

- This is the [AudioContext](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext) used by the `_2DNote` instance to do the work of actually creating the note.

### `_2DNote.note`:

- This holds the information about the note (oscillator, volumeSetup) that the `_2DNote` instance can play.

### `_2DNote.play(e, setupExitDetection = true)`:

- This plays a note based on the position of the element or mouse click event, which it figures out for you. (`e` is for event **_or_** element.)
- `setupExitDetection` is an optional parameter, and is `true` by default. You most likely will want to do either `_2DNote.play(e)` or `_2DNote.play(e, false)`. This parameter tells `_2DNote` whether it should play an "exit" sound when you leave the 2D area.
- **Note:** The note automatically stops playing if the cursor moves outside the _window_. This avoids having users click something outside the window without realizing it.
- **UX reminder:** If you plan to use `_2DNote` in only one area of the page, you should let users know when the cursor moves outside of that area. To do that, try something like `<tag-name onmouseleave="_2DNote.stop();">` on the enclosing HTML element tag. See [`example-include.html`](https://github.com/hchiam/_2DNote/blob/master/example-include.html) or [`example-two-notes.html`](https://github.com/hchiam/_2DNote/blob/master/example-two-notes.html) for examples placed on the `body` tag. If you'd like to disable the `warnExitedView` when the mouse leaves the `body`, then you can run `document.body.removeEventListener("mouseleave",_2DNote.warnExitedView);`

### `_2DNote.update(e)` or `_2DNote.update(e, callback)`:

- This causes the note that the `_2DNote` instance is playing to update to the current position of the element or mouse click event, which it figures out for you. (`e` is for event **_or_** element.)
- `callback` is an optional parameter, and is a function that will be run from within `update()` with this signature: `callback(volume, frequency, pan)`. See full details in [`_2DNote.js`](https://github.com/hchiam/_2DNote/blob/master/_2DNote.js). See usage example in [`example-include.html`](https://github.com/hchiam/_2DNote/blob/master/example-include.html) or [`example-two-notes.html`](https://github.com/hchiam/_2DNote/blob/master/example-two-notes.html).

### `_2DNote.stop()`:

- This stops the note that the `_2DNote` instance is currently playing.

### `_2DNote.copy()`:

- This returns a deep clone of the `_2DNote` instance. Extra instances make it more convenient to play multiple notes at the same time.

### `_2DNote.getFrequency(e)`:

- This returns the note frequency based on the x coordinate of the element **_or_** mouse click event, which it figures out for you. (`e` is for event **_or_** element.)

### `_2DNote.getVolume(e)`:

- This returns the note volume based on the y coordinate of the element **_or_** mouse click event, which it figures out for you. (`e` is for event **_or_** element.)

### `_2DNote.getPan(e)`:

- This returns the note panning based on the x coordinate of the element **_or_** mouse click event, which it figures out for you. (`e` is for event **_or_** element.) Panning creates binaural audio: if you use headphones, it'll sound like the audio is coming from the left or right side of you.

### `_2DNote.normalize(value, inputRange, outputRange)`:

- This maps the value found within the input range (`[inputRangeMin, inputRangeMax]`) to be in the chosen output range (`[outputRangeMin, outputRangeMax]`). It returns the re-mapped value.

## Older version also available on NPM

(But I'd just stick to the GitHub package version.)

<https://www.npmjs.com/package/2dnote>

```bash
npm i 2dnote
```

See the notes in this example to publish to both GitHub packages page and npm packages page: <https://github.com/hchiam/generator-hchiam-learning/commit/f3bbdfa93ae7c27e8d32b04f587afc644048e486> (But I'd just stick to the GitHub package version.)

## If you're interested in general accessibility

<https://github.com/hchiam/web-accessibility-course-notes#web-accessibility-a11y-course-notes>

### Other accessibility-related repos

<https://github.com/hchiam/flying-focus>

<https://github.com/hchiam/keyboard-focus-trap>

<https://github.com/hchiam/draggable>

## Local development

```bash
bash package.sh
```

```bash
# do this first:
yarn publish # supply new version number in CLI

# do this second:
yarn package
```

A newer example of how to publish to npm (package.json setup only + `yarn publish`): 
- https://github.com/hchiam/trysterollup/tree/24457690a715e1c57e701b0d51e3b6fd3e50491c
- https://github.com/hchiam/trysterollup/blob/24457690a715e1c57e701b0d51e3b6fd3e50491c/package.json
