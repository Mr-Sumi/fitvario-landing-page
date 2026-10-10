// Shared parser for docs/seo/keyword-map.md. Used by gen-seo-docs.mjs and keyword-coverage.mjs.
//
// Tags look like [P1, English, Brand, Navigational] on a primary keyword and [P3] or [P3, DROPPED: reason]
// on secondary ones. A DROPPED keyword stays in the file for the record but is never targeted or counted.

function parseTag(text, tagStr) {
  const parts = (tagStr ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  const droppedPart = parts.find((p) => p.startsWith("DROPPED"));
  return {
    text: text.trim(),
    priority: parts.find((p) => /^P\d$/.test(p)) ?? "",
    lang: parts.find((p) => ["English", "Hinglish"].includes(p)) ?? "",
    cluster: parts[2] && !droppedPart ? parts[2] : "",
    intent: parts[3] && !droppedPart ? parts[3] : "",
    dropped: !!droppedPart,
    reason: droppedPart ? droppedPart.replace(/^DROPPED:?\s*/, "") : "",
  };
}

export function parseMap(text) {
  const entries = [];
  let cur = null;
  for (const line of text.replace(/\r\n/g, "\n").split("\n")) {
    const m = line.match(/^PAGE (\S+)\s*$/);
    if (m) {
      cur = { path: m[1], wave: "", primary: null, secondary: [], notes: "", gate: "", rule: "" };
      entries.push(cur);
      continue;
    }
    if (!cur) continue;
    let k;
    if ((k = line.match(/^\s+wave: (.*)$/))) cur.wave = k[1];
    else if ((k = line.match(/^\s+primary: (.*?) \[(.*)\]\s*$/))) cur.primary = parseTag(k[1], k[2]);
    else if ((k = line.match(/^\s+secondary: (.*)$/))) {
      cur.secondary = k[1]
        .split(";")
        .map((x) => x.trim())
        .filter(Boolean)
        .map((x) => {
          const mm = x.match(/^(.*?)\s*\[(.*)\]\s*$/);
          return mm ? parseTag(mm[1], mm[2]) : parseTag(x, "");
        });
    } else if ((k = line.match(/^\s+sheet notes: (.*)$/))) cur.notes = k[1];
    else if ((k = line.match(/^\s+GATE: (.*)$/))) cur.gate = k[1];
    else if ((k = line.match(/^\s+RULE: (.*)$/))) cur.rule = k[1];
  }
  return entries;
}
