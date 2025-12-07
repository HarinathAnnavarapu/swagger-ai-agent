import EnvironmentRepository from "./EnvironmentRepository";
import { EnvironmentConfigModel } from "../models/EnvironmentConfigModel";

export class InMemoryEnvironmentRepository implements EnvironmentRepository {
  private store: Map<string, EnvironmentConfigModel> = new Map();

  constructor(initial?: EnvironmentConfigModel[]) {
    if (initial) {
      for (const e of initial) this.store.set(e.id, e);
    }
  }

  async save(env: EnvironmentConfigModel): Promise<void> {
    const now = new Date().toISOString();
    env.createdAt = env.createdAt || now;
    env.updatedAt = now;
    this.store.set(env.id, env);
  }

  async findById(id: string): Promise<EnvironmentConfigModel | null> {
    const e = this.store.get(id) ?? null;
    return e;
  }

  async findBySpecId(specId: string): Promise<EnvironmentConfigModel[]> {
    const out: EnvironmentConfigModel[] = [];
    for (const e of this.store.values()) {
      if (!e.deleted && e.specId === specId) out.push(e);
    }
    return out;
  }

  async update(env: EnvironmentConfigModel): Promise<void> {
    env.updatedAt = new Date().toISOString();
    this.store.set(env.id, env);
  }

  async delete(id: string): Promise<void> {
    const e = this.store.get(id);
    if (e) {
      e.deleted = true;
      e.updatedAt = new Date().toISOString();
      this.store.set(id, e);
    }
  }
}

export default InMemoryEnvironmentRepository;
