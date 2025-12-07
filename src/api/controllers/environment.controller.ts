import { Request, Response } from "express";
import { CreateEnvironmentUseCase } from "../../application/environment/CreateEnvironmentUseCase";
import { envRepository } from "../../core/container";

const createUseCase = new CreateEnvironmentUseCase(envRepository);

export class EnvironmentController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const body = req.body || {};
      const required = ["specId", "name", "baseUrl"];
      for (const r of required) {
        if (!body[r]) {
          res.status(400).json({ error: `${r} is required` });
          return;
        }
      }

      const model = await createUseCase.execute({
        specId: body.specId,
        name: body.name,
        baseUrl: body.baseUrl,
        defaultHeaders: body.defaultHeaders,
        authConfig: body.authConfig,
      });

      res.status(201).json(model);
    } catch (err: any) {
      res.status(500).json({ error: err?.message || String(err) });
    }
  }

  async listBySpec(req: Request, res: Response): Promise<void> {
    try {
      const specId = req.params.specId;
      if (!specId) {
        res.status(400).json({ error: "specId is required" });
        return;
      }
      const envs = await envRepository.findBySpecId(specId);
      res.json({ specId, environments: envs });
    } catch (err: any) {
      res.status(500).json({ error: err?.message || String(err) });
    }
  }

  async get(req: Request, res: Response): Promise<void> {
    try {
      const envId = req.params.envId;
      if (!envId) {
        res.status(400).json({ error: "envId is required" });
        return;
      }
      const env = await envRepository.findById(envId);
      if (!env) {
        res.status(404).json({ error: "environment not found" });
        return;
      }
      res.json(env);
    } catch (err: any) {
      res.status(500).json({ error: err?.message || String(err) });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const envId = req.params.envId;
      if (!envId) {
        res.status(400).json({ error: "envId is required" });
        return;
      }
      const body = req.body || {};
      const existing = await envRepository.findById(envId);
      if (!existing) {
        res.status(404).json({ error: "environment not found" });
        return;
      }
      const updated = { ...existing, ...body, updatedAt: new Date().toISOString() };
      await envRepository.update(updated);
      res.json(updated);
    } catch (err: any) {
      res.status(500).json({ error: err?.message || String(err) });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const envId = req.params.envId;
      if (!envId) {
        res.status(400).json({ error: "envId is required" });
        return;
      }
      await envRepository.delete(envId);
      res.status(204).send();
    } catch (err: any) {
      res.status(500).json({ error: err?.message || String(err) });
    }
  }
}

export default new EnvironmentController();
