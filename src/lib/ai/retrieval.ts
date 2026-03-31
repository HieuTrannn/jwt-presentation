import { JWT_KNOWLEDGE_CHUNKS } from "../../data/jwtKnowledge";

function normalize(text: string) {
  return text.toLowerCase().trim();
}

export function getRelevantKnowledge(query: string, topK = 4) {
  const q = normalize(query);

  const scored = JWT_KNOWLEDGE_CHUNKS.map((chunk) => {
    const keywordHits = chunk.keywords.reduce((score, keyword) => {
      return q.includes(normalize(keyword)) ? score + 2 : score;
    }, 0);

    const contentHits = normalize(chunk.content)
      .split(/\W+/)
      .filter((token) => token && q.includes(token)).length;

    return {
      ...chunk,
      score: keywordHits + contentHits,
    };
  })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);

  if (scored.length === 0) {
    return JWT_KNOWLEDGE_CHUNKS.slice(0, 3);
  }

  return scored;
}

