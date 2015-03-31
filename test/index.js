var assert = require('assert');

var transition;
try {
  transition = require('..');
} catch(e) {
  transition = require('transition-info');
}

describe('Transition', function() {

  describe('constructor', function() {

    it('should create a new instance when I use `new`', function() {
      assert(new transition({}) instanceof transition);
    });

    it('should create a new instance when I call it as a `function`', function() {
      assert(transition({}) instanceof transition);
    });

    it('should use the style information from the passed object', function() {

      var style = {
        transitionDuration:       '0.5s',
        transitionProperty:       'height'
      };

      assert.equal(transition(style).duration('height'), 500);

    });

    if (typeof(document) !== 'undefined') {
      it('should use the style information from the passed element', function () {

        var element = document.createElement('div');
        element.style.transitionDuration = '0.5s';
        element.style.transitionProperty = 'height';

        assert.equal(transition(element).duration('height'), 500);

      });
    }

  });

  describe('.duration()', function() {

	  describe('with a property', function() {

		  it('should return 0 when there are no transitions applied on any properties', function () {

			  var style = {
				  transitionDuration: '0s',
				  transitionProperty: 'all'
			  };

			  assert.equal(transition(style).duration('height'), 0);
		  });

		  it('should return 0 when there is a single transition applied and it is not on the property we\'re interested in', function () {

			  var style = {
				  transitionDuration: '0.5s',
				  transitionProperty: 'height'
			  };

			  assert.equal(transition(style).duration('width'), 0);
		  });

		  it('should return 500 when there is a single transition applied and it is on the property we\'re interested in', function () {

			  var style = {
				  transitionDuration: '0.5s',
				  transitionProperty: 'height'
			  };

			  assert.equal(transition(style).duration('height'), 500);
		  });

		  it('should return 0 when there are multiple transitions applied and they are not on the property we\'re interested in', function () {

			  var style = {
				  transitionDuration: '10s, 0.5s',
				  transitionProperty: 'opacity, height'
			  };

			  assert.equal(transition(style).duration('width'), 0);
		  });

		  it('should return 500 when there are multiple transitions applied and one is on the property we\'re interested in', function () {

			  var style = {
				  transitionDuration: '10s, 0.5s',
				  transitionProperty: 'opacity, height'
			  };

			  assert.equal(transition(style).duration('height'), 500);
		  });

		  it('should return 1000 when there is a single transition applied to all properties', function () {

			  var style = {
				  transitionDuration: '1s',
				  transitionProperty: 'all'
			  };

			  assert.equal(transition(style).duration('height'), 1000);
		  });

		  it('should return 1000 when I use 1s', function () {

			  var style = {
				  transitionDuration: '1s',
				  transitionProperty: 'height'
			  };

			  assert.equal(transition(style).duration('height'), 1000);
		  });

		  it('should return 1000 when I use 1000ms', function () {

			  var style = {
				  transitionDuration: '1000ms',
				  transitionProperty: 'height'
			  };

			  assert.equal(transition(style).duration('height'), 1000);
		  });

	  });

	  describe('without a property', function() {

		  it('should return 0 when there are no transitions applied', function () {

			  var style = {
				  transitionDuration: '0s',
				  transitionProperty: 'all'
			  };

			  assert.equal(transition(style).duration(), 0);
		  });


		  it('should return 500 when there is a single transition applied', function () {

			  var style = {
				  transitionDuration: '0.5s',
				  transitionProperty: 'height'
			  };

			  assert.equal(transition(style).duration(), 500);
		  });

		  it('should return 10000 when there are multiple transitions applied', function () {

			  var style = {
				  transitionDuration: '10s, 0.5s',
				  transitionProperty: 'opacity, height'
			  };

			  assert.equal(transition(style).duration(), 10000);
		  });

		  it('should return 1000 when there is a single transition applied to all properties', function () {

			  var style = {
				  transitionDuration: '1s',
				  transitionProperty: 'all'
			  };

			  assert.equal(transition(style).duration(), 1000);
		  });

		  it('should return 1000 when I use 1s', function () {

			  var style = {
				  transitionDuration: '1s',
				  transitionProperty: 'height'
			  };

			  assert.equal(transition(style).duration(), 1000);
		  });

		  it('should return 1000 when I use 1000ms', function () {

			  var style = {
				  transitionDuration: '1000ms',
				  transitionProperty: 'height'
			  };

			  assert.equal(transition(style).duration(), 1000);
		  });

	  });

  });

});
