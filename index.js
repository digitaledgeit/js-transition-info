
/**
 * Find the index of the property in the property list
 * @param   {string} property
 * @param   {string} propertyList
 * @returns {number}
 */
function indexOfProperty(property, propertyList) {
  propertyList = propertyList || '';
  var properties = propertyList.split(',').map(function(value) { return value.trim(); });
  for (var index=0; index<properties.length; ++index) {
    if (properties[index] === property || properties[index] === 'all' ) {
      return index;
    }
  }
  return -1;
}

/**
 * Find the value at an index in the value list
 * @param   {number} index
 * @param   {string} valueList
 * @returns {string|null}
 */
function valueAtIndex(index, valueList) {
  valueList = valueList || '';
  var values = valueList.split(',').map(function(value) { return value.trim(); });

  if (index<0 || index>=values.length) {
    return null;
  }

  return values[index];
}

/**
 * Easy access to transition information from style information
 * @constructor
 * @param   {CSSStyleDeclaration|HtmlElement} style The style information or the element to extract style information from
 * @returns {Transition}
 */
function Transition(style) {

  //check if we've been called as a function and return a new instance
  if (!(this instanceof Transition)) {
    return new Transition(style);
  }

  //check if we've been given a HTML element and extract the style information
  if (style.style) {
    style = style.style;
  }

  this._style = style;
}

/**
 * Get the number of milliseconds a transition should take to complete - the default duration is 0
 * @param   {string} property  The transition property
 * @returns {number}
 */
Transition.prototype.duration = function(property) {
  var value = valueAtIndex(indexOfProperty(property, this._style.transitionProperty), this._style.transitionDuration);

  if (value === null) {
    return 0;
  }

  var matches = value.match(/([0-9.]+)(s|ms)/);
  if (!matches) {
    return 0;
  }

  var duration = parseFloat(matches[1]);

  switch (matches[2]) {
    case 's':
      duration = duration*1000;
      break;

    case 'ms':
      break;

    default:
      duration = 0;

  }

  return duration;
};

module.exports = Transition;