import MongoSpecRepository from '../../src/infrastructure/persistence/MongoSpecRepository';
import { NormalizedSpec } from '../../src/domain/models/NormalizedSpec';

// Integration test: only runs when MONGO_URL is provided in env.
const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  // Jest will report skipped tests if none are defined; provide a single skipped test.
  test.skip('Mongo integration tests skipped because MONGO_URL is not set', () => {});
} else {
  describe('MongoSpecRepository integration', () => {
    let repo: MongoSpecRepository;

    beforeAll(async () => {
      repo = new MongoSpecRepository(mongoUrl, 'swaggerai_test');
      await repo.connect();
    });

    afterAll(async () => {
      await repo.close();
    });

    it('should save, find, list and delete a spec', async () => {
      const spec: NormalizedSpec = {
        id: `spec-integ-${Date.now()}`,
        title: 'Integ Test API',
        version: '1.0.0',
        servers: ['http://localhost:4000'],
        operations: [],
      };

      await repo.save(spec);

      const found = await repo.findById(spec.id);
      expect(found).not.toBeNull();
      expect(found?.title).toBe(spec.title);

      const byTitle = await repo.findByTitle(spec.title || '');
      expect(byTitle).not.toBeNull();
      expect(byTitle?.id).toBe(spec.id);

      const all = await repo.findAll();
      expect(Array.isArray(all)).toBe(true);

      await repo.delete(spec.id);
      const after = await repo.findById(spec.id);
      expect(after).toBeNull();
    });
  });
}
