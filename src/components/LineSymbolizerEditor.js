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
import {intlShape, injectIntl} from 'react-intl';
import Paper from 'material-ui/Paper';
import StrokeEditor from './StrokeEditor';

/**
 * Style editor for a line symbolizer. Can edit stroke properties.
 *
 * ```xml
 * <LineSymbolizerEditor onChange={this._onChange.bind(this)} />
 * ```
 */
class LineSymbolizerEditor extends React.PureComponent {
  static propTypes = {
    /**
     * Callback that is called when a change is made.
     */
    onChange: React.PropTypes.func.isRequired,
    /**
     * Css class name to apply on the root element of this component.
     */
    className: React.PropTypes.string,
    /**
     * Initial state for the line symbolizer.
     */
    initialState: React.PropTypes.object,
    /**
     * Style config.
     */
    style: React.PropTypes.object,
    /**
     * @ignore
     */
    intl: intlShape.isRequired
  };

  render() {
    return (
      <Paper style={this.props.style} zDepth={0} className={classNames('sdk-component line-symbolizer-editor', this.props.className)}>
        <StrokeEditor onChange={this.props.onChange} initialStrokeColor={this.props.initialState ? this.props.initialState.strokeColor : undefined} initialStrokeWidth={this.props.initialState ? this.props.initialState.strokeWidth : undefined} />
      </Paper>
    );
  }
}

export default injectIntl(LineSymbolizerEditor);
