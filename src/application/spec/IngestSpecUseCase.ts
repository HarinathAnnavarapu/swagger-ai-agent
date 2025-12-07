/**
 * IngestSpecUseCase
 *
 * Small use-case stub for Phase 1 scaffolding. Implementation will call
 * SwaggerLoader -> SwaggerParserAdapter -> OpenApiNormalizer and persist
 * via SpecRepository.
 */

import { NormalizedSpec } from "../../domain/models/NormalizedSpec";

export type SpecSource = {
  type: "url" | "file" | "git";
  url?: string;
  path?: string;
  repo?: string;
  ref?: string;
  filePath?: string;
};

export class IngestSpecUseCase {
  // constructor should accept repository and adapters (added in later phases)
  constructor(/* specRepository, swaggerLoader, normalizer */) {}

  /**
   * Executes ingestion of a spec source and returns a summary.
   */
  async execute(source: SpecSource): Promise<{ specId: string; title?: string; version?: string; operationCount: number }>{
    // TODO: implement ingestion flow (Phase 4)
    throw new Error("IngestSpecUseCase.execute not implemented");
  }
}
