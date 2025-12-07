import { Request, Response } from "express";
import { specRepository } from "../../core/container";
import { NormalizedSpec } from "../../domain/models/NormalizedSpec";
import { ListOperationsUseCase } from "../../application/spec/ListOperationsUseCase";

function makeId(): string {
  return `spec-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

/**
 * SpecController (scaffold)
 *
 * Thin controller that will delegate to a single use-case per route.
 * Methods are currently stubs for Phase 1.
 */
export class SpecController {
  // In later phases this will accept injected use-cases (IngestSpecUseCase, ListOperationsUseCase)
  constructor(/* ingestUseCase, listOperationsUseCase */) {}

  async importSpec(req: Request, res: Response): Promise<void> {
    try {
      const body = req.body || {};
      const source = body.source || {};
      const id = makeId();
      const title = source.url || source.path || source.filePath || `Imported Spec ${id}`;

      const spec: NormalizedSpec = {
        id,
        title,
        version: "1.0.0",
        servers: [],
        operations: [],
        tags: {},
        raw: { source }
      };

      await specRepository.save(spec);

      res.status(201).json({ specId: spec.id, title: spec.title, version: spec.version, operationCount: spec.operations.length });
    } catch (err: any) {
      res.status(500).json({ error: err?.message || String(err) });
    }
  }

  async validateSpec(req: Request, res: Response): Promise<void> {
    res.status(501).json({ error: "Not implemented: spec validate" });
  }

  async getSpec(req: Request, res: Response): Promise<void> {
    res.status(501).json({ error: "Not implemented: get spec" });
  }

  async listOperations(req: Request, res: Response): Promise<void> {
    try {
      const specId = req.params.specId;
      if (!specId) {
        res.status(400).json({ error: "specId is required" });
        return;
      }

      const useCase = new ListOperationsUseCase(specRepository);
      const operations = await useCase.execute(specId);
      res.json({ specId, operations });
    } catch (err: any) {
      if (String(err.message).startsWith("Spec not found")) {
        res.status(404).json({ error: err.message });
      } else {
        res.status(500).json({ error: err?.message || String(err) });
      }
    }
  }

  async listTags(req: Request, res: Response): Promise<void> {
    res.status(501).json({ error: "Not implemented: list tags" });
  }
}
