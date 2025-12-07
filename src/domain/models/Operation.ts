export interface Operation {
  operationId: string;
  method: string; // GET, POST, PUT, DELETE, etc.
  path: string; // normalized path like /customers/{id}
  tags?: string[];
  summary?: string;
  parameters?: any[]; // keep generic for now; refine later
  requestBody?: any;
  responses?: any;
  security?: any;
}
