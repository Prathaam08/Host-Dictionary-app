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


    
