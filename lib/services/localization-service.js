'use strict';

var events = require('events');
var util = require('util');
var path = require('path');

var i18n = require('i18n');

var Devebot = require('devebot');
var lodash = Devebot.require('lodash');
var debug = Devebot.require('debug');
var debuglog = debug('localization:service');

var Service = function(params) {
  debuglog(' + constructor begin ...');
  
  Service.super_.apply(this);

  params = params || {};

  var self = this;
  
  self.getSandboxName = function() {
    return params.sandboxName;
  };
  
  self.logger = params.loggingFactory.getLogger();
  
  var cfgLocalization = lodash.get(params, ['sandboxConfig', 'plugins', 'appLocalization'], {});
  
  var i18nOptions = lodash.get(cfgLocalization, ['i18n'], {
    directory: path.join(__dirname, '../../locales')
  });

  i18n.configure(i18nOptions);

  debuglog(' - attach plugin app-localization into app-webserver');

  var webserverTrigger = params.webserverTrigger;
  var express = webserverTrigger.getExpress();
  var position = webserverTrigger.getPosition();

  var app = express();

  app.use(i18n.init);

  webserverTrigger.inject(app, null, position.inRangeOfMiddlewares(0), 'localization');

  self.getServiceInfo = function() {
    return {};
  };

  self.getServiceHelp = function() {
    return {};
  };
  
  debuglog(' - constructor end!');
};

Service.argumentSchema = {
  "id": "localizationService",
  "type": "object",
  "properties": {
    "sandboxName": {
      "type": "string"
    },
    "sandboxConfig": {
      "type": "object"
    },
    "profileConfig": {
      "type": "object"
    },
    "generalConfig": {
      "type": "object"
    },
    "loggingFactory": {
      "type": "object"
    },
    "webserverTrigger": {
      "type": "object"
    }
  }
};

util.inherits(Service, events.EventEmitter);

module.exports = Service;
