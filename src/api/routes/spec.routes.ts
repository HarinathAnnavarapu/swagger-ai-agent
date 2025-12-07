import express from "express";
import { SpecController } from "../controllers/spec.controller";

const router = express.Router();
const controller = new SpecController();

// Spec ingestion and validation
router.post("/spec/import", (req, res) => controller.importSpec(req, res));
router.post("/spec/validate", (req, res) => controller.validateSpec(req, res));

// Spec introspection
router.get("/spec/:specId", (req, res) => controller.getSpec(req, res));
router.get("/spec/:specId/operations", (req, res) => controller.listOperations(req, res));
router.get("/spec/:specId/tags", (req, res) => controller.listTags(req, res));

export default router;
