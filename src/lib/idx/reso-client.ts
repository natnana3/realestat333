import { z } from "zod";

const ResoConfigSchema = z.object({
  RESO_BASE_URL: z.string().url(),
  RESO_ACCESS_TOKEN: z.string().min(1).optional(),
  RESO_USERNAME: z.string().min(1).optional(),
  RESO_PASSWORD: z.string().min(1).optional(),
});

export type ResoConfig = z.infer<typeof ResoConfigSchema>;

export function getResoConfig(): ResoConfig {
  // Supports either bearer token or basic auth; actual MLS/vendor decides.
  return ResoConfigSchema.parse({
    RESO_BASE_URL: process.env.RESO_BASE_URL,
    RESO_ACCESS_TOKEN: process.env.RESO_ACCESS_TOKEN,
    RESO_USERNAME: process.env.RESO_USERNAME,
    RESO_PASSWORD: process.env.RESO_PASSWORD,
  });
}

export function getResoAuthHeader(cfg: ResoConfig) {
  if (cfg.RESO_ACCESS_TOKEN) {
    return { Authorization: `Bearer ${cfg.RESO_ACCESS_TOKEN}` } as const;
  }
  if (cfg.RESO_USERNAME && cfg.RESO_PASSWORD) {
    const token = Buffer.from(`${cfg.RESO_USERNAME}:${cfg.RESO_PASSWORD}`).toString("base64");
    return { Authorization: `Basic ${token}` } as const;
  }
  return null;
}

export async function resoFetchJson<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const cfg = getResoConfig();
  const url = new URL(path, cfg.RESO_BASE_URL);
  const headers: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const auth = getResoAuthHeader(cfg);
  if (auth?.Authorization) headers.Authorization = auth.Authorization;

  const res = await fetch(url.toString(), {
    ...init,
    headers: { ...headers, ...(init?.headers as Record<string, string> | undefined) },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`RESO request failed ${res.status}: ${body.slice(0, 500)}`);
  }
  return (await res.json()) as T;
}

