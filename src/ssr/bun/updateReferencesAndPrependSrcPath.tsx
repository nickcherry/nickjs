import {
  CouldNotFindClientRootImportError,
  CouldNotParseClientRootArguments,
} from './error';

export function updateReferencesAndPrependSrcPath({
  contents,
  path,
}: {
  contents: string;
  path: string;
}) {
  let modifiedContents = contents;

  const getUsageRegex = () => /\bclientRoot\((.*)\)/s;
  let usageMatch: RegExpMatchArray | null;

  while (null !== (usageMatch = modifiedContents.match(getUsageRegex()))) {
    if (!usageMatch[1]) {
      throw new CouldNotParseClientRootArguments({ contents, path });
    }

    const argsString = usageMatch[1]; // e.g. "HomePage, {}"
    const name = argsString!.split(',')[0]!.trim(); // e.g. "HomePage"
    const importMatch = new RegExp(
      `import.*${name}.* from\\s+[?:'|"](.*)[?:'|"]`,
    ).exec(contents);

    if (!importMatch || !importMatch[0] || !importMatch[1]) {
      throw new CouldNotFindClientRootImportError({ contents, name, path });
    }

    const srcImportName = /\{.*\}/.test(importMatch[0]) ? name : 'defualt';
    const srcPath = importMatch[1];

    modifiedContents = modifiedContents.replace(
      getUsageRegex(),
      ` clientRootWithSrcPath(require.resolve("${srcPath}"), "${srcImportName}", $1)`,
    );
  }

  return modifiedContents
    .replace(/@ssr\/app\/clientRoot/g, '@ssr/app/clientRootWithSrcPath')
    .replace(/\bclientRoot\b/g, 'clientRootWithSrcPath');
}
