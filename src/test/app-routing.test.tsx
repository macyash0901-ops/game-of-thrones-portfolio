import { existsSync } from 'node:fs';
import { describe, expect, it } from "vitest";

describe('App routing', () => {
  it('has an App Router home route', () => {
    expect(existsSync('app/page.tsx')).toBe(true);
  });
});
