// Sherlock AI Chat - Netlify Serverless Function
// Bu fonksiyon Google Gemini API'yi güvenli şekilde çağırır

exports.handler = async (event, context) => {
    // CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    // Handle preflight requests
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    // Only accept POST
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const { question, caseInfo } = JSON.parse(event.body);

        if (!question) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Question is required' })
            };
        }

        // API Key from environment variable (Netlify dashboard'dan ayarlanacak)
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            console.error('GEMINI_API_KEY not set');
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: 'API key not configured' })
            };
        }

        // Gemini API call
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `Sen bir dedektif oyununda Sherlock Holmes'un yardımcısısın. Oyuncu sana "Evet" veya "Hayır" ile cevaplanabilecek sorular soruyor.

VAKA BİLGİSİ:
${caseInfo || "İki adam çölün ortasında çıplak bir şekilde, ellerinde birer kibrit çöpüyle ölü bulundu. Yakınlarda başka iz yok."}

ÇÖZÜM (BU BİLGİYİ OYUNCUYA SÖYLEME, SADECE İPUCU VER):
İki adam sıcak hava balonuyla seyahat ediyordu. Balon düşmeye başladı. Ağırlık atmak için önce kıyafetlerini çıkardılar. Yetmedi. Kura çektiler (kısa kibrit çöpü çeken atlar). Kaybedenler atladı.

KURALLAR:
1. SADECE "Evet", "Hayır" veya kısa ipucu cümleleri ile cevap ver.
2. Çözümü direkt söyleme, oyuncuyu yönlendir.
3. Türkçe cevap ver.
4. Cevapların 1-2 cümleyi geçmesin.
5. Eğer soru alakasızsa "Bu soruyla ilgili bir ipucu veremem" de.

OYUNCUNUN SORUSU: "${question}"`
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 100
                    }
                })
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Gemini API error:', errorText);
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: 'AI service error' })
            };
        }

        const data = await response.json();
        const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Hmm, bu soruya cevap veremiyorum.';

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ response: aiResponse })
        };

    } catch (error) {
        console.error('Function error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Internal server error' })
        };
    }
};
