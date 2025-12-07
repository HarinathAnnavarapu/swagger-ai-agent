export interface EnvironmentConfigModel {
  id: string;
  specId: string;
  name: string; // e.g., qa, dev
  baseUrl: string;
  defaultHeaders?: { [k: string]: string };
  authConfig?: any;
  createdAt?: string;
  updatedAt?: string;
  deleted?: boolean;
}

export default EnvironmentConfigModel;
