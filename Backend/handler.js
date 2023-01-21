'use strict';
const app = require('./controller/app');
const serverless = require('serverless-http');
module.exports.hello = serverless(app)

