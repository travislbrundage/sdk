'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _react = require('react');

var _reactRedux = require('react-redux');

var _wfs = require('ol/format/wfs');

var _wfs2 = _interopRequireDefault(_wfs);

var _geojson = require('ol/format/geojson');

var _geojson2 = _interopRequireDefault(_geojson);

var _projection = require('ol/proj/projection');

var _projection2 = _interopRequireDefault(_projection);

var _proj = require('ol/proj');

var _proj2 = _interopRequireDefault(_proj);

var _wfs3 = require('../actions/wfs');

var _util = require('../util');

var _actionTypes = require('../action-types');

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

/** @module components/wfs
 * @desc Provides a component which will respond to WFS updates.
 */
var WfsController = function (_Component) {
  _inherits(WfsController, _Component);

  function WfsController(props) {
    _classCallCheck(this, WfsController);

    var _this = _possibleConstructorReturn(this, (WfsController.__proto__ || Object.getPrototypeOf(WfsController)).call(this, props));

    _this.pendingActions = {};

    _this.wfs_format = new _wfs2.default();

    _this.wfs_proj = new _projection2.default({
      code: 'http://www.opengis.net/gml/srs/epsg.xml#4326',
      axisOrientation: 'enu'
    });
    _proj2.default.addEquivalentProjections([_proj2.default.get('EPSG:4326'), _this.wfs_proj]);
    return _this;
  }

  /** Runs the WFS request.
   * @param {Object} props WfsController component's props.
   * @param {string} id The WFS action to run.
   */


  _createClass(WfsController, [{
    key: 'execute',
    value: function execute(props, id) {
      var _this2 = this;

      // only act if the action is not already pending.
      if (this.pendingActions[id] === undefined) {
        // copy the action
        var action = Object.assign({}, props.actions[id]);

        // add it to the queue
        this.pendingActions[id] = action;

        var src = props.sources[action.sourceName];

        // clone the feature, as GeoJSON features have a lot of
        //  depth this ensures all the sub-objects are cloned reasonably.
        var json_feature = (0, _util.jsonClone)(action.feature);
        delete json_feature.properties['bbox'];

        var geom_name = src.geometryName ? src.geometryName : 'geometry';
        var geojson_format = new _geojson2.default({ geometryName: geom_name });
        var feature = geojson_format.readFeature(json_feature, {
          dataProjection: 'EPSG:4326',
          featureProjection: this.wfs_proj
        });

        var actions = {};
        actions[action.type] = [feature];

        var options = {
          featureNS: src.featureNS,
          featurePrefix: src.featurePrefix,
          featureType: src.typeName,
          srsName: 'http://www.opengis.net/gml/srs/epsg.xml#4326'
        };

        // convert this to a WFS call.
        var xml = this.wfs_format.writeTransaction(actions[_actionTypes.WFS.INSERT], actions[_actionTypes.WFS.UPDATE], actions[_actionTypes.WFS.DELETE], options);

        // convert the XML to a string.
        var payload = new XMLSerializer().serializeToString(xml);

        // get the target_url from the service
        var target_url = src.onlineResource;

        // attempt the action,
        (0, _isomorphicFetch2.default)(target_url, {
          method: 'POST',
          body: payload
        }).then(function (response) {
          if (response.ok) {
            return response.text();
          }
        }).catch(function (error) {
          // let the caller know the request has errored.
          _this2.props.onRequestError(error, action, id);
        }).then(function (text) {
          // A 200 does not necessarily mean the
          //  request was successful.  This attempst to
          //  parse the transaction response and then passes
          //  it to onFinishTransaction. Handling is left to the
          //  user.
          var wfs_response = _this2.wfs_format.readTransactionResponse(text);

          // ensure the action is removed from the state
          _this2.props.dispatch((0, _wfs3.finishedAction)(id));
          // remove it from the pending actions
          delete _this2.pendingActions[id];

          _this2.props.onFinishTransaction(wfs_response, action);
        });
      }
    }

    /** Loop through the WFS actions in state and run execute() for each.
     * @param {Object} props WfsController component's props.
     */

  }, {
    key: 'executeActions',
    value: function executeActions(props) {
      var action_ids = Object.keys(props.actions);
      for (var i = 0, ii = action_ids.length; i < ii; i++) {
        this.execute(props, action_ids[i]);
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      // execute all the actions in the state.
      this.executeActions(nextProps);
      // no update
      return false;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.executeActions(this.props);
    }
  }, {
    key: 'render',
    value: function render() {
      // never render anything.
      return false;
    }
  }]);

  return WfsController;
}(_react.Component);

WfsController.defaultProps = {
  actions: {},
  sources: {},
  onFinishTransaction: function onFinishTransaction() {},
  onRequestError: function onRequestError() {}
};

function mapStateToProps(state) {
  return {
    actions: state.wfs.actions,
    sources: state.wfs.sources
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(WfsController);