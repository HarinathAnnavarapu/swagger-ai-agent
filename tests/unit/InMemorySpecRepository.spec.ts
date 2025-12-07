import InMemorySpecRepository from '../../src/domain/repository/InMemorySpecRepository';
import { NormalizedSpec } from '../../src/domain/models/NormalizedSpec';

describe('InMemorySpecRepository', () => {
  let repo: InMemorySpecRepository;

  beforeEach(() => {
    repo = new InMemorySpecRepository();
  });

  it('should save and find a spec by id and title, list all, and delete', async () => {
    const spec: NormalizedSpec = {
      id: 'spec-1',
      title: 'Test API',
      version: '1.0.0',
      servers: ['https://api.example.com'],
      operations: [],
      tags: { test: 0 },
      raw: { info: { title: 'Test API' } },
    };

    await repo.save(spec);

    const found = await repo.findById('spec-1');
    expect(found).not.toBeNull();
    expect(found?.title).toBe('Test API');

    const foundByTitle = await repo.findByTitle('Test API');
    expect(foundByTitle).not.toBeNull();
    expect(foundByTitle?.id).toBe('spec-1');

    const all = await repo.findAll();
    expect(all.length).toBe(1);

    await repo.delete('spec-1');
    const afterDelete = await repo.findById('spec-1');
    expect(afterDelete).toBeNull();
  });
});
