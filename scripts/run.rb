require 'csv'
require 'json'

cities = []

CSV.foreach('../opendata/geburtsorte.csv') do |row|
  city = {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [51, 7]
    },
    properties: {
      name: row[0],
      count: row[1]
    }
  }

  # adding city object to cities array
  cities.push(city)
end

data = {type: 'FeatureCollection', features: cities}
File.open("cities.geojson", 'w') { |file| file.print data.to_json }
