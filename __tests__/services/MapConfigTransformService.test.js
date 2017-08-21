/* global describe, it, beforeEach, afterEach */

import {assert} from 'chai';
import raf from 'raf';
import ol from 'openlayers';
import MapConfigTransformService from '../../src/services/MapConfigTransformService';

raf.polyfill();

describe('MapConfigTransfrormService', function() {

  var target, map, layers;
  var width = 360;
  var height = 180;

  beforeEach(function(done) {
    target = document.createElement('div');
    var style = target.style;
    style.position = 'absolute';
    style.left = '-1000px';
    style.top = '-1000px';
    style.width = width + 'px';
    style.height = height + 'px';
    layers = [
      new ol.layer.Tile({
        title: 'OSM',
        source: new ol.source.OSM()
      }),
      new ol.layer.Vector({
        title: 'Vector',
        source: new ol.source.Vector({
          url: 'foo.json',
          format: new ol.format.GeoJSON()
        })
      })
    ];
    document.body.appendChild(target);
    map = new ol.Map({
      layers: layers,
      target: target,
      view: new ol.View({
        center: [500, 500],
        resolution: 10
      })
    });
    map.once('postrender', function() {
      done();
    });
  });

  afterEach(function() {
    map.setTarget(null);
    document.body.removeChild(target);
  });

  it('transforms correctly (two-way)', function() {
    var config = {'proxy':'../proxy/?url=','printService':'/geoserver/pdf/','about':{'title':'GeoExplorer Demo Map','abstract':'This is a demonstration of GeoExplorer, an application for assembling and publishing web-based maps. After adding layers to the map, use the \'Publish map\' tool to embed this map in any web page.','contact':'For more information, contact <a href=\'http://boundlessgeo.com\'>Boundless</a>.'},'defaultSourceType':'gxp_wmscsource','sources':{'local':{'url':'/geoserver/ows','title':'Local GeoServer','ptype':'gxp_wmscsource','projection':'EPSG:102113','id':'local','baseParams':{'SERVICE':'WMS','REQUEST':'GetCapabilities','TILED':true,'VERSION':'1.1.1'}},'csw':{'url':'/geoserver/csw','ptype':'gxp_cataloguesource','yx':{'urn:x-ogc:def:crs:EPSG:6.11:4326':true},'projection':'EPSG:102113','id':'csw'},'suite':{'url':'http://v2.suite.opengeo.org/geoserver/ows','title':'Remote Suite GeoServer','projection':'EPSG:102113','id':'suite','baseParams':{'SERVICE':'WMS','REQUEST':'GetCapabilities','TILED':true,'VERSION':'1.1.1'}},'mapquest':{'ptype':'gxp_mapquestsource','projection':'EPSG:102113','id':'mapquest'},'osm':{'ptype':'gxp_osmsource','projection':'EPSG:102113','id':'osm'},'google':{'ptype':'gxp_googlesource','projection':'EPSG:102113','id':'google'},'bing':{'ptype':'gxp_bingsource','projection':'EPSG:102113','id':'bing'},'mapbox':{'ptype':'gxp_mapboxsource','projection':'EPSG:102113','id':'mapbox'},'ol':{'ptype':'gxp_olsource','projection':'EPSG:102113','id':'ol'}},'map':{'projection':'EPSG:102113','layers':[{'source':'osm','name':'mapnik','title':'OpenStreetMap','visibility':true,'opacity':1,'group':'background','fixed':true,'selected':false},{'source':'ol','name':'None','title':'None','visibility':false,'opacity':1,'group':'background','fixed':true,'selected':false,'type':'OpenLayers.Layer','args':['None',{'visibility':false}]},{'source':'local','name':'usa:states','title':'States of the USA','visibility':true,'opacity':1,'selected':true,'capability':{'nestedLayers':[],'styles':[{'name':'states','title':'','abstract':'','legend':{'width':'20','height':'20','format':'image/png','href':'http://localhost:8080/geoserver/wms?request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=usa%3Astates'}}],'srs':{'EPSG:900913':true},'metadataURLs':[],'bbox':{'EPSG:4326':{'bbox':[-179.23023299999997,17.831509000000036,-65.16882499999997,71.437769],'srs':'EPSG:4326'}},'llbbox':[-179.23023299999997,17.831509000000036,-65.16882499999997,71.437769],'dimensions':{},'authorityURLs':{},'identifiers':{},'keywords':['states','census'],'queryable':true,'cascaded':0,'opaque':false,'noSubsets':false,'fixedWidth':0,'fixedHeight':0,'name':'usa:states','title':'States of the USA','abstract':'States of the United Stats of America, including the District of Columbia and Puerto Rico. Data taken from the 2010 Census.','prefix':'usa','formats':['image/png','application/atom xml','application/atom+xml','application/openlayers','application/pdf','application/rss xml','application/rss+xml','application/vnd.google-earth.kml','application/vnd.google-earth.kml xml','application/vnd.google-earth.kml+xml','application/vnd.google-earth.kml+xml;mode=networklink','application/vnd.google-earth.kmz','application/vnd.google-earth.kmz xml','application/vnd.google-earth.kmz+xml','application/vnd.google-earth.kmz;mode=networklink','atom','image/geotiff','image/geotiff8','image/gif','image/gif;subtype=animated','image/jpeg','image/png8','image/png; mode=8bit','image/svg','image/svg xml','image/svg+xml','image/tiff','image/tiff8','kml','kmz','openlayers','rss','text/html; subtype=openlayers'],'infoFormats':['text/plain','application/vnd.ogc.gml','text/xml','application/vnd.ogc.gml/3.1.1','text/xml; subtype=gml/3.1.1','text/html','text/javascript','application/json'],'tileSets':[{'srs':{'EPSG:900913':true},'bbox':{'EPSG:900913':{'bbox':[-20037508.34,0,0,20037508.34],'srs':'EPSG:900913'}},'resolutions':[156543.03390625,78271.516953125,39135.7584765625,19567.87923828125,9783.939619140625,4891.9698095703125,2445.9849047851562,1222.9924523925781,611.4962261962891,305.74811309814453,152.87405654907226,76.43702827453613,38.218514137268066,19.109257068634033,9.554628534317017,4.777314267158508,2.388657133579254,1.194328566789627,0.5971642833948135,0.29858214169740677,0.14929107084870338,0.07464553542435169,0.037322767712175846,0.018661383856087923,0.009330691928043961,0.004665345964021981,0.0023326729820109904,0.0011663364910054952,0.0005831682455027476,0.0002915841227513738,0.0001457920613756869],'width':256,'height':256,'format':'image/png','layers':'usa:states','styles':''}]},'format':'image/png','styles':'','tiled':true,'transparent':true,'attribution':null,'cached':true}],'center':[0,0],'zoom':3},'viewerTools':[{'hidden':true,'actions':['layerchooser'],'checked':true},{'hidden':true,'actions':['-'],'checked':true},{'leaf':true,'text':'Print map','ptype':'gxp_print','iconCls':'gxp-icon-print','customParams':{'outputFilename':'GeoExplorer-print'},'printService':'/geoserver/pdf/','checked':true},{'leaf':true,'text':'Pan map','checked':true,'iconCls':'gxp-icon-pan','ptype':'gxp_navigation','toggleGroup':'navigation'},{'leaf':true,'text':'Get Feature Info','checked':true,'iconCls':'gxp-icon-getfeatureinfo','ptype':'gxp_wmsgetfeatureinfo','format':'grid','toggleGroup':'interaction'},{'leaf':true,'text':'Measure','checked':true,'iconCls':'gxp-icon-measure-length','ptype':'gxp_measure','controlOptions':{'immediate':true},'toggleGroup':'interaction'},{'leaf':true,'text':'Zoom in / Zoom out','checked':true,'iconCls':'gxp-icon-zoom-in','ptype':'gxp_zoom'},{'leaf':true,'text':'Zoom to previous extent / Zoom to next extent','checked':true,'iconCls':'gxp-icon-zoom-previous','ptype':'gxp_navigationhistory'},{'leaf':true,'text':'Zoom to max extent','checked':true,'iconCls':'gxp-icon-zoomtoextent','ptype':'gxp_zoomtoextent'},{'leaf':true,'text':'Show legend','checked':true,'iconCls':'gxp-icon-legend','ptype':'gxp_legend'},{'leaf':true,'text':'Switch to 3D Viewer','checked':true,'iconCls':'gxp-icon-googleearth','ptype':'gxp_googleearth'},{'hidden':true,'actions':['->'],'checked':true},{'hidden':true,'actions':['aboutbutton'],'checked':true}],'created':1473928420118,'modified':1473928420118};
    var result = MapConfigTransformService.transform(config);
    var expected = {'layers':[{'type':'Group','properties':{'name':'background','title':'Base Maps','type':'base-group'},'children':[{'properties':{'isRemovable':true,'visible':true,'title':'OpenStreetMap','id':'mapnik','name':'mapnik','type':'base'},'type':'Tile','source':{'type':'OSM','properties':{'crossOrigin':'anonymous'}}}]},{'properties':{'isRemovable':true,'visible':true,'title':'States of the USA','id':'usa:states','name':'usa:states','popupInfo':'#AllAttributes','isSelectable':true,'isWFST':true,'styleName':'states','legendUrl':'http://localhost:8080/geoserver/wms?request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=usa%3Astates','EX_GeographicBoundingBox':[-179.23023299999997,17.831509000000036,-65.16882499999997,71.437769]},'type':'Tile','source':{'type':'TileWMS','properties':{'crossOrigin':'anonymous','params':{'LAYERS':'usa:states','TILED':'TRUE','FORMAT':'image/png','TRANSPARENT':true},'urls':['/geoserver/ows']}}}],'view':{'center':[0,0],'projection':'EPSG:102113','zoom':3}};
    assert.equal(JSON.stringify(result), JSON.stringify(expected));
    var output = MapConfigTransformService.write(result);
    var expectedFromWrite = {'sources':{'0':{'ptype':'gxp_osmsource'},'1':{'ptype':'gxp_wmscsource','url':'/geoserver/ows'}},'map':{'layers':[{'name':'mapnik','title':'OpenStreetMap','visibility':true,'group':'background','source':'0'},{'name':'usa:states','title':'States of the USA','visibility':true,'queryable':true,'capability':{'queryable':true,'styles':[{'name':'states','legend':{'href':'http://localhost:8080/geoserver/wms?request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=usa%3Astates'}}],'llbbox':[-179.23023299999997,17.831509000000036,-65.16882499999997,71.437769]},'source':'1'}],'center':[0,0],'projection':'EPSG:102113','zoom':3}};
    assert.equal(JSON.stringify(output), JSON.stringify(expectedFromWrite));
  });

  it('transforms MapBox source correctly (two-way)', function() {
    var config = {'sources':{'mapbox':{'ptype':'gxp_mapboxsource','projection':'EPSG:102113','id':'mapbox'}},'map':{'projection':'EPSG:102113','layers':[{'source':'mapbox','name':'geography-class','title':'Geography Class','visibility':true,'opacity':1,'group':'','fixed':false,'selected':true}],'center':[0,0],'zoom':3}};
    var result = MapConfigTransformService.transform(config);
    var expected = {'layers':[{'properties':{'isRemovable':true,'visible':true,'title':'Geography Class','id':'geography-class','name':'geography-class'},'type':'Tile','source':{'type':'TMS','properties':{'attributions':['<a href="http://mapbox.com">MapBox</a> | <a href="http://mapbox.com/tos">Terms of Service</a>'],'format':'png','urls':['http://a.tiles.mapbox.com/v1/mapbox.geography-class/','http://b.tiles.mapbox.com/v1/mapbox.geography-class/','http://c.tiles.mapbox.com/v1/mapbox.geography-class/','http://d.tiles.mapbox.com/v1/mapbox.geography-class/'],'maxZoom':8}}}],'view':{'center':[0,0],'projection':'EPSG:102113','zoom':3}};
    assert.equal(JSON.stringify(result), JSON.stringify(expected));
    var output = MapConfigTransformService.write(result);
    var expectedFromWrite = {'sources':{'0':{'ptype':'gxp_mapboxsource'}},'map':{'layers':[{'name':'geography-class','title':'Geography Class','visibility':true,'source':'0'}],'center':[0,0],'projection':'EPSG:102113','zoom':3}};
    assert.equal(JSON.stringify(output), JSON.stringify(expectedFromWrite));
  });

  it('transforms Bing source correctly (two-way)', function() {
    var config = {'sources':{'bing':{'apiKey':'AkGbxXx6tDWf1swIhPJyoAVp06H0s0gDTYslNWWHZ6RoPqMpB9ld5FY1WutX8UoF','ptype':'gxp_bingsource','projection':'EPSG:102113','id':'bing'}}, 'map':{'projection':'EPSG:102113','layers':[{'source':'bing','name':'AerialWithLabels','title':'Bing Aerial With Labels','visibility':true,'opacity':1,'group':'background','fixed':true,'selected':true},{'source':'bing','name':'Aerial','title':'Bing Aerial','visibility':false,'opacity':1,'group':'background','fixed':true,'selected':false},{'source':'bing','name':'Road','title':'Bing Roads','visibility':false,'opacity':1,'group':'background','fixed':true,'selected':false}],'center':[0,0],'zoom':3}};
    var result = MapConfigTransformService.transform(config);
    var expected = {'layers':[{'type':'Group','properties':{'name':'background','title':'Base Maps','type':'base-group'},'children':[{'properties':{'isRemovable':true,'visible':true,'title':'Bing Aerial With Labels','id':'AerialWithLabels','name':'AerialWithLabels','type':'base'},'type':'Tile','source':{'type':'BingMaps','properties':{'key':'AkGbxXx6tDWf1swIhPJyoAVp06H0s0gDTYslNWWHZ6RoPqMpB9ld5FY1WutX8UoF','imagerySet':'AerialWithLabels'}}},{'properties':{'isRemovable':true,'visible':false,'title':'Bing Aerial','id':'Aerial','name':'Aerial','type':'base'},'type':'Tile','source':{'type':'BingMaps','properties':{'key':'AkGbxXx6tDWf1swIhPJyoAVp06H0s0gDTYslNWWHZ6RoPqMpB9ld5FY1WutX8UoF','imagerySet':'Aerial'}}},{'properties':{'isRemovable':true,'visible':false,'title':'Bing Roads','id':'Road','name':'Road','type':'base'},'type':'Tile','source':{'type':'BingMaps','properties':{'key':'AkGbxXx6tDWf1swIhPJyoAVp06H0s0gDTYslNWWHZ6RoPqMpB9ld5FY1WutX8UoF','imagerySet':'Road'}}}]}],'view':{'center':[0,0],'projection':'EPSG:102113','zoom':3}};
    assert.equal(JSON.stringify(result), JSON.stringify(expected));
    var output = MapConfigTransformService.write(result);
    var expectedFromWrite = {'sources':{'0':{'ptype':'gxp_bingsource','apiKey':'AkGbxXx6tDWf1swIhPJyoAVp06H0s0gDTYslNWWHZ6RoPqMpB9ld5FY1WutX8UoF'}}, 'map':{'layers':[{'name':'AerialWithLabels','title':'Bing Aerial With Labels','visibility':true,'group':'background','source':'0'},{'name':'Aerial','title':'Bing Aerial','visibility':false,'group':'background','source':'0'},{'name':'Road','title':'Bing Roads','visibility':false,'group':'background','source':'0'}],'center':[0,0],'projection':'EPSG:102113','zoom':3}};
    assert.equal(JSON.stringify(output), JSON.stringify(expectedFromWrite));
  });

  it('transforms ArcGIS Rest source correctly (two-way)', function() {
    var config = {'sources':{'arcgisrest':{'ptype':'gxp_arcrestsource','url':'http://cga6.cga.harvard.edu/arcgis/rest/services/darmc/roman/MapServer','projection':'EPSG:102113','id':'arcgisrest'}}, 'map':{'projection':'EPSG:102113','layers':[{'source':'arcgisrest','name':'Roman and Medieval Civilization','title':'Roman and Medieval Civilization','tiled':true,'visibility':true,'layerid':'show:0','format':'png','opacity':1,'group':'','fixed':true,'selected':true}],'center':[4263719.1382864,5532513.4852863],'zoom':3}};
    var result = MapConfigTransformService.transform(config);
    var expected = {'layers':[{'properties':{'isRemovable':true,'visible':true,'title':'Roman and Medieval Civilization','id':'Roman and Medieval Civilization','name':'Roman and Medieval Civilization'},'type':'Tile','source':{'type':'TileArcGISRest','properties':{'crossOrigin':'anonymous','urls':['http://cga6.cga.harvard.edu/arcgis/rest/services/darmc/roman/MapServer'],'params':{'LAYERS':'show:0','FORMAT':'png'}}}}],'view':{'center':[4263719.1382864,5532513.4852863],'projection':'EPSG:102113','zoom':3}};
    assert.equal(JSON.stringify(result), JSON.stringify(expected));
    var output = MapConfigTransformService.write(result);
    var expectedFromWrite = {'sources':{'0':{'url':'http://cga6.cga.harvard.edu/arcgis/rest/services/darmc/roman/MapServer','ptype':'gxp_arcrestsource'}},'map':{'layers':[{'name':'Roman and Medieval Civilization','title':'Roman and Medieval Civilization','visibility':true,'layerid':'show:0','source':'0'}],'center':[4263719.1382864,5532513.4852863],'projection':'EPSG:102113','zoom':3}};
    assert.equal(JSON.stringify(output), JSON.stringify(expectedFromWrite));
  });

  it('transforms XYZ source correctly (two-way)', function() {
    var config = {'sources':{'0':{'ptype':'gxp_olsource'}}, 'map':{'projection':'EPSG:102113','layers':[{'source':'0','title':'CartoDB light','type':'OpenLayers.Layer.XYZ','args':['CartoDB Light','http://s.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',{'attribution':'&copy; foo'}]}],'center':[4263719.1382864,5532513.4852863],'zoom':3}};
    var result = MapConfigTransformService.transform(config);
    var expected = {'layers':[{'properties':{'isRemovable':true,'title':'CartoDB Light','name':'CartoDB_Light'},'type':'Tile','source':{'type':'XYZ','properties':{'crossOrigin': 'anonymous', 'urls':['http://s.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'],'attributions':['&copy; foo']}}}],'view':{'center':[4263719.1382864,5532513.4852863],'projection':'EPSG:102113','zoom':3}};
    assert.equal(JSON.stringify(result), JSON.stringify(expected));
    var output = MapConfigTransformService.write(result);
    var expectedFromWrite = {'sources':{'0':{'ptype':'gxp_olsource'}},'map':{'layers':[{'name':'CartoDB_Light','title':'CartoDB Light','type':'OpenLayers.Layer.XYZ','args':['CartoDB Light','http://s.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',{'attribution':'&copy; foo'}],'source':'0'}],'center':[4263719.1382864,5532513.4852863],'projection':'EPSG:102113','zoom':3}};
    assert.equal(JSON.stringify(output), JSON.stringify(expectedFromWrite));
  });

  it('transforms OSM as base', function() {
    var config = {'sources': {'0': {'ptype': 'gxp_osmsource'}}, 'map': {'projection': 'EPSG:3857', 'layers': [{'opacity': 1.0, 'name': 'mapnik', 'title': 'OSM Streets', 'visibility': true, 'source': '0', 'fixed': false}]}};
    var result = MapConfigTransformService.transform(config);
    assert.equal(result.layers[0].properties.type, 'base');
  });

  it('transform bbox and srs', function() {
    var config = {'sources': {'0': {'url': 'http://localhost:8080/geoserver/wms?access_token=ukWu6HOCHR224vPkAAQpovkt92EzfH', 'restUrl': '/gs/rest', 'ptype': 'gxp_wmscsource'}}, 'map': {'layers': [{'name': 'geonode:lakes', 'title': 'lakes', 'selected': true, 'visibility': true, 'srs': 'EPSG:900913', 'bbox': [-17997514.561634004, 7832753.531507975, -16274934.036978573, 11314569.49881123], 'queryable': true, 'source': '0'}], 'center': [0.0, -7.081154550627918e-10], 'units': 'm', 'maxResolution': 156543.03390625, 'maxExtent': [-20037508.34, -20037508.34, 20037508.34, 20037508.34], 'zoom': 0, 'projection': 'EPSG:900913'}};
    var result = MapConfigTransformService.transform(config);
    var llbbox = result.layers[0].properties.EX_GeographicBoundingBox;
    assert.equal(llbbox[0], -161.67442406879476);
    assert.equal(llbbox[1], 57.3536776296163);
    assert.equal(llbbox[2], -146.20021993454876);
    assert.equal(llbbox[3], 70.74182851113349);
  });

});
