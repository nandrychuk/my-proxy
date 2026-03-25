import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors({
  origin: "https://nandrychuk.github.io"
}));

// Google Maps route
app.get("/api/maps", async (req, res) => {
  try {
    const params = new URLSearchParams({
      ...req.query,
      key: process.env.GOOGLE_MAPS_API_KEY
    });

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?${params}`
    );
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: "Maps proxy error" });
  }
});

// YouTube route
app.get("/api/youtube", async (req, res) => {
  try {
    const params = new URLSearchParams({
      ...req.query,
      key: process.env.YOUTUBE_API_KEY
    });

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/${req.query.endpoint}?${params}`
    );
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: "YouTube proxy error" });
  }
});

app.listen(process.env.PORT || 3000);