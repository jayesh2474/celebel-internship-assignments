const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());

// Proxy for Deezer preview MP3 files
app.get("/preview/:id", async (req, res) => {
  const { id } = req.params;
  // Deezer preview URLs follow this pattern
  const previewUrl = `https://cdns-preview-d.dzcdn.net/stream/c-${id}-1.mp3`;
  
  try {
    const response = await axios.get(previewUrl, {
      responseType: 'stream',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    res.set({
      'Content-Type': 'audio/mpeg',
      'Accept-Ranges': 'bytes',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=86400'
    });
    
    response.data.pipe(res);
  } catch (err) {
    console.error('Preview fetch error:', err.message);
    res.status(404).json({ error: "Preview not available" });
  }
});

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
