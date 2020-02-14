const request = require("request");

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request("https://api.ipify.org?format=json", (error, response, body) => {
    if (error) {
      // console.log("error:", error);
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    console.log(body);
    const data = JSON.parse(body);
    if (data.ip) {
      // console.log("Request body is not found.");
      callback(null, data.ip);
    } else {
      callback(null, "The ip is not found");
    }
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`https://ipvigilante.com/${ip}`, (error, response, body) => {
    if (error) {
      // console.log("error:", error);
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const { latitude, longitude } = JSON.parse(body).data;

    callback(null, { latitude, longitude });
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(
    `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`,
    (error, response, body) => {
      if (error) {
        // console.log("error:", error);
        callback(error, null);
        return;
      }
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
        callback(Error(msg), null);
        return;
      }
      const coordinates = JSON.parse(body).response;
      callback(null, coordinates);
    }
  );
};

const nextISSTimesForMyLocation = function(callback) {
  // empty for now
  fetchMyIP((error, ip) => {
    // use request to fetch IP address from JSON API
    if (error) {
      // console.log("error:", error);
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        // console.log("error:", error);
        return callback(error, null);
      }
      fetchISSFlyOverTimes(coords, (error, nextPasses) => {
        if (error) {
          // console.log("error:", error);

          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};
module.exports = {
  nextISSTimesForMyLocation,
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes
};
