export class CouldNotParseClientRootArguments extends Error {
  readonly contents: string;
  readonly path: string;

  constructor({ contents, path }: { contents: string; path: string }) {
    super(`Could not parse arguments for client root: ${path}`);
    this.contents = contents;
    this.path = path;
  }
}

export class CouldNotFindClientRootImportError extends Error {
  readonly name: string;
  readonly contents: string;
  readonly path: string;

  constructor({
    contents,
    name,
    path,
  }: {
    contents: string;
    name: string;
    path: string;
  }) {
    super(`Could not find client root import: ${path}`);
    this.contents = contents;
    this.name = name;
    this.path = path;
  }
}
