function doesRenderClientRoot({ contents }: { contents: string }) {
  return (
    /import\s+{\s*clientRoot\s*}\s*from\s+[?:'|"]@ssr\/app\/clientRoot[?:'|"]/.test(
      contents,
    ) && /clientRoot\(/.test(contents)
  );
}

export { doesRenderClientRoot };
