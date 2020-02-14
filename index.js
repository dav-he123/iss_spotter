const { fetchMyIP } = require("./iss");
const { fetchCoordsByIP } = require("./iss");
const { fetchISSFlyOverTimes } = require("./iss");
const { nextISSTimesForMyLocation } = require("./iss");

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log("It worked! Returned IP:", ip);
});

fetchCoordsByIP("66.207.199.230", (error, data) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  } else {
    console.log("It worked the data is:", data);
  }
});

coordinates = { latitude: "43.63830", longitude: "-79.43010" };

fetchISSFlyOverTimes(coordinates, (error, data) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  } else {
    console.log("It worked the data is:", data);
  }
});

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;

    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    console.log("It does not work!", error);
    return;
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});

// module.exports = {
//   nextISSTimesForMyLocation,
//   fetchMyIP,
//   fetchCoordsByIP,
//   fetchISSFlyOverTimes
// };
