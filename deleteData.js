"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require("@babel/polyfill");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _client = _interopRequireDefault(require("@sanity/client"));

var _limiter = require("limiter");

_dotenv.default.config();

var client = (0, _client.default)({
  apiVersion: process.env.SANITY_API_VERSION,
  dataset: process.env.SANITY_DATASET,
  projectId: process.env.SANITY_PROJECT_ID,
  token: process.env.SANITY_ACCESS_TOKEN,
  useCdn: false // We can't use the CDN for writing

});
var queries = ['*[_type == "citation"]', '*[_type == "topic"]', '*[_type == "creator"]'];
var limiter = new _limiter.RateLimiter({
  tokensPerInterval: 1,
  interval: 'second'
});

function deleteData() {
  return _deleteData.apply(this, arguments);
}

function _deleteData() {
  _deleteData = (0, _asyncToGenerator2.default)(function* () {
    // This call will throw if we request more than the maximum number of requests
    // that were set in the constructor
    // remainingRequests tells us how many additional requests could be sent
    // right this moment
    queries.forEach(function (query) {
      client.fetch(query).then(function (documents) {
        documents.forEach(function (document) {
          client.delete(document._id).then(function (res) {
            console.log('Document '.concat(document._id, ' deleted.'));
          }).catch(function (err) {
            console.error('Delete failed: ', err.message);
          });
        });
      });
    });
  });
  return _deleteData.apply(this, arguments);
}

function sendRequest() {
  return _sendRequest.apply(this, arguments);
}

function _sendRequest() {
  _sendRequest = (0, _asyncToGenerator2.default)(function* () {
    // This call will throw if we request more than the maximum number of requests
    // that were set in the constructor
    // remainingRequests tells us how many additional requests could be sent
    // right this moment
    var remainingRequests = yield limiter.removeTokens(1);
    deleteData();
  });
  return _sendRequest.apply(this, arguments);
}

sendRequest();
