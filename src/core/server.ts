import express from "express";
import bodyParser from "body-parser";
import specRoutes from "../api/routes/spec.routes";
import envRoutes from "../api/routes/environment.routes";
import { specRepository, envRepository } from "./container";

// minimal server bootstrap for local development and integration tests
const app = express();
app.use(bodyParser.json({ limit: "2mb" }));

// health endpoint
app.get("/health", (_req, res) => res.json({ status: "ok" }));

// mount API routes
// Mount spec and environment routes at both `/api` and root for backwards-compatibility with existing clients
app.use("/api", specRoutes);
app.use("/api", envRoutes);
app.use("/", specRoutes);
app.use("/", envRoutes);

// expose app and container for tests and further wiring
// expose app and container instances for tests and further wiring
export { app, specRepository, envRepository };

// start server if invoked directly
if (require.main === module) {
  const port = process.env.PORT ? Number(process.env.PORT) : 3000;
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on http://localhost:${port}`);
  });
}
