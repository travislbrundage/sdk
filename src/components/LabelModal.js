/*
 * Copyright 2015-present Boundless Spatial Inc., http://boundlessgeo.com
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and limitations under the License.
 */

import React from 'react';
import ol from 'openlayers';
import Dialog from './Dialog';
import Button from './Button';
import classNames from 'classnames';
import {intlShape, defineMessages, injectIntl} from 'react-intl';
import util from '../util';
import LabelEditor from './LabelEditor';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const messages = defineMessages({
  title: {
    id: 'labelmodal.title',
    description: 'Title for the label modal dialog',
    defaultMessage: 'Label for layer {layer}'
  },
  applybutton: {
    id: 'labelmodal.applybutton',
    description: 'Text for the apply button',
    defaultMessage: 'Apply'
  },
  clearbutton: {
    id: 'labelmodal.clearbutton',
    description: 'Text for the clear button',
    defaultMessage: 'Clear'
  },
  closebutton: {
    id: 'labelmodal.closebutton',
    description: 'Text for close button',
    defaultMessage: 'Close'
  }
});

/**
 * A modal window for applying labels to a vector layer. Only works for local vector layers currently.
 *
 * ```xml
 * <LabelModal layer={this.props.layer} />
 * ```
 */
class LabelModal extends React.PureComponent {
  static propTypes = {
    /**
     * Css class name to apply on the root element of this component.
     */
    className: React.PropTypes.string,
    /**
     * Style config.
     */
    style: React.PropTypes.object,
    /**
     * The layer associated with the style modal.
     */
    layer: React.PropTypes.instanceOf(ol.layer.Vector).isRequired,
    /**
     * @ignore
     */
    intl: intlShape.isRequired
  };

  static contextTypes = {
    muiTheme: React.PropTypes.object
  };

  static childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props);
    this._muiTheme = context.muiTheme || getMuiTheme();
    this.state = {
      attributes: []
    };
  }
  getChildContext() {
    return {muiTheme: this._muiTheme};
  }
  componentDidMount() {
    var source = this.props.layer.getSource();
    if (source && !(source instanceof ol.source.Cluster)) {
      if (source.getState() === 'ready' && source.getFeatures().length > 0) {
        this._getAttributes(source);
      } else {
        source.on('change', function(evt) {
          this._getAttributes(source);
        }, this);
      }
    }
  }
  _getAttributes(source) {
    if (this.state.attributes.length === 0 && source.getState() === 'ready' && source.getFeatures().length > 0) {
      var feature = source.getFeatures()[0];
      if (feature) {
        var geom = feature.getGeometryName();
        var keys = feature.getKeys();
        var idx = keys.indexOf(geom);
        keys.splice(idx, 1);
        this.setState({attributes: keys});
      }
    }
  }
  _setStyleFunction() {
    var layer = this.props.layer;
    var style = layer.getStyle();
    this._style = style;
    this._styleSet = true;
    var me = this;
    layer.setStyle(function(feature, resolution) {
      var rawValue = feature.get(me._labelState.labelAttribute);
      var value = '';
      if (rawValue !== undefined) {
        value += rawValue;
      }
      var text = new ol.style.Text({
        text: value,
        font: me._labelState.fontSize + 'px Calibri,sans-serif',
        fill: new ol.style.Fill({
          color: util.transformColor(me._labelState.fontColor)
        })
      });
      var modifyStyle = function(s) {
        // TODO, see if we can optimize / cache this
        if (s instanceof ol.style.Style) {
          s = [s];
        } else {
          s = s.slice();
        }
        s.push(new ol.style.Style({
          text: text
        }));
        return s;
      };
      if (style instanceof ol.style.Style || Array.isArray(style)) {
        return modifyStyle(style);
      } else {
        var result = style.call(me, feature, resolution);
        return modifyStyle(result);
      }
    });
  }
  _clearLabel() {
    if (this._style) {
      this.props.layer.setStyle(this._style);
      this._styleSet = false;
    }
  }
  _onChangeLabel(labelState) {
    this._labelState = labelState;
  }
  _setLabel() {
    if (!this._styleSet) {
      this._setStyleFunction();
    } else {
      this.props.layer.changed();
    }
  }
  close() {
    this.props.onRequestClose();
  }
  render() {
    const {formatMessage} = this.props.intl;
    var actions = [
      <Button buttonType='Flat' label={formatMessage(messages.closebutton)} onTouchTap={this.close.bind(this)} />,
      <Button buttonType='Flat' label={formatMessage(messages.applybutton)} onTouchTap={this._setLabel.bind(this)} />,
      <Button buttonType='Flat' label={formatMessage(messages.clearbutton)} onTouchTap={this._clearLabel.bind(this)} />
    ];
    return (
      <Dialog style={this.props.style} inline={this.props.inline} open={this.props.open} className={classNames('sdk-component label-modal', this.props.className)} autoScrollBodyContent={true} modal={true} actions={actions} title={formatMessage(messages.title, {layer: this.props.layer.get('title')})} onRequestClose={this.close.bind(this)} >
        <LabelEditor {...this.props} initialState={this._labelState} onChange={this._onChangeLabel.bind(this)} attributes={this.state.attributes} />
      </Dialog>
    );
  }
}

export default injectIntl(LabelModal);
