const { get } = require("https");

const geocode = (query) => {
  const url = "photon.komoot.io/api/";
  const limit = 1;

  return new Promise((resolve, reject) =>
    get(`https://${url}?q=${query}&limit=${limit}`, (res) => {
      var body = "";
      res.on("data", (d) => (body += d));
      res.on("end", () => {
        var parsed = JSON.parse(body);
        resolve(parsed.features[0]);
      });
      res.on("error", (e) => reject(e));
    })
  );
};

const getURL = (lat, lon) => {
  return `http://ec2-18-198-187-98.eu-central-1.compute.amazonaws.com:3650/api/maps/streets#${17}/${lat}/${lon}`;
};

module.exports = {
  getMap: async (query) => {
    const result = await geocode(query);
    console.log(JSON.stringify(result, null, 2));
    const [long, lat] = result.geometry.coordinates;
    return {
      url: getURL(lat, long),
      coords: { lat, long },
    };
  },
};
