import SpecRepository from "./SpecRepository";
import { NormalizedSpec } from "../models/NormalizedSpec";

/**
 * Simple in-memory implementation of SpecRepository for development and tests.
 * Not suitable for production persistence — replace with a DB-backed repo later.
 */
export class InMemorySpecRepository implements SpecRepository {
  private store: Map<string, NormalizedSpec> = new Map();

  constructor(initial?: NormalizedSpec[]) {
    if (initial && Array.isArray(initial)) {
      for (const s of initial) {
        this.store.set(s.id, s);
      }
    }
  }

  async save(spec: NormalizedSpec): Promise<void> {
    this.store.set(spec.id, spec);
  }

  async findById(id: string): Promise<NormalizedSpec | null> {
    return this.store.get(id) ?? null;
  }

  async findAll(): Promise<NormalizedSpec[]> {
    return Array.from(this.store.values());
  }

  async delete(id: string): Promise<void> {
    this.store.delete(id);
  }

  async findByTitle(title: string): Promise<NormalizedSpec | null> {
    for (const spec of this.store.values()) {
      if (spec.title === title) return spec;
    }
    return null;
  }
}

export default InMemorySpecRepository;
