export class DuplicateResourceError extends Error {
  constructor(resource: string) {
    super(`${resource} not exists`);
    this.name = "DuplicateResourceError";
  }
}
