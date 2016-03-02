require 'csv'
require 'json'
require 'open-uri'
require 'uri'

cities = []

CSV.foreach('../opendata/geburtsorte.csv') do |row|
  puts "requesting lat and lon for #{row[0]}"
  url = URI.encode("https://nominatim.openstreetmap.org/search?format=json&city=#{row[0]}&limit=1")
  res = open(url).read
  json_res = JSON.parse(res)

  lat = 51
  lon = 7
  if json_res.first
    lat = json_res.first['lat']
    lon = json_res.first['lon']
  end

  city = {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [lon, lat]
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
