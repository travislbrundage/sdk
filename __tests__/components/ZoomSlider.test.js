/* global afterEach, beforeEach, describe, it */

import TestUtils from 'react-addons-test-utils';
import React from 'react';
import {assert} from 'chai';
import raf from 'raf';
import ol from 'openlayers';
import 'phantomjs-polyfill-object-assign';
import ZoomSlider from '../../src/components/ZoomSlider';

raf.polyfill();

describe('ZoomSlider', function() {
  var target, map;
  var width = 360;
  var height = 180;

  beforeEach(function(done) {
    target = document.createElement('div');
    var style = target.style;
    style.position = 'absolute';
    style.left = '-1000px';
    style.top = '-1000px';
    style.width = width + 'px';
    style.height = height + 'px';
    document.body.appendChild(target);
    map = new ol.Map({
      target: target,
      view: new ol.View({
        center: [0, 0],
        zoom: 1
      })
    });
    map.once('postrender', function() {
      done();
    });
  });

  afterEach(function() {
    map.setTarget(null);
    document.body.removeChild(target);
  });

  it('renders the slider', function() {
    const renderer = TestUtils.createRenderer();
    renderer.render(<ZoomSlider map={map}/>);
    const actual = renderer.getRenderOutput().props.className;
    const expected = 'sdk-component zoom-slider';
    assert.equal(actual, expected);
  });

});
