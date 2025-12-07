import { EnvironmentConfigModel } from "../../domain/models/EnvironmentConfigModel";
import EnvironmentRepository from "../../domain/repository/EnvironmentRepository";

export type CreateEnvironmentInput = {
  specId: string;
  name: string;
  baseUrl: string;
  defaultHeaders?: { [k: string]: string };
  authConfig?: any;
};

export class CreateEnvironmentUseCase {
  constructor(private envRepo: EnvironmentRepository) {}

  async execute(input: CreateEnvironmentInput): Promise<EnvironmentConfigModel> {
    const id = `env-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    const model: EnvironmentConfigModel = {
      id,
      specId: input.specId,
      name: input.name,
      baseUrl: input.baseUrl,
      defaultHeaders: input.defaultHeaders || {},
      authConfig: input.authConfig || {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deleted: false,
    };

    await this.envRepo.save(model);
    return model;
  }
}

export default CreateEnvironmentUseCase;
