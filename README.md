# transition-info

Read transition values from a `CSSStyleDeclaration`.

## Installation

Browserify:
 
    npm install --save @digitaledgeit/transition-info
  
Component

    component install digitaledgeit/js-transition-info

## Usage

HTML:

    <div class="target">Target</div>

CSS:

    .target {
      transition: opacity 1s, max-height 2s;
    }

JS:

    var transition = require('transition-info');

    var element   = document.querySelector('.target');
    var duration  = transition(element).duration();
    var opacity   = transition(element).duration('opacity');

    console.log(duration+'ms'); //prints `2000ms`
    console.log(opacity+'ms');  //prints `1000ms`

## API

### Methods

#### .delay(property : string) : number

Get the number of milliseconds a transition should be delayed - the default delay is 0

 - property - optional
 
#### .duration(property : string) : number

Get the number of milliseconds a transition should take to complete - the default duration is 0

 - property - optional

#### .total(property : string) : number

Get the total number of milliseconds a transition should take to complete including any delay - the default delay+duration is 0

- property - optional

## License

The MIT License (MIT)

Copyright (c) 2015 James Newell

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.