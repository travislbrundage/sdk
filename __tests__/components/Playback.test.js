/* global afterEach, beforeEach, describe, it */

import React from 'react';
import ReactDOM from 'react-dom';
import {assert} from 'chai';
import raf from 'raf';
import ol from 'openlayers';
import intl from '../mock-i18n';
import Playback from '../../src/components/Playback';
import TestUtils from 'react-addons-test-utils';

raf.polyfill();

describe('Playback', function() {
  var target, map, layers;
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
    layers = [
      new ol.layer.Vector({
        source: new ol.source.Vector({
          url: './data/fires.json',
          format: new ol.format.GeoJSON()
        }),
        timeInfo: {
          start: 'STARTDATED',
          end: 'OUTDATED'
        },
        style: null
      }),
      new ol.layer.Tile({
        source: new ol.source.TileWMS({
          url: 'http://foo'})
      }),
      new ol.layer.Tile({
        source: new ol.source.TileWMS({
          url: 'http://bar'})
      })
    ];
    map.once('postrender', function() {
      done();
    });
  });

  afterEach(function() {
    map.setTarget(null);
    document.body.removeChild(target);
  });


  it('has the correct date value', function() {
    var container = document.createElement('div');
    ReactDOM.render((
      <Playback minDate={500000000000} maxDate={1500000000000} intl={intl} map={map}/>
    ), container);
    assert.equal(container.querySelector('input[type=text]').value.substr(0,7), '1985-11');
    ReactDOM.unmountComponentAtNode(container);
  });

  it('renders the playback component', function() {
    const renderer = TestUtils.createRenderer();
    renderer.render(<Playback map={map} intl={intl}/>);
    const actual = renderer.getRenderOutput().props.className;
    const expected = 'sdk-component sdk-playback';
    assert.equal(actual, expected);
  });

  it('assigns default props', function() {
    var container = document.createElement('div');
    var playback = ReactDOM.render((
      <Playback intl={intl} map={map}/>
    ), container);
    var actual = playback.props.interval;
    var expected = 500;
    assert.equal(actual, expected);
    actual = playback.props.numIntervals;
    expected = 100;
    assert.equal(actual, expected);
    actual = playback.props.autoPlay;
    expected = false;
    assert.equal(actual, expected);
    ReactDOM.unmountComponentAtNode(container);
  });

  it('sets initial state [0]', function() {
    var container = document.createElement('div');
    var playback = ReactDOM.render((
      <Playback intl={intl} map={map}/>
    ), container);
    var actual = playback.state.play;
    var expected = true;
    assert.equal(actual, expected);
    actual = playback.state.minDate;
    expected = undefined;
    assert.equal(actual, expected);
    actual = playback.state.date;
    expected = undefined;
    assert.equal(actual, expected);
    actual = playback.state.maxDate;
    expected = undefined;
    assert.equal(actual, expected);
    actual = playback.state.interval;
    expected = undefined;
    assert.equal(actual, expected);
    ReactDOM.unmountComponentAtNode(container);
  });

  it('sets initial state [1]', function() {
    var container = document.createElement('div');
    var playback = ReactDOM.render((
      <Playback intl={intl} map={map} minDate={50000} maxDate={150000} numIntervals={1000}/>
    ), container);
    var actual = playback.state.play;
    var expected = true;
    assert.equal(actual, expected);
    actual = playback.state.minDate;
    expected = 50000;
    assert.equal(actual, expected);
    actual = playback.state.date;
    expected = 50000;
    assert.equal(actual, expected);
    actual = playback.state.maxDate;
    expected = 150000;
    assert.equal(actual, expected);
    actual = playback.state.interval;
    expected = 100;
    assert.equal(actual, expected);
    ReactDOM.unmountComponentAtNode(container);
  });

  it('sets initial layers', function() {
    var container = document.createElement('div');
    var playback = ReactDOM.render((
      <Playback intl={intl} map={map}/>
    ), container);
    var actual = playback._layers;
    var expected = [];
    assert.deepEqual(actual, expected);
    ReactDOM.unmountComponentAtNode(container);
  });

  it('adds loading and loaded', function() {
    var container = document.createElement('div');
    var playback = ReactDOM.render((
      <Playback intl={intl} map={map}/>
    ), container);
    var actual = playback._loading;
    var expected = 0;
    assert.equal(actual, expected);
    actual = playback._loaded;
    expected = 0;
    assert.equal(actual, expected);
    playback._addLoading();
    actual = playback._loading;
    expected = 1;
    playback._addLoaded();
    assert.equal(actual, expected);
    actual = playback._loaded;
    expected = 1;
    assert.equal(actual, expected);
    ReactDOM.unmountComponentAtNode(container);
  });

  it('changes button icon type based on play/pause state', function(done) {
    var container = document.createElement('div');
    var playback = ReactDOM.render((
      <Playback intl={intl} map={map} minDate={50000} minDate={324511200000} maxDate={1385938800000}/>
    ), container);
    var button = container.querySelector('button');
    var actual = button.children[0].className;
    var expected = 'fa fa-play';
    assert.equal(actual, expected);
    playback.setState({play: false});
    button = container.querySelector('button');
    actual = button.children[0].className;
    expected = 'fa fa-pause';
    window.setTimeout(function() {
      ReactDOM.unmountComponentAtNode(container);
      done();
    }, 500);
  });

  it('adds correct layers', function(done) {
    var container = document.createElement('div');
    var playback = ReactDOM.render((
      <Playback intl={intl} map={map} minDate={50000} maxDate={1385938800000}/>
    ), container);
    var actual = playback._layers.length;
    var expected = 0;
    assert.equal(actual, expected);
    layers.forEach(function(layer) {
      map.addLayer(layer);
    });
    actual = playback._layers.length;
    expected = 1;
    assert.equal(actual, expected);
    window.setTimeout(function() {
      ReactDOM.unmountComponentAtNode(container);
      done();
    }, 500);
  });

  it('changes date value', function(done) {
    var container = document.createElement('div');
    var playback = ReactDOM.render((
      <Playback intl={intl} map={map} />
    ), container);
    var date = new Date(920354400000);
    playback._onDateChange(null, date);
    var actual = playback.state.date;
    var expected = date.getTime();
    assert.equal(actual, expected);
    window.setTimeout(function() {
      ReactDOM.unmountComponentAtNode(container);
      done();
    }, 500);
  });

  it('changes dates and dateStep values', function(done) {
    var container = document.createElement('div');
    var playback = ReactDOM.render((
      <Playback intl={intl} map={map} />
    ), container);
    var actual = playback.state.date;
    var expected = undefined;
    assert.equal(actual, expected);
    actual = playback.state.dates;
    expected = undefined;
    assert.equal(actual, expected);
    actual = playback.state.dateStep;
    expected = undefined;
    assert.equal(actual, expected);
    playback.setState({dates: [100, 200]});
    playback._onRangeChangeValues(null, 0);
    actual = playback.state.dateStep;
    expected = 0;
    assert.equal(actual, expected);
    actual = playback.state.date;
    expected = 100;
    assert.equal(actual, expected);
    window.setTimeout(function() {
      ReactDOM.unmountComponentAtNode(container);
      done();
    }, 500);
  });

  it('changes date range value', function(done) {
    var container = document.createElement('div');
    var playback = ReactDOM.render((
      <Playback intl={intl} map={map} minDate={500000} maxDate={1500000}/>
    ), container);
    var actual = playback.state.date;
    var expected = 500000;
    assert.equal(actual, expected);
    playback._onRangeChange(null, 1000000);
    actual = playback.state.date;
    expected = 1000000;
    assert.equal(actual, expected);
    window.setTimeout(function() {
      ReactDOM.unmountComponentAtNode(container);
      done();
    }, 500);
  });

  it('updates layer source params', function(done) {
    var container = document.createElement('div');
    var playback = ReactDOM.render((
      <Playback intl={intl} map={map} minDate={500000} maxDate={1500000}/>
    ), container);
    var actual = layers[1].getSource().getParams().TIME;
    var expected = undefined;
    assert.equal(actual, expected);
    playback._handleTimeLayer(layers[1]);
    actual = layers[1].getSource().getParams().TIME;
    expected = new Date(playback.state.date).toISOString();
    assert.equal(actual, expected);
    window.setTimeout(function() {
      ReactDOM.unmountComponentAtNode(container);
      done();
    }, 500);
  });

  it('refreshes time layers', function(done) {
    var container = document.createElement('div');
    var playback = ReactDOM.render((
      <Playback intl={intl} map={map} minDate={500000} maxDate={1500000}/>
    ), container);
    var actual = playback._layers.length;
    var expected = 0;
    assert.equal(actual, expected);
    layers.forEach(function(layer) {
      playback._layers.push(layer);
    });
    actual = playback._layers.length;
    expected = 3;
    assert.equal(actual, expected);
    playback._refreshTimeLayers();
    actual = playback._layers[1].getSource().getParams().TIME;
    expected = playback._layers[2].getSource().getParams().TIME;
    assert.equal(actual, expected);
    window.setTimeout(function() {
      ReactDOM.unmountComponentAtNode(container);
      done();
    }, 500);
  });

  it('sets vector layer style', function(done) {
    var container = document.createElement('div');
    var playback = ReactDOM.render((
      <Playback intl={intl} map={map} minDate={500000} maxDate={1500000}/>
    ), container);
    var actual = layers[0].getStyle();
    var expected = null;
    assert.equal(actual, expected);
    playback._registerTime(layers[0]);
    var newActual = layers[0].getStyle();
    assert.notEqual(actual, newActual);
    window.setTimeout(function() {
      ReactDOM.unmountComponentAtNode(container);
      done();
    }, 500);
  });

  it('toggles play/pause', function(done) {
    var container = document.createElement('div');
    var playback = ReactDOM.render((
      <Playback intl={intl} map={map} minDate={50000} maxDate={150000}/>
    ), container);
    var actual = playback.state.play;
    var expected = true;
    assert.equal(actual, expected);
    playback._playPause();
    actual = playback.state.play;
    expected = false;
    assert.equal(actual, expected);
    playback._playPause();
    actual = playback.state.play;
    expected = true;
    assert.equal(actual, expected);
    window.setTimeout(function() {
      ReactDOM.unmountComponentAtNode(container);
      done();
    }, 500);
  });

  it('updates date and dateStep on play', function(done) {
    var container = document.createElement('div');
    var playback = ReactDOM.render((
      <Playback intl={intl} map={map} minDate={50000} maxDate={150000}/>
    ), container);
    playback.setState({dates: [100, 200], dateStep: 0});
    playback._addLoaded();
    playback._play();
    var actual = playback.state.date;
    var expected = playback.props.minDate;
    assert.equal(actual, expected);
    actual = playback.state.dateStep;
    expected = 0;
    assert.equal(actual, expected);
    playback._addLoading();
    playback._play();
    actual = playback.state.date;
    expected = playback.state.dates[1];
    assert.equal(actual, expected);
    actual = playback.state.dateStep;
    expected = 1;
    assert.equal(actual, expected);
    window.setTimeout(function() {
      ReactDOM.unmountComponentAtNode(container);
      done();
    }, 500);
  });


});
