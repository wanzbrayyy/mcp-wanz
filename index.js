import 'dotenv/config';
import express from 'express';
import { exec } from 'child_process';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

/**
 * Endpoint root untuk cek server
 */
app.get("/", (req, res) => {
  res.send("✅ MCP AgentQL running on Termux!");
});

/**
 * Endpoint untuk menjalankan AgentQL extract-web-data
 */
app.post("/extract-web-data", (req, res) => {
  const { prompt, query, url } = req.body;

  if (!url) return res.status(400).json({ error: "URL wajib diisi" });

  // Bentuk perintah untuk AgentQL MCP
  const command = `AGENTQL_API_KEY=${process.env.AGENTQL_API_KEY} npx -y agentql-mcp --tool extract-web-data --input '${JSON.stringify({ prompt, query, url })}'`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error("❌ Error:", error);
      return res.status(500).json({ error: "AgentQL MCP gagal dijalankan" });
    }
    if (stderr) console.error("[MCP-ERR]", stderr);
    try {
      const data = JSON.parse(stdout);
      res.json(data);
    } catch (err) {
      res.send(stdout); // fallback jika bukan JSON
    }
  });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`🚀 MCP server aktif di http://localhost:${PORT}`);
});
