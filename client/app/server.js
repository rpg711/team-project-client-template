import {readDocument, writeDocument, addDocument} from './database.js';

/**
 * Emulates how a REST call is *asynchronous* -- it calls your function back
 * some time in the future with data.
 */
  function emulateServerReturn(data, cb) {
    setTimeout(() => {
      cb(data);
    }, 4);
  }
  export function getUserData(user, cb) {
    var userData = readDocument('users', user);
    emulateServerReturn(userData, cb);
  }

   function getBuildSync(buildId) {
    var build = readDocument('builds', buildId);
    build.contents.parts = build.contents.parts.map((val) => {
      var parts = readDocument('parts', val);
      return parts;
    });
    return build;
  }

  export function getBuildData(buildId, cb) {
    //var userData = readDocument('users', user);
    var buildData = readDocument('builds', buildId);
    //buildData = buildData.map(getBuildSync);
    emulateServerReturn(buildData, cb);
  }

  export function writeBuild(buildId, partId){
    var build = readDocument("builds", buildId);
    build.contents.parts.push(partId);
    writeDocument("builds", build);
  }

  export function removePartFromBuild(buildId, partId){
    var build = readDocument("builds", buildId);
    var index = build.contents.parts.indexOf(partId);
    if(index > -1){
      build.contents.parts.splice(index, 1);
    }
    writeDocument("builds", build);
  }

  export function selectBikeType(user, bikeType, cb) {
    var newBuild;
    if(bikeType === 13) {
      newBuild ={
        "type": "Winter",
        "contents": {
          "author": user,
          "buildName": [],
          "status": 0,
          "parts": []
        }
      };
    }
    else if(bikeType === 12) {
      newBuild ={
        "type": "Trail",
        "contents": {
        "author": user,
        "buildName": [],
        "status": 0,
        "part": []
      }
    };
  }
  else if(bikeType === 10) {
    newBuild ={
      "type": "Mountain",
      "contents": {
        "author": user,
        "buildName": [],
        "status": 0,
        "part": []
      }
    };
  }
  else if(bikeType === 11) {
    newBuild ={
      "type": "Road",
      "contents": {
      "author": user,
      "buildName": [],
      "status": 0,
      "part": []
     }
   };
 }
 // Add the status update to the database.
 // Returns the status update w/ an ID assigned.
 newBuild = addDocument('builds', newBuild);
 // Add the status update reference to the front of the
 // current user's feed.
 var userData = readDocument('users', user);
 var buildsData = readDocument('builds', userData.buildList);
 buildsData.contents.unshift(newBuild._id);
 // Update the feed object.
 writeDocument('builds', buildsData);
 // Return the newly-posted object.
 emulateServerReturn(newBuild, cb);
}

export function addPart(buildId, partId, cb) {
  var buildData = readDocument('builds', buildId);
  buildData.contents.parts.push(partId);
  writeDocument('builds', buildData);
  emulateServerReturn(buildData, cb);
}

export function changeFirstName(userId, newFirstName, cb) {
  var info = readDocument('users', userId);
  info.first_name = newFirstName;
  writeDocument('users', info);
  emulateServerReturn(userId, cb);
}

export function changeLastName(userId, newLastName, cb) {
  var info = readDocument('users', userId);
  info.last_name = newLastName;
  writeDocument('users', info);
  emulateServerReturn(userId, cb);
}

export function changeEmail(userId, newEmail, cb) {
  var info = readDocument('users', userId);
  info.email = newEmail;
  writeDocument('users', info);
  emulateServerReturn(userId, cb);
}

export function changeUserName(userId, newUserName, cb) {
  var info = readDocument('users', userId);
  info.user_name = newUserName;
  writeDocument('users', info);
  emulateServerReturn(userId, cb);
}

export function changePassword(userId, newPassword, cb) {
  var info = readDocument('users', userId);
  info.password = newPassword;
  writeDocument('users', info);
  emulateServerReturn(userId, cb);
}

export function getPartName(partId, partsList, cb){
  var name = "Empty";
    for(var i = 0; i < Object.keys(partsList).length; i++){
      var part = readDocument("parts", partsList[i]);
      if(part.contents.part_type === partId){
        name = part.contents.name;
        break;
      }
    }
    emulateServerReturn(name, cb);
}

export function getPartPrice(partId, partsList, cb){
  var price = "N/A";
    for(var i = 0; i < Object.keys(partsList).length; i++){
      var part = readDocument("parts", partsList[i]);
      if(part.contents.part_type === partId){
        price = part.contents.price;
        break;
      }
    }
    emulateServerReturn(price, cb);
}
