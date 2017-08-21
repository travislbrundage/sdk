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

/* global Cesium */
import React from 'react';
import ol from 'openlayers';
global.ol = ol;
import {defineMessages, injectIntl, intlShape} from 'react-intl';
import ToolActions from '../actions/ToolActions';
import classNames from 'classnames';
import Button from './Button';
import GlobeIcon from 'material-ui/svg-icons/action/three-d-rotation';
import olcs from 'ol3-cesium';

const messages = defineMessages({
  maptext: {
    id: 'globe.maptext',
    description: 'Tooltip to show to switch to map (2D) mode',
    defaultMessage: 'Switch to map (2D)'
  },
  globetext: {
    id: 'globe.globetext',
    description: 'Tooltip to show to switch to globe (3D) mode',
    defaultMessage: 'Switch to globe (3D)'
  }
});

/**
 * Adds a button to toggle 3D mode.
 * The HTML page of the application needs to include a script tag to cesium:
 *
 * ```html
 * <script src="./resources/ol3-cesium/Cesium.js" type="text/javascript" charset="utf-8"></script>
 * ```
 *
 * ```xml
 * <Globe map={map} />
 * ```
 */
class Globe extends React.PureComponent {
  static propTypes = {
    /**
     * Resolution at which to hide the scalebar in 3D mode
     */
    hideScalebar: React.PropTypes.number,
    /**
     * Position of the tooltip.
     */
    tooltipPosition: React.PropTypes.oneOf(['bottom', 'bottom-right', 'bottom-left', 'right', 'left', 'top-right', 'top', 'top-left']),
    /**
     * The ol3 map instance to work on.
     */
    map: React.PropTypes.instanceOf(ol.Map).isRequired,
    /**
     * Style config.
     */
    style: React.PropTypes.object,
    /**
     * Css class name to apply on the root element of this component.
     */
    className: React.PropTypes.string,
    /**
     * @ignore
     */
    intl: intlShape.isRequired
  };

  static defaultProps = {
    hideScalebar: 78271
  };

  constructor(props, context) {
    super(props);
    this.state = {
      globe: false
    };
  }
  init() {
    var providerUrl = '//assets.agi.com/stk-terrain/world';
    this._ol3d = new olcs.OLCesium({map: this.props.map});
    var scene = this._ol3d.getCesiumScene();
    scene.terrainProvider = new Cesium.CesiumTerrainProvider({
      url: providerUrl
    });
  }
  _toggle() {
    if (!this._ol3d) {
      this.init();
    }
    this._ol3d.setEnabled(!this.state.globe);
    var globe = !this.state.globe;
    if (globe) {
      this._hideOrShowScaleBar.call(this, {target: this.props.map.getView()});
      this.props.map.getView().on('change:resolution', this._hideOrShowScaleBar, this);
      ToolActions.disableAllTools();
    } else {
      this.props.map.getView().un('change:resolution', this._hideOrShowScaleBar, this);
      this._showScaleBar();
      ToolActions.enableAllTools();
    }
    this.setState({globe: globe});
  }
  _hideOrShowScaleBar(evt) {
    if (evt.target.getProjection().getCode() === 'EPSG:3857') {
      if (evt.target.getResolution() > this.props.hideScalebar) {
        this._hideScaleBar();
      } else {
        this._showScaleBar();
      }
    }
  }
  _hideScaleBar() {
    var scaleLine = document.getElementsByClassName('ol-scale-line');
    if (scaleLine.length === 1) {
      scaleLine[0].style.visibility = 'hidden';
    }
  }
  _showScaleBar() {
    var scaleLine = document.getElementsByClassName('ol-scale-line');
    if (scaleLine.length === 1) {
      scaleLine[0].style.visibility = 'inherit';
    }
  }
  render() {
    const {formatMessage} = this.props.intl;
    var icon, tooltip;
    icon = <GlobeIcon />;
    if (this.state.globe) {
      tooltip = formatMessage(messages.maptext);
    } else {
      tooltip = formatMessage(messages.globetext);
    }
    return (
      <Button style={this.props.style} tooltipPosition={this.props.tooltipPosition} buttonType='Action' mini={true} secondary={true} className={classNames('sdk-component globe', this.props.className)} tooltip={tooltip} onTouchTap={this._toggle.bind(this)}>{icon}</Button>
    );
  }
}

export default injectIntl(Globe);
