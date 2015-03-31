
/**
 * Convert a value into a time amount
 * @param   {string} value
 * @returns {number}
 */
function toTime(value) {

	if (!value) {
		return 0;
	}

	var matches = value.match(/([0-9.]+)(s|ms)/);
	if (!matches) {
		return 0;
	}

	var amount    = parseFloat(matches[1]);
	var units     = matches[2];

	switch (units) {
		case 's':
			amount = amount*1000;
			break;

		case 'ms':
			break;

		default:
			amount = 0;

	}

	return amount;
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

	  /** @private */
	  this.style = style.style;

  } else {

	  /** @private */
	  this.style = style;

  }

}

/**
 * Get the transitionable properties
 * @returns {Array.<string>}
 */
Transition.prototype.properties = function() {
	return this.values('property');
};

/**
 * Get the number of milliseconds a transition should be delayed - the default delay is 0
 * @param   {string} [property]  A transition property
 * @returns {number}
 */
Transition.prototype.delay = function(property) {

	if (property) {
		return this.timeValue('delay', property);
	} else {
		return this.maxTimeValue('delay');
	}

};

/**
 * Get the number of milliseconds a transition should take to complete - the default duration is 0
 * @param   {string} [property]  A transition property
 * @returns {number}
 */
Transition.prototype.duration = function(property) {

	if (property) {
		return this.timeValue('duration', property);
	} else {
		return this.maxTimeValue('duration');
	}

};

/**
 * Get the number of milliseconds a transition should take to complete - the default delay+duration is 0
 * @param   {string} [property]  A transition property
 * @returns {number}
 */
Transition.prototype.total = function(property) {

	if (property) {
		return this.delay(property)+this.duration(property);
	} else {
		var totals = [];

		this.timeValues('delay').forEach(function(delay, i) {
			totals[i] = delay;
		});

		this.timeValues('duration').forEach(function(duration, i) {
			totals[i] = (totals[i] || 0) + duration;
		});

		return Math.max.apply(Math, totals);
	}

};

/**
 * Get the rule property value
 * @private
 * @param  {string} rule
 * @param  {string} property
 * @return {string|null}
 */
Transition.prototype.value = function(rule, property) {
	var props   = this.properties();
	var index   = props.indexOf(property);
	var values  = this.values(rule);

	if (index === -1) {
		index = props.indexOf('all');
	}

	if (index === -1) {
		return null;
	}

	if (index >= values.length) {
		return null;
	}

	return values[index];

};

/**
 * Get the rule property values
 * @private
 * @param  {string} rule
 * @return {Array.<string>}
 */
Transition.prototype.values = function(rule) {
	rule = 'transition'+rule.charAt(0).toUpperCase()+rule.substr(1);

	if (!this['_'+rule]) {
		this['_'+rule] = (this.style[rule] || '').split(',').map(function(value) { return value.trim(); });
	}
	return this['_'+rule];
};

/** @private */
Transition.prototype.timeValue = function(rule, property) {
	return toTime(this.value(rule, property));
};

/** @private */
Transition.prototype.timeValues = function(rule) {
	return this.values(rule).map(function(value) {
		return toTime(value);
	});
};

/** @private */
Transition.prototype.maxTimeValue = function(rule) {
	return Math.max.apply(Math, this.timeValues(rule))
};

module.exports = Transition;