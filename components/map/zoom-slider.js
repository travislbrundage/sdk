'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _map = require('../../actions/map');

var mapActions = _interopRequireWildcard(_map);

var _constants = require('../../constants');

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

var ZoomSlider = function (_React$Component) {
  _inherits(ZoomSlider, _React$Component);

  function ZoomSlider() {
    _classCallCheck(this, ZoomSlider);

    return _possibleConstructorReturn(this, (ZoomSlider.__proto__ || Object.getPrototypeOf(ZoomSlider)).apply(this, arguments));
  }

  _createClass(ZoomSlider, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var className = 'sdk-zoom-slider';
      if (this.props.className) {
        className += ' ' + this.props.className;
      }
      return _react2.default.createElement(
        'div',
        { className: 'sdk-slider-control' },
        _react2.default.createElement('input', { style: this.props.style, className: className, min: this.props.minZoom, max: this.props.maxZoom, value: this.props.zoom, onChange: function onChange(evt) {
            _this2.props.onChange(evt.target.value);
          }, type: 'range' })
      );
    }
  }]);

  return ZoomSlider;
}(_react2.default.Component);

ZoomSlider.propTypes = {
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  minZoom: _propTypes2.default.number,
  maxZoom: _propTypes2.default.number
};

ZoomSlider.defaultProps = {
  minZoom: _constants.DEFAULT_ZOOM.MIN,
  maxZoom: _constants.DEFAULT_ZOOM.MAX
};

function mapStateToProps(state) {
  return {
    zoom: state.map.zoom
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onChange: function onChange(value) {
      dispatch(mapActions.setZoom(value));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ZoomSlider);