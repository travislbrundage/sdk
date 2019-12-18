'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setView = setView;
exports.zoomIn = zoomIn;
exports.zoomOut = zoomOut;
exports.setZoom = setZoom;
exports.setMapName = setMapName;
exports.setRotation = setRotation;
exports.addLayer = addLayer;
exports.addSource = addSource;
exports.removeLayer = removeLayer;
exports.removeSource = removeSource;
exports.updateLayer = updateLayer;
exports.clusterPoints = clusterPoints;
exports.setClusterRadius = setClusterRadius;
exports.addFeatures = addFeatures;
exports.removeFeatures = removeFeatures;
exports.setLayerVisibility = setLayerVisibility;
exports.setLayerInGroupVisible = setLayerInGroupVisible;
exports.setLayerMetadata = setLayerMetadata;
exports.setLayerTitle = setLayerTitle;
exports.setLayerTime = setLayerTime;
exports.receiveContext = receiveContext;
exports.setContext = setContext;
exports.orderLayer = orderLayer;
exports.setSprite = setSprite;
exports.updateMetadata = updateMetadata;
exports.updateSource = updateSource;
exports.toggleGraticule = toggleGraticule;
exports.setMapTime = setMapTime;

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _actionTypes = require('../action-types');

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @module actions/map
 * @desc Action Defintions for the map.
 */

var sourceTypes = ['vector', 'raster', 'geojson', 'image', 'video', 'canvas'];

/** Action to update the center and zoom values in map state.
 *  @param {number[]} center Center coordinates.
 *  @param {number} zoom Zoom value.
 *
 *  @returns {Object} Action object to pass to reducer.
 */
/*
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

function setView(center, zoom) {
  return {
    type: _actionTypes.MAP.SET_VIEW,
    view: { center: center, zoom: zoom }
  };
}

/** Action to zoom in on the map.
 *
 *  @returns {Object} Action object to pass to reducer.
 */
function zoomIn() {
  return {
    type: _actionTypes.MAP.ZOOM_IN
  };
}

/** Action to zoom out on the map.
 *
 *  @returns {Object} Action object to pass to reducer.
 */
function zoomOut() {
  return {
    type: _actionTypes.MAP.ZOOM_OUT
  };
}

/** Action to set the zoom level.
 *  @param {number} zoom Zoom value.
 *
 *  @returns {Object} Action object to pass to reducer.
 */
function setZoom(zoom) {
  return {
    type: _actionTypes.MAP.SET_ZOOM,
    zoom: zoom
  };
}

/** Action to update the map name in map state.
 *  @param {string} name Map name.
 *
 *  @returns {Object} Action object to pass to reducer.
 */
function setMapName(name) {
  return {
    type: _actionTypes.MAP.SET_NAME,
    name: name
  };
}

/** Action to update the map bearing value in map state.
 *  @param {number} degrees Bearing value to set in degrees.
 *
 *  @returns {Object} Action object to pass to reducer.
 */
function setRotation(degrees) {
  return {
    type: _actionTypes.MAP.SET_ROTATION,
    degrees: degrees
  };
}

/** Action to add a layer object in the map state.
 *  @param {Object} layerDef Layer properties.
 *  @param {string} layerTitle Title of the layer to be added.
 *  @param {string} positionId String id for the layer.
 *
 *  @returns {Object} Action object to pass to reducer.
 */
function addLayer(layerDef, layerTitle, positionId) {
  return {
    type: _actionTypes.MAP.ADD_LAYER,
    layerDef: layerDef,
    layerTitle: layerTitle,
    positionId: positionId
  };
}

/** Action to add a source object in the map state.
 *  @param {string} sourceName Name of the source to be added.
 *  @param {Object} sourceDef Source properties.
 *
 *  @returns {Object} Action object to pass to reducer.
 */
function addSource(sourceName, sourceDef) {
  if (sourceTypes.indexOf(sourceDef.type) === -1) {
    throw new Error("Invalid source type: " + sourceDef.type + ".  Valid source types are " + sourceTypes.toString());
  }
  return {
    type: _actionTypes.MAP.ADD_SOURCE,
    sourceName: sourceName,
    sourceDef: sourceDef
  };
}

/** Action to remove a layer object in the map state.
 *  @param {string} layerId String id for the layer.
 *
 *  @returns {Object} Action object to pass to reducer.
 */
function removeLayer(layerId) {
  return {
    type: _actionTypes.MAP.REMOVE_LAYER,
    layerId: layerId
  };
}

/** Action to remove a source object in the map state.
 *  @param {string} sourceName Name of the source to be added.
 *
 *  @returns {Object} Action object to pass to reducer.
 */
function removeSource(sourceName) {
  return {
    type: _actionTypes.MAP.REMOVE_SOURCE,
    sourceName: sourceName
  };
}

/** Action to update a layer object in the map state.
 *  @param {string} layerId String id for the layer to be updated.
 *  @param {Object} layerDef Layer properties.
 *
 *  @returns {Object} Action object to pass to reducer.
 */
function updateLayer(layerId, layerDef) {
  return {
    type: _actionTypes.MAP.UPDATE_LAYER,
    layerId: layerId,
    layerDef: layerDef
  };
}

/** Action to update cluster status in the map state.
 *  @param {string} sourceName Name of the source to be added.
 *  @param {boolean} isClustered
 *
 *  @returns {Object} Action object to pass to reducer.
 */
function clusterPoints(sourceName, isClustered) {
  return {
    type: _actionTypes.MAP.CLUSTER_POINTS,
    sourceName: sourceName,
    cluster: isClustered
  };
}

/** Set the radius of a clustering layer.
 *
 *  When set to a layer without clustering this will
 *  have no effect.
 *
 *  @param {Object} sourceName Name of the source on which the features are clustered.
 *  @param {number} radius Cluster radius.
 *
 *  @returns {Object} Action object to pass to reducer.
 */
function setClusterRadius(sourceName, radius) {
  return {
    type: _actionTypes.MAP.SET_CLUSTER_RADIUS,
    sourceName: sourceName,
    radius: radius
  };
}

/** Add features to a source on the map.
 *
 *  @param {Object} sourceName Name of the source on which the features will be added.
 *  @param {Object[]} features An array of features to add.
 *
 *  @returns {Object} Action object to pass to reducer.
 */
function addFeatures(sourceName, features) {
  return {
    type: _actionTypes.MAP.ADD_FEATURES,
    sourceName: sourceName,
    features: features
  };
}

/** Remove features from a source on the map.
 *
 *  @param {Object} sourceName Name of the source on which the features will be removed.
 *  @param {string[]} filter Rule determining which features will be removed.
 *  See https://www.mapbox.com/mapbox-gl-js/style-spec/#types-filter.
 *
 *  @returns {Object} Action object to pass to reducer.
 */
function removeFeatures(sourceName, filter) {
  return {
    type: _actionTypes.MAP.REMOVE_FEATURES,
    sourceName: sourceName,
    filter: filter
  };
}

/** Change the visibility of a given layer in the map state.
 *
 *  @param {string} layerId String id for the layer.
 *  @param {boolean} visibility
 *
 *  @returns {Object} Action object to pass to reducer.
 */
function setLayerVisibility(layerId, visibility) {
  return {
    type: _actionTypes.MAP.SET_LAYER_VISIBILITY,
    layerId: layerId,
    visibility: visibility
  };
}

/** Set a layer visible in a mutually exclusive group.
 *
 *  @param {string} layerId String id for the layer to turn on.
 *  @param {string} groupId String id for the layer group.
 *
 *  @returns {Object} Action object to pass to reducer.
 */
function setLayerInGroupVisible(layerId, groupId) {
  return {
    type: _actionTypes.MAP.SET_LAYER_IN_GROUP_VISIBLE,
    layerId: layerId,
    groupId: groupId
  };
}

/** Change the metadata object in a given layer in the map state.
 *
 *  @param {string} layerId String id for the layer.
 *  @param {string} itemName A key.
 *  @param {number} itemValue A value.
 *
 *  @returns {Object} Action object to pass to reducer.
 */
function setLayerMetadata(layerId, itemName, itemValue) {
  return {
    type: _actionTypes.MAP.SET_LAYER_METADATA,
    layerId: layerId,
    key: itemName,
    value: itemValue
  };
}

/** Set a layer's title in the map state.
 *
 *  @param {string} layerId String id for the layer.
 *  @param {string} title A string representing a layer title.
 *
 *  @returns {Object} Call to setLayerMetadata for a title key.
 */
function setLayerTitle(layerId, title) {
  return setLayerMetadata(layerId, _constants.TITLE_KEY, title);
}

/** Set a layer's time property in the map state.
 *
 *  @param {string} layerId String id for the layer.
 *  @param {*} time The value of time assigned to the layer.
 *
 *  @returns {Object} Call to setLayerMetadata for a time key.
 */
function setLayerTime(layerId, time) {
  return setLayerMetadata(layerId, _constants.TIME_KEY, time);
}

/** Receive a Mapbox GL style object.
 *
 *  @param {Object} context Mapbox GL style object to populate the map state.
 *
 *  @returns {Object} Action object to pass to reducer.
 */
function receiveContext(context) {
  return {
    type: _actionTypes.MAP.RECEIVE_CONTEXT,
    context: context
  };
}

/** Thunk action creator to set the map state from a provided context object.
 *
 *  @param {Object} options A context object that must provide a Mapbox GL json
 *  object either via a json property or a from a url fetch.
 *
 *  @returns {Promise} A Promise object.
 */
function setContext(options) {
  return function (dispatch) {
    if (options.url) {
      return (0, _isomorphicFetch2.default)(options.url).then(function (response) {
        return response.json();
      }, function (error) {
        return console.error('An error occured.', error);
      }).then(function (json) {
        return dispatch(receiveContext(json));
      });
    } else if (options.json) {
      return new Promise(function (resolve) {
        dispatch(receiveContext(options.json));
        resolve();
      });
    }
    return new Promise(function (resolve, reject) {
      reject('Invalid option for setContext. Specify either json or url.');
    });
  };
}

/** Rearrange a layer in the list.
 *
 *  @param {string} layerId the layer to move.
 *  @param {string} targetLayerId The ID of the layer to move the layerId BEFORE.
 *                       When null or undefined, moves the layer to the end
 *                       of the list.
 *
 *  @returns {Object} An action object.
 */
function orderLayer(layerId, targetLayerId) {
  return {
    type: _actionTypes.MAP.ORDER_LAYER,
    layerId: layerId,
    targetId: targetLayerId
  };
}

/** Set the sprite for the map.
 *
 *  @param {string} spriteRoot The URI to the sprite data without the .json/.png suffix.
 *
 *  @returns {Object} An action object.
 */
function setSprite(spriteRoot) {
  return {
    type: _actionTypes.MAP.SET_SPRITE,
    sprite: spriteRoot
  };
}

/** Update the map's metadata.
 *
 *  @param {Object} metadata An object containing new/updated metadata.
 *
 *  @returns {Object} An action object.
 */
function updateMetadata(metadata) {
  return {
    type: _actionTypes.MAP.UPDATE_METADATA,
    metadata: metadata
  };
}

/** Manually update a source.
 *
 *  @param {string} sourceName The name of the source to be updated.
 *  @param {Object} update The changes to the sourceDef to apply.
 *
 *  @returns {Object} An action object to pass to the reducer
 */
function updateSource(sourceName, update) {
  return {
    type: _actionTypes.MAP.UPDATE_SOURCE,
    sourceName: sourceName,
    sourceDef: update
  };
}

function toggleGraticule() {
  return {
    type: _actionTypes.MAP.TOGGLE_GRATICULE
  };
}

/** Set the time of the map.
 *
 *  @param {string} time An ISO date time string.
 *
 *  @returns {Object} An action object.
 */
function setMapTime(time) {
  var metadata = {};
  metadata[_constants.TIME_KEY] = time;
  return updateMetadata(metadata);
}