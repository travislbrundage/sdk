'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

/** @module reducers/map
 * @desc Reducer to implement mapbox style document.
 */

exports.dataVersionKey = dataVersionKey;
exports.default = MapReducer;

var _feature_filter = require('@mapbox/mapbox-gl-style-spec/feature_filter');

var _feature_filter2 = _interopRequireDefault(_feature_filter);

var _util = require('../util');

var _actionTypes = require('../action-types');

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function defaultMetadata() {
  // define the metadata.
  var default_metadata = {};
  default_metadata[_constants.LAYER_VERSION_KEY] = 0;
  default_metadata[_constants.SOURCE_VERSION_KEY] = 0;
  return default_metadata;
}

var defaultState = {
  version: 8,
  name: 'default',
  center: [0, 0],
  zoom: 3,
  bearing: 0,
  metadata: defaultMetadata(),
  sources: {},
  graticule: false,
  layers: []
};

/** Returns a metadata child object.
 *
 *  @param {Object} metadata The state.map.metadata.
 *  @param {string} version The version name of the metadata child object to be returned.
 *
 *  @returns {Object} The requested metadata child object.
 */
function getVersion(metadata, version) {
  if (typeof metadata === 'undefined' || typeof metadata[version] === 'undefined') {
    return 0;
  }
  return metadata[version];
}

/** Increments metadata object version numbers.
 *
 *  @param {Object} metadata The state.map.metadata.
 *  @param {string} version The metadata object to be incremented.
 *
 *  @returns {Object} The new state.map.metadata object with the incremented version.
 */
function incrementVersion(metadata, version) {
  var new_metadata = Object.assign({}, metadata);
  new_metadata[version] = getVersion(metadata, version) + 1;
  return {
    metadata: new_metadata
  };
}

/** As there is no "source" metadata, this generates a unique key
 *  for the version of the data in the map's metadata object.
 *
 *  @param {string} sourceName The name of the source whose data is versioned.
 *
 *  @returns {string} The string value of the new source data version key.
 */
function dataVersionKey(sourceName) {
  return _constants.DATA_VERSION_KEY + ':' + sourceName;
}

/** Move a layer in the layers list.
 *
 *  @param {Object} state The redux state.
 *  @param {Object} layer The layer object to be moved.
 *  @param {string} targetId The id of the layer
 *  at the position where layer will be moved.
 *
 *  @returns {Object} The new state object.
 */
function placeLayer(state, layer, targetId) {
  var placed = false;
  var new_layers = [];

  // do some sanity checks to prevent extra work
  //  when the targetId is not valid.
  for (var i = 0, ii = state.layers.length; i < ii; i++) {
    var l = state.layers[i];

    // if this is the target id then
    //  place the layer before adding the target
    //  back into the layer stack
    if (l.id === targetId) {
      new_layers.push(layer);
      placed = true;
    }

    // if the layer exists in the list,
    //  do not add it back inline.
    if (l.id !== layer.id) {
      new_layers.push(l);
    }
  }

  // whenever the targetId is not found,
  //  add the layer to the end of the list.
  if (!placed) {
    new_layers.push(layer);
  }

  return Object.assign({}, state, {
    layers: new_layers
  }, incrementVersion(state.metadata, _constants.LAYER_VERSION_KEY));
}

/** Change the order of the layer in the stack.
 */
function orderLayer(state, action) {
  var layer = null;
  for (var i = 0, ii = state.layers.length; i < ii && layer === null; i++) {
    if (state.layers[i].id === action.layerId) {
      layer = state.layers[i];
    }
  }

  if (layer !== null) {
    return placeLayer(state, layer, action.targetId);
  }
  return state;
}

/** Add a layer to the state.
 */
function addLayer(state, action) {
  // TODO: Maybe decide on what a "default case" is in
  //       order to support easier dev.
  var new_layer = Object.assign({
    filter: null,
    paint: {},
    metadata: {}
  }, action.layerDef);

  // add a layer name if specified in the action.
  if (action.layerTitle) {
    new_layer.metadata[_constants.TITLE_KEY] = action.layerTitle;
  }

  return placeLayer(state, new_layer, action.positionId);
}

/** Remove a layer from the state.
 */
function removeLayer(state, action) {
  var new_layers = [];
  for (var i = 0, ii = state.layers.length; i < ii; i++) {
    if (state.layers[i].id !== action.layerId) {
      new_layers.push(state.layers[i]);
    }
  }

  return Object.assign({}, state, {
    layers: new_layers
  }, incrementVersion(state.metadata, _constants.LAYER_VERSION_KEY));
}

/** Update a layer that's in the state already.
 */
function updateLayer(state, action) {
  // action.layer should be a new mix in for the layer.
  var new_layers = [];
  for (var i = 0, ii = state.layers.length; i < ii; i++) {
    // if the id matches, update the layer
    if (state.layers[i].id === action.layerId) {
      if (action.type === _actionTypes.MAP.SET_LAYER_METADATA) {
        var meta_update = {};
        meta_update[action.key] = action.value;
        new_layers.push(Object.assign({}, state.layers[i], {
          metadata: Object.assign({}, state.layers[i].metadata, meta_update)
        }));
      } else {
        new_layers.push(Object.assign({}, state.layers[i], action.layerDef));
      }
      // otherwise leave it the same.
    } else {
      new_layers.push(state.layers[i]);
    }
  }

  return Object.assign({}, state, {
    layers: new_layers
  }, incrementVersion(state.metadata, _constants.LAYER_VERSION_KEY));
}

/** Add a source to the state.
 */
function addSource(state, action) {
  var new_source = {};

  new_source[action.sourceName] = Object.assign({}, action.sourceDef);
  if (action.sourceDef.type === 'geojson') {
    if (action.sourceDef.data === undefined || action.sourceDef.data === null) {
      new_source[action.sourceName].data = {};
    } else if (_typeof(action.sourceDef.data) === 'object') {
      new_source[action.sourceName].data = Object.assign({}, action.sourceDef.data);
    } else {
      new_source[action.sourceName].data = action.sourceDef.data;
    }
  }

  var new_metadata = {};
  new_metadata[dataVersionKey(action.sourceName)] = 0;

  var new_sources = Object.assign({}, state.sources, new_source);
  return Object.assign({}, state, {
    metadata: Object.assign({}, state.metadata, new_metadata),
    sources: new_sources
  }, incrementVersion(state.metadata, _constants.SOURCE_VERSION_KEY));
}

/** Remove a source from the state.
 */
function removeSource(state, action) {
  var new_sources = Object.assign({}, state.sources);
  delete new_sources[action.sourceName];
  return Object.assign({}, state, {
    sources: new_sources
  }, incrementVersion(state.metadata, _constants.SOURCE_VERSION_KEY));
}

/** Creates a new state with the data for a
 *  source changed to the contents of data.
 *
 *  @param {Object} state The redux state.
 *  @param {string} sourceName The name of the source to be changed.
 *  @param {Object[]} data The list of features to be added to the source.
 *
 *  @returns {Object} The new redux state.
 */
function changeData(state, sourceName, data) {
  var source = state.sources[sourceName];
  var src_mixin = {};

  // update the individual source.
  src_mixin[sourceName] = Object.assign({}, source, {
    data: data
  });

  // kick back the new state.
  return Object.assign({}, state, {
    sources: Object.assign({}, state.sources, src_mixin)
  }, incrementVersion(state.metadata, dataVersionKey(sourceName)));
}

/** Add features to a source.
 */
function addFeatures(state, action) {
  var source = state.sources[action.sourceName];
  var data = source.data;

  // placeholder for the new data
  var new_data = null;
  var features = void 0;
  if (action.features.features) {
    // When a full geoJson object is passed in, check the projection
    features = (0, _util.reprojectGeoJson)(action.features);
  } else {
    // Pass along an just features
    features = action.features;
  }

  // when there is no data, use the data
  // from the action.
  if (!data || !data.type) {
    // coerce this to a FeatureCollection.
    new_data = {
      type: 'FeatureCollection',
      features: features
    };
  } else if (data.type === 'Feature') {
    new_data = {
      type: 'FeatureCollection',
      features: [data].concat(features)
    };
  } else if (data.type === 'FeatureCollection') {
    new_data = Object.assign({}, data, { features: data.features.concat(features) });
  }

  if (new_data !== null) {
    return changeData(state, action.sourceName, new_data);
  }
  return state;
}
/** Cluster points.
 */
function clusterPoints(state, action) {
  var source = state.sources[action.sourceName];
  var src_mixin = [];
  var cluster_settings = {};

  if (typeof action.cluster !== 'undefined') {
    cluster_settings.cluster = action.cluster;
    // Mapbox GL style spec defaults to 50,
    //  whereas OpenLayers defaults to 20px.
    cluster_settings.clusterRadius = source.clusterRadius ? source.clusterRadius : 50;
  }

  // The radius can be overridden at any time.
  if (typeof action.radius !== 'undefined') {
    cluster_settings.clusterRadius = action.radius;
  }
  src_mixin[action.sourceName] = Object.assign({}, source, cluster_settings);

  var newState = Object.assign({}, state, {
    sources: Object.assign({}, state.sources, src_mixin)
  }, incrementVersion(state.metadata, _constants.SOURCE_VERSION_KEY));
  return newState;
}

/** Remove features from a source.
 *
 *  The action should define a filter, any feature
 *  matching the filter will be removed.
 */
function removeFeatures(state, action) {
  // short hand the source source and the data
  var source = state.sources[action.sourceName];
  var data = source.data;

  // filter function, features which MATCH this function will be REMOVED.
  var match = (0, _feature_filter2.default)(action.filter);

  if (data.type === 'Feature') {
    // if the feature should be removed, return an empty
    //  FeatureCollection
    if (match(data)) {
      return changeData(state, action.sourceName, {
        type: 'FeatureCollection',
        features: []
      });
    }
  } else if (data.type === 'FeatureCollection') {
    var new_features = [];
    for (var i = 0, ii = data.features.length; i < ii; i++) {
      var feature = data.features[i];
      if (!match(feature)) {
        new_features.push(feature);
      }
    }

    var new_data = Object.assign({}, data, { features: new_features });

    return changeData(state, action.sourceName, new_data);
  }

  return state;
}

/** Set a layer visible in a mutually exclusive group.
 */
function setLayerInGroupVisible(state, action) {
  var updated_layers = [];
  for (var i = 0, ii = state.layers.length; i < ii; i++) {
    var layer = state.layers[i];
    if (layer.metadata && layer.metadata[_constants.GROUP_KEY] === action.groupId) {
      updated_layers.push(_extends({}, layer, {
        layout: _extends({}, layer.layout, {
          visibility: layer.id === action.layerId ? 'visible' : 'none'
        })
      }));
    } else {
      updated_layers.push(layer);
    }
  }
  return Object.assign({}, state, {
    layers: updated_layers
  }, incrementVersion(state.metadata, _constants.LAYER_VERSION_KEY));
}

/** Change the visibility of a layer given in the action.
 */
function setVisibility(state, action) {
  var updated = false;
  var updated_layers = [];

  for (var i = 0, ii = state.layers.length; i < ii; i++) {
    var layer = state.layers[i];
    if (layer.id === action.layerId) {
      updated_layers.push(_extends({}, layer, {
        layout: _extends({}, layer.layout, {
          visibility: action.visibility
        })
      }));
      updated = true;
    } else {
      updated_layers.push(layer);
    }
  }
  if (updated) {
    return Object.assign({}, state, {
      layers: updated_layers
    }, incrementVersion(state.metadata, _constants.LAYER_VERSION_KEY));
  }
  // if nothing was updated, return the default state.
  return state;
}

/** Load a new context
 */
function setContext(state, action) {
  // simply replace the full state
  return Object.assign({}, action.context);
}

/** Update the map's metadata.
 *  @param {Object} state The redux state.
 *  @param {Object} action The selected action object.
 *
 *  @returns {Object} The new state object.
 */
function updateMetadata(state, action) {
  return Object.assign({}, state, {
    metadata: Object.assign({}, state.metadata, action.metadata)
  });
}

/** Update a source's definition.
 *
 *  This is a heavy-handed operation that will
 *  just mixin whatever is in the new object.
 *
 */
function updateSource(state, action) {
  var old_source = state.sources[action.sourceName];
  var new_source = {};
  new_source[action.sourceName] = Object.assign({}, old_source, action.sourceDef);
  var new_sources = Object.assign({}, state.sources, new_source);

  return Object.assign({}, state, {
    sources: Object.assign({}, state.sources, new_sources)
  }, incrementVersion(state.metadata, dataVersionKey(action.sourceName)));
}

function setZoom(state, action) {
  var zoom = Math.min(_constants.DEFAULT_ZOOM.MAX, action.zoom);
  zoom = Math.max(_constants.DEFAULT_ZOOM.MIN, zoom);
  return Object.assign({}, state, { zoom: zoom });
}

/** Main reducer.
 *  @param {Object} state The redux state.
 *  @param {Object} action The selected action object.
 *
 *  @returns {Object} The new state object.
 */
function MapReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments[1];

  switch (action.type) {
    case _actionTypes.MAP.SET_VIEW:
      return Object.assign({}, state, action.view);
    case _actionTypes.MAP.ZOOM_IN:
      return setZoom(state, { zoom: state.zoom + 1 });
    //return Object.assign({}, state, { zoom: Math.min(DEFAULT_MAX_ZOOM, state.zoom + 1) });
    case _actionTypes.MAP.ZOOM_OUT:
      return setZoom(state, { zoom: state.zoom - 1 });
    //return Object.assign({}, state, { zoom: Math.max(DEFAULT_MIN_ZOOM, state.zoom - 1) });
    case _actionTypes.MAP.SET_ZOOM:
      return setZoom(state, action);
    case _actionTypes.MAP.SET_NAME:
      return Object.assign({}, state, { name: action.name });
    case _actionTypes.MAP.SET_SPRITE:
      return Object.assign({}, state, { sprite: action.sprite });
    case _actionTypes.MAP.SET_ROTATION:
      return Object.assign({}, state, { bearing: action.degrees });
    case _actionTypes.MAP.ADD_LAYER:
      return addLayer(state, action);
    case _actionTypes.MAP.REMOVE_LAYER:
      return removeLayer(state, action);
    case _actionTypes.MAP.SET_LAYER_METADATA:
    case _actionTypes.MAP.UPDATE_LAYER:
      return updateLayer(state, action);
    case _actionTypes.MAP.ADD_SOURCE:
      return addSource(state, action);
    case _actionTypes.MAP.REMOVE_SOURCE:
      return removeSource(state, action);
    case _actionTypes.MAP.ADD_FEATURES:
      return addFeatures(state, action);
    case _actionTypes.MAP.REMOVE_FEATURES:
      return removeFeatures(state, action);
    case _actionTypes.MAP.SET_LAYER_VISIBILITY:
      return setVisibility(state, action);
    case _actionTypes.MAP.SET_LAYER_IN_GROUP_VISIBLE:
      return setLayerInGroupVisible(state, action);
    case _actionTypes.MAP.RECEIVE_CONTEXT:
      return setContext(state, action);
    case _actionTypes.MAP.ORDER_LAYER:
      return orderLayer(state, action);
    case _actionTypes.MAP.CLUSTER_POINTS:
    case _actionTypes.MAP.SET_CLUSTER_RADIUS:
      return clusterPoints(state, action);
    case _actionTypes.MAP.UPDATE_METADATA:
      return updateMetadata(state, action);
    case _actionTypes.MAP.UPDATE_SOURCE:
      return updateSource(state, action);
    case _actionTypes.MAP.TOGGLE_GRATICULE:
      return Object.assign({}, state, { graticule: !state.graticule });
    default:
      return state;
  }
}