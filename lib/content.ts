import { defaultContent, type SiteContent } from "@/content/defaults";

const CONTENT_KEY = "jkp:site-content:v1";

type RedisResponse = { result?: string | null; error?: string };

function redisConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url, token } : null;
}

async function redisCommand(command: unknown[]): Promise<RedisResponse> {
  const config = redisConfig();
  if (!config) throw new Error("Sisältötietokantaa ei ole konfiguroitu.");

  const response = await fetch(config.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });

  if (!response.ok) throw new Error("Sisältötietokanta ei vastannut odotetusti.");
  return (await response.json()) as RedisResponse;
}

function mergeContent(base: SiteContent, incoming: Partial<SiteContent>): SiteContent {
  return {
    ...base,
    ...incoming,
    company: { ...base.company, ...incoming.company },
    hero: { ...base.hero, ...incoming.hero },
    about: { ...base.about, ...incoming.about },
    rental: { ...base.rental, ...incoming.rental },
    contact: { ...base.contact, ...incoming.contact },
    businessAreas: incoming.businessAreas?.length ? incoming.businessAreas : base.businessAreas,
    services: incoming.services?.length ? incoming.services : base.services,
  };
}

export async function getSiteContent(): Promise<SiteContent> {
  try {
    const response = await redisCommand(["GET", CONTENT_KEY]);
    if (!response.result) return defaultContent;
    return mergeContent(defaultContent, JSON.parse(response.result) as Partial<SiteContent>);
  } catch {
    return defaultContent;
  }
}

export async function saveSiteContent(content: SiteContent): Promise<void> {
  const response = await redisCommand(["SET", CONTENT_KEY, JSON.stringify(content)]);
  if (response.error) throw new Error(response.error);
}

export function isContentStorageConfigured(): boolean {
  return Boolean(redisConfig());
}
