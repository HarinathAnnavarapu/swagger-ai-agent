import InMemorySpecRepository from "../domain/repository/InMemorySpecRepository";
import InMemoryEnvironmentRepository from "../domain/repository/InMemoryEnvironmentRepository";

// Simple container for phase 1 DI wiring. Add more instances here later.
export const specRepository = new InMemorySpecRepository();
export const envRepository = new InMemoryEnvironmentRepository();

export default {
  specRepository,
  envRepository,
};
