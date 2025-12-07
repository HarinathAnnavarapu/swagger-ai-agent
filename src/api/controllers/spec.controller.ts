import { Request, Response } from "express";

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
    // Validate request (done in validators) then call use-case
    res.status(501).json({ error: "Not implemented: spec import" });
  }

  async validateSpec(req: Request, res: Response): Promise<void> {
    res.status(501).json({ error: "Not implemented: spec validate" });
  }

  async getSpec(req: Request, res: Response): Promise<void> {
    res.status(501).json({ error: "Not implemented: get spec" });
  }

  async listOperations(req: Request, res: Response): Promise<void> {
    res.status(501).json({ error: "Not implemented: list operations" });
  }

  async listTags(req: Request, res: Response): Promise<void> {
    res.status(501).json({ error: "Not implemented: list tags" });
  }
}
