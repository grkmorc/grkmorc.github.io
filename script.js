// Yapımcılar Modal Kontrolü
const creatorsBtn = document.getElementById('creatorsBtn');
const creatorsModal = document.getElementById('creatorsModal');
const closeCreatorsModal = document.getElementById('closeCreatorsModal');

creatorsBtn.addEventListener('click', function () {
    creatorsModal.classList.add('active');
});

closeCreatorsModal.addEventListener('click', function () {
    creatorsModal.classList.remove('active');
});

creatorsModal.addEventListener('click', function (e) {
    if (e.target === creatorsModal) {
        creatorsModal.classList.remove('active');
    }
});

// ESC tuşu ile modal kapatma
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        creatorsModal.classList.remove('active');
        document.getElementById('howToPlayModal1').classList.remove('active');
        document.getElementById('howToPlayModal2').classList.remove('active');
        document.getElementById('gameScreen1').classList.remove('active');
        document.getElementById('gameScreen2').classList.remove('active');
        mainContent.style.display = 'flex';
    }
});

// Oyun Ekranları Kontrolü
const gameArea1 = document.getElementById('gameArea1');
const gameArea2 = document.getElementById('gameArea2');
const gameScreen1 = document.getElementById('gameScreen1');
const gameScreen2 = document.getElementById('gameScreen2');
const backButton1 = document.getElementById('backButton1');
const backButton2 = document.getElementById('backButton2');
const mainContent = document.querySelector('.main-content');

gameArea1.addEventListener('click', function () {
    mainContent.style.display = 'none';
    gameScreen1.classList.add('active');
});

gameArea2.addEventListener('click', function () {
    mainContent.style.display = 'none';
    gameScreen2.classList.add('active');
});

backButton1.addEventListener('click', function () {
    gameScreen1.classList.remove('active');
    mainContent.style.display = 'flex';
});

backButton2.addEventListener('click', function () {
    gameScreen2.classList.remove('active');
    mainContent.style.display = 'flex';
});

// Nasıl Oynanır Modal Kontrolü
const howToPlayBtn1 = document.getElementById('howToPlayBtn1');
const howToPlayBtn2 = document.getElementById('howToPlayBtn2');
const howToPlayModal1 = document.getElementById('howToPlayModal1');
const howToPlayModal2 = document.getElementById('howToPlayModal2');
const closeHowToPlayModal1 = document.getElementById('closeHowToPlayModal1');
const closeHowToPlayModal2 = document.getElementById('closeHowToPlayModal2');

howToPlayBtn1.addEventListener('click', function () {
    howToPlayModal1.classList.add('active');
});

howToPlayBtn2.addEventListener('click', function () {
    howToPlayModal2.classList.add('active');
});

closeHowToPlayModal1.addEventListener('click', function () {
    howToPlayModal1.classList.remove('active');
});

closeHowToPlayModal2.addEventListener('click', function () {
    howToPlayModal2.classList.remove('active');
});

howToPlayModal1.addEventListener('click', function (e) {
    if (e.target === howToPlayModal1) {
        howToPlayModal1.classList.remove('active');
    }
});

howToPlayModal2.addEventListener('click', function (e) {
    if (e.target === howToPlayModal2) {
        howToPlayModal2.classList.remove('active');
    }
});

// Sherlock Video Kontrolü
const sherlockVideo = document.getElementById('sherlockGif');
let videoTimeout;

if (gameArea2 && sherlockVideo) {
    gameArea2.addEventListener('mouseenter', function () {
        sherlockVideo.currentTime = 0;
        sherlockVideo.play().catch(e => console.log('Video play error:', e));

        // 5 saniye sonra durdur
        clearTimeout(videoTimeout);
        videoTimeout = setTimeout(() => {
            sherlockVideo.pause();
        }, 5000);
    });

    gameArea2.addEventListener('mouseleave', function () {
        sherlockVideo.pause();
        clearTimeout(videoTimeout);
    });
}

// Yapımcılar listesine isim ekleme fonksiyonu
function addCreator(name) {
    const creatorsList = document.getElementById('creatorsList');
    const creatorElement = document.createElement('p');
    creatorElement.textContent = name;
    creatorsList.appendChild(creatorElement);
}

// Leaderboard Logic
const ropeTheXII = document.getElementById('ropeTheXII');
const curtainTheXII = document.getElementById('curtainTheXII');
const rowsTheXII = document.getElementById('rowsTheXII');

const ropeSherlock = document.getElementById('ropeSherlock');
const curtainSherlock = document.getElementById('curtainSherlock');
const rowsSherlock = document.getElementById('rowsSherlock');

// Rope Interaction Functions
function setupLeaderboard(rope, curtain, container) {
    let timeoutId;

    const open = () => {
        clearTimeout(timeoutId);
        curtain.classList.add('active');
        if (container) container.classList.add('leaderboard-open');
    };

    const close = () => {
        timeoutId = setTimeout(() => {
            curtain.classList.remove('active');
            if (container) container.classList.remove('leaderboard-open');
        }, 300);
    };

    // İp olayları
    rope.addEventListener('mouseenter', open);
    rope.addEventListener('mouseleave', close);

    // Perde olayları
    curtain.addEventListener('mouseenter', open);
    curtain.addEventListener('mouseleave', close);
}

setupLeaderboard(ropeTheXII, curtainTheXII, document.getElementById('gameArea1'));
setupLeaderboard(ropeSherlock, curtainSherlock, document.getElementById('gameArea2'));

// Dummy Data Population
// Leaderboard Data Structure
const defaultLeaderboardData = {
    theXII: {
        daily: [],
        monthly: []
    },
    sherlock: {
        daily: [],
        monthly: []
    }
};

// LocalStorage'dan verileri yükle veya varsayılanları kullan
function loadLeaderboardData() {
    const saved = localStorage.getItem('leaderboardData_2kgaming_v2'); // Key değişti, eski veriler silindi
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (e) {
            console.warn('LocalStorage verisi bozuk, varsayılanlara dönülüyor');
            return JSON.parse(JSON.stringify(defaultLeaderboardData));
        }
    }
    return JSON.parse(JSON.stringify(defaultLeaderboardData));
}

// LocalStorage'a kaydet
function saveLeaderboardData() {
    try {
        localStorage.setItem('leaderboardData_2kgaming_v2', JSON.stringify(leaderboardData));
    } catch (e) {
        console.error('LocalStorage kaydetme hatası:', e);
    }
}

let leaderboardData = loadLeaderboardData();

// Populate Initial Data (Daily by default)
populateLeaderboard(leaderboardData.theXII.daily, rowsTheXII);
populateLeaderboard(leaderboardData.sherlock.daily, rowsSherlock);

// Tab Switching Logic
const tabBtns = document.querySelectorAll('.tab-btn');

tabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation(); // Butona tıklayınca oyunun açılmasını engelle
        const game = btn.dataset.game; // "theXII" or "sherlock"
        const period = btn.dataset.period; // "daily" or "monthly"

        // 1. Update UI (Active Class) with proper scoping
        // Sadece ilgili oyunun tablarını bul
        const wrapper = btn.closest('.leaderboard-tabs');
        if (wrapper) {
            wrapper.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        }

        // 2. Fetch Data
        const data = leaderboardData[game][period];
        const targetTable = game === "theXII" ? rowsTheXII : rowsSherlock;

        // 3. Render
        populateLeaderboard(data, targetTable);
    });
});

function populateLeaderboard(data, element) {
    // Sadece ilk 5 kişiyi göster
    const topFive = data.slice(0, 5);
    element.innerHTML = topFive.map(player => `
        <tr>
            <td>${player.rank}</td>
            <td>${player.name}</td>
            <td>${player.score}</td>
        </tr>
    `).join('');
}

function saveScoreToLeaderboard(name, score, gameName) {
    // gameName parametresi, obje anahtarı ile eşleşmeli
    // "THE XII" -> "theXII", "SHERLOCK" -> "sherlock"
    const key = gameName === "THE XII" ? "theXII" : "sherlock";

    console.log(`Skor Kaydedildi: ${name} - ${score} (${gameName})`);

    // Sadece 'Daily' listesine ekleyelim şimdilik
    const list = leaderboardData[key].daily;

    list.push({ rank: list.length + 1, name: name, score: score });
    list.sort((a, b) => b.score - a.score);
    list.forEach((item, index) => item.rank = index + 1);

    // LocalStorage'a kaydet ✨
    saveLeaderboardData();

    // Eğer şu an 'Daily' tabı aktifse arayüzü güncelle
    // Basitlik için direk populate çağıralım, aktif tab kontrolü şu anlık zorunlu değil ama iyi olurdu
    // (Şu anki basit yapıda, kullanıcı 'Aylık'taysa günlük skorunu göremeyecek ama 'Günlük'e geçince görecek)
    const targetTable = key === "theXII" ? rowsTheXII : rowsSherlock;

    // Aktif tab'ı kontrol etmek yerine, varsayılan olarak o tab'ı update edebiliriz
    // Ama kullanıcı monthly'de kalmış olabilir. 
    // En temizi: Eğer o anki aktif buton 'daily' ise güncelle.
    const activeBtn = document.querySelector(`.tab-btn[data-game="${key}"][data-period="daily"]`);
    if (activeBtn && activeBtn.classList.contains('active')) {
        populateLeaderboard(list, targetTable);
    }
}

// Sorular artık questions.js'den geliyor
// Her oyun başladığında rastgele 12 soru seçilecek
let questions = [];

// Para ağacı (Basit artış)
const prizes = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 250];

let currentQuestionIndex = 0;
let currentPrize = 0;
let isAnswerLocked = false;
let timerInterval;
const TIME_LIMIT = 12;

// Sherlock Game Logic
const sherlockInput = document.getElementById('sherlock-input');
const chatLog = document.getElementById('chat-log');
const askBtn = document.getElementById('sherlock-ask-btn');
const solveBtn = document.getElementById('solve-case-btn');

// Case Data: The Balloon Mystery
const balloonCase = {
    title: "Vaka 1: Çöl Ateşi",
    intro: "İki adam çölün ortasında çıplak bir şekilde, ellerinde birer kibrit çöpüyle ölü bulundu. Yakınlarda başka iz yok.",
    keywords: [
        // Balon (Kritik)
        { words: ["balon", "uçan", "hava aracı"], response: "EVET! Kesinlikle bir balonun içindeydiler." },

        // Kıyafetler/Çıplaklık
        { words: ["kıyafet", "soyun", "çıplak", "giysi"], response: "Evet, kıyafetlerini ağırlık azaltmak için çıkardılar." },

        // Kibrit
        { words: ["kibrit", "çöp"], response: "Evet, kibritleri kura çekmek için kullandılar. Kısa çöpü çeken..." },

        // Ateş/Yakıt
        { words: ["ateş", "yakıt", "söndü", "gaz"], response: "Evet, balonun ateşi azalıyordu. Düşüyorlardı." },

        // Atlamak/Düşmek
        { words: ["atla", "düş", "aşağı"], response: "Evet, balondan atladılar (veya atıldılar)." },

        // Cinayet/İntihar
        { words: ["cinayet", "öldür"], response: "Hayır, teknik olarak cinayet değil." },
        { words: ["intihar", "kendi"], response: "Zorunlu bir feda diyelim." },
        { words: ["anlaşma", "iddaa", "oyun"], response: "Evet, aralarında bir anlaşma yaptılar." },

        // alakasızlar
        { words: ["susuz", "su", "çöl"], response: "Çöl sadece düştükleri yer. Susuzlukla ilgisi yok." },
        { words: ["silah", "bıçak", "zehir"], response: "Hayır, cinayet aleti yok." },
        { words: ["uçak", "helikopter"], response: "Hayır, motorlu bir araç değildi." }
    ],
    defaultResponses: [
        "Bunun olayla pek ilgisi yok.",
        "Detaylara odaklan. Neden çıplaklar?",
        "Yanlış yoldasın.",
        "Bunu cevaplayamam, kafa karıştırıcı.",
        "Hayır."
    ]
};

function startSherlockGame() {
    sherlockStartScreen.classList.remove('active');
    sherlockGameScreen.classList.add('active');

    // Reset Chat
    chatLog.innerHTML = `<div class="message system-msg">Sherlock: Olayı çözmem için bana "Evet" veya "Hayır" sorusu sorabilirsin.</div>`;
    addSystemMessage(balloonCase.intro);
}

// Chat Interaction
askBtn.addEventListener('click', handleUserQuestion);
sherlockInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleUserQuestion();
});

async function handleUserQuestion() {
    const text = sherlockInput.value.trim();
    if (!text) return;

    // User Message
    const userDiv = document.createElement('div');
    userDiv.className = 'message user-msg';
    userDiv.textContent = text;
    chatLog.appendChild(userDiv);
    sherlockInput.value = '';

    // Scroll to bottom
    chatLog.scrollTop = chatLog.scrollHeight;

    // Loading indicator
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'message system-msg';
    loadingDiv.textContent = '🔍 Düşünüyorum...';
    loadingDiv.id = 'loading-msg';
    chatLog.appendChild(loadingDiv);
    chatLog.scrollTop = chatLog.scrollHeight;

    try {
        // AI API Call
        const response = await fetch('https://sherlock-api.grkm00018.workers.dev', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                question: text,
                caseInfo: balloonCase.intro
            })
        });

        // Remove loading
        document.getElementById('loading-msg')?.remove();

        if (response.ok) {
            const data = await response.json();
            addSystemMessage(data.answer || data.response || 'Cevap alınamadı');
        } else {
            // Fallback to keyword matching if API fails
            const fallbackResponse = findResponseLocal(text.toLowerCase());
            addSystemMessage(fallbackResponse);
        }
    } catch (error) {
        // Remove loading and use fallback
        document.getElementById('loading-msg')?.remove();
        console.log('AI API error, using fallback:', error);
        const fallbackResponse = findResponseLocal(text.toLowerCase());
        addSystemMessage(fallbackResponse);
    }
}

// Local fallback (keyword matching)
function findResponseLocal(text) {
    for (let item of balloonCase.keywords) {
        for (let word of item.words) {
            if (text.includes(word)) {
                return item.response;
            }
        }
    }
    const random = Math.floor(Math.random() * balloonCase.defaultResponses.length);
    return balloonCase.defaultResponses[random];
}

function addSystemMessage(text) {
    const sysDiv = document.createElement('div');
    sysDiv.className = 'message system-msg';
    sysDiv.textContent = text;
    chatLog.appendChild(sysDiv);
    chatLog.scrollTop = chatLog.scrollHeight;
}

// Solve Button Logic (Basic Alert for now)
solveBtn.addEventListener('click', () => {
    // Burada çoktan seçmeli bir modal açabiliriz.
    // Şimdilik hikayeyi anlatıp puan verelim.
    const confirmSolve = confirm("Olayı çözdüğüne emin misin? Balon hikayesini tahmin ediyor musun?");
    if (confirmSolve) {
        alert("TEBRİKLER! Olay: Balon düşüyordu, ağırlık atmak için soyundular, yetmeyince kura çektiler ve kaybedenler atladı.");
        saveScoreToLeaderboard(currentUser.nickname, 1000, "SHERLOCK");
        sherlockGameScreen.classList.remove('active');
        mainContent.style.display = 'flex';
    }
});

// THE XII DOM Elements
const startScreen = document.getElementById('the12-start-screen');
const quizScreen = document.getElementById('the12-quiz-screen');
const resultScreen = document.getElementById('the12-result-screen');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const questionNumberSpan = document.getElementById('question-number');
const currentPrizeSpan = document.getElementById('current-prize');
const finalPrizeSpan = document.getElementById('final-prize');
const nicknameThe12Input = document.getElementById('nicknameThe12');
const timerDisplay = document.getElementById('timer-container');
const joker50Btn = document.getElementById('joker-50');
const joker2xBtn = document.getElementById('joker-2x');

// Joker States
let jokers = {
    fifty: false, // false = available
    double: false
};
let isDoubleDipActive = false;


// Global User State
let currentUser = {
    nickname: "Anonim",
    game: ""
};

document.getElementById('startThe12Btn').addEventListener('click', () => {
    const name = nicknameThe12Input.value.trim();
    if (!name) {
        alert("Lütfen bir isim giriniz!");
        return;
    }
    currentUser.nickname = name;
    currentUser.game = "THE XII";
    startGameThe12();
});

// Sherlock Start Logic (Already defined above at line 384)
const sherlockStartScreen = document.getElementById('sherlock-start-screen');
const sherlockGameScreen = document.getElementById('sherlock-game-screen');
const nicknameSherlockInput = document.getElementById('nicknameSherlock');

document.getElementById('startSherlockBtn').addEventListener('click', () => {
    const name = nicknameSherlockInput.value.trim();
    if (!name) {
        alert("Lütfen dedektif adınızı giriniz!");
        return;
    }
    currentUser.nickname = name;
    currentUser.game = "SHERLOCK";
    startSherlockGame();
});

document.getElementById('restartThe12Btn').addEventListener('click', startGameThe12);

function startGameThe12() {
    // Soru havuzundan rastgele 12 soru seç
    questions = getRandomQuestions(12);

    currentQuestionIndex = 0;
    currentPrize = 0;
    jokers.fifty = false; // Reset jokers global
    jokers.double = false; // Reset jokers global
    joker50Btn.disabled = false;
    joker2xBtn.disabled = false;
    // Reset Styles & Jokers for Question Load
    jokers.double = jokers.double; // Keep usage state, but reset active
    isDoubleDipActive = false;
    // Joker butonlarının görsel durumu (Sadece kullanıldı mı diye bak)
    if (jokers.fifty) joker50Btn.disabled = true;
    if (jokers.double) joker2xBtn.disabled = true;

    startScreen.classList.remove('active');
    resultScreen.classList.remove('active');
    quizScreen.classList.add('active');
    loadQuestion();
    updateUI();
}

// Joker Event Listeners
joker50Btn.addEventListener('click', () => {
    if (jokers.fifty || isAnswerLocked) return;

    // Yanlış şıkları bul
    const currentQ = questions[currentQuestionIndex];
    const correctIndex = currentQ.answer;

    // Butonları al
    const buttons = Array.from(optionsContainer.querySelectorAll('.option-btn'));

    // Doğru cevap dışındaki (yanlış) butonları filtrele
    const wrongButtons = buttons.filter((btn, index) => index !== correctIndex);

    // Rastgele 2 tanesini seç ve gizle
    // Basit karıştırma
    wrongButtons.sort(() => Math.random() - 0.5);

    wrongButtons.slice(0, 2).forEach(btn => {
        btn.style.visibility = 'hidden'; // Veya opacity 0
    });

    // Joker kullanıldı işaretle
    jokers.fifty = true;
    joker50Btn.disabled = true;
});

joker2xBtn.addEventListener('click', () => {
    if (jokers.double || isAnswerLocked) return;

    isDoubleDipActive = true;
    jokers.double = true;
    joker2xBtn.disabled = true;

    // Görsel geri bildirim (Aktif olduğunu göster)
    joker2xBtn.style.background = "#4BB543"; // Yeşil
    joker2xBtn.style.color = "#fff";
});

function loadQuestion() {
    isAnswerLocked = false;
    // 2x active durumunu her soruda sıfırlama (Zaten joker tek kullanımlık)
    // Ama eğer kullanılmadıysa sıfırlama gerekmez.
    // Kullanılan joker zaten disabled oluyor.

    startTimer(); // Sayacı başlat

    const currentQ = questions[currentQuestionIndex];

    questionText.textContent = currentQ.question;
    optionsContainer.innerHTML = '';

    currentQ.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.classList.add('option-btn');
        const letter = String.fromCharCode(65 + index); // A, B, C, D
        btn.textContent = `${letter}) ${option}`;
        btn.addEventListener('click', () => checkAnswer(index, btn));
        optionsContainer.appendChild(btn);
    });

    updateUI();
}

// Timer Functions
function startTimer() {
    clearInterval(timerInterval);
    let timeLeft = TIME_LIMIT;
    timerDisplay.textContent = timeLeft;
    timerDisplay.className = '';

    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 5 && timeLeft > 3) {
            timerDisplay.classList.add('warning');
        }
        if (timeLeft <= 3) {
            timerDisplay.classList.remove('warning');
            timerDisplay.classList.add('danger');
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timeIsUp();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function timeIsUp() {
    if (isAnswerLocked) return;
    isAnswerLocked = true;

    const currentQ = questions[currentQuestionIndex];
    const buttons = optionsContainer.querySelectorAll('.option-btn');
    buttons[currentQ.answer].classList.add('correct');

    setTimeout(() => {
        showResult(false);
        saveScoreToLeaderboard(currentUser.nickname, currentPrize, "THE XII");
    }, 2000);
}

function checkAnswer(selectedIndex, selectedBtn) {
    if (isAnswerLocked) return; // Kilitliyse işlem yapma
    // 2x Joker aktifse ve cevap yanlışsa kilitleme!

    const currentQ = questions[currentQuestionIndex];
    const correctIndex = currentQ.answer;

    if (selectedIndex === correctIndex) {
        // Doğru Cevap
        stopTimer(); // Süreyi durdur
        isAnswerLocked = true; // Artık kilitle
        selectedBtn.classList.add('correct');
        const wonAmount = prizes[currentQuestionIndex];
        currentPrize = wonAmount;

        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                loadQuestion();
            } else {
                showResult(true);
                saveScoreToLeaderboard(currentUser.nickname, 250, "THE XII");
            }
        }, 1500);

    } else {
        // Yanlış Cevap
        selectedBtn.classList.add('wrong');

        if (isDoubleDipActive) {
            // 2x Aktif, bu yüzden oyunu bitirme, sadece hakkı ye
            isDoubleDipActive = false; // Hakkı bitti
            // Butonu geri normale döndür (disabled stili zaten CSS'den gelir ama renk değişikliğini sıfırla)
            joker2xBtn.style.background = "";
            joker2xBtn.style.color = "";
            return; // Fonksiyondan çık, oyun bitmesin, SÜRE DEVAM EDİYOR
        }

        stopTimer(); // Süreyi durdur
        isAnswerLocked = true; // Oyun bittiği için kilitle

        // Doğru cevabı göster
        const buttons = optionsContainer.querySelectorAll('.option-btn');
        buttons[correctIndex].classList.add('correct');

        setTimeout(() => {
            showResult(false); // Kaybetti
            saveScoreToLeaderboard(currentUser.nickname, currentPrize, "THE XII");
        }, 2000);
    }
}


function updateUI() {
    questionNumberSpan.textContent = currentQuestionIndex + 1;
    currentPrizeSpan.textContent = currentPrize;
}

function showResult(isWin) {
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');

    const resultTitle = resultScreen.querySelector('.result-title');
    if (isWin) {
        resultTitle.textContent = "TEBRİKLER! BÜYÜK ÖDÜLÜ KAZANDINIZ!";
        resultTitle.style.color = "#4BB543";
    } else {
        resultTitle.textContent = "Oyun Bitti!";
        resultTitle.style.color = "#FF9494";
    }

    finalPrizeSpan.textContent = currentPrize;
}
