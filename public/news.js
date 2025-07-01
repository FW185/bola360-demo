// CHANGE THIS URL to any recent football article you like
const ARTICLE_URL = "https://www.theguardian.com/football/2025/jul/01/manchester-city-al-hilal-club-world-cup-last-16-report";

// Free public translator (LibreTranslate demo server)
const LIBRE = "https://libretranslate.de/translate"; // <= 1-2 req/sec

async function translate(text) {
  const res = await fetch(LIBRE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      q: text,
      source: "en",
      target: "id",
      format: "text",
    }),
  });
  const { translatedText } = await res.json();
  return translatedText;
}

async function loadArticle() {
  // jina.ai => free extractor that returns clean text
  const plain = await (
    await fetch("https://r.jina.ai/http/" + ARTICLE_URL)
  ).text();
  const [title, intro] = plain.split("\n\n");

  const idTitle = await translate(title);
  const idIntro = await translate(intro);

  document.getElementById("news").innerHTML = `
    <article class="bg-slate-800 rounded-xl p-5 shadow">
      <h2 class="text-lg font-semibold mb-2">${idTitle}</h2>
      <p class="mb-4">${idIntro}</p>
      <a class="text-emerald-300 underline" href="${ARTICLE_URL}" target="_blank">
        Baca artikel asli
      </a>
    </article>`;
}

loadArticle();

