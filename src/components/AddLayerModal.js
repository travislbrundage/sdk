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
import Dropzone from 'react-dropzone';
import util from '../util';
import ol from 'openlayers';
import Snackbar from 'material-ui/Snackbar';
import {defineMessages, injectIntl, intlShape} from 'react-intl';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Button from './Button';
import MenuItem from 'material-ui/MenuItem';
import Dialog from './Dialog';
import SelectField from 'material-ui/SelectField';
import WMSService from '../services/WMSService';
import WFSService from '../services/WFSService';
import ArcGISRestService from '../services/ArcGISRestService';
import WMTSService from '../services/WMTSService';
import FontIcon from 'material-ui/FontIcon';
import CircularProgress from 'material-ui/CircularProgress';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FillEditor from './FillEditor';
import StrokeEditor from './StrokeEditor';
import FeatureStore from '../stores/FeatureStore';
import './AddLayerModal.css';


const newOption = 'NEW';
const uploadOption = 'UPLOAD';
const createOption = 'CREATE';
const ID_PREFIX = 'sdk-addlayer-';

const messages = defineMessages({
  servertypelabel: {
    id: 'addlayermodal.servertypelabel',
    description: 'Label for the combo for server type',
    defaultMessage: 'Type'
  },
  createtitlehinttext: {
    id: 'addlayermodal.createtitlehinttext',
    description: 'Hint text for the layer title field',
    defaultMessage: 'Enter layer title'
  },
  createtitlelabeltext: {
    id: 'addlayermodal.createtitlelabeltext',
    description: 'Label text for layer title field',
    defaultMessage: 'Layer title'
  },
  attributeslabel: {
    id: 'addlayermodal.attributeslabel',
    description: 'Label for attributes input field',
    defaultMessage: 'Attributes (comma-separated names)'
  },
  attributeshint: {
    id: 'addlayermodal.attributeshint',
    description: 'Hint text for attributes input field',
    defaultMessage: 'Use comma-separated names'
  },
  selectlayercombo: {
    id: 'addlayermodal.selectlayercombo',
    description: 'Text for select layer combo box',
    defaultMessage: 'Select layer'
  },
  sourcecombo: {
    id: 'addlayermodal.sourcecombo',
    description: 'Text for source combo box',
    defaultMessage: 'Select layer source'
  },
  newservername: {
    id: 'addlayermodal.newservername',
    description: 'Title for new server name text field',
    defaultMessage: 'Name'
  },
  newservernamehint: {
    id: 'addlayermodal.newservernamehint',
    description: 'Hint text for new server name text field',
    defaultMessage: 'Enter server name'
  },
  newserverurl: {
    id: 'addlayermodal.newserverurl',
    description: 'Title for new server url text field',
    defaultMessage: 'URL'
  },
  newserverurlhint: {
    id: 'addlayermodal.newserverurlhint',
    description: 'Hint text for new server url text field',
    defaultMessage: 'Enter server URL'
  },
  newservermodaltitle: {
    id: 'addlayermodal.newservermodaltitle',
    description: 'Modal title for add new server',
    defaultMessage: 'Add Server'
  },
  addserverbutton: {
    id: 'addlayermodal.addserverbutton',
    description: 'Text for add server button',
    defaultMessage: 'Add'
  },
  refresh: {
    id: 'addlayermodal.refresh',
    description: 'Refresh tooltip',
    defaultMessage: 'Refresh Layers'
  },
  title: {
    id: 'addlayermodal.title',
    description: 'Title for the modal Add layer dialog',
    defaultMessage: 'New Layer'
  },
  nolayertitle: {
    id: 'addlayermodal.nolayertitle',
    description: 'Title to show if layer has no title',
    defaultMessage: 'No Title'
  },
  errormsg: {
    id: 'addlayermodal.errormsg',
    description: 'Error message to show the user when an XHR request fails',
    defaultMessage: 'Error. {msg}'
  },
  corserror: {
    id: 'addlayermodal.corserror',
    description: 'Error message to show the user when an XHR request fails because of CORS or offline',
    defaultMessage: 'Could not connect to the server. Please verify that the server is online and/or CORS is enabled.'
  },
  inputfieldlabel: {
    id: 'addlayermodal.inputfieldlabel',
    description: 'Label for input field',
    defaultMessage: '{serviceType} URL'
  },
  connectbutton: {
    id: 'addlayermodal.connectbutton',
    description: 'Text for connect button',
    defaultMessage: 'Connect'
  },
  addbutton: {
    id: 'addlayermodal.addbutton',
    description: 'Text for the add button',
    defaultMessage: 'Add'
  },
  closebutton: {
    id: 'addlayermodal.closebutton',
    description: 'Text for close button',
    defaultMessage: 'Cancel'
  },
  addserveroption: {
    id: 'addlayermodal.addserveroption',
    description: 'Combo box option for add new server',
    defaultMessage: 'Add New Server'
  },
  uploadoption: {
    id: 'addlayermodal.uploadoption',
    description: 'Combo box option for add local layer',
    defaultMessage: 'Upload Local File'
  },
  createlayeroption: {
    id: 'addlayermodal.createlayeroption',
    description: 'Combo box option for create local layer',
    defaultMessage: 'Create New Layer'
  },
  uploadhinttext: {
    id: 'addlayermodal.uploadhinttext',
    description: 'Hint text for upload',
    defaultMessage: 'Select location'
  },
  uploadlabeltext: {
    id: 'addlayermodal.uploadlabeltext',
    description: 'Label text for upload',
    defaultMessage: 'Filename'
  },
  uploadicontooltip: {
    id: 'addlayermodal.uploadicontooltip',
    description: 'Tooltip for upload icon button',
    defaultMessage: 'Upload file'
  },
  pointgeomtype: {
    id: 'addlayermodal.pointgeomtype',
    description: 'Title for point geometry option in combo box',
    defaultMessage: 'Point'
  },
  linegeomtype: {
    id: 'addlayermodal.linegeomtype',
    description: 'Title for line geometry option in combo box',
    defaultMessage: 'LineString'
  },
  polygeomtype: {
    id: 'addlayermodal.polygeomtype',
    description: 'Title for polygon geometry option in combo box',
    defaultMessage: 'Polygon'
  },
  geometrytypelabel: {
    id: 'addlayermodal.geometrytypelabel',
    description: 'Label for the geometry type combo',
    defaultMessage: 'Geometry type'
  },
  uploadunsupported: {
    id: 'addlayermodal.uploadunsupported',
    description: 'Error message for unsupported upload formats',
    defaultMessage: 'Unsupported format for upload. Only KML, GPX and GeoJSON are supported.'
  },
  uploadunsupportedprojection: {
    id: 'addlayermodal.uploadunsupportedprojection',
    description: 'Error message for unsupported projection',
    defaultMessage: 'Unsupported projection'
  }
});

/**
 * Modal window to add layers from a WMS, WFS, WMTS or ArcGIS REST service.
 *
 * ```xml
 * <AddLayerModal map={map} allowUserInput={true} sources={[{url: '/geoserver/wms', type: 'WMS', title: 'Local GeoServer'}]} />
 * ```
 *
 * ![Add Layer Modal](../AddLayerModal.png)
 */
class AddLayerModal extends React.PureComponent {
  static propTypes = {
    /**
     * The ol3 map to add layers to.
     */
    map: React.PropTypes.instanceOf(ol.Map).isRequired,
    /**
     * Css class name to apply on the dialog.
     */
    className: React.PropTypes.string,
    /**
     * List of sources to use for this dialog. Entries have a title, type and url property. Type can be one of: WMS, WFS, WMTS or ArcGISRest.
     */
    sources: React.PropTypes.arrayOf(React.PropTypes.shape({
      title: React.PropTypes.string.isRequired,
      type: React.PropTypes.string.isRequired,
      url: React.PropTypes.string.isRequired
    })),
    /**
     * If true users can Input new layers
     */
    allowUserInput: React.PropTypes.bool,
    /**
    *  Callback for closing the modal
    */
    onRequestClose: React.PropTypes.func,
    /**
    *  Controls opening the modal
    */
    open : React.PropTypes.bool.isRequired,
    /**
     * Should we allow people to upload their local vector files?
     */
    allowUpload: React.PropTypes.bool,
    /**
     * Should we allow people to create new vector layers?
     */
    allowCreate: React.PropTypes.bool,
    /**
     * Style config
     */
    style: React.PropTypes.object,
    /**
     * @ignore
     */
    intl: intlShape.isRequired
  };

  static contextTypes = {
    muiTheme: React.PropTypes.object,
    proxy: React.PropTypes.string,
    requestHeaders: React.PropTypes.object
  };

  static childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired
  };

  static defaultProps = {
    allowUserInput: false,
    allowUpload: true,
    open: false,
    allowCreate: true
  };
  static formats = {
    'geojson': new ol.format.GeoJSON(),
    'json': new ol.format.GeoJSON(),
    'kml': new ol.format.KML({extractStyles: false}),
    'gpx': new ol.format.GPX()
  };

  constructor(props, context) {
    super(props);
    this._counter = 0;
    this._proxy = context.proxy;
    this._requestHeaders = context.requestHeaders;
    this._muiTheme = context.muiTheme || getMuiTheme();
    this.state = {
      loading: false,
      fileName: '',
      attributes: '',
      newUrl: '',
      newName: '',
      createTitle: '',
      sources: this.props.sources ? this.props.sources.slice() : [],
      newType: AddLayerModal.addNewTypes[0],
      showNew: false,
      showUpload: false,
      source: null,
      error: false,
      errorOpen: false,
      layerInfo: null
    };
  }
  getChildContext() {
    return {muiTheme: this._muiTheme};
  }
  componentWillReceiveProps(props) {
    this.setState({
      fileName: '',
      loading: false,
      source: null,
      layer: null,
      layerInfo: null,
      showNew: false,
      showUpload: false,
      newUrl: '',
      newName: ''
    });
  }
  componentWillUnmount() {
    if (this._request) {
      this._request.abort();
    }
  }
  static addNewTypes = [
    'WMS',
    'WFS',
    'ArcGISRest',
    'WMTS'
  ];
  static services = {
    'WMS': WMSService,
    'WFS': WFSService,
    'ArcGISRest': ArcGISRestService,
    'WMTS': WMTSService
  };
  _getCaps(onFailure) {
    this.setState({loading: true, layerInfo: null});
    var source = this.state.sources[this.state.source];
    var url = source.url;
    var service = AddLayerModal.services[source.type];
    var me = this;
    const {formatMessage} = this.props.intl;
    var failureCb = function(xmlhttp) {
      delete me._request;
      if (!xmlhttp || xmlhttp.status === 0) {
        me._setError(formatMessage(messages.corserror));
      } else {
        me._setError(xmlhttp.status + ' ' + xmlhttp.statusText);
      }
      if (onFailure) {
        onFailure();
      }
    };
    var successCb = function(layerInfo, onlineResource) {
      delete me._request;
      source.getMapUrl = onlineResource;
      me.setState({loading: false, layerInfo: layerInfo});
    };
    me._request = service.getCapabilities(url, successCb, failureCb, this._proxy, this._requestHeaders);
  }
  _setError(msg) {
    this.setState({
      loading: false,
      errorOpen: true,
      error: true,
      layerInfo: null,
      msg: msg
    });
  }
  _getLayerTitle(layer) {
    const {formatMessage} = this.props.intl;
    if (layer.Title === '') {
      return {empty: true, title: formatMessage(messages.nolayertitle)};
    } else {
      return {empty: false, title: layer.Title};
    }
  }
  _onLayerClick(layer) {
    var map = this.props.map;
    var titleObj = this._getLayerTitle(layer);
    var source = this.state.sources[this.state.source];
    var url = source.getMapUrl || source.url;
    var service = AddLayerModal.services[source.type];
    var olLayer = service.createLayer(layer, url, titleObj, map.getView().getProjection(), this._proxy);
    if (olLayer.get('type') === 'base') {
      var foundGroup = false;
      map.getLayers().forEach(function(lyr) {
        if (foundGroup === false && lyr.get('type') === 'base-group') {
          foundGroup = true;
          lyr.getLayers().forEach(function(child) {
            child.setVisible(false);
          });
          lyr.getLayers().push(olLayer);
        }
      });
      if (foundGroup === false) {
        map.addLayer(olLayer);
      }
    } else {
      map.addLayer(olLayer);
    }
    return olLayer;
  }
  _getLayersMarkup(layer, menuItems) {
    if (layer.Layer) {
      layer.Layer.map(function(child) {
        this._getLayersMarkup(child, menuItems);
      }, this);
    }
    var layerTitle = this._getLayerTitle(layer);
    var primaryText;
    if (layerTitle.empty) {
      primaryText = (<div className='layer-title-empty'>{layerTitle.title}</div>);
    } else {
      primaryText = layerTitle.title;
    }
    var search = [layer.Title];
    if (layer.Abstract !== undefined) {
      search.push(layer.Abstract);
    }
    if (layer.KeywordList) {
      search = search.concat(layer.KeywordList);
    }
    if (layer.Name) {
      menuItems.push(
        <MenuItem key={layer.Name} value={layer} primaryText={primaryText} />
      );
    }
  }
  close() {
    this.props.onRequestClose();
  }
  _createLayer() {
    var layerName = this.state.createTitle;
    var geometryType = this.state.geometryType;
    var attributes = this.state.attributes;
    if (layerName !== '') {
      var fill = this.state.fillColor ? new ol.style.Fill({color: util.transformColor(this.state.fillColor)}) : undefined;
      var stroke = this.state.strokeColor ? new ol.style.Stroke({color: util.transformColor(this.state.strokeColor), width: this.state.strokeWidth}) : undefined;
      var style = new ol.style.Style({
        fill: fill,
        stroke: stroke,
        image: (fill || stroke) ? new ol.style.Circle({stroke: stroke, fill: fill, radius: 7}) : undefined
      });
      var layer = new ol.layer.Vector({
        title: layerName,
        id: this._generateId(),
        geometryType: geometryType,
        attributes: attributes.split(','),
        isSelectable: true,
        isRemovable: true,
        style: style,
        source: new ol.source.Vector({wrapX: false, useSpatialIndex: false})
      });
      this.props.map.addLayer(layer);
      FeatureStore.addLayer(layer);
      this.close();
    }
  }
  addLayers() {
    if (this.state.showCreate) {
      this._createLayer();
    } else if (this.state.showUpload) {
      this._readVectorFile();
    } else if (this.state.layer) {
      var layer = this._onLayerClick(this.state.layer);
      var extent = layer.get('EX_GeographicBoundingBox');
      if (extent) {
        var map = this.props.map;
        var view = map.getView();
        map.getView().fit(ol.proj.transformExtent(extent, 'EPSG:4326', view.getProjection()), map.getSize());
      }
      this.close();
    }
  }
  _handleRequestClose() {
    this.setState({
      errorOpen: false
    });
  }
  _onNewTypeChange(evt, idx, value) {
    this.setState({newType: value});
  }
  _onNewUrlBlur() {
    this.addServer();
  }
  _onNewUrlChange(evt, value) {
    this.setState({newUrl: value});
  }
  _onNewNameChange(evt, value) {
    this.setState({newName: value});
  }
  _onSourceChange(evt, idx, value) {
    if (value === createOption) {
      this.setState({layerInfo: null, showNew: false, showUpload: false, showCreate: true, layer: null, source: value});
    } else if (value === uploadOption) {
      this.setState({layerInfo: null, showNew: false, showUpload: true, showCreate: false, layer: null, source: value});
    } else if (value === newOption) {
      this.setState({layerInfo: null, showUpload: false, showNew: true, showCreate: false, layer: null, source: value});
    } else {
      this.setState({layerInfo: null, showUpload: false, showNew: false, showCreate: false, source: value}, function() {
        this._refreshService();
      }, this);
    }
  }
  _refreshService(onFailure) {
    this._getCaps(onFailure);
  }
  addServer() {
    var name = this.state.newName;
    var url = this.state.newUrl;
    var serverType = this.state.newType;
    var sources = this.state.sources.slice();
    if (url.indexOf('http://') === -1 && url.indexOf('https://') === -1 && url[0] !== '/') {
      url = 'http://' + url;
    }
    sources.push({
      title: name,
      type: serverType,
      url: url
    });
    this.setState({source: sources.length - 1, sources: sources}, function() {
      var me = this;
      this._refreshService(function() {
        var sources = me.state.sources.slice();
        sources.splice(-1, 1);
        me.setState({sources: sources, source: sources.length - 1}, function() {
          me._refreshService();
        });
      });
    }, this);
  }
  _onChangeSelectLayer(evt, idx, value) {
    this.setState({
      layer: value
    });
  }
  _readFile(text) {
    this._text = text;
  }
  _generateId() {
    this._counter++;
    return ID_PREFIX + this._counter;
  }
  _readVectorFile() {
    this.setState({
      loading: true
    });
    var me = this;
    const {formatMessage} = this.props.intl;
    global.setTimeout(function() {
      var text = me._text;
      var filename = me.state.fileName;
      if (text && filename) {
        var ext = filename.split('.').pop().toLowerCase();
        var format = AddLayerModal.formats[ext];
        var map = me.props.map;
        if (format) {
          try {
            var crs = format.readProjection(text);
            if (crs === undefined) {
              me.setState({loading: false, error: true, fileName: '', errorOpen: true, msg: formatMessage(messages.uploadunsupportedprojection)});
              return;
            }
            var features = format.readFeatures(text, {dataProjection: crs,
              featureProjection: map.getView().getProjection()});
            if (features && features.length > 0) {
              var fill = me.state.hasFill ? new ol.style.Fill({color: util.transformColor(me.state.fillColor)}) : undefined;
              var stroke = me.state.hasStroke ? new ol.style.Stroke({color: util.transformColor(me.state.strokeColor), width: me.state.strokeWidth}) : undefined;
              var style = new ol.style.Style({
                fill: fill,
                stroke: stroke,
                image: new ol.style.Circle({stroke: stroke, fill: fill, radius: 7})
              });
              me._counter++;
              var feature = features[0];
              var attributes = feature.getKeys();
              attributes.splice(attributes.indexOf(feature.getGeometryName()), 1);
              var geom = feature.getGeometry();
              var geomType;
              if (geom instanceof ol.geom.Polygon || geom instanceof ol.geom.MultiPolygon) {
                geomType = 'Polygon';
              } else if (geom instanceof ol.geom.LineString || geom instanceof ol.geom.MultiLineString) {
                geomType = 'Line';
              } else if (geom instanceof ol.geom.Point || geom instanceof ol.geom.MultiPoint) {
                geomType = 'Point';
              }
              var lyr = new ol.layer.Vector({
                id: me._generateId(),
                attributes: attributes,
                geometryType: geomType,
                style: style,
                source: new ol.source.Vector({
                  features: features,
                  wrapX: false
                }),
                title: filename,
                isRemovable: true,
                isSelectable: true
              });
              map.addLayer(lyr);
              FeatureStore.addLayer(lyr);
              var extent = lyr.getSource().getExtent();
              var valid = true;
              for (var i = 0, ii = extent.length; i < ii; ++i) {
                var value = extent[i];
                if (Math.abs(value) == Infinity || isNaN(value) || (value < -20037508.342789244 || value > 20037508.342789244)) {
                  valid = false;
                  break;
                }
              }
              if (valid) {
                map.getView().fit(extent, map.getSize());
              }
              me.close();
            }
          } catch (e) {
            me.setState({loading: false, error: true, fileName: '', errorOpen: true, msg: e.message});
          }
        }
      }
    }, 0);
  }
  _onDrop(files) {
    const {formatMessage} = this.props.intl;
    if (files.length === 1) {
      var r = new FileReader(), file = files[0];
      var me = this;
      var ext = file.name.split('.').pop().toLowerCase();
      var format = AddLayerModal.formats[ext];
      if (format) {
        this.setState({fileName: file.name});
        r.onload = function(e) {
          me._readFile(e.target.result);
        };
        r.readAsText(file);
      } else {
        me.setState({error: true, errorOpen: true, msg: formatMessage(messages.uploadunsupported)});
      }
    }
  }
  _onChangeFill(state) {
    this.setState(state);
  }
  _onChangeStroke(state) {
    this.setState(state);
  }
  _changeGeometryType(evt, idx, value) {
    this.setState({
      geometryType: value
    });
  }
  _onChangeCreateTitle(evt, value) {
    this.setState({
      createTitle: value
    });
  }
  _onChangeAttributes(evt, value) {
    this.setState({
      attributes: value
    });
  }
  render() {
    const {formatMessage} = this.props.intl;
    var selectOptions = this.state.sources.map(function(source, idx) {
      return (<MenuItem key={idx} value={idx} primaryText={source.title} />);
    });
    var typeOptions = AddLayerModal.addNewTypes.map(function(newType) {
      return (<MenuItem key={newType} value={newType} primaryText={newType} />);
    });
    if (this.props.allowUpload) {
      selectOptions.push(<MenuItem key={uploadOption} value={uploadOption} primaryText={formatMessage(messages.uploadoption)} />);
    }
    if (this.props.allowCreate) {
      selectOptions.push(<MenuItem key={createOption} value={createOption} primaryText={formatMessage(messages.createlayeroption)} />);
    }
    if (this.props.allowUserInput) {
      selectOptions.push(<MenuItem key={newOption} value={newOption} primaryText={formatMessage(messages.addserveroption)} />);
    }
    var layers, layerMenuItems = [];
    if (this.state.layerInfo) {
      this._getLayersMarkup(this.state.layerInfo, layerMenuItems);
      layers = <SelectField fullWidth={true} value={this.state.layer} onChange={this._onChangeSelectLayer.bind(this)} floatingLabelText={formatMessage(messages.selectlayercombo)}>{layerMenuItems}</SelectField>;
    }
    var loadingIndicator;
    if (this.state.loading === true) {
      loadingIndicator = (<CircularProgress size={50} thickness={3} />);
    }
    var error;
    if (this.state.error === true) {
      error = (<Snackbar
        autoHideDuration={5000}
        style={{transitionProperty : 'none'}}
        bodyStyle={{lineHeight: '24px', height: 'auto'}}
        open={this.state.errorOpen}
        message={formatMessage(messages.errormsg, {msg: this.state.msg})}
        onRequestClose={this._handleRequestClose.bind(this)}
      />);
    }
    var actions = [
      <Button key='closeButton' buttonType='Flat' label={formatMessage(messages.closebutton)} onTouchTap={this.close.bind(this)} />,
      <Button key='saveButton' buttonType='Flat' primary={true} label={formatMessage(messages.addbutton)} onTouchTap={this.addLayers.bind(this)} />
    ];
    var create;
    if (this.state.showCreate) {
      create = (<div className='noBorderPaper'>
        <TextField
          value={this.state.createTitle}
          floatingLabelFixed={true}
          onChange={this._onChangeCreateTitle.bind(this)}
          hintText={formatMessage(messages.createtitlehinttext)}
          floatingLabelText={formatMessage(messages.createtitlelabeltext)}
          fullWidth={true}
        />
        <SelectField fullWidth={true} value={this.state.geometryType} onChange={this._changeGeometryType.bind(this)} floatingLabelText={formatMessage(messages.geometrytypelabel)}>
          <MenuItem key='Point' value='Point' primaryText={formatMessage(messages.pointgeomtype)} />
          <MenuItem key='LineString' value='LineString' primaryText={formatMessage(messages.linegeomtype)} />
          <MenuItem key='Polygon' value='Polygon' primaryText={formatMessage(messages.polygeomtype)} />
        </SelectField>
        <TextField fullWidth={true} floatingLabelFixed={true} value={this.state.attributes} hintText={formatMessage(messages.attributeshint)} floatingLabelText={formatMessage(messages.attributeslabel)} onChange={this._onChangeAttributes.bind(this)} />
        <FillEditor disabled={true} onChange={this._onChangeFill.bind(this)} intl={this.props.intl}/>
        <StrokeEditor disabled={true} onChange={this._onChangeStroke.bind(this)}  intl={this.props.intl}/>
      </div>);
    }
    var upload;
    if (this.state.showUpload) {
      upload = (<div>
        <div className='addLayer-fileField'>
          <Dropzone accept='.json,.geojson,.kml,.gpx' className='dropzone' multiple={false} onDrop={this._onDrop.bind(this)}>
          <TextField
            value={this.state.fileName}
            floatingLabelFixed={true}
            hintText={formatMessage(messages.uploadhinttext)}
            floatingLabelText={formatMessage(messages.uploadlabeltext)}
            fullWidth={true}
          />
          <IconButton tooltip={formatMessage(messages.uploadicontooltip)} tooltipPosition='top-left' className='icon'>
            <FontIcon className='ms ms-directory' />
          </IconButton>
          </Dropzone>
        </div>
        <FillEditor className='addLayer-colorPicker' disabled={true} onChange={this._onChangeFill.bind(this)} intl={this.props.intl} />
        <StrokeEditor disabled={true} onChange={this._onChangeStroke.bind(this)}  intl={this.props.intl}/>
      </div>);
    }
    var newDialog;
    if (this.state.showNew) {
      newDialog = (
        <div>
          <SelectField fullWidth={true} floatingLabelText={formatMessage(messages.servertypelabel)} value={this.state.newType} onChange={this._onNewTypeChange.bind(this)}>{typeOptions}</SelectField>
          <TextField floatingLabelFixed={true} hintText={formatMessage(messages.newservernamehint)} value={this.state.newName} onChange={this._onNewNameChange.bind(this)} fullWidth={true} floatingLabelText={formatMessage(messages.newservername)} />
          <TextField floatingLabelFixed={true} hintText={formatMessage(messages.newserverurlhint)} value={this.state.newUrl} onBlur={this._onNewUrlBlur.bind(this)} onChange={this._onNewUrlChange.bind(this)} fullWidth={true} floatingLabelText={formatMessage(messages.newserverurl)} />
        </div>
      );
    }
    var content = (<div>{newDialog}{upload}{create}{layers}{loadingIndicator}{error}</div>);
    var select = (<SelectField fullWidth={true} floatingLabelText={formatMessage(messages.sourcecombo)} value={this.state.source} onChange={this._onSourceChange.bind(this)}>
                {selectOptions}
              </SelectField>);
    return (
      <Dialog ref='dialog' style={this.props.style} autoScrollBodyContent={true} bodyStyle={{padding: 20}} inline={this.props.inline} title={formatMessage(messages.title)} className='add-layer-modal' actions={actions} open={this.props.open} onRequestClose={this.close.bind(this)}>
       {select}
       {content}
      </Dialog>
    );
  }
}

export default injectIntl(AddLayerModal);
