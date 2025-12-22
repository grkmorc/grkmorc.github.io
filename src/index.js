export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);

    if (pathname === "/ai") {
      if (request.method === "POST") {
        const { messages } = await request.json();  // Frontend'den gelen chat history

        const response = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
          messages: [
            { role: "system", content: "Sen Sherlock Holmes'sun. Oyuncu sana evet/hayır soruları sorarak bir vakayı çözmeye çalışıyor. Gizli bir senaryo düşün (örneğin bir cinayet detayı). Sadece 'Evet', 'Hayır' veya 'Bilmiyorum' diye cevap ver. Tahmin ettiğinde doğrula. Kısa cevap ver." },
            ...messages
          ]
        });

        return new Response(JSON.stringify(response), { headers: { "Content-Type": "application/json" } });
      }
    }

    return new Response("Worker çalışıyor!", { status: 200 });
  }
};