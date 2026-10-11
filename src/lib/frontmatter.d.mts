export function parseFrontmatter(source: string): {
  data: Record<string, string | boolean | string[]>;
  body: string;
};
