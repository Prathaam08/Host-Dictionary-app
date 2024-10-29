

document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector(".wrapper"),
        searchInput = wrapper.querySelector("input"),
        volume = wrapper.querySelector(".word i"),
        infoText = wrapper.querySelector(".info-text"),
        synonyms = wrapper.querySelector(".synonyms .list"),
        removeIcon = wrapper.querySelector(".remove"),
        translation = wrapper.querySelector(".translation span"),
        historyList = document.getElementById('history-list'),
        clearHistoryButton = document.getElementById('clearHistoryButton');

    // Define search function in the global scope
    window.search = function(word) {
        fetchApi(word);
        fetchTranslation(word);
        searchInput.value = word;
        saveSearchHistory(word);
    };

    // Event listener for the "Show Word of the Day" button
    wordOfTheDayButton.addEventListener('click', () => {
        if (wordOfTheDaySection.style.display === 'none' || !wordOfTheDaySection.style.display) {
            displayWordOfTheDay(); // Populate the Word of the Day content
            wordOfTheDaySection.style.display = 'block'; // Show the section
        } else {
            wordOfTheDaySection.style.display = 'none'; // Hide the section
        }
    });

    // Function to handle dictionary data
    function data(result, word) {
        if (result.title) {
            infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Please, try to search for another word.`;
        } else {
            wrapper.classList.add("active");
            let definitions = result[0].meanings[0].definitions[0],
                phonetics = `${result[0].meanings[0].partOfSpeech}  /${result[0].phonetics[0].text}/`;

            // Display the word and its phonetics
            document.querySelector(".word p").innerText = result[0].word;
            document.querySelector(".word span").innerText = phonetics;

            // Display the meaning and example
            document.querySelector(".meaning span").innerText = definitions.definition;
            document.querySelector(".example span").innerText = definitions.example || "No example available.";

            // Handle audio pronunciation
            audio = new Audio(result[0].phonetics[0].audio);

            // Handle synonyms display
            if (!definitions.synonyms || definitions.synonyms.length === 0) {
                synonyms.parentElement.style.display = "none";
            } else {
                synonyms.parentElement.style.display = "block";
                synonyms.innerHTML = "";
                for (let i = 0; i < Math.min(definitions.synonyms.length, 5); i++) {
                    let tag = `<span onclick="search('${definitions.synonyms[i]}')">${definitions.synonyms[i]}</span>`;
                    synonyms.insertAdjacentHTML("beforeend", tag);
                }
            }
        }
    }

    // // Function to fetch word definition from API
    // function fetchApi(word) {
    //     wrapper.classList.remove("active");
    //     infoText.style.color = "#000";
    //     infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;

    //     let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    //     fetch(url)
    //         .then(response => response.json())
    //         .then(result => data(result, word))
    //         .catch(() => {
    //             infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Please, try to search for another word.`;
    //         });
    // }


    //---------------
    // Function to fetch word definition from API
    function fetchApi(word) {
        wrapper.classList.remove("active");
        infoText.style.color = "#000";
        infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;

        let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

        fetch(url)
            .then(response => response.json())
            .then(result => {
                if (result.title) {
                    // If no definition found, suggest corrections
                    fetchCorrection(word);
                } else {
                    data(result, word); // Show data if word is found
                }
            })
            .catch(() => {
                fetchCorrection(word); // Call correction if there is a fetch error
            });
    }

    //-------------------


    //--------
    // Function to fetch spelling correction suggestions
    function fetchCorrection(word) {
        // Skip suggestions if the word is shorter than five letters
        if (word.length < 5) {
            infoText.innerHTML = `No suggestions available for "<span>${word}</span>".`;
            infoText.innerHTML = `Incorrect word "<span>${word}</span>".`;
            return;
        }
        let correctionUrl = `https://api.datamuse.com/sug?s=${word}`;

        fetch(correctionUrl)
            .then(response => response.json())
            .then(suggestions => {
                if (suggestions.length > 0) {
                    let suggestionHTML = 'Did you mean ';
                    // Display up to 3 suggestions
                    for (let i = 0; i < Math.min(suggestions.length, 3); i++) {
                        const correctedWord = suggestions[i].word;
                         // Create clickable suggestions
                         suggestionHTML += `<span style="cursor: pointer; color: blue;" onclick="search('${correctedWord}')">${correctedWord}</span>`;
                         if (i < Math.min(suggestions.length, 3) - 1) suggestionHTML += ' or ';
                     }
                    suggestionHTML += '?';
                    infoText.innerHTML = suggestionHTML;
                } else {
                    infoText.innerHTML = `No suggestions found for <span>"${word}"</span>.`;
                }
            })
            .catch(() => {
                infoText.innerHTML = "Error fetching spelling suggestions.";
            });
    }


    //------------





    // // Function to fetch the translation of the word
    // function fetchTranslation(word) {
    //     let translationUrl = `https://api.mymemory.translated.net/get?q=${word}&langpair=en|mr`; // Example: English to Marathi
    //     fetch(translationUrl)
    //         .then(response => response.json())
    //         .then(data => {
    //             translation.innerText = `Marathi Translation: ${data.responseData.translatedText}`;
    //         })
    //         .catch(() => {
    //             translation.innerText = "Translation not available.";
    //         });
    // }

    // Main search function to handle both dictionary lookup and translation
    function search(word) {
        fetchApi(word);
        fetchTranslation(word);  // Fetch the translation of the word
        searchInput.value = word;
        saveSearchHistory(word); // Save to history
    }




    // Event listener for user input
    searchInput.addEventListener("keyup", e => {
        let word = e.target.value.trim();
        if (e.key === "Enter" && word) {
            search(word);
        }
    });

    // Volume button for pronunciation
    volume.addEventListener("click", () => {
        volume.style.color = "#4D59FB";
        audio.play();
        setTimeout(() => {
            volume.style.color = "#999";
        }, 800);
    });

    // Remove icon functionality
    removeIcon.addEventListener("click", () => {
        searchInput.value = "";
        searchInput.focus();
        wrapper.classList.remove("active");
        infoText.style.color = "#9A9A9A";
        infoText.innerHTML = "Type any existing word and press enter to get meaning, example, synonyms, etc.";
        translation.innerText = "";  // Clear translation text
    });

    // Load search history on page load
    renderSearchHistory();
});




// Function to save a favorite word
function saveFavoriteWord(word) {
    let favorites = JSON.parse(localStorage.getItem('favoriteWords')) || [];

    // Check if the word is already in the favorites list
    if (favorites.includes(word)) {
        showSuccessModal(`${word} is already in your favorites!`);
    } else {
        favorites.push(word);
        localStorage.setItem('favoriteWords', JSON.stringify(favorites));
        showSuccessModal(`${word} added to your favorites!`);
    }
}

// Function to show success modal
function showSuccessModal(message) {
    document.getElementById('favsuccessMessage').innerText = message;
    document.getElementById('favsuccessModal').style.display = 'flex';
}

// Close the success modal when the close button is clicked
document.getElementById('favcloseSuccessModalButton').addEventListener('click', () => {
    document.getElementById('favsuccessModal').style.display = 'none';
});


// Event listener for the "Add to Favorites" button
document.getElementById('favoriteButton').addEventListener('click', () => {
    let currentWord = document.querySelector(".word p").innerText;
    if (currentWord) {
        saveFavoriteWord(currentWord);
    }
});

// Event listener for the "View Favorite Words" button
document.getElementById('viewFavoritesButton').addEventListener('click', () => {
    window.location.href = 'Eng-Dic-favorites.html'; // Redirect to the favorite words page
});




document.getElementById('wordOfTheDayButton').addEventListener('click', () => {
    window.location.href = 'word_of_the_day.html'; // Redirect to the favorite words page
});





// Function to save search history with time and date
function saveSearchHistory(word) {
    let history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    const searchTime = new Date().toLocaleString(); // Get the current date and time
    const searchItem = { word: word, time: searchTime }; // Store word with time

    // Check if the word is already in the history
    if (!history.some(item => item.word === word)) {
        history.push(searchItem);
        localStorage.setItem('searchHistory', JSON.stringify(history));
    }
}

// Function to clear search history
function clearSearchHistory() {
    localStorage.removeItem('searchHistory');
    renderSearchHistory(); // Update the UI after clearing history
}


document.getElementById('viewHistoryButton').addEventListener('click', () => {
    window.location.href = 'Eng-history.html'; // Redirect to history page
});






// Functionality for the close icon
document.getElementById('closeIcon').addEventListener('click', () => {
    // Clear the search input
    const searchInput = document.querySelector('.search input');
    searchInput.value = ''; // Clear the input value
    searchInput.focus(); // Refocus the input field

    // Optionally, reset the displayed information
    const infoText = document.querySelector('.info-text');
    infoText.innerHTML = 'Type any existing word and press enter to get meaning, example.';
    
    // Clear previously displayed results
    const wordDisplay = document.querySelector('.word p');
    const phoneticsDisplay = document.querySelector('.word span');
    const meaningDisplay = document.querySelector('.meaning span');
    const exampleDisplay = document.querySelector('.example span');
    const synonymsDisplay = document.querySelector('.synonyms .list');

    wordDisplay.innerText = '__'; // Reset displayed word
    phoneticsDisplay.innerText = '___'; // Reset phonetics
    meaningDisplay.innerText = '___'; // Reset meaning
    exampleDisplay.innerText = '___'; // Reset example
    synonymsDisplay.innerHTML = ''; // Clear synonyms list

    // Hide the wrapper or any other elements if necessary
    const wrapper = document.querySelector('.wrapper');
    wrapper.classList.remove('active'); // Remove active class if applicable
});
