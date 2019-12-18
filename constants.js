'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
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

/**
 *  A collection of useful constants.
 *  @ignore
 */

var LAYER_VERSION_KEY = exports.LAYER_VERSION_KEY = 'bnd:layer-version';
var SOURCE_VERSION_KEY = exports.SOURCE_VERSION_KEY = 'bnd:source-version';
var TITLE_KEY = exports.TITLE_KEY = 'bnd:title';
var TIME_KEY = exports.TIME_KEY = 'bnd:time';
var TIME_ATTRIBUTE_KEY = exports.TIME_ATTRIBUTE_KEY = 'bnd:timeattribute';
var DATA_VERSION_KEY = exports.DATA_VERSION_KEY = 'bnd:data-version';
var GROUPS_KEY = exports.GROUPS_KEY = 'mapbox:groups';
var GROUP_KEY = exports.GROUP_KEY = 'mapbox:group';

var DEFAULT_ZOOM = exports.DEFAULT_ZOOM = {
  MIN: 0,
  MAX: 28
};

var INTERACTIONS = exports.INTERACTIONS = {
  modify: 'Modify',
  select: 'Select',
  point: 'Point',
  line: 'LineString',
  polygon: 'Polygon',
  box: 'Box',
  measure_point: 'measure:Point',
  measure_line: 'measure:LineString',
  measure_polygon: 'measure:Polygon'
};

// useful for deciding what is or is not a drawing interaction
INTERACTIONS.drawing = [INTERACTIONS.point, INTERACTIONS.line, INTERACTIONS.polygon, INTERACTIONS.box];

// determine which is a measuring interaction
INTERACTIONS.measuring = [INTERACTIONS.measure_point, INTERACTIONS.measure_line, INTERACTIONS.measure_polygon];

exports.default = {
  LAYER_VERSION_KEY: LAYER_VERSION_KEY,
  SOURCE_VERSION_KEY: SOURCE_VERSION_KEY,
  TITLE_KEY: TITLE_KEY,
  TIME_KEY: TIME_KEY,
  GROUP_KEY: GROUP_KEY,
  GROUPS_KEY: GROUPS_KEY,
  TIME_ATTRIBUTE_KEY: TIME_ATTRIBUTE_KEY,
  DATA_VERSION_KEY: DATA_VERSION_KEY,
  INTERACTIONS: INTERACTIONS,
  DEFAULT_ZOOM: DEFAULT_ZOOM
};