// Tiny front-matter reader for the blog. Supports the subset the posts use:
//   key: value            (string, quotes optional)
//   key: true | false     (boolean)
//   key: [a, b, c]        (list of strings)
// Anything fancier belongs in a real YAML parser; the posts deliberately stay simple.

function value(raw) {
  const v = raw.trim();
  if (v === "true") return true;
  if (v === "false") return false;
  if (v.startsWith("[") && v.endsWith("]")) {
    return v
      .slice(1, -1)
      .split(",")
      .map((x) => x.trim().replace(/^["']|["']$/g, ""))
      .filter(Boolean);
  }
  return v.replace(/^["']|["']$/g, "");
}

export function parseFrontmatter(source) {
  const text = source.replace(/\r\n/g, "\n");
  if (!text.startsWith("---\n")) return { data: {}, body: text };
  const end = text.indexOf("\n---\n", 4);
  if (end < 0) return { data: {}, body: text };
  const data = {};
  for (const line of text.slice(4, end).split("\n")) {
    const m = line.match(/^([A-Za-z][A-Za-z0-9_]*):\s*(.*)$/);
    if (m) data[m[1]] = value(m[2]);
  }
  return { data, body: text.slice(end + 5).replace(/^\n+/, "") };
}
