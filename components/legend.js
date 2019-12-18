'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.getLegend = getLegend;
exports.getPointGeometry = getPointGeometry;
exports.getLineGeometry = getLineGeometry;
exports.getPolygonGeometry = getPolygonGeometry;
exports.getRasterLegend = getRasterLegend;

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _render = require('ol/render');

var _render2 = _interopRequireDefault(_render);

var _linestring = require('ol/geom/linestring');

var _linestring2 = _interopRequireDefault(_linestring);

var _polygon = require('ol/geom/polygon');

var _polygon2 = _interopRequireDefault(_polygon);

var _point = require('ol/geom/point');

var _point2 = _interopRequireDefault(_point);

var _feature = require('ol/feature');

var _feature2 = _interopRequireDefault(_feature);

var _vector = require('ol/layer/vector');

var _vector2 = _interopRequireDefault(_vector);

var _olMapboxStyle = require('ol-mapbox-style');

var _util = require('../util');

var _map = require('./map');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2015-present Boundless Spatial Inc., http://boundlessgeo.com
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed under the Apache License, Version 2.0 (the "License").
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * You may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * See the License for the specific language governing permissions and limitations
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/** @module components/legend
 * @desc React Component to render the legend data.
 * Create legend objects using the metadata prefixes
 *  "bnd:legend-type" and "bnd:legend-contents".
 *  Neither the Mapbox GL Spec nor the specific underlying
 *  services for vector layers have a standardized way of
 *  providing legends.  This is using the metadata provided
 *  by the layer to do so.
 *  "bnd:legend-type" can be one of "image", "html", "href"
 *  where "bnd:legend-content" would then provide the appropriate
 *  additional information.
 *  "bnd:legend-type" : "image", "bnd:legend-content" would provide
 *   the src attribute for an <img>
 *  "bnd:legend-type" : "html", "bnd:legend-content" would provide
 *   the html content for a <div>
 *  "bnd:legend-type" : "href", "bnd:legend-content" would provide
 *   the URL for html content.
 */

/** Return a div that is asynchronously populated
 *  with the content from the parameter href.
 *
 *  @param {string} href The location of the content for the div.
 *
 *  @returns {Object} A <div> element.
 */
function getRemoteLegend(href) {
  var _ref = null;
  var div = _react2.default.createElement('div', { ref: function ref(me) {
      _ref = me;
    } });

  // kick off the href fun!
  (0, _isomorphicFetch2.default)(href).then(function (response) {
    return response.text();
  }).then(function (html) {
    // This is equivalent to dangerouslySetInnerHTML
    if (_ref !== null) {
      _ref.innerHTML = html;
    }
  });

  return div;
}

/** 
 *   @param {Object} layer Mapbox GL layer.
 *
 *   @returns {(Object|null)} A <div> or <img> element, or null.
 */
function getLegend(layer) {
  if (layer.metadata === undefined) {
    return null;
  }
  var content = layer.metadata['bnd:legend-content'];

  switch (layer.metadata['bnd:legend-type']) {
    case 'image':
      return _react2.default.createElement('img', { alt: layer.id, src: content });
    case 'html':
      // eslint-disable-next-line
      return _react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: content } });
    case 'href':
      return getRemoteLegend(content);
    default:
      // no legend provided.
      return null;
  }
}

var pointGeomCache = {};
function getPointGeometry(size) {
  if (!pointGeomCache[size]) {
    pointGeomCache[size] = new _point2.default([size[0] / 2, size[1] / 2]);
  }
  return pointGeomCache[size];
}

var lineGeomCache = {};
function getLineGeometry(size) {
  if (!lineGeomCache[size]) {
    var center = [size[0] / 2, size[1] / 2];
    lineGeomCache[size] = new _linestring2.default([[-8 + center[0], -3 + center[1]], [-3 + center[0], 3 + center[1]], [3 + center[0], -3 + center[1]], [8 + center[0], 3 + center[1]]]);
  }
  return lineGeomCache[size];
}

var polygonGeomCache = {};
function getPolygonGeometry(size) {
  if (!polygonGeomCache[size]) {
    var center = [size[0] / 2, size[1] / 2];
    polygonGeomCache[size] = new _polygon2.default([[[-8 + center[0], -4 + center[1]], [-6 + center[0], -6 + center[1]], [6 + center[0], -6 + center[1]], [8 + center[0], -4 + center[1]], [8 + center[0], 4 + center[1]], [6 + center[0], 6 + center[1]], [-6 + center[0], 6 + center[1]], [-8 + center[0], 4 + center[1]]]]);
  }
  return polygonGeomCache[size];
}

/** Get the legend for a raster-type layer.
 *  Attempts to detect a WMS-type source and use GetLegendGraphic,
 *  otherwise, uses SDK specified legend metadata.
 *
 *  @param {Object} layer Mapbox GL layer object.
 *  @param {Object} layer_src Mapbox GL source object.
 *
 *  @returns {(Object[]|Object)} An array of <img> elements or a <div> element.
 */
function getRasterLegend(layer, layer_src) {
  if (layer_src.tiles && layer_src.tiles.length > 0) {
    var tile_url = layer_src.tiles[0];
    // check to see if the url is a wms request.
    if (tile_url.toUpperCase().indexOf('SERVICE=WMS') >= 0) {
      var tile_url_parts = tile_url.split('?');
      // parse the url
      var wms_params = (0, _util.parseQueryString)(tile_url_parts[1]);

      // normalize the keys: WMS requests are sometimes allcaps,
      //  sometimes lower cased, and sometimes (evilly so) mixed case.
      var wms_keys = Object.keys(wms_params);
      for (var i = 0, ii = wms_keys.length; i < ii; i++) {
        var key = wms_keys[i];
        var uc_key = key.toUpperCase();
        wms_params[uc_key] = wms_params[key];
      }

      // get the WMS servers URL.
      var url = tile_url_parts[0];

      // REQUEST, FORMAT, and LAYER are the three required GetLegendGraphic
      // parameters.  LAYER is populated after the optional keys are added.
      var legend_params = {
        SERVICE: 'WMS',
        REQUEST: 'GetLegendGraphic',
        FORMAT: wms_params.FORMAT
      };

      // These are optional parameters and will not be found in
      // every WMS request. This checks for the parameter before
      // adding it in.
      // WIDTH and HEIGHT are omitted as they provide a
      // hint for the LEGEND size not the underlaying map size.
      var optional_keys = ['STYLE', 'FEATURETYPE', 'RULE', 'SCALE', 'SLD', 'SLD_BODY', 'EXCEPTIONS', 'LANGUAGE'];

      for (var _i = 0, _ii = optional_keys.length; _i < _ii; _i++) {
        var value = wms_params[optional_keys[_i]];
        if (value !== undefined) {
          legend_params[optional_keys[_i]] = value;
        }
      }

      // Build the stack of URLs for each layer. Unlike GetMap,
      // each layer needs a separate call.
      var images = [];
      var layers = wms_params.LAYERS.split(',');
      for (var _i2 = 0, _ii2 = layers.length; _i2 < _ii2; _i2++) {
        var params = Object.assign({}, legend_params, {
          LAYER: layers[_i2]
        });
        var src = url + '?' + (0, _util.encodeQueryObject)(params);
        images.push(_react2.default.createElement('img', { alt: layers[_i2], key: layers[_i2], className: 'sdk-legend-image', src: src }));
      }

      return images;
    }
  }

  return getLegend(layer);
}

var Legend = function (_React$Component) {
  _inherits(Legend, _React$Component);

  function Legend(props) {
    _classCallCheck(this, Legend);

    var _this = _possibleConstructorReturn(this, (Legend.__proto__ || Object.getPrototypeOf(Legend)).call(this, props));

    _this.state = {
      empty: false
    };
    return _this;
  }

  _createClass(Legend, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var nextLayer = (0, _util.getLayerById)(nextProps.layers, this.props.layerId);
      var layer = (0, _util.getLayerById)(this.props.layers, this.props.layerId);
      return layer !== nextLayer;
    }
  }, {
    key: 'getVectorLegend',
    value: function getVectorLegend(layer, layer_src) {
      var _this2 = this;

      var props = this.props;
      if (!layer.metadata || !layer.metadata['bnd:legend-type']) {
        var size = props.size;
        return _react2.default.createElement('canvas', { ref: function ref(c) {
            if (c !== null) {
              var vectorContext = _render2.default.toContext(c.getContext('2d'), { size: size });
              var newLayer = void 0;
              if (layer.filter) {
                newLayer = (0, _util.jsonClone)(layer);
                delete newLayer.filter;
              } else {
                newLayer = layer;
              }
              var fake_style = (0, _map.getFakeStyle)(props.sprite, [newLayer], props.mapbox.baseUrl, props.mapbox.accessToken);
              var olLayer = new _vector2.default();
              var me = _this2;
              (0, _olMapboxStyle.applyStyle)(olLayer, fake_style, layer.source).then(function () {
                var styleFn = olLayer.getStyle();
                var geom = void 0;
                if (layer.type === 'symbol' || layer.type === 'circle') {
                  geom = getPointGeometry(size);
                } else if (layer.type === 'line') {
                  geom = getLineGeometry(size);
                } else if (layer.type === 'fill') {
                  geom = getPolygonGeometry(size);
                }
                if (geom) {
                  var properties = {};
                  if (layer['source-layer']) {
                    properties.layer = layer['source-layer'];
                  }
                  var feature = new _feature2.default(properties);
                  feature.setGeometry(geom);
                  var styles = styleFn(feature);
                  if (styles) {
                    for (var i = 0, ii = styles.length; i < ii; ++i) {
                      vectorContext.setStyle(styles[i]);
                      vectorContext.drawGeometry(geom);
                    }
                  } else {
                    me.setState({ empty: true });
                  }
                }
              });
            }
          } });
      } else {
        return getLegend(layer, layer_src);
      }
    }

    /** Handles how to get the legend data based on the layer source type.
     *  @returns {Object} Call to getRasterLegend() or getLegend() to return the html element.
     */

  }, {
    key: 'getLegendContents',
    value: function getLegendContents() {
      // get the layer definition
      var layer = (0, _util.getLayerById)(this.props.layers, this.props.layerId);
      if (layer === null) {
        return null;
      }

      var source_name = layer.source;
      if (layer.ref && !layer.source) {
        var ref_layer = (0, _util.getLayerById)(this.props.layers, layer.ref);
        source_name = ref_layer.source;
      }
      var layer_src = this.props.sources[source_name];

      switch (layer_src.type) {
        case 'raster':
          return getRasterLegend(layer, layer_src);
        // while this may seem pretty verbose,
        //  it was intentionally left here to make it
        //  easy to implement other legend handlers as
        //  is deemed appropriate.
        case 'vector':
        case 'geojson':
          var legendLayer = void 0;
          if (layer.ref) {
            legendLayer = (0, _map.hydrateLayer)(this.props.layers, layer);
          } else {
            legendLayer = layer;
          }
          return this.getVectorLegend(legendLayer, layer_src);
        case 'image':
        case 'video':
        case 'canvas':
        default:
          return getLegend(layer, layer_src);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var legend_contents = void 0;
      if (this.state.empty) {
        legend_contents = this.props.emptyLegendMessage;
      } else {
        legend_contents = this.getLegendContents();
        if (legend_contents === null) {
          legend_contents = this.props.emptyLegendMessage;
        }
      }
      var className = 'sdk-legend';
      if (this.props.className) {
        className = className + ' ' + this.props.className;
      }

      return _react2.default.createElement(
        'div',
        { style: this.props.style, className: className },
        legend_contents
      );
    }
  }]);

  return Legend;
}(_react2.default.Component);

Legend.propTypes = {
  layerId: _propTypes2.default.string.isRequired,
  layers: _propTypes2.default.arrayOf(_propTypes2.default.object),
  sources: _propTypes2.default.shape({
    source: _propTypes2.default.string
  }),
  mapbox: _propTypes2.default.shape({
    baseUrl: _propTypes2.default.string,
    accessToken: _propTypes2.default.string
  }),
  sprite: _propTypes2.default.string,
  emptyLegendMessage: _propTypes2.default.string,
  size: _propTypes2.default.arrayOf(_propTypes2.default.number),
  style: _propTypes2.default.object,
  className: _propTypes2.default.string
};

Legend.defaultProps = {
  size: [50, 50],
  mapbox: {
    baseUrl: '',
    accessToken: ''
  },
  layers: [],
  sources: {},
  emptyLegendMessage: undefined
};

function mapStateToProps(state) {
  return {
    sprite: state.map.sprite,
    layers: state.map.layers,
    sources: state.map.sources,
    mapbox: state.mapbox
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, undefined, undefined, { withRef: true })(Legend);