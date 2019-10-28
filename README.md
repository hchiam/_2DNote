# _2DNote: 2D Note Generator

[![HitCount](http://hits.dwyl.com/hchiam/_2DNote.svg)](http://hits.dwyl.com/hchiam/_2DNote)

An experiment in making visual interfaces more accessible to people who are blind. Screen readers don't communicate 2-dimensional visuals very well. You can address that by mapping 2D positions into notes.

**Potential Uses:** Create 2D games and apps that people can use together, regardless of vision capabilities? Hear the contours of your signature as you write it? Enable people to "hear" what someone else is drawing? Locate elements on a page? Convert graphs into sound? Etc.

_2DNote does not rely on binaural audio, so devices with only 1 speaker can still communicate the 2D position of one or more elements simultaneously. It does that by relying on volume and pitch. Brain plasticity will take care of the rest.

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
