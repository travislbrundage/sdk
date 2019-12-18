'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SdkLayerListItem = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _util = require('../util');

var _map = require('../actions/map');

var mapActions = _interopRequireWildcard(_map);

var _constants = require('../constants');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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

/** SDK Layerlist Component
 */

var SdkLayerListItem = exports.SdkLayerListItem = function (_React$Component) {
  _inherits(SdkLayerListItem, _React$Component);

  function SdkLayerListItem() {
    _classCallCheck(this, SdkLayerListItem);

    return _possibleConstructorReturn(this, (SdkLayerListItem.__proto__ || Object.getPrototypeOf(SdkLayerListItem)).apply(this, arguments));
  }

  _createClass(SdkLayerListItem, [{
    key: 'moveLayer',
    value: function moveLayer(layerId, targetId) {
      this.props.dispatch(mapActions.orderLayer(layerId, targetId));
    }
  }, {
    key: 'moveLayerUp',
    value: function moveLayerUp() {
      var layer_id = this.props.layer.id;
      var index = (0, _util.getLayerIndexById)(this.props.layers, layer_id);
      if (index < this.props.layers.length - 1) {
        this.moveLayer(this.props.layers[index + 1].id, layer_id);
      }
    }
  }, {
    key: 'moveLayerDown',
    value: function moveLayerDown() {
      var layer_id = this.props.layer.id;
      var index = (0, _util.getLayerIndexById)(this.props.layers, layer_id);
      if (index > 0) {
        this.moveLayer(layer_id, this.props.layers[index - 1].id);
      }
    }
  }, {
    key: 'removeLayer',
    value: function removeLayer() {
      this.props.dispatch(mapActions.removeLayer(this.props.layer.id));
    }
  }, {
    key: 'toggleVisibility',
    value: function toggleVisibility() {
      var shown = (0, _util.isLayerVisible)(this.props.layer);
      if (this.props.exclusive) {
        this.props.dispatch(mapActions.setLayerInGroupVisible(this.props.layer.id, this.props.groupId));
      } else {
        this.props.dispatch(mapActions.setLayerVisibility(this.props.layer.id, shown ? 'none' : 'visible'));
      }
    }
  }, {
    key: 'getVisibilityControl',
    value: function getVisibilityControl() {
      var _this2 = this;

      var layer = this.props.layer;
      var is_checked = (0, _util.isLayerVisible)(layer);
      if (this.props.exclusive) {
        return _react2.default.createElement('input', {
          type: 'radio',
          name: this.props.groupId,
          onChange: function onChange() {
            _this2.toggleVisibility();
          },
          checked: is_checked
        });
      } else {
        return _react2.default.createElement('input', {
          type: 'checkbox',
          onChange: function onChange() {
            _this2.toggleVisibility();
          },
          checked: is_checked
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var layer = this.props.layer;
      var checkbox = this.getVisibilityControl();
      return _react2.default.createElement(
        'li',
        { className: 'sdk-layer', key: layer.id },
        _react2.default.createElement(
          'span',
          { className: 'sdk-checkbox' },
          checkbox
        ),
        _react2.default.createElement(
          'span',
          { className: 'sdk-name' },
          (0, _util.getLayerTitle)(this.props.layer)
        )
      );
    }
  }]);

  return SdkLayerListItem;
}(_react2.default.Component);

SdkLayerListItem.PropTypes = {
  exclusive: _propTypes2.default.bool,
  groupId: _propTypes2.default.string,
  layer: _propTypes2.default.shape({
    id: _propTypes2.default.string
  }).isRequired
};

var SdkLayerList = function (_React$Component2) {
  _inherits(SdkLayerList, _React$Component2);

  function SdkLayerList(props) {
    _classCallCheck(this, SdkLayerList);

    var _this3 = _possibleConstructorReturn(this, (SdkLayerList.__proto__ || Object.getPrototypeOf(SdkLayerList)).call(this, props));

    _this3.layerClass = (0, _reactRedux.connect)()(_this3.props.layerClass);
    return _this3;
  }

  _createClass(SdkLayerList, [{
    key: 'render',
    value: function render() {
      var className = 'sdk-layer-list';
      if (this.props.className) {
        className = className + ' ' + this.props.className;
      }
      var i = void 0;
      var layers = [];
      var groups = this.props.metadata ? this.props.metadata[_constants.GROUPS_KEY] : undefined;
      var layersHash = {};
      if (groups) {
        for (var key in groups) {
          var children = [];
          for (i = this.props.layers.length - 1; i >= 0; i--) {
            var item = this.props.layers[i];
            if (item.metadata && item.metadata[_constants.GROUP_KEY] === key) {
              layersHash[item.id] = true;
              children.push(_react2.default.createElement(this.layerClass, { exclusive: groups[key].exclusive, groupId: key, key: i, layers: this.props.layers, layer: item }));
            }
          }
          if (children.length > 0) {
            layers.push(_react2.default.createElement(
              'li',
              { key: key },
              groups[key].name,
              _react2.default.createElement(
                'ul',
                null,
                children
              )
            ));
          }
        }
      }
      for (i = this.props.layers.length - 1; i >= 0; i--) {
        var layer = this.props.layers[i];
        if (!layersHash[layer.id]) {
          layers.push(_react2.default.createElement(this.layerClass, { key: i, layers: this.props.layers, layer: layer }));
        }
      }
      return _react2.default.createElement(
        'ul',
        { style: this.props.style, className: className },
        layers
      );
    }
  }]);

  return SdkLayerList;
}(_react2.default.Component);

SdkLayerList.propTypes = {
  layerClass: _propTypes2.default.func,
  layers: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    id: _propTypes2.default.string
  })).isRequired,
  style: _propTypes2.default.object,
  className: _propTypes2.default.string
};

SdkLayerList.defaultProps = {
  layerClass: SdkLayerListItem
};

function mapStateToProps(state) {
  return {
    layers: state.map.layers,
    metadata: state.map.metadata
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(SdkLayerList);