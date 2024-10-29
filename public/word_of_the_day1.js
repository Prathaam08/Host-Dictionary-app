document.addEventListener('DOMContentLoaded', () => {
    const wordsOfTheDay = [
      {
            word: "serendipity",
            phonetics: "/ˌserənˈdipədē/",
            definition: "The occurrence of events by chance in a happy or beneficial way.",
            example: "The discovery of penicillin was a serendipity.",
            translation: "सौम्यता"
        },
        {
            word: "ephemeral",
            phonetics: "/ɪˈfɛmərəl/",
            definition: "Lasting for a very short time.",
            example: "Fame is ephemeral.",
            translation: "क्षणिक"
        },
        {
            word: "quintessential",
            phonetics: "/ˌkwɪntɪˈsɛnʃəl/",
            definition: "Representing the most perfect or typical example of a quality or class.",
            example: "He is the quintessential gentleman.",
            translation: "आदर्श"
        },
        {
            word: "ubiquitous",
            phonetics: "/juˈbɪkwɪtəs/",
            definition: "Present, appearing, or found everywhere.",
            example: "Smartphones are ubiquitous these days.",
            translation: "सर्वव्यापी"
        },
        {
            word: "cacophony",
            phonetics: "/kæˈkɒfəni/",
            definition: "A harsh, discordant mixture of sounds.",
            example: "The cacophony of the city was overwhelming.",
            translation: "असंगत ध्वनी"
        },
        {
            word: "nonchalant",
            phonetics: "/ˌnɒnʃəˈlɑːnt/",
            definition: "Feeling or appearing casually calm and relaxed.",
            example: "He was nonchalant about his test results.",
            translation: "उदासीन"
        },
        {
            word: "ineffable",
            phonetics: "/ɪˈnɛfəbəl/",
            definition: "Too great or extreme to be expressed or described in words.",
            example: "The beauty of the sunrise was ineffable.",
            translation: "अवर्णनीय"
        },
        {
            word: "melancholy",
            phonetics: "/ˈmɛlənˌkɒli/",
            definition: "A deep, persistent sadness.",
            example: "The film left him in a state of melancholy.",
            translation: "उदासी"
        },
        {
            word: "sanguine",
            phonetics: "/ˈsæŋɡwɪn/",
            definition: "Optimistic or positive, especially in an apparently bad or difficult situation.",
            example: "She remained sanguine despite the challenges.",
            translation: "आशावादी"
        },
        {
            word: "zeitgeist",
            phonetics: "/ˈzaɪtɡaɪst/",
            definition: "The defining spirit or mood of a particular period of history as shown by the ideas and beliefs of the time.",
            example: "The film captures the zeitgeist of the 1960s.",
            translation: "कालचेतना"
        },
        {
            word: "luminescence",
            phonetics: "/ˌluːmɪˈnɛsns/",
            definition: "The emission of light by a substance that has not been heated.",
            example: "The luminescence of fireflies is beautiful.",
            translation: "प्रकाशमानता"
        },
        {
            word: "sonder",
            phonetics: "/ˈsɑndər/",
            definition: "The realization that each passerby has a life as vivid and complex as your own.",
            example: "Walking through the crowd, she felt a sense of sonder.",
            translation: "प्रत्येकाचे स्वतःचे जग"
        },
        {
            word: "wanderlust",
            phonetics: "/ˈwɒndərlʌst/",
            definition: "A strong desire to travel.",
            example: "Her wanderlust led her to explore many countries.",
            translation: "भटकंतीची लालसा"
        },
        {
            word: "petrichor",
            phonetics: "/ˈpɛtrɪˌkɔr/",
            definition: "The pleasant, earthy smell after rain.",
            example: "The petrichor after the monsoon rain filled the air.",
            translation: "पावसानंतरचा सुगंध"
        },
        {
            word: "solitude",
            phonetics: "/ˈsɑlɪˌtud/",
            definition: "The state of being alone, often in a positive, reflective way.",
            example: "She enjoyed the peace and quiet of her solitude.",
            translation: "एकांत"
        },
        {
            word: "euphoria",
            phonetics: "/juːˈfɔːriə/",
            definition: "A feeling of intense happiness or excitement.",
            example: "The news filled him with euphoria.",
            translation: "आनंदाची उंची"
        },
        {
            word: "fernweh",
            phonetics: "/ˈfɛrnveɪ/",
            definition: "An ache for distant places; the craving for travel.",
            example: "The pictures of distant landscapes triggered his fernweh.",
            translation: "दूरच्या प्रवासाची तळमळ"
        },
        {
            word: "retrouvailles",
            phonetics: "/ʁe.tʁu.vaj/",
            definition: "The joy of reuniting with someone after a long separation.",
            example: "The retrouvailles with her childhood friend was heartwarming.",
            translation: "पुन्हा भेटण्याचा आनंद"
        },
        {
            word: "ataraxia",
            phonetics: "/ˌætəˈræksiə/",
            definition: "A state of serene calmness.",
            example: "Meditation helped her achieve a state of ataraxia.",
            translation: "शांतता"
        },
        {
            word: "nyctophilia",
            phonetics: "/ˌnɪktoʊˈfɪliə/",
            definition: "A love or preference for the night or darkness.",
            example: "His nyctophilia often led him to night walks.",
            translation: "रात्रीची आवड"
        },
        {
            word: "meraki",
            phonetics: "/mɛˈrɑːki/",
            definition: "To do something with soul, creativity, or love.",
            example: "She painted the canvas with such meraki.",
            translation: "मनापासून केलेले"
        },
        {
            word: "bibliophile",
            phonetics: "/ˈbɪblɪəˌfaɪl/",
            definition: "A person who loves or collects books.",
            example: "Being a bibliophile, his room was filled with books.",
            translation: "ग्रंथप्रेमी"
        },
        {
            word: "halcyon",
            phonetics: "/ˈhælsiən/",
            definition: "Denoting a period of time in the past that was idyllically happy and peaceful.",
            example: "They often reminisced about the halcyon days of their youth.",
            translation: "शांत आणि आनंददायक काळ"
        },
        {
            word: "reverie",
            phonetics: "/ˈrɛvəri/",
            definition: "A state of being pleasantly lost in one's thoughts; a daydream.",
            example: "She slipped into a reverie, thinking of the past.",
            translation: "स्वप्नरंजन"
        },
        {
            word: "hiraeth",
            phonetics: "/ˈhɪraɪθ/",
            definition: "A homesickness for a home you can't return to, or that never was.",
            example: "He felt a deep hiraeth whenever he thought of his childhood.",
            translation: "आठवणीची वेदना"
        },
        {
            word: "kilig",
            phonetics: "/ˈkiːlɪɡ/",
            definition: "The feeling of excitement caused by romantic experiences or by watching others experience romance.",
            example: "Watching the love story unfold gave her a sense of kilig.",
            translation: "रोमँटिक भावना"
        },
        {
            word: "sonder",
            phonetics: "/ˈsɑndər/",
            definition: "The realization that each passerby has a life as vivid and complex as your own.",
            example: "In the crowded street, he felt a sense of sonder.",
            translation: "प्रत्येकाचे स्वतःचे जग"
        },
        {
            word: "lagom",
            phonetics: "/ˈlɑːɡəm/",
            definition: "Not too much, not too little; just right.",
            example: "The Swedes believe in lagom in every aspect of life.",
            translation: "समतोल"
        },
        {
            word: "komorebi",
            phonetics: "/koˈmoˌrebi/",
            definition: "The sunlight that filters through the leaves of trees.",
            example: "They walked under the komorebi, enjoying the dappled light.",
            translation: "पानांमधून झिरपणारा सूर्यप्रकाश"
        },
        {
            word: "sehnsucht",
            phonetics: "/ˈzeːnˌzʊxt/",
            definition: "An intense, unfulfilled longing, often for an unknown or imagined experience.",
            example: "The poetry spoke to his sehnsucht for adventure.",
            translation: "अपरिचिताची आस"
        }
      
    ];

    function getWordOfTheDay() {
        const index = new Date().getDate() % wordsOfTheDay.length;
        return wordsOfTheDay[index];
    }

    const wordOfTheDay = getWordOfTheDay();
    document.getElementById("word-of-the-day-word").innerText = wordOfTheDay.word;
    document.getElementById("word-of-the-day-phonetics").innerText = wordOfTheDay.phonetics;
    document.getElementById("word-of-the-day-definition").innerText = wordOfTheDay.definition;
    document.getElementById("word-of-the-day-example").innerText = wordOfTheDay.example;
    document.getElementById("word-of-the-day-translation").innerText = wordOfTheDay.translation;
});

document.getElementById('backButton1').addEventListener('click', () => {
    window.location.href = 'All-language.html'; 
});


    // Generate random letters floating in the background
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    function createFloatingLetters() {
        for (let i = 0; i < 300; i++) {
            const letter = document.createElement('span');
            letter.classList.add('letter');
            letter.innerText = letters[Math.floor(Math.random() * letters.length)];
            
            // Random positioning and animation delay
            letter.style.left = Math.random() * 100 + 'vw';
            letter.style.animationDelay = Math.random() * 10 + 's';
            
            document.body.appendChild(letter);
        }
    }

    // Call the function to create floating letters
    createFloatingLetters();


    
