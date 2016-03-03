var latitude = 51.4818445, longitude = 7.216236299999991, zoomlevel = 10, clusterEnabled = false;

var map = L.map('map', { zoomControl: false }).setView([latitude, longitude], zoomlevel);
new L.Control.Zoom({ position: 'topright' }).addTo(map);

// improve experience on mobile
if (map.tap) map.tap.disable();

// adding layers
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: '<a href="https://www.mapbox.com/about/maps/" target="_blank">&copy; Mapbox &copy; OpenStreetMap</a> | <a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a>',
  id: 'maschurig.p8gbjfbc',
  accessToken: 'pk.eyJ1IjoibWFzY2h1cmlnIiwiYSI6ImNpbDJiajEzejAwY2F3OW0wOG95czR5eXkifQ.igaYJkeB7_dF36mj4N1Jvg'
}).addTo(map);


var addMarkersToMap = function addMarkersToMap(data) {
  var geoJsonLayer = L.geoJson(data, {
    //pointToLayer: function (feature, latlng) {
    //  return new L.marker(latlng, {
    //    icon: markerIcon,
    //    opacity: markerOpacity
    //  });
    //},
    onEachFeature: function (feature, layer) {
      popupHtml = (
        '<p>' + feature.properties.count + '</p>' +
        '<p>kommen aus ' + feature.properties.city + '</p>'
      )

      var popup = L.popup().setContent(popupHtml);
      layer.bindPopup(popup);
    }
  });

  map.addLayer(geoJsonLayer);
  map.addControl( new L.Control.Search({layer: geoJsonLayer, propertyName: 'name'}) );
};

$.getJSON( "./opendata/cities.geojson", function(data) {
  addMarkersToMap(data);
});
