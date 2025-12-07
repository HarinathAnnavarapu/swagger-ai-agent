import SpecRepository from "../../domain/repository/SpecRepository";
import { NormalizedSpec } from "../../domain/models/NormalizedSpec";

/**
 * Mongo-backed implementation skeleton of SpecRepository.
 *
 * This implementation uses a lazy `require('mongodb')` so the codebase
 * does not fail to compile/run when Mongo is not available. Callers
 * should set `process.env.MONGO_URL` or pass a `uri` to the constructor
 * before invoking methods.
 */
export class MongoSpecRepository implements SpecRepository {
  private client: any | null = null;
  private db: any | null = null;
  private collection: any | null = null;
  private uri: string;
  private dbName: string;

  constructor(uri?: string, dbName = "swaggerai") {
    this.uri = uri || process.env.MONGO_URL || "";
    this.dbName = dbName;
  }

  async connect(): Promise<void> {
    if (!this.uri) {
      throw new Error("Mongo URI not provided. Set MONGO_URL or pass uri to constructor.");
    }
    if (this.collection) return;

    // Lazy require to avoid hard dependency at build time
    const mongodb = require("mongodb");
    const MongoClient = mongodb.MongoClient;
    this.client = new MongoClient(this.uri);
    await this.client.connect();
    this.db = this.client.db(this.dbName);
    this.collection = this.db.collection("specs");

    // ensure indexes
    try {
      await this.collection.createIndex({ id: 1 }, { unique: true });
      await this.collection.createIndex({ title: 1 });
    } catch (err) {
      // ignore index creation errors in skeleton
    }
  }

  async save(spec: NormalizedSpec): Promise<void> {
    if (!this.collection) await this.connect();
    await this.collection.updateOne({ id: spec.id }, { $set: spec }, { upsert: true });
  }

  async findById(id: string): Promise<NormalizedSpec | null> {
    if (!this.collection) await this.connect();
    const doc = await this.collection.findOne({ id });
    return (doc as NormalizedSpec) ?? null;
  }

  async findAll(): Promise<NormalizedSpec[]> {
    if (!this.collection) await this.connect();
    const docs = await this.collection.find({}).toArray();
    return docs as NormalizedSpec[];
  }

  async delete(id: string): Promise<void> {
    if (!this.collection) await this.connect();
    await this.collection.deleteOne({ id });
  }

  async findByTitle(title: string): Promise<NormalizedSpec | null> {
    if (!this.collection) await this.connect();
    const doc = await this.collection.findOne({ title });
    return (doc as NormalizedSpec) ?? null;
  }

  async close(): Promise<void> {
    if (this.client) {
      await this.client.close();
    }
    this.client = null;
    this.db = null;
    this.collection = null;
  }
}

export default MongoSpecRepository;
