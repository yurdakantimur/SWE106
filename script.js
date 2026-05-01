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
        q: "Günde ne kadar süre pratik yapabilirsin?",
        options: [
            { text: "30 dakikadan az", level: "Başlangıç" },
            { text: "1 saat ve üzeri", level: "Orta" }
        ]
    },
    {
        q: "Müzik teorisi (notalar, gamlar) hakkında bilgin var mı?",
        options: [
            { text: "Sıfırdan öğrenmek istiyorum", level: "Başlangıç" },
            { text: "Biraz temelim var", level: "Orta" }
        ]
    },
    {
        q: "Hangi tarz müzikler seni daha çok cezbeder?",
        options: [
            { text: "Rock / Metal / Pop", style: "modern" },
            { text: "Klasik / Jazz / Blues", style: "klasik" }
        ]
    },
    {
        q: "Kendi bestelerini yapmayı mı, sevdiğin şarkıları çalmayı mı istersin?",
        options: [
            { text: "Kendi müziğimi yaratmak", style: "yaratici" },
            { text: "Popüler eserleri çalmak", style: "icraci" }
        ]
    },
    {
        q: "Bir grupta çalmak mı istersin yoksa solo performans mı?",
        options: [
            { text: "Grup ile sahne almak", style: "grup" },
            { text: "Bireysel ilerlemek", style: "solo" }
        ]
    },
    {
        q: "Daha önce başka bir enstrüman çaldın mı?",
        options: [
            { text: "Hayır, bu ilk olacak", level: "Başlangıç" },
            { text: "Evet, bir miktar deneyimim var", level: "Orta" }
        ]
    }
];

let currentStep = 0;
let userSelection = { 
    instrument: "", 
    level: "Başlangıç" // Varsayılan değer
};

function loadQuestion() {
    const container = document.getElementById("question-container");
    
    // Hafif sönme efekti başlat
    container.style.opacity = 0;
    container.style.transform = "translateY(10px)";
    
    setTimeout(() => {
        const qData = questions[currentStep];
        
        // İlerleme çubuğu
        const progress = (currentStep / questions.length) * 100;
        document.getElementById("survey-progress").style.width = progress + "%";
        
        document.getElementById("question-text").innerText = qData.q;
        const optionsDiv = document.getElementById("options");
        optionsDiv.innerHTML = "";

        qData.options.forEach(opt => {
            const btn = document.createElement("button");
            btn.className = "option-btn";
            btn.innerText = opt.text;
            btn.onclick = () => handleSelection(opt);
            optionsDiv.appendChild(btn);
        });

        // Geri getir
        container.style.transition = "all 0.5s";
        container.style.opacity = 1;
        container.style.transform = "translateY(0)";
    }, 300);
}

function handleSelection(opt) {
    if(opt.instrument) userSelection.instrument = opt.instrument;
    if(opt.level) userSelection.level = opt.level;
    
    currentStep++;
    if(currentStep < questions.length) loadQuestion();
    else finishSurvey();
}

function finishSurvey() {
    const progressBar = document.getElementById("survey-progress");
    if(progressBar) progressBar.style.width = "100%";
    
    document.getElementById("question-container").style.display = "none";
    document.getElementById("result-container").style.display = "block";
    
    // Enstrüman isminin ilk harfini büyüt (gitar -> Gitar)
    const ins = userSelection.instrument;
    const formattedInstrument = ins.charAt(0).toUpperCase() + ins.slice(1);
    
    // Sonucu Ekrana Bas
    document.getElementById("course-result").innerHTML = `
        <h3 style="color: #ffb400; font-size: 2.5rem;">${formattedInstrument} Eğitimi</h3>
        <h4 style="color: #fff; margin-bottom: 15px;">Seviye: ${userSelection.level}</h4>
        <p>Analizlerimize göre, karakterine en uygun enstrüman <strong>${formattedInstrument}</strong> ve başlaman gereken nokta <strong>${userSelection.level}</strong> seviyesidir.</p>
    `;

    // Satın Al Butonunu Güncelle
    const buyBtn = document.getElementById("buy-course-btn");
    buyBtn.href = `kurslar.html#${ins}`;
    buyBtn.innerText = `${formattedInstrument} Kursuna Git`;
}

// Sayfa yüklendiğinde başlat
window.onload = loadQuestion;
