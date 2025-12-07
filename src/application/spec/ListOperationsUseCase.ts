import SpecRepository from "../../domain/repository/SpecRepository";

export type OperationDto = {
  operationId: string;
  method: string;
  path: string;
  tags?: string[];
  summary?: string;
};

export class ListOperationsUseCase {
  constructor(private specRepository: SpecRepository) {}

  async execute(specId: string): Promise<OperationDto[]> {
    const spec = await this.specRepository.findById(specId);
    if (!spec) {
      throw new Error(`Spec not found: ${specId}`);
    }

    const ops = spec.operations || [];
    return ops.map((op: any) => ({
      operationId: op.operationId || `${op.method}_${op.path}`,
      method: op.method || (op.verb || "GET"),
      path: op.path || op.route || "",
      tags: op.tags || [],
      summary: op.summary || op.description || "",
    }));
  }
}

export default ListOperationsUseCase;
