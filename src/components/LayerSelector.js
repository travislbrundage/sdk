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
import classNames from 'classnames';
import SelectField from 'material-ui/SelectField';
import LayerStore from '../stores/LayerStore';
import MenuItem from 'material-ui/MenuItem';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {defineMessages, injectIntl, intlShape} from 'react-intl';

const messages = defineMessages({
  emptytext: {
    id: 'layerselector.emptytext',
    description: 'Empty text for layer selector',
    defaultMessage: 'Select a layer'
  },
  labeltext: {
    id: 'layerselector.labeltext',
    description: 'Label for combo',
    defaultMessage: 'Layer'
  }
});

/**
 * A combobox to select a layer.
 *
 * ```xml
 * <LayerSelector map={map} layers={layersArray} onChange={this._onChange.bind(this)} />
 * ```
 *
 * ![Layer Selector](../LayerSelector.png)
 * ![Opened Layer Selector](../LayerSelectorOpen.png)
 */
class LayerSelector extends React.PureComponent {
  static propTypes = {
    /**
     * The layers to use.
     */
    layers: React.PropTypes.array.isRequired,
    /**
     * The default value of the layer selector, i.e. the layer to select by default.
     */
    value: React.PropTypes.string,
    /**
     * Change callback function.
     */
    onChange: React.PropTypes.func.isRequired,
    /**
     * Css class name to apply on the root element of this component.
     */
    className: React.PropTypes.string,
    /**
     * Style config.
     */
    style: React.PropTypes.object,
    /**
     * Optional label text for combo box, will override the default.
     */
    labelText: React.PropTypes.string,
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
      value: props.value
    };
  }
  componentWillReceiveProps(props) {
    if (this.props.value !== props.value) {
      this.setState({
        value: props.value
      });
    }
  }
  getChildContext() {
    return {muiTheme: this._muiTheme};
  }
  _onItemChange(evt, index, value) {
    var layer = LayerStore.findLayer(value);
    this.props.onChange.call(this, layer);
    this.setState({value: value});
  }
  render() {
    const {formatMessage} = this.props.intl;
    var selectItems = this.props.layers.map(function(lyr, idx) {
      var title = lyr.get('title'), id = lyr.get('id');
      return (
        <MenuItem key={id} value={id} label={title} primaryText={title} />
      );
    });
    return (
      <SelectField style={this.props.style} className={classNames('sdk-component layer-selector', this.props.className)} floatingLabelFixed={true} floatingLabelText={this.props.labelText ? this.props.labelText : formatMessage(messages.labeltext)} hintText={formatMessage(messages.emptytext)} value={this.state.value} onChange={this._onItemChange.bind(this)}>
        {selectItems}
      </SelectField>
    );
  }
}

export default injectIntl(LayerSelector);
