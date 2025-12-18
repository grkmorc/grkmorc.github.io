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
const dummyTheXII = [
    { rank: 1, name: "MasterMind", score: 250 },
    { rank: 2, name: "ProGamer", score: 250 },
    { rank: 3, name: "LuckyOne", score: 200 },
    { rank: 4, name: "KnowledgeKing", score: 200 },
    { rank: 5, name: "QuizWizard", score: 150 }
];

const dummySherlock = [
    { rank: 1, name: "SherlockH", score: 1000 },
    { rank: 2, name: "WatsonDr", score: 950 },
    { rank: 3, name: "Moriarty", score: 900 },
    { rank: 4, name: "DetectiveX", score: 850 },
    { rank: 5, name: "InspectorL", score: 800 }
];

function populateLeaderboard(data, element) {
    element.innerHTML = data.map(player => `
        <tr>
            <td>${player.rank}</td>
            <td>${player.name}</td>
            <td>${player.score}</td>
        </tr>
    `).join('');
}

populateLeaderboard(dummyTheXII, rowsTheXII);
populateLeaderboard(dummySherlock, rowsSherlock);

/* THE XII GAME LOGIC */
const questions = [
    {
        question: "1. Soru: Türkiye'nin başkenti neresidir?",
        options: ["İstanbul", "Ankara", "İzmir", "Bursa"],
        answer: 1 // 0-indexed, so Ankara
    },
    {
        question: "2. Soru: Hangi gezegen 'Kızıl Gezegen' olarak bilinir?",
        options: ["Venüs", "Mars", "Jüpiter", "Satürn"],
        answer: 1
    },
    {
        question: "3. Soru: Suyun kaynama noktası kaç derecedir?",
        options: ["90°C", "100°C", "110°C", "120°C"],
        answer: 1
    },
    {
        question: "4. Soru: 'Hamlet' oyununun yazarı kimdir?",
        options: ["William Shakespeare", "Charles Dickens", "Mark Twain", "Victor Hugo"],
        answer: 0
    },
    {
        question: "5. Soru: En büyük okyanus hangisidir?",
        options: ["Atlantik Okyanusu", "Hint Okyanusu", "Pasifik Okyanusu", "Arktik Okyanusu"],
        answer: 2
    },
    {
        question: "6. Soru: Bir yılda kaç ay 31 çeker?",
        options: ["4", "5", "6", "7"],
        answer: 3
    },
    {
        question: "7. Soru: Futbol maçları kaç dakika sürer?",
        options: ["45", "90", "100", "120"],
        answer: 1
    },
    {
        question: "8. Soru: Türkiye'nin plaka kodu nedir?",
        options: ["TR", "TK", "TC", "TUR"],
        answer: 0
    },
    {
        question: "9. Soru: Mona Lisa tablosu hangi müzededir?",
        options: ["Louvre Müzesi", "British Museum", "Metropolitan Müzesi", "Prado Müzesi"],
        answer: 0
    },
    {
        question: "10. Soru: Hangi hayvan memeli değildir?",
        options: ["Yunus", "Penguen", "Yarasa", "Balina"],
        answer: 1
    },
    {
        question: "11. Soru: Atatürk'ün doğum yılı nedir?",
        options: ["1880", "1881", "1882", "1883"],
        answer: 1
    },
    {
        question: "12. Soru: Periyodik tabloda 'O' hangi elementi simgeler?",
        options: ["Osmiyum", "Oksijen", "Opak", "Onyx"],
        answer: 1
    }
];

// Para ağacı (Basit artış)
const prizes = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 250];

let currentQuestionIndex = 0;
let currentPrize = 0;
let isAnswerLocked = false;

// DOM Elements for Quiz
const startScreen = document.getElementById('the12-start-screen');
const quizScreen = document.getElementById('the12-quiz-screen');
const resultScreen = document.getElementById('the12-result-screen');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const questionNumberSpan = document.getElementById('question-number');
const currentPrizeSpan = document.getElementById('current-prize');
const finalPrizeSpan = document.getElementById('final-prize');

document.getElementById('startThe12Btn').addEventListener('click', startGame);
document.getElementById('restartThe12Btn').addEventListener('click', startGame);

function startGame() {
    currentQuestionIndex = 0;
    currentPrize = 0;
    startScreen.classList.remove('active');
    resultScreen.classList.remove('active');
    quizScreen.classList.add('active');
    loadQuestion();
    updateUI();
}

function loadQuestion() {
    isAnswerLocked = false;
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

function checkAnswer(selectedIndex, selectedBtn) {
    if (isAnswerLocked) return;
    isAnswerLocked = true;

    const currentQ = questions[currentQuestionIndex];
    const correctIndex = currentQ.answer;

    if (selectedIndex === correctIndex) {
        // Doğru Cevap
        selectedBtn.classList.add('correct');
        const wonAmount = prizes[currentQuestionIndex];
        currentPrize = wonAmount;

        // Ses efekti eklenebilir

        // Bir sonraki soruya geçiş
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                loadQuestion();
            } else {
                showResult(true); // Oyunu kazandı
            }
        }, 1500);

    } else {
        // Yanlış Cevap
        selectedBtn.classList.add('wrong');

        // Doğru cevabı göster
        const buttons = optionsContainer.querySelectorAll('.option-btn');
        buttons[correctIndex].classList.add('correct');

        setTimeout(() => {
            showResult(false); // Kaybetti
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
