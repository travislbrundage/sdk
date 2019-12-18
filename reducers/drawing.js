'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = drawingReducer;

var _actionTypes = require('../action-types');

var defaultState = {
  interaction: null,
  sourceName: null,
  measureFeature: null,
  measureSegments: null
};

/** Update the state to indicate an interaction has started.
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

/** @module reducers/drawing
 * @desc Drawing Reducer
 *
 *  This initiates drawing on the map and can track
 *  changes as they are made.
 *
 */

function startDrawing(state, action) {
  return {
    interaction: action.interaction,
    sourceName: action.sourceName,
    measureFeature: null,
    measureSegments: null
  };
}

/** Drawing reducer.
 *  @param {Object} state The redux state.
 *  @param {Object} action The selected action object.
 *
 *  @returns {Object} The new state object.
 */
function drawingReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments[1];

  switch (action.type) {
    case _actionTypes.DRAWING.END:
      // when interaction is null, drawing should cease.
      return { interaction: null, sourceName: null, measureFeature: null, measureSegments: null };
    case _actionTypes.DRAWING.START:
      return startDrawing(state, action);
    case _actionTypes.DRAWING.SET_MEASURE_FEATURE:
      return Object.assign({}, state, {
        measureFeature: action.feature,
        measureSegments: action.segments
      });
    case _actionTypes.DRAWING.CLEAR_MEASURE_FEATURE:
      return Object.assign({}, state, {
        measureFeature: null,
        measureSegments: null
      });
    default:
      return state;
  }
}