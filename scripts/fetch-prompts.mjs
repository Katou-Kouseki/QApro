import fetch from "node-fetch";
import fs from "fs/promises";

const CN_URL = "https://nb.js.cn/prompts-zh";
const EN_URL = "https://nb.js.cn/prompts";
const FILE = "./public/prompts.json";

async function fetchJson(url) {
  console.log(`[Fetch] fetching ${url} prompts...`);
  try {
    const raw = await (await fetch(url)).json();
    return raw.map((v) => [v.act, v.prompt]);
  } catch (error) {
    console.error("[Fetch] failed to fetch cn prompts", error);
    return [];
  }
}

async function main() {
  Promise.all([fetchJson(CN_URL), fetchJson(EN_URL)])
    .then(([cn, en]) => {
      fs.writeFile(FILE, JSON.stringify({ cn, en }));
    })
    .catch((e) => {
      console.error("[Fetch] failed to fetch prompts");
      fs.writeFile(FILE, JSON.stringify({ cn: [], en: [] }));
    })
    .finally(() => {
      console.log("[Fetch] saved to " + FILE);
    });
}

main();
