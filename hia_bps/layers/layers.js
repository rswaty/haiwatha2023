var wms_layers = [];


        var lyr_ESRIOcean_0 = new ol.layer.Tile({
            'title': 'ESRI Ocean',
            'type': 'base',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
    attributions: ' ',
                url: 'https://services.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}'
            })
        });
var lyr_bps_aoi_1 = new ol.layer.Image({
                            opacity: 1,
                            title: "bps_aoi",
                            
                            
                            source: new ol.source.ImageStatic({
                               url: "./layers/bps_aoi_1.png",
    attributions: ' ',
                                projection: 'EPSG:3857',
                                alwaysInRange: true,
                                imageExtent: [-9721673.362833, 5697939.388197, -9390338.170640, 5907500.763427]
                            })
                        });
var format_hiawathaFuels_2 = new ol.format.GeoJSON();
var features_hiawathaFuels_2 = format_hiawathaFuels_2.readFeatures(json_hiawathaFuels_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_hiawathaFuels_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_hiawathaFuels_2.addFeatures(features_hiawathaFuels_2);
var lyr_hiawathaFuels_2 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_hiawathaFuels_2, 
                style: style_hiawathaFuels_2,
                interactive: false,
                title: '<img src="styles/legend/hiawathaFuels_2.png" /> hiawathaFuels'
            });
var format_cb_2018_us_state_500k_3 = new ol.format.GeoJSON();
var features_cb_2018_us_state_500k_3 = format_cb_2018_us_state_500k_3.readFeatures(json_cb_2018_us_state_500k_3, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_cb_2018_us_state_500k_3 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_cb_2018_us_state_500k_3.addFeatures(features_cb_2018_us_state_500k_3);
var lyr_cb_2018_us_state_500k_3 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_cb_2018_us_state_500k_3, 
                style: style_cb_2018_us_state_500k_3,
                interactive: false,
                title: '<img src="styles/legend/cb_2018_us_state_500k_3.png" /> cb_2018_us_state_500k'
            });

lyr_ESRIOcean_0.setVisible(true);lyr_bps_aoi_1.setVisible(true);lyr_hiawathaFuels_2.setVisible(true);lyr_cb_2018_us_state_500k_3.setVisible(true);
var layersList = [lyr_ESRIOcean_0,lyr_bps_aoi_1,lyr_hiawathaFuels_2,lyr_cb_2018_us_state_500k_3];
lyr_hiawathaFuels_2.set('fieldAliases', {'SHAPE_Leng': 'SHAPE_Leng', 'SHAPE_Area': 'SHAPE_Area', 'AnalysisZo': 'AnalysisZo', });
lyr_cb_2018_us_state_500k_3.set('fieldAliases', {'STATEFP': 'STATEFP', 'STATENS': 'STATENS', 'AFFGEOID': 'AFFGEOID', 'GEOID': 'GEOID', 'STUSPS': 'STUSPS', 'NAME': 'NAME', 'LSAD': 'LSAD', 'ALAND': 'ALAND', 'AWATER': 'AWATER', });
lyr_hiawathaFuels_2.set('fieldImages', {'SHAPE_Leng': '', 'SHAPE_Area': '', 'AnalysisZo': '', });
lyr_cb_2018_us_state_500k_3.set('fieldImages', {'STATEFP': '', 'STATENS': '', 'AFFGEOID': '', 'GEOID': '', 'STUSPS': '', 'NAME': '', 'LSAD': '', 'ALAND': '', 'AWATER': '', });
lyr_hiawathaFuels_2.set('fieldLabels', {'SHAPE_Leng': 'no label', 'SHAPE_Area': 'no label', 'AnalysisZo': 'no label', });
lyr_cb_2018_us_state_500k_3.set('fieldLabels', {'STATEFP': 'no label', 'STATENS': 'no label', 'AFFGEOID': 'no label', 'GEOID': 'no label', 'STUSPS': 'no label', 'NAME': 'no label', 'LSAD': 'no label', 'ALAND': 'no label', 'AWATER': 'no label', });
lyr_cb_2018_us_state_500k_3.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});