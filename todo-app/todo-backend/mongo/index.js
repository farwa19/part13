const dns = require('node:dns')
const mongoose = require('mongoose')
const Todo = require('./models/Todo')
const { MONGO_URL } = require('../util/config')

if (process.env.DNS_SERVERS) {
  dns.setServers(process.env.DNS_SERVERS.split(',').map(server => server.trim()))
}

if (MONGO_URL && !mongoose.connection.readyState) {
  mongoose.connect(MONGO_URL)
}

module.exports = {
  Todo
}
