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
import ColorPicker from './ColorPicker';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import classNames from 'classnames';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import {intlShape, defineMessages, injectIntl} from 'react-intl';
import Subheader from 'material-ui/Subheader';
import {ListItem} from 'material-ui/List';

const messages = defineMessages({
  header: {
    id: 'labeleditor.header',
    description: 'Main header',
    defaultMessage: 'Label'
  },
  attributelabel: {
    id: 'labeleditor.attributelabel',
    description: 'Label for the attribute select combo',
    defaultMessage: 'Attribute'
  },
  fillcolorlabel: {
    id: 'labeleditor.fillcolorlabel',
    description: 'Label for fill color picker',
    defaultMessage: 'Font color'
  },
  sizelabel: {
    id: 'labeleditor.sizelabel',
    description: 'Label for the font size input',
    defaultMessage: 'Font size'
  },
  emptytext: {
    id: 'labeleditor.emptytext',
    description: 'Empty text for the attribute combo',
    defaultMessage: 'Select an attribute'
  }
});

/**
 * Editor for label properties. Can edit the label attribute, fontSize and fontColor.
 *
 * ```xml
 * <LabelEditor attributes={this.props.attributes} onChange={this.props.onChange} />
 * ```
 */
class LabelEditor extends React.PureComponent {
  static propTypes = {
    /**
     * List of attributes.
     */
    attributes: React.PropTypes.array.isRequired,
    /**
     * Callback that is called when a change is made.
     */
    onChange: React.PropTypes.func.isRequired,
    /**
     * Initial font color.
     */
    initialFontColor: React.PropTypes.object,
    /**
     * Initial font size.
     */
    initialFontSize: React.PropTypes.string,
    /**
     * Initial label attribute.
     */
    initialLabelAttribute: React.PropTypes.string,
    /**
     * Css class name to apply on the root element of this component.
     */
    className: React.PropTypes.string,
    /**
     * Style config.
     */
    style: React.PropTypes.object,
    /**
    * @ignore
    */
    intl: intlShape.isRequired
  };

  static childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired
  };

  static defaultProps = {
    initialLabelAttribute: null,
    initialFontSize: '12',
    initialFontColor: {
      rgb: {
        r: 0,
        g: 0,
        b: 0,
        a: 1
      },
      hex: '#000000'
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      labelAttribute: this.props.initialLabelAttribute,
      fontSize: this.props.initialFontSize,
      fontColor: this.props.initialFontColor
    };
  }
  _onItemChange(evt, idx, value) {
    this.setState({labelAttribute: value}, function() {
      this.props.onChange(this.state);
    });
  }
  _onChangeFontSize(evt) {
    this.setState({fontSize: evt.currentTarget.value}, function() {
      this.props.onChange(this.state);
    });
  }
  _onChangeFill(color) {
    this.setState({fontColor: color}, function() {
      this.props.onChange(this.state);
    });
  }
  render() {
    const {formatMessage} = this.props.intl;
    const listStyle = {
      padding: '0px 16px',
      marginLeft: 0
    };
    const boxStyle = {
      marginLeft: 0
    };
    var attributeItems = [];
    attributeItems.push(<MenuItem key={0} style={{'minHeight':'32px'}} value={null} primaryText={' '} />);
    for (var i = 0, ii = this.props.attributes.length; i < ii; ++i) {
      var attribute = this.props.attributes[i];
      attributeItems.push(<MenuItem key={i + 1} value={attribute} primaryText={attribute} />);
    }
    return (
      <Paper style={this.props.style} zDepth={0} className={classNames('sdk-component label-editor style-contentContainer', this.props.className)}>
        <Subheader className='style-listHeader'>{formatMessage(messages.header)}</Subheader>
        <ListItem insetChildren={true} innerDivStyle={ listStyle }>
          <SelectField floatingLabelFixed={true} fullWidth={true} floatingLabelText={formatMessage(messages.attributelabel)} hintText={formatMessage(messages.emptytext)} value={this.state.labelAttribute} onChange={this._onItemChange.bind(this)}>
            {attributeItems}
          </SelectField>
        </ListItem>
        <ListItem insetChildren={true} innerDivStyle={ listStyle }>
          <TextField fullWidth={true} floatingLabelFixed={true} defaultValue={this.state.fontSize} floatingLabelText={formatMessage(messages.sizelabel)} onChange={this._onChangeFontSize.bind(this)} />
        </ListItem>
        <ListItem innerDivStyle={ boxStyle } primaryText={formatMessage(messages.fillcolorlabel)} rightIconButton={ <ColorPicker onChange={this._onChangeFill.bind(this)} initialColor={this.state.fontColor} /> } />
      </Paper>
    );
  }
}

export default injectIntl(LabelEditor);
