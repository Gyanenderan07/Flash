import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json());

  // API Route: Validate Google Credential Token
  app.post("/api/auth/google", async (req, res) => {
    try {
      const { credential } = req.body;
      if (!credential || typeof credential !== "string") {
        return res.status(400).json({ error: "Google credential token required" });
      }

      // Verify token against official Google tokeninfo endpoint
      const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`);
      if (!response.ok) {
        return res.status(401).json({ error: "Invalid Google credential" });
      }

      const payload = await response.json();
      if (!payload.sub || !payload.email) {
        return res.status(401).json({ error: "Malformed Google credential payload" });
      }

      return res.json({
        user: {
          id: `google-${payload.sub}`,
          name: payload.name || payload.email.split("@")[0],
          email: payload.email,
          avatar: payload.picture || `https://api.dicebear.com/9.x/personas/svg?seed=${encodeURIComponent(payload.email)}&backgroundColor=e2f800`,
          flashClub: false,
          provider: "Google",
        },
      });
    } catch (err) {
      return res.status(500).json({ error: "Failed to validate Google credential" });
    }
  });

  // API Route: Validate Apple Authorization Response
  app.post("/api/auth/apple", async (req, res) => {
    try {
      const { idToken, user } = req.body;
      if (!idToken || typeof idToken !== "string") {
        return res.status(400).json({ error: "Apple ID token required" });
      }

      // Decode payload from Apple JWT
      const parts = idToken.split(".");
      if (parts.length !== 3) {
        return res.status(400).json({ error: "Invalid JWT format" });
      }

      const payloadRaw = Buffer.from(parts[1], "base64").toString("utf-8");
      const claims = JSON.parse(payloadRaw);

      if (!claims.sub || claims.iss !== "https://appleid.apple.com") {
        return res.status(401).json({ error: "Invalid Apple token claims" });
      }

      if (claims.exp && claims.exp * 1000 < Date.now()) {
        return res.status(401).json({ error: "Expired Apple token" });
      }

      let fullName = "Apple User";
      if (user && typeof user === "object") {
        const first = user.name?.firstName || "";
        const last = user.name?.lastName || "";
        const constructed = `${first} ${last}`.trim();
        if (constructed) fullName = constructed;
      }

      const email = claims.email || (user && user.email) || `apple.${claims.sub.slice(0, 8)}@privaterelay.appleid.com`;

      return res.json({
        user: {
          id: `apple-${claims.sub}`,
          name: fullName,
          email: email,
          avatar: `https://api.dicebear.com/9.x/personas/svg?seed=${encodeURIComponent(fullName)}&backgroundColor=e2f800`,
          flashClub: false,
          provider: "Apple",
        },
      });
    } catch (err) {
      return res.status(500).json({ error: "Failed to validate Apple authorization" });
    }
  });

  // Serve static files from dist
  const staticPath = path.resolve(__dirname, "..", "dist");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
