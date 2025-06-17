const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());

// Use a regex route to match everything after /deezer/
app.get(/^\/deezer\/(.*)/, async (req, res) => {
  const deezerPath = req.params[0];
  const query = req.url.includes("?")
    ? req.url.slice(req.url.indexOf("?"))
    : "";
  const deezerUrl = `https://api.deezer.com/${deezerPath}${query}`;
  try {
    const response = await axios.get(deezerUrl);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch from Deezer" });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
