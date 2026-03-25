import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors({
  origin: "https://YOUR-GITHUB-USERNAME.github.io"  // ← change this
}));

app.post("/api/proxy", async (req, res) => {
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": process.env.API_KEY,
        "anthropic-version": "2023-06-01",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: "Proxy error" });
  }
});

app.listen(process.env.PORT || 3000);