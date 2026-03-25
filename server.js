import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors({
  origin: "https://nandrychuk.github.io"
}));

// Google Maps route
app.get("/api/maps-init", async (req, res) => {
  try {
    const params = new URLSearchParams({
      libraries: req.query.libraries || "places",
      callback: req.query.callback || "initMap",
      key: process.env.GOOGLE_MAPS_API_KEY
    });

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/js?${params}`
    );
    const js = await response.text();
    res.setHeader("Content-Type", "application/javascript");
    res.send(js);
  } catch (err) {
    res.status(500).send("// Maps proxy error");
  }
});

// YouTube route
app.get("/api/youtube", async (req, res) => {
  try {
    const { endpoint, ...queryParams } = req.query;
    const params = new URLSearchParams({
      ...queryParams,
      key: process.env.YOUTUBE_API_KEY
    });

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?${params}`
    );
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: "YouTube proxy error" });
  }
});

app.listen(process.env.PORT || 3000);