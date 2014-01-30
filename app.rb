require 'sinatra'
require 'json'

get '/' do
  erb :index
end

post '/status' do
  params.to_json
end
