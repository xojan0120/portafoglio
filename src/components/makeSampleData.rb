require 'faker'
require 'json'

10.times {|i|
  json = { name: Faker::Name.name, comment: Faker::Lorem.sentence, id: i }.to_json
  puts json
}
