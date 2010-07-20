include('../persistence.js');
include('ajax.js');

(function() {
    
    var sync = {};

    sync.Sync = persistence.define('_Sync', {
        entity: "VARCHAR(255)",
        serverDate: "DATE",
        localDate: "DATE"
      });

    sync.synchronize = function(uri, Entity, conflictCallback, callback) {
      sync.Sync.findBy('entity', Entity.meta.name, function(sync) {
          var lastServerSyncTime = sync ? sync.serverDate.getTime() : 0;
          var lastLocalSyncTime = sync ? sync.serverDate.getTime() : 0;

          var xmlHttp = new XMLHttpRequest();
          xmlHttp.open("GET", uri + '?since=' + lastServerSyncTime, true);
          xmlHttp.send();
          xmlHttp.onreadystatechange = function() {
            if(xmlHttp.readyState==4 && xmlHttp.status==200) {
              var data = uki.parseJSON(xmlHttp.responseText);
              var ids = [];
              var lookupTbl = {};

              var conflicts = [];
              var updatesToPush = [];

              console.log(data);
              data.forEach(function(item) {
                  ids.push(item.id);
                  lookupTbl[item.id] = item;
                })
              console.log(ids);
              Entity.all().filter("id", "in", ids).list(function(existingItems) {
                  existingItems.forEach(function(localItem) {
                      var remoteItem = lookupTbl[localItem.id];
                      delete remoteItem.id;
                      remoteItem.lastChange = new Date(remoteItem.lastChange);
                      delete lookupTbl[localItem.id];
                      if(remoteItem.lastChange.getTime() === localItem.lastChange.getTime()) {
                        return; // not changed
                      }
                      var localChangedSinceSync = lastLocalSyncTime < localItem.lastChange.getTime();
                      var remoteChangedSinceSync = lastServerSyncTime < remoteItem.lastChange.getTime();

                      var itemUpdatedFields = { id: localItem.id };
                      var itemUpdated = false;
                      for(var p in remoteItem) {
                        if(remoteItem.hasOwnProperty(p)) {
                          if(localItem[p] !== remoteItem[p]) {
                            console.log("Property differs: " + p);
                            if(localChangedSinceSync && remoteChangedSinceSync) { // Conflict!
                              console.log("Conflict!");
                              conflicts.push({local: localItem, remote: remoteItem, property: p});
                            } else if(localChangedSinceSync) {
                              console.log("Push!");
                              itemUpdated = true;
                              itemUpdatedFields[p] = localItem[p];
                            } else {
                              console.log("Pull!");
                              localItem[p] = remoteItem[p];
                            }
                          }
                        }
                      }
                      if(itemUpdated) {
                        updatesToPush.push(itemUpdatedFields);
                      }
                    });
                  // Add new remote items
                  for(var id in lookupTbl) {
                    if(lookupTbl.hasOwnProperty(id)) {
                      var remoteItem = lookupTbl[id];
                      delete remoteItem.id;
                      var localItem = new Entity(remoteItem);
                      localItem.id = id;
                      localItem.lastChange = new Date(remoteItem.lastChange);
                      persistence.add(localItem);
                      console.log("Added: ", localItem);
                    }
                  }
                  // Find local new items
                  Entity.all().filter("id", "not in", ids).filter("lastChange", ">", lastLocalSyncTime).list(function(newItems) {
                      newItems.forEach(function(newItem) {
                          var update = { id: newItem.id };
                          for(var p in newItem._data) {
                            if(newItem._data.hasOwnProperty(p)) {
                              update[p] = newItem._data[p];
                            }
                          }
                          updatesToPush.push(update);
                        });
                      conflictCallback(conflicts, updatesToPush, function() {
                          console.log("Updates to push: ", updatesToPush);
                          uki.persistence.flush(callback);
                        });
                    });
                });
            }
          }
        });
    }
    
    utils.extend(uki.persistence, sync);
}());