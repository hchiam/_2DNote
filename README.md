# Note Generator with Basic "Vanilla" JavaScript

[![HitCount](http://hits.dwyl.com/hchiam/note-generator.svg)](http://hits.dwyl.com/hchiam/note-generator)

**Potential use:** 2D games that people can play together, regardless of vision capabilities? Enable hearing what you're drawing? Hear the contours of someone else's sketch? Audio version of a signature?

Why not use binaural audio? So that even devices with only 1 speaker can express 2D position, even of multiple simultaneous instances.

You can think of the y dimension as the "proximity dimension" (louder = closer to you), and the x dimension as the "piano dimension" (left to right = low notes to high notes).

## [Live Demo](https://codepen.io/hchiam/full/eYYdVeX)

https://codepen.io/hchiam/full/eYYdVeX

(You can live edit the demo code in real time here: https://codepen.io/hchiam/pen/eYYdVeX)

## Can I include it in my own HTML code?

***Yes:***

```html
<script src="https://cdn.jsdelivr.net/gh/hchiam/note-generator@latest/note-generator.js"></script>
```

By including `note-generator.js`, you get an object `noteGenerator`, which you can use in your HTML or JS code.

For example:

```html
<div onmousemove="noteGenerator.adjustNotes(event,colourSoundIcon);">...</div>
```

For a full working code example, see [`example-include.html`](https://github.com/hchiam/note-generator/blob/master/example-include.html)

Here's an example of 2 notes playing simultaneously: [`example-two-notes.html`](https://github.com/hchiam/note-generator/blob/master/example-two-notes.html)
