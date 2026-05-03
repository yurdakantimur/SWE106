// ==========================================
// 1. SEPET VE GİRİŞ SİSTEMİ (YENİ EKLENENLER)
// ==========================================

// Sepeti tarayıcı hafızasından çek veya boş dizi oluştur
let sepet = JSON.parse(localStorage.getItem('melodyn_sepet')) || [];

// Giriş Yap Butonu Fonksiyonu
function loginAlert() {
    console.log("Giriş butonuna tıklandı!"); 
    alert("Giriş yapıldı!");
}

// Sepete Kurs Ekleme
function sepeteEkle(kursAdi) {
    sepet.push(kursAdi);
    localStorage.setItem('melodyn_sepet', JSON.stringify(sepet));
    sepetiGuncelle();
    alert(kursAdi + " başarıyla sepete eklendi!");
}

// Sepetten Kurs Çıkarma
function sepettenCikar(index) {
    sepet.splice(index, 1);
    localStorage.setItem('melodyn_sepet', JSON.stringify(sepet));
    sepetiGuncelle();
}

// Sepet Listesini ve Sayısını Güncelleme
function sepetiGuncelle() {
    const sepetButonu = document.getElementById('cart-btn');
    const sepetListesi = document.getElementById('sepet-listesi');
    
    // Navbar'daki sayıyı güncelle
    if (sepetButonu) sepetButonu.innerText = `Sepetim (${sepet.length})`;
    
    // Sepet penceresindeki listeyi güncelle
    if (sepetListesi) {
        sepetListesi.innerHTML = "";
        sepet.forEach((kurs, index) => {
            sepetListesi.innerHTML += `
                <li style="display:flex; justify-content:space-between; margin-bottom:10px; font-size:14px; color: white;">
                    ${kurs}
                    <button onclick="sepettenCikar(${index})" style="background:none; border:none; color:#ff4444; cursor:pointer; font-weight:bold;">[X]</button>
                </li>`;
        });
        
        if (sepet.length === 0) {
            sepetListesi.innerHTML = "<li style='font-size:12px; color:#aaa; text-align:center;'>Sepetiniz boş kanka.</li>";
        }
    }
}

// Sepet Penceresini Aç/Kapat
function sepetiAcKapat() {
    const pencere = document.getElementById('sepet-penceresi');
    if (pencere) {
        pencere.style.display = (pencere.style.display === 'none' || pencere.style.display === '') ? 'block' : 'none';
    }
}

// Sepeti Onayla
function sepetiOnayla() {
    if (sepet.length === 0) {
        alert("Önce sepete bir kurs eklemelisin kanka!");
    } else {
        alert("Sepet onaylandı! Melodyn Akademi ailesine hoş geldin.");
        sepet = [];
        localStorage.removeItem('melodyn_sepet');
        sepetiGuncelle();
        sepetiAcKapat();
    }
}

// ==========================================
// 2. ANKET SİSTEMİ (MEVCUT KODLARIN)
// ==========================================

const questions = [
    {
        q: "Hangi enstrümanı çalmak istiyorsunuz?",
        options: [
            { text: "Gitar", instrument: "gitar" },
            { text: "Piyano", instrument: "piyano" },
            { text: "Bateri", instrument: "bateri" },
            { text: "Keman", instrument: "keman" }
        ]
    },
    {
        q: "Daha önce herhangi bir enstrüman eğitimi aldın mı?",
        options: [
            { text: "Evet", level: "İleri" },
            { text: "Hayır", level: "Başlangıç" },
        ]
    },
    {
        q: "Günde ne kadar süre pratik yapabilirsin?",
        options: [
            { text: "30 dakikadan az", level: "Başlangıç" },
            { text: "1 - 2 saat arası", level: "Orta" },
            { text: "2 saatten fazla", level: "İleri" }
        ]
    },
    {
        q: "Müzik teorisi hakkında bilgin var mı?",
        options: [
            { text: "Sıfırdan öğrenmek istiyorum", level: "Başlangıç" },
            { text: "Biraz temelim var", level: "Orta" },
            { text: "Teoriyi iyi biliyorum", level: "İleri" }
        ]
    },
    {
        q: "Daha önce herhangi bir grupta çaldın mı?",
        options: [
            { text: "Evet", style: "modern" },
            { text: "Hayır", style: "klasik" },
        ]
    },
    {
        q: "Kendi bestelerini yapmayı mı, sevdiğin şarkıları çalmayı mı istersin?",
        options: [
            { text: "Kendi müziğimi yaratmak", style: "yaratici" },
            { text: "Popüler eserleri çalmak", style: "icraci" },
            { text: "Her ikisi de", style: "karma" }
        ]
    },
    {
        q: "Daha önce başka bir enstrüman çaldın mı?",
        options: [
            { text: "Hayır, bu ilk olacak", level: "Başlangıç" },
            { text: "Evet, bir miktar deneyimim var", level: "Orta" },
            { text: "Evet, profesyonel düzeyde deneyimim var", level: "İleri" }
        ]
    }
];

let currentStep = 0;
let userSelection = { instrument: "", level: "Başlangıç" };
let answers = [];

function startSurvey() {
    document.getElementById("intro-container").style.display = "none";
    document.getElementById("survey-main").style.display = "block";
    loadQuestion();
}

function loadQuestion() {
    const container = document.getElementById("question-container");
    if(!container) return;

    container.style.opacity = 0;
    container.style.transform = "translateY(10px)";

    setTimeout(() => {
        const qData = questions[currentStep];
        const progress = (currentStep / questions.length) * 100;
        
        document.getElementById("survey-progress").style.width = progress + "%";
        document.getElementById("step-counter").innerText = `Soru ${currentStep + 1} / ${questions.length}`;
        document.getElementById("back-btn").style.display = currentStep > 0 ? "inline-block" : "none";
        document.getElementById("question-text").innerText = qData.q;
        
        const optionsDiv = document.getElementById("options");
        optionsDiv.innerHTML = "";

        qData.options.forEach((opt, index) => {
            const btn = document.createElement("button");
            btn.className = "option-btn";
            btn.innerHTML = `<span class="key-hint">${index + 1}</span>${opt.text}`;
            btn.onclick = () => handleSelection(opt, btn);
            optionsDiv.appendChild(btn);
        });

        container.style.transition = "all 0.5s";
        container.style.opacity = 1;
        container.style.transform = "translateY(0)";
    }, 300);
}

function handleSelection(opt, btnEl) {
    if (btnEl) btnEl.classList.add("option-selected");

    answers[currentStep] = {
        opt,
        instrument: userSelection.instrument,
        level: userSelection.level
    };

    if (opt.instrument) userSelection.instrument = opt.instrument;
    if (opt.level) userSelection.level = opt.level;

    setTimeout(() => {
        currentStep++;
        if (currentStep < questions.length) loadQuestion();
        else finishSurvey();
    }, 300);
}

function goBack() {
    if (currentStep <= 0) return;
    currentStep--;
    const prev = answers[currentStep];
    if (prev) {
        userSelection.instrument = prev.instrument;
        userSelection.level = prev.level;
    }
    loadQuestion();
}

function finishSurvey() {
    const progressBar = document.getElementById("survey-progress");
    if (progressBar) progressBar.style.width = "100%";

    document.getElementById("survey-main").style.display = "none";
    const resultContainer = document.getElementById("result-container");
    resultContainer.style.display = "block";
    
    setTimeout(() => {
        resultContainer.style.opacity = 1;
        resultContainer.style.transform = "translateY(0)";
    }, 50);

    const ins = userSelection.instrument;
    const formattedInstrument = ins.charAt(0).toUpperCase() + ins.slice(1);

    document.getElementById("course-result").innerHTML = `
        <h3 style="color: #ffb400; font-size: 2.5rem;">${formattedInstrument} Eğitimi</h3>
        <h4 style="color: #fff; margin-bottom: 15px;">Seviye: ${userSelection.level}</h4>
        <p>Analizlerimize göre, karakterine en uygun enstrüman <strong>${formattedInstrument}</strong> ve başlaman gereken nokta <strong>${userSelection.level}</strong> seviyesidir.</p>
    `;

    const buyBtn = document.getElementById("buy-course-btn");
    buyBtn.href = `kurslar.html#${ins}`;
    buyBtn.innerText = `${formattedInstrument} Kursuna Git`;
}

// Klavye Navigasyonu
document.addEventListener("keydown", (e) => {
    const num = parseInt(e.key);
    if (isNaN(num) || num < 1) return;

    const surveyMain = document.getElementById("survey-main");
    if (!surveyMain || surveyMain.style.display === "none") return;

    const btns = document.querySelectorAll("#options .option-btn");
    if (num <= btns.length) {
        btns[num - 1].click();
    }
});

// Sayfa yüklendiğinde sepeti başlat
window.addEventListener('DOMContentLoaded', sepetiGuncelle);