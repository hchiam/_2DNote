# Note Generator with Basic "Vanilla" JavaScript

[![HitCount](http://hits.dwyl.com/hchiam/note-generator.svg)](http://hits.dwyl.com/hchiam/note-generator)

**Potential use:** 2D games that people can play together, regardless of vision capabilities?

## [Live Demo](https://codepen.io/hchiam/full/eYYdVeX)

https://codepen.io/hchiam/full/eYYdVeX

(You can live edit the demo code in real time here: https://codepen.io/hchiam/pen/eYYdVeX)

## Can I include it in my own HTML code?

***Yes:***

```html
<script src="https://cdn.jsdelivr.net/gh/hchiam/note-generator@master/note-generator.js"></script>
```

By including `note-generator.js`, you get an object `noteGenerator`, which you can use in your HTML or JS code.

For example:

```html
<div onmousemove="noteGenerator.adjustNotes(event,colourSoundIcon);">...</div>
```
