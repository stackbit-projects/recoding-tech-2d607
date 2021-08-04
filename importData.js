"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require("@babel/polyfill");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

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
var limiter = new _limiter.RateLimiter({
  tokensPerInterval: 10,
  interval: 'second'
});
var start = 0;
var limit = 25;
var URL = "https://api.zotero.org/groups/".concat(process.env.ZOTERO_GROUP_ID, "/items?format=json&include=data,citation&style=chicago-fullnote-bibliography&limit=").concat(limit, "&start=").concat(start);

function fetchData() {
  return _fetchData.apply(this, arguments);
}

function _fetchData() {
  _fetchData = (0, _asyncToGenerator2.default)(function* () {
    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    // This call will throw if we request more than the maximum number of requests
    // that were set in the constructor
    // remainingRequests tells us how many additional requests could be sent
    // right this moment
    var remainingRequests = yield limiter.removeTokens(1);
    console.log("Remaining requests: ".concat(remainingRequests));
    console.log("Limit is: ".concat(limit));
    console.log('Fetching citations...');
    var response = yield (0, _nodeFetch.default)(url, {
      headers: {
        'Zotero-API-Version': process.env.ZOTERO_API_VERSION,
        'Zotero-API-Key': process.env.ZOTERO_API_KEY
      }
    });
    return response.json(); // parses JSON response into native JavaScript objects
  });
  return _fetchData.apply(this, arguments);
}

var flatten = arr => {
  if (arr) {
    arr = arr.reduce(function (flat, toFlatten) {
      return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
    return arr.filter((item, index, self) => index === self.findIndex(a => {
      if (a.name) {
        return a.name === item.name;
      } else if (a.lastName) {
        return a.lastName === item.lastName;
      } else {
        return a.title === item.title;
      }
    }));
  }
};

var transform = externalCitation => {
  console.log("Found citation ".concat(externalCitation.key));
  var creators = [];
  var tags = [];
  externalCitation.data.creators.map((creator, index) => {
    var date = new Date();
    var now = date.getMilliseconds().toString();
    var item = {
      _type: 'creator',
      _id: "creator-".concat(now, "-").concat(index),
      _key: "creator-".concat(now, "-").concat(index),
      firstName: creator.firstName,
      lastName: creator.lastName,
      creatorType: creator.creatorType
    };
    return creators.push(item);
  });
  externalCitation.data.tags.map((tag, index) => {
    var date = new Date();
    var now = date.getMilliseconds().toString();
    var item = {
      _type: 'topic',
      _id: "topic-".concat(now, "-").concat(index),
      _key: "topic-".concat(now, "-").concat(index),
      name: tag.tag
    };
    return tags.push(item);
  });
  var citation = {
    _id: externalCitation.key,
    _type: 'citation',
    shortTitle: externalCitation.data.shortTitle,
    title: externalCitation.data.title,
    date: externalCitation.meta.parsedDate,
    creators: creators,
    topics: tags,
    url: externalCitation.data.url,
    websiteTitle: externalCitation.data.websiteTitle,
    institution: externalCitation.data.institution,
    publicationTitle: externalCitation.data.publicationTitle,
    place: externalCitation.data.place,
    publisher: externalCitation.data.publisher,
    blogTitle: externalCitation.data.blogTitle,
    network: externalCitation.data.network,
    chicagoCitation: externalCitation.citation
  };
  return [creators, tags, citation];
};

(0, _asyncToGenerator2.default)(function* () {
  fetchData(URL).then(citations => {
    console.log('Parsing citations...');
    start = citations.length;
    return citations.map(transform);
  }).then(docs => // docs is now an array of [creators, tags, citation], so we need to flatten it
  flatten(docs)).then(documents => {
    // now we have all our documents and are ready to save them to our dataset
    if (documents) {
      var transaction = client.transaction();
      documents.forEach(document => {
        transaction.createOrReplace(document);
      });
      console.log('Committing transaction...');
      return transaction.commit();
    }
  }).catch(error => {
    console.debug(error);
  });
})();
