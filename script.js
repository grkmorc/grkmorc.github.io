const creatorsBtn = document.getElementById('creatorsBtn');
const creatorsModal = document.getElementById('creatorsModal');
const closeCreatorsModal = document.getElementById('closeCreatorsModal');

creatorsBtn.addEventListener('click', function() {
    creatorsModal.classList.add('active');
});

closeCreatorsModal.addEventListener('click', function() {
    creatorsModal.classList.remove('active');
});

creatorsModal.addEventListener('click', function(e) {
    if (e.target === creatorsModal) {
        creatorsModal.classList.remove('active');
    }
});

// ESC tuşu ile modal kapatma
document.addEventListener('keydown', function(e) {
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
const game1Btn = document.getElementById('game1');
const game2Btn = document.getElementById('game2');
const gameScreen1 = document.getElementById('gameScreen1');
const gameScreen2 = document.getElementById('gameScreen2');
const backButton1 = document.getElementById('backButton1');
const backButton2 = document.getElementById('backButton2');
const mainContent = document.querySelector('.main-content');

game1Btn.addEventListener('click', function() {
    mainContent.style.display = 'none';
    gameScreen1.classList.add('active');
});

game2Btn.addEventListener('click', function() {
    mainContent.style.display = 'none';
    gameScreen2.classList.add('active');
});

backButton1.addEventListener('click', function() {
    gameScreen1.classList.remove('active');
    mainContent.style.display = 'flex';
});

backButton2.addEventListener('click', function() {
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

howToPlayBtn1.addEventListener('click', function() {
    howToPlayModal1.classList.add('active');
});

howToPlayBtn2.addEventListener('click', function() {
    howToPlayModal2.classList.add('active');
});

closeHowToPlayModal1.addEventListener('click', function() {
    howToPlayModal1.classList.remove('active');
});

closeHowToPlayModal2.addEventListener('click', function() {
    howToPlayModal2.classList.remove('active');
});

howToPlayModal1.addEventListener('click', function(e) {
    if (e.target === howToPlayModal1) {
        howToPlayModal1.classList.remove('active');
    }
});

howToPlayModal2.addEventListener('click', function(e) {
    if (e.target === howToPlayModal2) {
        howToPlayModal2.classList.remove('active');
    }
});

// Yapımcılar listesine isim ekleme fonksiyonu
function addCreator(name) {
    const creatorsList = document.getElementById('creatorsList');
    const creatorElement = document.createElement('p');
    creatorElement.textContent = name;
    creatorsList.appendChild(creatorElement);
}

// Örnek kullanım (sonradan kaldırılabilir):
// addCreator('İsim 1');
// addCreator('İsim 2');
