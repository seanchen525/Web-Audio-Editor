var connection = require('../database_connection')();
var scriptHelper = require('./script_helper');

var db = connection.database('audio-editor-users');

db.save('_design/user', {
  views: {
    byUsername: {
      map: "function (doc) { if (doc.type === 'user') { emit(doc.username, doc); } }"
    }
  }
});

var db_bus = connection.database('audio-editor-data');
db_bus.save('_design/arrangementByUser',{
  views:{
    byUserId: {
      map: "function (doc) { emit(doc.owner_id, doc); }"
    },
    sharedWithUserId: {
      map: "function (doc) { emit(doc.shared_with, doc); }"
    }
  }
});
