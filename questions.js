/**
 * THE XII - SORU HAVUZU (SEVİYELİ)
 * =================================
 * Her seviye için ayrı soru havuzu var.
 * Oyun başladığında her seviyeden 1 rastgele soru seçilir.
 * 
 * Soru Formatı:
 * {
 *     question: "Soru metni",
 *     options: ["A", "B", "C", "D"],
 *     answer: 0  // 0=A, 1=B, 2=C, 3=D
 * }
 */

const questionsByLevel = {
    // ========== SEVİYE 1 (En Kolay) ==========
    level1: [
        {
            question: "Hangisi Atatürk ilkelerinden biri değildir?",
            options: ["Devrimcilik", "Halkçılık", "Barışçılık", "Devletçilik"],
            answer: 2

        },
        // Buraya daha fazla 1. seviye soru ekle
    ],

    // ========== SEVİYE 2 ==========
    level2: [
        {
            question: "Kaplumbağalar hangi türe ait bir canlıdır?",
            options: ["Memeliler", "Sürüngenler", "Balıklar", "Eklembacaklılar"],
            answer: 1
        },
    ],

    // ========== SEVİYE 3 ==========
    level3: [
        {
            question: "Türkiye'nin ilk yerli otomobili hangisidir?",
            options: ["Anadol", "Şahin", "Doğan", "Devrim"],
            answer: 3
        },
    ],

    // ========== SEVİYE 4 ==========
    level4: [
        {
            question: "Dünyadaki en büyük okyanus hangisidir?",
            options: ["Atlantik", "Pasifik", "Hint", "Arktik"],
            answer: 1
        },
    ],

    // ========== SEVİYE 5 ==========
    level5: [
        {
            question: "Shakespeare'ın ünlü eseri 'Romeo ve Juliet' hangi tiyatro türüne girmektedir?",
            options: ["Trajedi", "Dram", "Müzikal", "Vodvil"],
            answer: 0
        },
    ],

    // ========== SEVİYE 6 ==========
    level6: [
        {
            question: "İnsan DNA'sına en yakın meyve hangisidir?",
            options: ["Portakal", "Elma", "Muz", "Ayva"],
            answer: 2
        },
    ],

    // ========== SEVİYE 7 ==========
    level7: [
        {
            question: "Hangisi Film-Dizi müziği değildir?",
            options: ["Selvi Boylum Al Yazmalım", "Gençlik Başımda Duman", "Tek Başına", "Hasretinle Yandı Gönlüm"],
            answer: 2
        },
    ],

    // ========== SEVİYE 8 ==========
    level8: [
        {
            question: "Hangi ülkede COCA COLA satışı yasaktır?",
            options: ["Filistin", "Angola", "Venezuela", "Küba"],
            answer: 3
        },
    ],

    // ========== SEVİYE 9 ==========
    level9: [
        {
            question: "ABD'de suçlu haklarını korumak için olan Miranda Kanunu'nda hangisi suçluya tutuklanmadan önce söylenmez?",
            options: ["Şu an söylediğiniz her şey mahkemede aleyhinize kullanılabilir", "Sessiz kalma ve avukat tutma hakkınız vardır", "Şu an söylediğiniz her şey cezai indirim kapsamında değerlendirilecektir", "Eğer avukat tutmaya gücünüz yoksa avukat sağlanacaktır"],
            answer: 2
        },
    ],

    // ========== SEVİYE 10 ==========
    level10: [
        {
            question: "Hangisinin nüfusu Dünya çapında en fazladır?",
            options: ["Koyun", "Domuz", "Sığır", "Köpek"],
            answer: 2
        },
    ],

    // ========== SEVİYE 11 ==========
    level11: [
        {
            question: "Bir insan öldükten sonra hangi organı en geç çürür?",
            options: ["Beyin", "Pankreas", "Kalp", "Kalın Bağırsak"],
            answer: 2
        },
    ],

    // ========== SEVİYE 12 (En Zor) ==========
    level12: [
        {
            question: "ABD'nin hangi eyaletinde en az iki ineğin yoksa kovboy çizmesi giyemezsin?",
            options: ["Kaliforniya", "Florida", "Arizona", "Ohio"],
            answer: 0
        },
    ],
};

/**
 * Her seviyeden 1 rastgele soru seçer ve 12 soruluk dizi döndürür
 */
function getRandomQuestions() {
    const selectedQuestions = [];

    for (let i = 1; i <= 12; i++) {
        const levelKey = `level${i}`;
        const levelQuestions = questionsByLevel[levelKey];

        if (levelQuestions && levelQuestions.length > 0) {
            // Bu seviyeden rastgele bir soru seç
            const randomIndex = Math.floor(Math.random() * levelQuestions.length);
            selectedQuestions.push(levelQuestions[randomIndex]);
        }
    }

    return selectedQuestions;
}
