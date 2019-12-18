'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Map = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /*
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

exports.hydrateLayer = hydrateLayer;
exports.getFakeStyle = getFakeStyle;

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _feature_filter = require('@mapbox/mapbox-gl-style-spec/feature_filter');

var _feature_filter2 = _interopRequireDefault(_feature_filter);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require('react-redux');

var _olMapboxStyle = require('ol-mapbox-style');

var _map = require('ol/map');

var _map2 = _interopRequireDefault(_map);

var _view = require('ol/view');

var _view2 = _interopRequireDefault(_view);

var _overlay = require('ol/overlay');

var _overlay2 = _interopRequireDefault(_overlay);

var _observable = require('ol/observable');

var _observable2 = _interopRequireDefault(_observable);

var _proj = require('ol/proj');

var _proj2 = _interopRequireDefault(_proj);

var _coordinate = require('ol/coordinate');

var _coordinate2 = _interopRequireDefault(_coordinate);

var _sphere = require('ol/sphere');

var _sphere2 = _interopRequireDefault(_sphere);

var _tile = require('ol/layer/tile');

var _tile2 = _interopRequireDefault(_tile);

var _xyz = require('ol/source/xyz');

var _xyz2 = _interopRequireDefault(_xyz);

var _tilewms = require('ol/source/tilewms');

var _tilewms2 = _interopRequireDefault(_tilewms);

var _tilejson = require('ol/source/tilejson');

var _tilejson2 = _interopRequireDefault(_tilejson);

var _tilegrid = require('ol/tilegrid');

var _tilegrid2 = _interopRequireDefault(_tilegrid);

var _vectortile = require('ol/layer/vectortile');

var _vectortile2 = _interopRequireDefault(_vectortile);

var _vectortile3 = require('ol/source/vectortile');

var _vectortile4 = _interopRequireDefault(_vectortile3);

var _mvt = require('ol/format/mvt');

var _mvt2 = _interopRequireDefault(_mvt);

var _image = require('ol/layer/image');

var _image2 = _interopRequireDefault(_image);

var _imagestatic = require('ol/source/imagestatic');

var _imagestatic2 = _interopRequireDefault(_imagestatic);

var _vector = require('ol/layer/vector');

var _vector2 = _interopRequireDefault(_vector);

var _vector3 = require('ol/source/vector');

var _vector4 = _interopRequireDefault(_vector3);

var _geojson = require('ol/format/geojson');

var _geojson2 = _interopRequireDefault(_geojson);

var _draw = require('ol/interaction/draw');

var _draw2 = _interopRequireDefault(_draw);

var _modify = require('ol/interaction/modify');

var _modify2 = _interopRequireDefault(_modify);

var _select2 = require('ol/interaction/select');

var _select3 = _interopRequireDefault(_select2);

var _style = require('ol/style/style');

var _style2 = _interopRequireDefault(_style);

var _sprite = require('../style/sprite');

var _sprite2 = _interopRequireDefault(_sprite);

var _attribution = require('ol/control/attribution');

var _attribution2 = _interopRequireDefault(_attribution);

var _loadingstrategy = require('ol/loadingstrategy');

var _loadingstrategy2 = _interopRequireDefault(_loadingstrategy);

var _graticule = require('ol/graticule');

var _graticule2 = _interopRequireDefault(_graticule);

var _stroke = require('ol/style/stroke');

var _stroke2 = _interopRequireDefault(_stroke);

var _text = require('ol/style/text');

var _text2 = _interopRequireDefault(_text);

var _fill = require('ol/style/fill');

var _fill2 = _interopRequireDefault(_fill);

var _map3 = require('../actions/map');

var _constants = require('../constants');

var _map4 = require('../reducers/map');

var _drawing = require('../actions/drawing');

var _cluster = require('../source/cluster');

var _cluster2 = _interopRequireDefault(_cluster);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** @module components/map
 *
 * @desc Provide an OpenLayers map which reflects the
 *       state of the Redux store.
 */

var GEOJSON_FORMAT = new _geojson2.default();
var WGS84_SPHERE = new _sphere2.default(6378137);
var MAPBOX_PROTOCOL = 'mapbox://';
var BBOX_STRING = '{bbox-epsg-3857}';

/** This variant of getVersion() differs as it allows
 *  for undefined values to be returned.
 * @param {Object} obj The state.map object
 * @param {Object} obj.metadata The state.map.metadata object
 * @param {string} key One of 'bnd:layer-version', 'bnd:source-version', or 'bnd:data-version'.
 *
 * @returns {(number|undefined)} The version number of the given metadata key.
 */
function getVersion(obj, key) {
  if (obj.metadata === undefined) {
    return undefined;
  }
  return obj.metadata[key];
}

/** Configures an OpenLayers TileWMS or XyzSource object from the provided
 * Mapbox GL style object.
 * @param {Object} glSource The Mapbox GL map source containing a 'tiles' property.
 * @param {Object} mapProjection The OpenLayers projection object.
 *
 * @returns {Object} Configured OpenLayers TileWMSSource or XyzSource.
 */
function configureTileSource(glSource, mapProjection, time) {
  var tile_url = glSource.tiles[0];
  var commonProps = {
    attributions: glSource.attribution,
    minZoom: glSource.minzoom,
    maxZoom: 'maxzoom' in glSource ? glSource.maxzoom : 22,
    tileSize: glSource.tileSize || 512,
    crossOrigin: 'crossOrigin' in glSource ? glSource.crossOrigin : 'anonymous',
    projection: mapProjection
  };
  // check to see if the url is a wms request.
  if (tile_url.toUpperCase().indexOf('SERVICE=WMS') >= 0) {
    var urlParts = glSource.tiles[0].split('?');
    var params = (0, _util.parseQueryString)(urlParts[1]);
    var keys = Object.keys(params);
    for (var i = 0, ii = keys.length; i < ii; ++i) {
      if (keys[i].toUpperCase() === 'REQUEST') {
        delete params[keys[i]];
      }
    }
    if (time) {
      params.TIME = time;
    }
    return new _tilewms2.default(Object.assign({
      url: urlParts[0],
      params: params
    }, commonProps));
  }
  var source = new _xyz2.default(Object.assign({
    urls: glSource.tiles
  }, commonProps));
  source.setTileLoadFunction(function (tile, src) {
    // copy the src string.
    var img_src = src.slice();
    if (src.indexOf(BBOX_STRING) !== -1) {
      var bbox = source.getTileGrid().getTileCoordExtent(tile.getTileCoord());
      img_src = src.replace(BBOX_STRING, bbox.toString());
    }
    // disabled the linter below as this is how
    //  OpenLayers documents this operation.
    // eslint-disable-next-line
    tile.getImage().src = img_src;
  });
  return source;
}

/** Configures an OpenLayers TileJSONSource object from the provided
 * Mapbox GL style object.
 * @param {Object} glSource The Mapbox GL map source containing a 'url' property.
 *
 * @returns {Object} Configured OpenLayers TileJSONSource.
 */
function configureTileJSONSource(glSource) {
  return new _tilejson2.default({
    url: glSource.url,
    crossOrigin: 'anonymous'
  });
}

/** Configures an OpenLayers ImageStaticSource object from the provided
 * Mapbox GL style object.
 * @param {Object} glSource The Mapbox GL map source of type 'image'.
 *
 * @returns {Object} Configured OpenLayers ImageStaticSource.
 */
function configureImageSource(glSource) {
  var coords = glSource.coordinates;
  var source = new _imagestatic2.default({
    url: glSource.url,
    imageExtent: [coords[0][0], coords[3][1], coords[1][0], coords[0][1]],
    projection: 'EPSG:4326'
  });
  return source;
}

/** Configures an OpenLayers VectorTileSource object from the provided
 * Mapbox GL style object.
 * @param {Object} glSource The Mapbox GL map source of type 'vector'.
 * @param {string} accessToken The user's Mapbox tiles access token .
 *
 * @returns {Object} Configured OpenLayers VectorTileSource.
 */
function configureMvtSource(glSource, accessToken) {
  var url = glSource.url;
  var urls = void 0;
  if (url.indexOf(MAPBOX_PROTOCOL) === 0) {
    var mapid = url.replace(MAPBOX_PROTOCOL, '');
    var suffix = 'vector.pbf';
    var hosts = ['a', 'b', 'c', 'd'];
    urls = [];
    for (var i = 0, ii = hosts.length; i < ii; ++i) {
      var host = hosts[i];
      urls.push('https://' + host + '.tiles.mapbox.com/v4/' + mapid + '/{z}/{x}/{y}.' + suffix + '?access_token=' + accessToken);
    }
  } else {
    urls = [url];
  }
  var source = new _vectortile4.default({
    urls: urls,
    tileGrid: _tilegrid2.default.createXYZ({ maxZoom: 22 }),
    tilePixelRatio: 16,
    format: new _mvt2.default(),
    crossOrigin: 'crossOrigin' in glSource ? glSource.crossOrigin : 'anonymous'
  });

  return source;
}

function getLoaderFunction(glSource, mapProjection, baseUrl) {
  return function (bbox, resolution, projection) {
    var _this = this;

    // setup a feature promise to handle async loading
    // of features.
    var features_promise = void 0;

    // if the data is a string, assume it's a url
    if (typeof glSource.data === 'string') {
      var url = glSource.data;
      // if the baseUrl is present and the url does not
      // start with http:// or "https://" then assume the path is
      // relative to the style doc.
      if (!(url.indexOf('https://') === 0 || url.indexOf('http://') === 0)) {
        if (baseUrl && url.indexOf('.') === 0) {
          url = url.substring(1);
        }
        url = baseUrl + url;
      }
      // check to see if the bbox strategy should be employed
      //  for this source.
      if (url.indexOf(BBOX_STRING) >= 0) {
        url = url.replace(BBOX_STRING, bbox.toString());
      }
      features_promise = (0, _isomorphicFetch2.default)(url).then(function (response) {
        return response.json();
      });
    } else if (_typeof(glSource.data) === 'object' && (glSource.data.type === 'Feature' || glSource.data.type === 'FeatureCollection')) {
      features_promise = new Promise(function (resolve) {
        resolve(glSource.data);
      });
    }

    // if data is undefined then no promise would
    // have been created.
    if (features_promise) {
      // when the feature promise resolves,
      // add those features to the source.
      features_promise.then(function (features) {
        // features could be null, in which case there
        //  are no features to add.
        if (features) {
          // setup the projection options.
          var readFeatureOpt = { featureProjection: mapProjection };

          // bulk load the feature data
          _this.addFeatures(GEOJSON_FORMAT.readFeatures(features, readFeatureOpt));
        }
      }).catch(function (error) {
        console.error(error);
      });
    }
  };
}

function updateGeojsonSource(olSource, glSource, mapView, baseUrl) {
  var src = olSource;
  if (glSource.cluster) {
    src = olSource.getSource();
  }

  // update the loader function based on the glSource definition
  src.loader_ = getLoaderFunction(glSource, mapView.getProjection(), baseUrl);

  // clear the layer WITHOUT dispatching remove events.
  src.clear(true);

  // force a refresh
  src.loadFeatures(mapView.calculateExtent(), mapView.getResolution(), mapView.getProjection());
}

/** Create a vector source based on a
 *  Mapbox GL styles definition.
 *
 *  @param {Object} glSource A Mapbox GL styles defintiion of the source.
 *
 *  @returns {Object} ol.source.vector instance.
 */
function configureGeojsonSource(glSource, mapView, baseUrl, wrapX) {
  var use_bbox = typeof glSource.data === 'string' && glSource.data.indexOf(BBOX_STRING) >= 0;
  var vector_src = new _vector4.default({
    strategy: use_bbox ? _loadingstrategy2.default.bbox : _loadingstrategy2.default.all,
    loader: getLoaderFunction(glSource, mapView.getProjection(), baseUrl),
    useSpatialIndex: true,
    wrapX: wrapX
  });

  // GeoJson sources can be clustered but OpenLayers
  // uses a special source type for that. This handles the
  // "switch" of source-class.
  var new_src = vector_src;
  if (glSource.cluster) {
    new_src = new _cluster2.default({
      source: vector_src,
      // default the distance to 50 as that's what
      //  is specified by Mapbox.
      distance: glSource.clusterRadius ? glSource.clusterRadius : 50
    });
  }

  // seed the vector source with the first update
  //  before returning it.
  updateGeojsonSource(new_src, glSource, mapView, baseUrl);
  return new_src;
}

/** Configures a Mapbox GL source object into appropriate
 *  an appropriatly typed OpenLayers source object.
 * @param {Object} olSource The OpenLayers source object.
 * @param {Object} mapView The OpenLayers view object.
 * @param {string} accessToken A Mapbox access token.
 * @param {string} baseUrl A baseUrl provided by this.props.mapbox.baseUrl.
 *
 * @returns {(Object|null)} Callback to the applicable configure source method.
 */
function configureSource(glSource, mapView, accessToken, baseUrl, time, wrapX) {
  // tiled raster layer.
  if (glSource.type === 'raster') {
    if ('tiles' in glSource) {
      return configureTileSource(glSource, mapView.getProjection(), time);
    } else if (glSource.url) {
      return configureTileJSONSource(glSource);
    }
  } else if (glSource.type === 'geojson') {
    return configureGeojsonSource(glSource, mapView, baseUrl, wrapX);
  } else if (glSource.type === 'image') {
    return configureImageSource(glSource);
  } else if (glSource.type === 'vector') {
    return configureMvtSource(glSource, accessToken);
  }
  return null;
}

/** Create a unique key for a group of layers
 * @param {Object[]} layer_group An array of Mapbox GL layers.
 *
 * @returns {string} The layer_group source name, followed by a concatenated string of layer ids.
 */
function getLayerGroupName(layer_group) {
  var all_names = [];
  for (var i = 0, ii = layer_group.length; i < ii; i++) {
    all_names.push(layer_group[i].id);
  }
  return layer_group[0].source + '-' + all_names.join(',');
}

/** Get the source name from the layer group name.
 * @param {string} groupName The layer group name.
 *
 * @returns {string} The source name for the provided layer group name.
 */
function getSourceName(groupName) {
  var dash = groupName.indexOf('-');
  return groupName.substring(0, dash);
}

/** Get the list of layers from the layer group name.
 * @param {string} groupName The layer group name.
 *
 * @returns {string} A concatenated string of layer names inside the group.
 */
function getLayerNames(groupName) {
  var dash = groupName.indexOf('-');
  return groupName.substring(dash).split(',');
}

/** Populate a ref'd layer.
 * @param {Object[]} layersDef All layers defined in the Mapbox GL stylesheet.
 * @param {Object} glLayer Subset of layers to be rendered as a group.
 *
 * @returns {Object} A new glLayer object with ref'd layer properties mixed in.
 */
function hydrateLayer(layersDef, glLayer) {
  // Small sanity check for when this
  // is blindly called on any layer.
  if (glLayer === undefined || glLayer.ref === undefined) {
    return glLayer;
  }

  var ref_layer = (0, _util.getLayerById)(layersDef, glLayer.ref);

  // default the layer definition to return to
  // the layer itself, incase we can't find the ref layer.
  var layer_def = glLayer;

  // ensure the ref layer is SOMETHING.
  if (ref_layer) {
    // clone the gl layer
    layer_def = (0, _util.jsonClone)(glLayer);
    // remove the reference
    layer_def.ref = undefined;
    // mixin the layer_def to the ref layer.
    layer_def = Object.assign({}, ref_layer, layer_def);
  }
  // return the new layer.
  return layer_def;
}

/** Hydrate a layer group
 *  Normalizes all the ref layers in a group.
 *
 *  @param {Object[]} layersDef All layers defined in the Mapbox GL stylesheet.
 *  @param {Object[]} layerGroup Subset of layers to be rendered as a group.
 *
 *  @returns {Object[]} An array with the ref layers normalized.
 */
function hydrateLayerGroup(layersDef, layerGroup) {
  var hydrated_group = [];
  for (var i = 0, ii = layerGroup.length; i < ii; i++) {
    // hydrateLayer checks for "ref"
    hydrated_group.push(hydrateLayer(layersDef, layerGroup[i]));
  }
  return hydrated_group;
}

function getFakeStyle(sprite, layers, baseUrl, accessToken) {
  var fake_style = {
    version: 8,
    sprite: sprite,
    layers: layers
  };
  if (sprite && sprite.indexOf(MAPBOX_PROTOCOL) === 0) {
    fake_style.sprite = baseUrl + '/sprite?access_token=' + accessToken;
  }
  return fake_style;
}

var Map = exports.Map = function (_React$Component) {
  _inherits(Map, _React$Component);

  function Map(props) {
    _classCallCheck(this, Map);

    var _this2 = _possibleConstructorReturn(this, (Map.__proto__ || Object.getPrototypeOf(Map)).call(this, props));

    _this2.sourcesVersion = null;
    _this2.layersVersion = null;

    // keep a version of the sources in
    //  their OpenLayers source definition.
    _this2.sources = {};

    // hash of the openlayers layers in the map.
    _this2.layers = {};

    // popups and their elements are stored as an ID managed hash.
    _this2.popups = {};
    _this2.elems = {};

    // interactions are how the user can manipulate the map,
    //  this tracks any active interaction.
    _this2.activeInteractions = null;
    return _this2;
  }

  _createClass(Map, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // put the map into the DOM
      this.configureMap();
    }

    /** This will check nextProps and nextState to see
     *  what needs to be updated on the map.
     */

  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      var _this3 = this;

      var old_time = (0, _util.getKey)(this.props.map.metadata, _constants.TIME_KEY);

      var new_time = (0, _util.getKey)(nextProps.map.metadata, _constants.TIME_KEY);

      if (old_time !== new_time) {
        // find time dependent layers
        for (var i = 0, ii = nextProps.map.layers.length; i < ii; ++i) {
          var layer = nextProps.map.layers[i];
          if (layer.metadata[_constants.TIME_ATTRIBUTE_KEY] !== undefined) {
            this.props.updateLayer(layer.id, {
              filter: this.props.createLayerFilter(layer, nextProps.map.metadata[_constants.TIME_KEY])
            });
          }
          if (layer.metadata[_constants.TIME_KEY] !== undefined) {
            var source = layer.source;
            var olSource = this.sources[source];
            if (olSource && olSource instanceof _tilewms2.default) {
              olSource.updateParams({ TIME: nextProps.map.metadata[_constants.TIME_KEY] });
            }
          }
        }
      }
      var map_view = this.map.getView();
      var map_proj = map_view.getProjection();

      // compare the centers
      if (nextProps.map.center !== undefined) {
        // center has not been set yet or differs
        if (this.props.map.center === undefined || nextProps.map.center[0] !== this.props.map.center[0] || nextProps.map.center[1] !== this.props.map.center[1]) {
          // convert the center point to map coordinates.
          var center = _proj2.default.transform(nextProps.map.center, 'EPSG:4326', map_proj);
          map_view.setCenter(center);
        }
      }
      // compare the zoom
      if (nextProps.map.zoom !== undefined && nextProps.map.zoom !== this.props.map.zoom) {
        map_view.setZoom(nextProps.map.zoom);
      }
      // compare the rotation
      if (nextProps.map.bearing !== undefined && nextProps.map.bearing !== this.props.map.bearing) {
        var rotation = (0, _util.degreesToRadians)(nextProps.map.bearing);
        map_view.setRotation(rotation);
      }

      // check the sources diff
      var next_sources_version = getVersion(nextProps.map, _constants.SOURCE_VERSION_KEY);
      if (next_sources_version === undefined || this.sourcesVersion !== next_sources_version) {
        // go through and update the sources.
        this.configureSources(nextProps.map.sources, next_sources_version);
      }
      var next_layer_version = getVersion(nextProps.map, _constants.LAYER_VERSION_KEY);
      if (next_layer_version === undefined || this.layersVersion !== next_layer_version) {
        // go through and update the layers.
        this.configureLayers(nextProps.map.sources, nextProps.map.layers, next_layer_version);
      }

      // check the vector sources for data changes
      var src_names = Object.keys(nextProps.map.sources);
      for (var _i = 0, _ii = src_names.length; _i < _ii; _i++) {
        var src_name = src_names[_i];
        var src = this.props.map.sources[src_name];
        if (src && src.type === 'geojson') {
          var version_key = (0, _map4.dataVersionKey)(src_name);

          if (this.props.map.metadata !== undefined && this.props.map.metadata[version_key] !== nextProps.map.metadata[version_key]) {
            var next_src = nextProps.map.sources[src_name];
            updateGeojsonSource(this.sources[src_name], next_src, map_view, this.props.mapbox.baseUrl);
          }
        }
      }

      // do a quick sweep to remove any popups
      //  that have been closed.
      this.updatePopups();

      // update the sprite, this could happen BEFORE the map
      if (this.props.map.sprite !== nextProps.map.sprite) {
        this.updateSpriteLayers(nextProps.map);
      }

      // change the current interaction as needed
      if (nextProps.drawing && (nextProps.drawing.interaction !== this.props.drawing.interaction || nextProps.drawing.sourceName !== this.props.drawing.sourceName)) {
        this.updateInteraction(nextProps.drawing);
      }

      if (nextProps.print && nextProps.print.exportImage) {
        // this uses the canvas api to get the map image
        this.map.once('postcompose', function (evt) {
          evt.context.canvas.toBlob(_this3.props.onExportImage);
        }, this);
        this.map.renderSync();
      }

      if (nextProps.map.graticule) {
        var lonFormatter = function lonFormatter(lon) {
          var formattedLon = Math.abs(Math.round(lon * 100) / 100);
          formattedLon += "°00'";
          formattedLon += lon < 0 ? 'W' : lon > 0 ? 'E' : '';
          return formattedLon;
        };

        var latFormatter = function latFormatter(lat) {
          var formattedLat = Math.abs(Math.round(lat * 100) / 100);
          formattedLat += "°00'";
          formattedLat += lat < 0 ? 'S' : lat > 0 ? 'N' : '';
          return formattedLat;
        };

        if (!this.graticule) {
          this.graticule = new _graticule2.default({
            // the style to use for the lines, optional.
            strokeStyle: new _stroke2.default({
              color: 'rgba(255,120,0,0.9)',
              width: 2,
              lineDash: [0.5, 4]
            }),
            showLabels: true,
            lonLabelFormatter: lonFormatter,
            latLabelFormatter: latFormatter,
            //label positions
            lonLabelPosition: 0.05,
            latLabelPosition: 0.95,

            //style for longitude label
            lonLabelStyle: new _text2.default({
              font: '10px Verdana',
              fill: new _fill2.default({
                color: 'rgba(0,0,0,1)'
              })
            }),

            //style for latitude label
            latLabelStyle: new _text2.default({
              font: '10px Verdana',
              offsetX: -2,
              textBaseline: 'bottom',
              fill: new _fill2.default({
                color: 'rgba(0,0,0,1)'
              })
            })
          });
        }
        this.graticule.setMap(this.map);
      } else {
        if (this.graticule) {
          this.graticule.setMap(null);
        }
      }

      // This should always return false to keep
      // render() from being called.
      return false;
    }

    /** Callback for finished drawings, converts the event's feature
     *  to GeoJSON and then passes the relevant information on to
     *  this.props.onFeatureDrawn, this.props.onFeatureModified,
     *  or this.props.onFeatureSelected.
     *
     *  @param {string} eventType One of 'drawn', 'modified', or 'selected'.
     *  @param {string} sourceName Name of the geojson source.
     *  @param {Object} feature OpenLayers feature object.
     *
     */

  }, {
    key: 'onFeatureEvent',
    value: function onFeatureEvent(eventType, sourceName, feature) {
      if (feature !== undefined) {
        // convert the feature to GeoJson
        var proposed_geojson = GEOJSON_FORMAT.writeFeatureObject(feature, {
          dataProjection: 'EPSG:4326',
          featureProjection: this.map.getView().getProjection()
        });

        // Pass on feature drawn this map object, the target source,
        //  and the drawn feature.
        if (eventType === 'drawn') {
          this.props.onFeatureDrawn(this, sourceName, proposed_geojson);
        } else if (eventType === 'modified') {
          this.props.onFeatureModified(this, sourceName, proposed_geojson);
        } else if (eventType === 'selected') {
          this.props.onFeatureSelected(this, sourceName, proposed_geojson);
        }
      }
    }

    /** Convert the GL source definitions into internal
     *  OpenLayers source definitions.
     *  @param {Object} sourcesDef All sources defined in the Mapbox GL stylesheet.
     *  @param {number} sourceVersion Counter for the source metadata updates.
     */

  }, {
    key: 'configureSources',
    value: function configureSources(sourcesDef, sourceVersion) {
      this.sourcesVersion = sourceVersion;
      // TODO: Update this to check "diff" configurations
      //       of sources.  Currently, this will only detect
      //       additions and removals.
      var src_names = Object.keys(sourcesDef);
      var map_view = this.map.getView();
      for (var i = 0, ii = src_names.length; i < ii; i++) {
        var src_name = src_names[i];
        // Add the source because it's not in the current
        //  list of sources.
        if (!(src_name in this.sources)) {
          var time = (0, _util.getKey)(this.props.map.metadata, _constants.TIME_KEY);
          this.sources[src_name] = configureSource(sourcesDef[src_name], map_view, this.props.mapbox.accessToken, this.props.mapbox.baseUrl, time, this.props.wrapX);
        }

        // Check to see if there was a clustering change.
        // Because OpenLayers requires a *different* source to handle clustering,
        // this handles update the named source and then subsequently updating
        // the layers.
        var src = this.props.map.sources[src_name];
        if (src && (src.cluster !== sourcesDef[src_name].cluster || src.clusterRadius !== sourcesDef[src_name].clusterRadius)) {
          // reconfigure the source for clustering.
          this.sources[src_name] = configureSource(sourcesDef[src_name], map_view);
          // tell all the layers about it.
          this.updateLayerSource(src_name);
        }
      }

      // remove sources no longer there.
      src_names = Object.keys(this.sources);
      for (var _i2 = 0, _ii2 = src_names.length; _i2 < _ii2; _i2++) {
        var _src_name = src_names[_i2];
        if (!(_src_name in sourcesDef)) {
          // TODO: Remove all layers that are using this source.
          delete this.sources[_src_name];
        }
      }
    }

    /** Applies the sprite animation information to the layer
     *  @param {Object} olLayer OpenLayers layer object.
     *  @param {Object[]} layers Array of Mapbox GL layer objects.
     */

  }, {
    key: 'applySpriteAnimation',
    value: function applySpriteAnimation(olLayer, layers) {
      var _this4 = this;

      this.map.on('postcompose', function (e) {
        _this4.map.render(); // animate
      });
      var styleCache = {};
      var spriteOptions = {};
      for (var i = 0, ii = layers.length; i < ii; ++i) {
        var layer = layers[i];
        spriteOptions[layer.id] = (0, _util.jsonClone)(layer.metadata['bnd:animate-sprite']);
        if (Array.isArray(layer.filter)) {
          layer.filter = (0, _feature_filter2.default)(layer.filter);
        }
      }
      olLayer.setStyle(function (feature, resolution) {
        // loop over the layers to see which one matches
        for (var l = 0, ll = layers.length; l < ll; ++l) {
          var _layer = layers[l];
          if (!_layer.filter || _layer.filter({ properties: feature.getProperties() })) {
            if (!spriteOptions[_layer.id].rotation || spriteOptions[_layer.id].rotation && !spriteOptions[_layer.id].rotation.property) {
              if (!styleCache[_layer.id]) {
                (function () {
                  var sprite = new _sprite2.default(spriteOptions[_layer.id]);
                  styleCache[_layer.id] = new _style2.default({ image: sprite });
                  _this4.map.on('postcompose', function (e) {
                    sprite.update(e);
                  });
                })();
              }
              return styleCache[_layer.id];
            } else {
              if (!styleCache[_layer.id]) {
                styleCache[_layer.id] = {};
              }
              var rotationAttribute = spriteOptions[_layer.id].rotation.property;
              var rotation = feature.get(rotationAttribute);
              if (!styleCache[_layer.id][rotation]) {
                (function () {
                  var options = (0, _util.jsonClone)(_layer.metadata['bnd:animate-sprite']);
                  options.rotation = rotation;
                  var sprite = new _sprite2.default(options);
                  var style = new _style2.default({ image: sprite });
                  _this4.map.on('postcompose', function (e) {
                    sprite.update(e);
                  });
                  styleCache[_layer.id][rotation] = style;
                })();
              }
              return styleCache[_layer.id][rotation];
            }
          }
        }
        return null;
      });
    }

    /** Configures OpenLayers layer style.
     *  @param {Object} olLayer OpenLayers layer object.
     *  @param {Object[]} layers Array of Mapbox GL layer objects.
     */

  }, {
    key: 'applyStyle',
    value: function applyStyle(olLayer, layers) {
      // filter out the layers which are not visible
      var render_layers = [];
      var spriteLayers = [];
      for (var i = 0, ii = layers.length; i < ii; i++) {
        var layer = layers[i];
        if (layer.metadata && layer.metadata['bnd:animate-sprite']) {
          spriteLayers.push(layer);
        }
        var is_visible = layer.layout ? layer.layout.visibility !== 'none' : true;
        if (is_visible) {
          render_layers.push(layer);
        }
      }
      if (spriteLayers.length > 0) {
        this.applySpriteAnimation(olLayer, spriteLayers);
      }

      var fake_style = getFakeStyle(this.props.map.sprite, render_layers, this.props.mapbox.baseUrl, this.props.mapbox.accessToken);

      if (olLayer.setStyle && spriteLayers.length === 0) {
        (0, _olMapboxStyle.applyStyle)(olLayer, fake_style, layers[0].source);
      }

      // handle toggling the layer on or off
      olLayer.setVisible(render_layers.length > 0);
    }

    /** Convert a Mapbox GL-defined layer to an OpenLayers layer.
     *  @param {string} sourceName Layer's source name.
     *  @param {Object} glSource Mapbox GL source object.
     *  @param {Object[]} layers Array of Mapbox GL layer objects.
     *
     *  @returns {(Object|null)} Configured OpenLayers layer object, or null.
     */

  }, {
    key: 'configureLayer',
    value: function configureLayer(sourceName, glSource, layers) {
      var source = this.sources[sourceName];
      var layer = null;
      switch (glSource.type) {
        case 'raster':
          layer = new _tile2.default({
            source: source
          });
          this.applyStyle(layer, layers);
          return layer;
        case 'geojson':
          layer = new _vector2.default({
            source: source
          });
          this.applyStyle(layer, layers);
          return layer;
        case 'vector':
          layer = new _vectortile2.default({
            source: source
          });
          this.applyStyle(layer, layers);
          return layer;
        case 'image':
          return new _image2.default({
            source: source,
            opacity: layers[0].paint ? layers[0].paint['raster-opacity'] : undefined
          });
        default:
        // pass, let the function return null
      }

      // this didn't work out.
      return null;
    }

    /** Update a layer source, provided its name.
     *  @param {string} sourceName Layer's source name.
     */

  }, {
    key: 'updateLayerSource',
    value: function updateLayerSource(sourceName) {
      var layer_names = Object.keys(this.layers);
      for (var i = 0, ii = layer_names.length; i < ii; i++) {
        var name = layer_names[i];
        if (getSourceName(name) === sourceName) {
          this.layers[name].setSource(this.sources[sourceName]);
        }
      }
    }

    /** Updates the rendered OpenLayers layers
     *  based on the current Redux state.map.layers.
     *  @param {string[]} layerNames An array of layer names.
     */

  }, {
    key: 'cleanupLayers',
    value: function cleanupLayers(layerNames) {
      var layer_exists = {};
      for (var i = 0, ii = layerNames.length; i < ii; i++) {
        layer_exists[layerNames[i]] = true;
      }

      // check for layers which should be removed.
      var layer_ids = Object.keys(this.layers);
      for (var _i3 = 0, _ii3 = layer_ids.length; _i3 < _ii3; _i3++) {
        var layer_id = layer_ids[_i3];
        // if the layer_id was not set to true then
        //  it has been removed from the state and needs to be removed
        //  from the map.
        if (layer_exists[layer_id] !== true) {
          this.map.removeLayer(this.layers[layer_id]);
          delete this.layers[layer_id];
        }
      }
    }

    /** Configures the layers in the state
     *  and performs updates to the rendered layers as necessary.
     *  @param {Object[]} sourcesDef The array of sources in map.state.
     *  @param {Object[]} layersDef The array of layers in map.state.
     *  @param {number} layerVersion The value of state.map.metadata[LAYER_VERSION_KEY].
     */

  }, {
    key: 'configureLayers',
    value: function configureLayers(sourcesDef, layersDef, layerVersion) {
      // update the internal version counter.
      this.layersVersion = layerVersion;

      // bin layers into groups based on their source.
      var layer_groups = [];

      var last_source = null;
      var layer_group = [];
      for (var i = 0, ii = layersDef.length; i < ii; i++) {
        var layer = layersDef[i];

        // fake the "layer" by getting the source
        //  from the ref'd layer.
        if (layer.ref !== undefined) {
          layer = {
            source: (0, _util.getLayerById)(layersDef, layer.ref).source
          };
        }

        // if the layers differ start a new layer group
        if (last_source === null || last_source !== layer.source) {
          if (layer_group.length > 0) {
            layer_groups.push(layer_group);
            layer_group = [];
          }
        }
        last_source = layer.source;

        layer_group.push(layersDef[i]);
      }
      if (layer_group.length > 0) {
        layer_groups.push(layer_group);
      }

      var group_names = [];
      for (var _i4 = 0, _ii4 = layer_groups.length; _i4 < _ii4; _i4++) {
        var lyr_group = layer_groups[_i4];
        var group_name = getLayerGroupName(lyr_group);
        group_names.push(group_name);

        var source_name = hydrateLayer(layersDef, lyr_group[0]).source;
        var source = sourcesDef[source_name];

        // if the layer is not on the map, create it.
        if (!(group_name in this.layers)) {
          if (lyr_group[0].type === 'background') {
            (0, _olMapboxStyle.applyBackground)(this.map, { layers: lyr_group });
          } else {
            var hydrated_group = hydrateLayerGroup(layersDef, lyr_group);
            var new_layer = this.configureLayer(source_name, source, hydrated_group);

            // if the new layer has been defined, add it to the map.
            if (new_layer !== null) {
              new_layer.set('name', group_name);
              this.layers[group_name] = new_layer;
              this.map.addLayer(this.layers[group_name]);
            }
          }
        }

        if (group_name in this.layers) {
          var ol_layer = this.layers[group_name];

          // check for style changes, the OL style
          // is defined by filter and paint elements.
          var current_layers = [];
          for (var j = 0, jj = lyr_group.length; j < jj; j++) {
            current_layers.push((0, _util.getLayerById)(this.props.map.layers, lyr_group[j].id));
          }

          if (!(0, _util.jsonEquals)(lyr_group, current_layers)) {
            this.applyStyle(ol_layer, hydrateLayerGroup(layersDef, lyr_group));
          }

          // update the min/maxzooms
          var view = this.map.getView();
          if (source.minzoom) {
            ol_layer.setMinResolution(view.getResolutionForZoom(source.minzoom));
          }
          if (source.maxzoom) {
            ol_layer.setMaxResolution(view.getResolutionForZoom(source.maxzoom));
          }

          // update the display order.
          ol_layer.setZIndex(_i4);
        }
      }

      // clean up layers which should be removed.
      this.cleanupLayers(group_names);
    }

    /** Performs updates to layers containing sprites.
     *  @param {Object} map The state.map object.
     */

  }, {
    key: 'updateSpriteLayers',
    value: function updateSpriteLayers(map) {
      var sprite_layers = [];
      var layers_by_id = {};

      // restyle all the symbol layers.
      for (var i = 0, ii = map.layers.length; i < ii; i++) {
        var gl_layer = map.layers[i];
        if (gl_layer.ref !== undefined) {
          gl_layer = hydrateLayer(map.layers, gl_layer);
        }
        if (gl_layer.type === 'symbol') {
          sprite_layers.push(gl_layer.id);
          layers_by_id[gl_layer.id] = gl_layer;
        }
      }

      var layer_groups = Object.keys(this.layers);
      for (var grp = 0, ngrp = layer_groups.length; grp < ngrp; grp++) {
        // unpack the layers from the group name
        var layers = getLayerNames(layer_groups[grp]);

        var restyled = false;
        for (var lyr = 0, nlyr = sprite_layers.length; !restyled && lyr < nlyr; lyr++) {
          if (layers.indexOf(sprite_layers[lyr]) >= 0) {
            var style_layers = [];
            for (var _i5 = 0, _ii5 = layers.length; _i5 < _ii5; _i5++) {
              if (layers_by_id[layers[_i5]]) {
                style_layers.push(layers_by_id[layers[_i5]]);
              }
            }
            this.applyStyle(this.layers[layer_groups[grp]], style_layers);
            restyled = true;
          }
        }
      }
    }

    /** Removes popups from the map via OpenLayers removeOverlay().
     */

  }, {
    key: 'updatePopups',
    value: function updatePopups() {
      var _this5 = this;

      var overlays = this.map.getOverlays();
      var overlays_to_remove = [];

      overlays.forEach(function (overlay) {
        var id = overlay.get('popupId');
        if (_this5.popups[id].state.closed !== false) {
          _this5.popups[id].setMap(null);
          // mark this for removal
          overlays_to_remove.push(overlay);
          // umount the component from the DOM
          _reactDom2.default.unmountComponentAtNode(_this5.elems[id]);
          // remove the component from the popups hash
          delete _this5.popups[id];
          delete _this5.elems[id];
        }
      });

      // remove the old/closed overlays from the map.
      for (var i = 0, ii = overlays_to_remove.length; i < ii; i++) {
        this.map.removeOverlay(overlays_to_remove[i]);
      }
    }
  }, {
    key: 'removePopup',
    value: function removePopup(popupId) {
      this.popups[popupId].close();
      this.updatePopups();
    }

    /** Add a Popup to the map.
     *
     *  @param {SdkPopup} popup Instance of SdkPopop or a subclass.
     *  @param {boolean} [silent] When true, do not call updatePopups() after adding.
     *
     */

  }, {
    key: 'addPopup',
    value: function addPopup(popup) {
      var silent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      // each popup uses a unique id to relate what is
      //  in openlayers vs what we have in the react world.
      var id = _uuid2.default.v4();

      var elem = document.createElement('div');
      elem.setAttribute("class", "sdk-popup");
      var overlay = new _overlay2.default({
        // create an empty div element for the Popup
        element: elem,
        // allow events to pass through, using the default stopevent
        // container does not allow react to check for events.
        stopEvent: false,
        // put the popup into view
        autoPan: true,
        autoPanAnimation: {
          duration: 250
        }
      });

      // Editor's note:
      // I hate using the self = this construction but
      //  there were few options when needing to get the
      //  instance of the react component using the callback
      //  method recommened by eslint and the react team.
      // See here:
      // - https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-render-return-value.md
      var self = this;
      // render the element into the popup's DOM.
      _reactDom2.default.render(popup, elem, function addInstance() {
        self.popups[id] = this;
        self.elems[id] = elem;
        this.setMap(self);
      });

      // set the popup id so we can match the component
      //  to the overlay.
      overlay.set('popupId', id);

      // Add the overlay to the map,
      this.map.addOverlay(overlay);

      // reset the position after the popup has been added to the map.
      // assumes the popups coordinate is 4326
      var wgs84 = [popup.props.coordinate[0], popup.props.coordinate[1]];
      var xy = _proj2.default.transform(wgs84, 'EPSG:4326', this.map.getView().getProjection());
      overlay.setPosition(xy);

      // do not trigger an update if silent is
      //  set to true.  Useful for bulk popup additions.
      if (silent !== true) {
        this.updatePopups();
      }
    }

    /** Handles WMS GetFeatureInfo for a given map event.
     *
     *  @param {Object} layer Mapbox GL layer object.
     *  @param {Promise[]} promises Features promies.
     *  @param {Object} evt Map event whose coordinates drive the feature request.
     *
     */

  }, {
    key: 'handleWMSGetFeatureInfo',
    value: function handleWMSGetFeatureInfo(layer, promises, evt) {
      var _this6 = this;

      var map_prj = this.map.getView().getProjection();
      var map_resolution = this.map.getView().getResolution();
      if (layer.metadata['bnd:queryable'] && (!layer.layout || layer.layout.visibility && layer.layout.visibility !== 'none')) {
        var source = this.sources[layer.source];
        if (source instanceof _tilewms2.default) {
          promises.push(new Promise(function (resolve) {
            var features_by_layer = {};
            var layer_name = layer.id;
            var url = _this6.sources[layer.source].getGetFeatureInfoUrl(evt.coordinate, map_resolution, map_prj, {
              INFO_FORMAT: 'application/json'
            });
            (0, _isomorphicFetch2.default)(url).then(function (response) {
              return response.json();
            }, function (error) {
              return console.error('An error occured.', error);
            }).then(function (json) {
              features_by_layer[layer_name] = GEOJSON_FORMAT.writeFeaturesObject(GEOJSON_FORMAT.readFeatures(json), {
                featureProjection: GEOJSON_FORMAT.readProjection(json),
                dataProjection: 'EPSG:4326'
              }).features;
              resolve(features_by_layer);
            });
          }));
        }
      }
    }

    /** Query the map and the appropriate layers.
     *
     *  @param {Object} evt The click event that kicked off the query.
     *
     *  @returns {Promise} Promise.all promise.
     */

  }, {
    key: 'queryMap',
    value: function queryMap(evt) {
      var _this7 = this;

      // get the map projection
      var map_prj = this.map.getView().getProjection();

      // this is the standard "get features when clicking"
      //  business.
      var features_promise = new Promise(function (resolve) {
        var features_by_layer = {};

        _this7.map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
          // get the gl-name for the layer from the openlayer's layer.
          var layer_name = layer.get('name');
          // use that name as the key for the features-by-layer object,
          // and initialize the array if the layer hasn't been used.
          if (features_by_layer[layer_name] === undefined) {
            features_by_layer[layer_name] = [];
          }
          // ensure the features are in 4326 when sent back to the caller.
          features_by_layer[layer_name].push(GEOJSON_FORMAT.writeFeatureObject(feature, {
            featureProjection: map_prj,
            dataProjection: 'EPSG:4326'
          }));
        });

        resolve(features_by_layer);
      });

      var promises = [features_promise];

      // add other async queries here.
      for (var i = 0, ii = this.props.map.layers.length; i < ii; ++i) {
        var layer = this.props.map.layers[i];
        this.handleWMSGetFeatureInfo(layer, promises, evt);
      }

      return Promise.all(promises);
    }

    /** Initialize the map */

  }, {
    key: 'configureMap',
    value: function configureMap() {
      var _this8 = this;

      // determine the map's projection.
      var map_proj = this.props.projection;

      // determine the map's rotation.
      var rotation = void 0;
      if (this.props.map.bearing !== undefined) {
        rotation = (0, _util.degreesToRadians)(this.props.map.bearing);
      }

      // reproject the initial center based on that projection.
      var center = void 0;
      if (this.props.map.center !== undefined) {
        center = _proj2.default.transform(this.props.map.center, 'EPSG:4326', map_proj);
      }

      // initialize the map.
      this.map = new _map2.default({
        controls: [new _attribution2.default()],
        target: this.mapdiv,
        logo: false,
        view: new _view2.default({
          center: center,
          zoom: this.props.map.zoom,
          rotation: rotation,
          projection: map_proj
        })
      });

      // when the map moves update the location in the state
      this.map.on('moveend', function () {
        _this8.props.setView(_this8.map.getView());
      });

      // when the map is clicked, handle the event.
      this.map.on('singleclick', function (evt) {
        // React listens to events on the document, OpenLayers places their
        // event listeners on the element themselves. The only element
        // the map should care to listen to is the actual rendered map
        // content. This work-around allows the popups and React-based
        // controls to be placed on the ol-overlaycontainer instead of
        // ol-overlaycontainer-stop-event

        // eslint-disable-next-line no-underscore-dangle
        if (_this8.map.getRenderer().canvas_ === evt.originalEvent.target) {
          var map_prj = _this8.map.getView().getProjection();

          // if includeFeaturesOnClick is true then query for the
          //  features on the map.
          var features_promises = null;
          if (_this8.props.includeFeaturesOnClick) {
            features_promises = _this8.queryMap(evt);
          }

          // ensure the coordinate is also in 4326
          var pt = _proj2.default.transform(evt.coordinate, map_prj, 'EPSG:4326');
          var coordinate = {
            0: pt[0],
            1: pt[1],
            xy: evt.coordinate,
            hms: _coordinate2.default.toStringHDMS(pt)
          };

          // send the clicked-on coordinate and the list of features
          _this8.props.onClick(_this8, coordinate, features_promises);
        }
      });

      // bootstrap the map with the current configuration.
      this.configureSources(this.props.map.sources, this.props.map.metadata[_constants.SOURCE_VERSION_KEY]);
      this.configureLayers(this.props.map.sources, this.props.map.layers, this.props.map.metadata[_constants.LAYER_VERSION_KEY]);

      // this is done after the map composes itself for the first time.
      //  otherwise the map was not always ready for the initial popups.
      this.map.once('postcompose', function () {
        // add the initial popups from the user.
        for (var i = 0, ii = _this8.props.initialPopups.length; i < ii; i++) {
          // set silent to true since updatePopups is called after the loop
          _this8.addPopup(_this8.props.initialPopups[i], true);
        }

        _this8.updatePopups();
      });

      // check for any interactions
      if (this.props.drawing && this.props.drawing.interaction && this.props.graticule) {
        this.updateInteraction(this.props.drawing);
      }
    }

    /** Updates drawing interations.
     *   @param {Object} drawingProps props.drawing.
     */

  }, {
    key: 'updateInteraction',
    value: function updateInteraction(drawingProps) {
      var _this9 = this;

      // this assumes the interaction is different,
      //  so the first thing to do is clear out the old interaction
      if (this.activeInteractions !== null) {
        for (var i = 0, ii = this.activeInteractions.length; i < ii; i++) {
          this.map.removeInteraction(this.activeInteractions[i]);
        }
        this.activeInteractions = null;
      }

      if (drawingProps.interaction === _constants.INTERACTIONS.modify) {
        var select = new _select3.default({
          wrapX: false
        });

        var modify = new _modify2.default({
          features: select.getFeatures()
        });

        modify.on('modifyend', function (evt) {
          _this9.onFeatureEvent('modified', drawingProps.sourceName, evt.features.item(0));
        });

        this.activeInteractions = [select, modify];
      } else if (drawingProps.interaction === _constants.INTERACTIONS.select) {
        // TODO: Select is typically a single-feature affair but there
        //       should be support for multiple feature selections in the future.
        var _select = new _select3.default({
          wrapX: false,
          layers: function layers(layer) {
            var layer_src = _this9.sources[drawingProps.sourceName];
            return layer.getSource() === layer_src;
          }
        });

        _select.on('select', function () {
          _this9.onFeatureEvent('selected', drawingProps.sourcename, _select.getFeatures().item(0));
        });

        this.activeInteractions = [_select];
      } else if (_constants.INTERACTIONS.drawing.includes(drawingProps.interaction)) {
        var drawObj = {};
        if (drawingProps.interaction === _constants.INTERACTIONS.box) {
          var geometryFunction = _draw2.default.createBox();
          drawObj = {
            type: 'Circle',
            geometryFunction: geometryFunction
          };
        } else {
          drawObj = { type: drawingProps.interaction };
        }
        var draw = new _draw2.default(drawObj);

        draw.on('drawend', function (evt) {
          _this9.onFeatureEvent('drawn', drawingProps.sourceName, evt.feature);
        });

        this.activeInteractions = [draw];
      } else if (_constants.INTERACTIONS.measuring.includes(drawingProps.interaction)) {
        // clear the previous measure feature.
        this.props.clearMeasureFeature();

        var measure = new _draw2.default({
          // The measure interactions are the same as the drawing interactions
          // but are prefixed with "measure:"
          type: drawingProps.interaction.split(':')[1]
        });

        var measure_listener = null;
        measure.on('drawstart', function (evt) {
          var geom = evt.feature.getGeometry();
          var proj = _this9.map.getView().getProjection();

          measure_listener = geom.on('change', function (geomEvt) {
            _this9.props.setMeasureGeometry(geomEvt.target, proj);
          });

          _this9.props.setMeasureGeometry(geom, proj);
        });

        measure.on('drawend', function () {
          // remove the listener
          _observable2.default.unByKey(measure_listener);
        });

        this.activeInteractions = [measure];
      }

      if (this.activeInteractions) {
        for (var _i6 = 0, _ii6 = this.activeInteractions.length; _i6 < _ii6; _i6++) {
          this.map.addInteraction(this.activeInteractions[_i6]);
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this10 = this;

      var className = 'sdk-map';
      if (this.props.className) {
        className = className + ' ' + this.props.className;
      }
      return _react2.default.createElement(
        'div',
        { style: this.props.style, ref: function ref(c) {
            _this10.mapdiv = c;
          }, className: className },
        _react2.default.createElement(
          'div',
          { className: 'controls' },
          this.props.children
        )
      );
    }
  }]);

  return Map;
}(_react2.default.Component);

Map.propTypes = {
  wrapX: _propTypes2.default.bool,
  projection: _propTypes2.default.string,
  map: _propTypes2.default.shape({
    center: _propTypes2.default.array,
    zoom: _propTypes2.default.number,
    bearing: _propTypes2.default.number,
    metadata: _propTypes2.default.object,
    layers: _propTypes2.default.array,
    sources: _propTypes2.default.object,
    sprite: _propTypes2.default.string
  }),
  children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]),
  mapbox: _propTypes2.default.shape({
    baseUrl: _propTypes2.default.string,
    accessToken: _propTypes2.default.string
  }),
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,
  drawing: _propTypes2.default.shape({
    interaction: _propTypes2.default.string,
    sourceName: _propTypes2.default.string
  }),
  initialPopups: _propTypes2.default.arrayOf(_propTypes2.default.object),
  setView: _propTypes2.default.func,
  includeFeaturesOnClick: _propTypes2.default.bool,
  onClick: _propTypes2.default.func,
  onFeatureDrawn: _propTypes2.default.func,
  onFeatureModified: _propTypes2.default.func,
  onFeatureSelected: _propTypes2.default.func,
  onExportImage: _propTypes2.default.func,
  setMeasureGeometry: _propTypes2.default.func,
  clearMeasureFeature: _propTypes2.default.func
};

Map.defaultProps = {
  wrapX: true,
  projection: 'EPSG:3857',
  map: {
    center: [0, 0],
    zoom: 2,
    bearing: 0,
    metadata: {},
    layers: [],
    sources: {},
    sprite: undefined
  },
  drawing: {
    interaction: null,
    source: null
  },
  mapbox: {
    baseUrl: '',
    accessToken: ''
  },
  initialPopups: [],
  setView: function setView() {
    // swallow event.
  },
  includeFeaturesOnClick: false,
  onClick: function onClick() {},
  onFeatureDrawn: function onFeatureDrawn() {},
  onFeatureModified: function onFeatureModified() {},
  onFeatureSelected: function onFeatureSelected() {},
  onExportImage: function onExportImage() {},
  setMeasureGeometry: function setMeasureGeometry() {},
  clearMeasureFeature: function clearMeasureFeature() {},
  createLayerFilter: function createLayerFilter() {}
};

function mapStateToProps(state) {
  return {
    map: state.map,
    drawing: state.drawing,
    print: state.print,
    mapbox: state.mapbox
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateLayer: function updateLayer(layerId, layerConfig) {
      dispatch((0, _map3.updateLayer)(layerId, layerConfig));
    },
    setView: function setView(view) {
      // transform the center to 4326 before dispatching the action.
      var center = _proj2.default.transform(view.getCenter(), view.getProjection(), 'EPSG:4326');
      var rotation = (0, _util.radiansToDegrees)(view.getRotation());
      dispatch((0, _map3.setView)(center, view.getZoom()));
      dispatch((0, _map3.setRotation)(rotation));
    },
    setMeasureGeometry: function setMeasureGeometry(geometry, projection) {
      var geom = GEOJSON_FORMAT.writeGeometryObject(geometry, {
        featureProjection: projection,
        dataProjection: 'EPSG:4326'
      });
      var segments = [];
      if (geom.type === 'LineString') {
        for (var i = 0, ii = geom.coordinates.length - 1; i < ii; i++) {
          var a = geom.coordinates[i];
          var b = geom.coordinates[i + 1];
          segments.push(WGS84_SPHERE.haversineDistance(a, b));
        }
      } else if (geom.type === 'Polygon' && geom.coordinates.length > 0) {
        segments.push(Math.abs(WGS84_SPHERE.geodesicArea(geom.coordinates[0])));
      }

      dispatch((0, _drawing.setMeasureFeature)({
        type: 'Feature',
        properties: {},
        geometry: geom
      }, segments));
    },
    clearMeasureFeature: function clearMeasureFeature() {
      dispatch((0, _drawing.clearMeasureFeature)());
    }
  };
}

// Ensure that withRef is set to true so getWrappedInstance will return the Map.
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps, undefined, { withRef: true })(Map);