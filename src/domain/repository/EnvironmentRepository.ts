import { EnvironmentConfigModel } from "../models/EnvironmentConfigModel";

export interface EnvironmentRepository {
  save(env: EnvironmentConfigModel): Promise<void>;
  findById(id: string): Promise<EnvironmentConfigModel | null>;
  findBySpecId(specId: string): Promise<EnvironmentConfigModel[]>;
  update(env: EnvironmentConfigModel): Promise<void>;
  delete(id: string): Promise<void>;
}

export default EnvironmentRepository;
