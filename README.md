# Note Generator with Basic "Vanilla" JavaScript

[![HitCount](http://hits.dwyl.com/hchiam/_2DNote.svg)](http://hits.dwyl.com/hchiam/_2DNote)

**Potential use:** 2D games that people can play together, regardless of vision capabilities? Enable hearing what you're drawing? Hear the contours of someone else's sketch? Audio version of a signature?

Why not use binaural audio? So that even devices with only 1 speaker can express 2D position, even of multiple simultaneous instances.

You can think of the y dimension as the "proximity dimension" (louder = closer to you), and the x dimension as the "piano dimension" (left to right = low notes to high notes).

## [Live Demo](https://codepen.io/hchiam/full/eYYdVeX)

https://codepen.io/hchiam/full/eYYdVeX

(You can live edit the demo code in real time here: https://codepen.io/hchiam/pen/eYYdVeX)

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
