import { NormalizedSpec } from "../models/NormalizedSpec";

/**
 * Repository interface for persisting and retrieving NormalizedSpec objects.
 * Implementations should be side-effecting (IO) but the interface keeps
 * the domain layer free from infrastructure details.
 */
export interface SpecRepository {
  save(spec: NormalizedSpec): Promise<void>;

  findById(id: string): Promise<NormalizedSpec | null>;

  findAll(): Promise<NormalizedSpec[]>;

  delete(id: string): Promise<void>;

  findByTitle(title: string): Promise<NormalizedSpec | null>;
}

export default SpecRepository;
