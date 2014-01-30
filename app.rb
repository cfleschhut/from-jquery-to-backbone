require 'sinatra'
require 'json'

get '/' do
  erb :index
end

post '/status' do
  # params.to_json
  request.body.read
end
