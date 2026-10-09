import { promises as fs } from 'node:fs';
import path from 'node:path';

/**
 * Tiny JSON-file persistence used while the project runs without a database.
 * Writes are serialized through a promise queue and made atomic with a
 * temp-file + rename, so concurrent requests cannot corrupt the file.
 *
 * Mutators must return a new value instead of modifying `current` in place.
 */
export class JsonFileStore<T> {
  private cache: T | undefined;
  private queue: Promise<unknown> = Promise.resolve();

  constructor(
    private readonly filePath: string,
    private readonly createInitialValue: () => T,
  ) {}

  async read(): Promise<T> {
    if (this.cache !== undefined) return this.cache;

    try {
      const raw = await fs.readFile(this.filePath, 'utf8');
      this.cache = JSON.parse(raw) as T;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
      this.cache = this.createInitialValue();
    }
    return this.cache;
  }

  update<R>(mutate: (current: T) => { next: T; result: R }): Promise<R> {
    const run = async () => {
      const { next, result } = mutate(await this.read());
      await this.write(next);
      this.cache = next;
      return result;
    };

    const task = this.queue.then(run, run);
    this.queue = task.catch(() => undefined);
    return task;
  }

  private async write(value: T): Promise<void> {
    await fs.mkdir(path.dirname(this.filePath), { recursive: true });
    const tempFile = `${this.filePath}.${process.pid}.${Date.now()}.tmp`;
    await fs.writeFile(tempFile, JSON.stringify(value, null, 2), 'utf8');
    await fs.rename(tempFile, this.filePath);
  }
}
