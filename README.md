# transition-info

Read transition values from a `CSSStyleDeclaration`.

## Installation

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

 
## ToDo

- 
