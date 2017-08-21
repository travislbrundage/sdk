/* global afterEach, beforeEach, describe, it */
import React from 'react';
import ReactDOM from 'react-dom';
import {assert} from 'chai';
import raf from 'raf';
import  ol from 'openlayers';
import intl from '../mock-i18n';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Bookmarks from '../../src/components/Bookmarks';

raf.polyfill();

describe('Bookmarks Dots', function() {
  var target, map;
  var width = 360;
  var height = 180;
  var bookmarks = [{
    name: 'Le Grenier Pain',
    description: '<b>Address: </b>38 rue des Abbesses<br><b>Telephone:</b> 33 (0)1 46 06 41 81<br><a href=""http://www.legrenierapain.com"">Website</a>',
    extent: [259562.7661267497, 6254560.095662868, 260675.9610346824, 6256252.988234103]
  }, {
    name: 'Poilne',
    description: '<b>Address: </b>8 rue du Cherche-Midi<br><b>Telephone:</b> 33 (0)1 45 48 42 59<br><a href=""http://www.poilane.fr"">Website</a>',
    extent: [258703.71361629796, 6248811.5276565505, 259816.90852423065, 6250503.271278702]
  }];

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


  it(' are displayed on page', function() {
    var container = document.createElement('div');
    ReactDOM.render((
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <Bookmarks intl={intl} useCSS={false} map={map} bookmarks={bookmarks} />
        </MuiThemeProvider>
      ), container);

    var dots = container.querySelectorAll('.bookmark-dots');
    assert.equal(dots.length, 1);
    ReactDOM.unmountComponentAtNode(container);
  });
  it(' are not displayed on page', function() {
    var container = document.createElement('div');
    ReactDOM.render((
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <Bookmarks intl={intl} useCSS={false} map={map} bookmarks={bookmarks} dots={false}/>
        </MuiThemeProvider>
      ), container);

    var dots = container.querySelectorAll('.bookmark-dots');
    assert.equal(dots.length, 0);
    ReactDOM.unmountComponentAtNode(container);
  });
});
