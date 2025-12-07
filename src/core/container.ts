import InMemorySpecRepository from "../domain/repository/InMemorySpecRepository";

// Simple container for phase 1 DI wiring. Add more instances here later.
export const specRepository = new InMemorySpecRepository();

export default {
  specRepository,
};
