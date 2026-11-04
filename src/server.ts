import app from "./app.js";
import { env } from "./config/env.js";

const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📚 API health check at http://localhost:${PORT}/api/health`);
});