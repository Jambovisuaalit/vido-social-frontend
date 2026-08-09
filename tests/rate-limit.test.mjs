import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const source = fs.readFileSync(
  new URL("../supabase/functions/submit-vido-lead/index.ts", import.meta.url),
  "utf8",
);

test("rate limit hash is independent of User-Agent", () => {
  const match = source.match(
    /function getClientIp\(req: Request\): string \{[\s\S]*?\n\}/,
  );
  assert.ok(match, "getClientIp must exist");
  assert.doesNotMatch(match[0], /user-agent/i);
  assert.match(source, /sha256\(getClientIp\(req\)\)/);
  assert.doesNotMatch(source, /getClientFingerprint/);
});
