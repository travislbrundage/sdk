'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startDrawing = startDrawing;
exports.startModify = startModify;
exports.startSelect = startSelect;
exports.endDrawing = endDrawing;
exports.endModify = endModify;
exports.endSelect = endSelect;
exports.startMeasure = startMeasure;
exports.setMeasureFeature = setMeasureFeature;
exports.clearMeasureFeature = clearMeasureFeature;

var _actionTypes = require('../action-types');

var _constants = require('../constants');

/** Action to start an interaction on the map.
 *  @param {string} sourceName The name of the source on which the action takes place.
 *  @param {string} drawingType The type of drawing interaction.
 *
 *  @returns {Object} An action object to pass to the reducer.
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

/** @module actions/drawing
 * @desc Actions for interacting with the map.
 */

function startDrawing(sourceName, drawingType) {
  return {
    type: _actionTypes.DRAWING.START,
    interaction: drawingType,
    sourceName: sourceName
  };
}

/** Short-hand action to start modify-feature
 *  @param {string} sourceName The name of the source to modify.
 *
 *  @returns {Object} Call to startDrawing()
 */
function startModify(sourceName) {
  return startDrawing(sourceName, _constants.INTERACTIONS.modify);
}

/** Short-hand action to start select-feature
 *  @param {string} sourceName The name of the source on which the feature to select is found.
 *
 *  @returns {Object} Call to startDrawing()
 */
function startSelect(sourceName) {
  return startDrawing(sourceName, _constants.INTERACTIONS.select);
}

/** Stop drawing / select / modify
 *  @returns {Object} An action object to pass to the reducer.
 */
function endDrawing() {
  return {
    type: _actionTypes.DRAWING.END
  };
}

/** These are just aliases to end drawing.
 *  @returns {Object} Call to endDrawing().
 */
function endModify() {
  return endDrawing();
}

/** These are just aliases to end drawing.
 *  @returns {Object} Call to endDrawing().
 */
function endSelect() {
  return endDrawing();
}

/** Start measuring.
 *  @param {string} interaction Type of interation.
 *
 *  @returns {Object} Call to startDrawing().
 */
function startMeasure(interaction) {
  return startDrawing(null, interaction);
}

/** Set a measurement feature.
 *
 *  This is called each time the feature is updated.
 *
 *  @param {Object} feature  The feature in WGS84.
 *  @param {number[]} segments Array of the incremental measurements in meters.
 *                    [] for a Point, [total_area] for a polygon.
 *
 *  @returns {Object} A measurement action.
 */
function setMeasureFeature(feature, segments) {
  return {
    type: _actionTypes.DRAWING.SET_MEASURE_FEATURE,
    feature: feature,
    segments: segments
  };
}

/** Clear the measurement feature.
 *  @returns {Object} An action object to pass to the reducer.
 */
function clearMeasureFeature() {
  return {
    type: _actionTypes.DRAWING.CLEAR_MEASURE_FEATURE
  };
}