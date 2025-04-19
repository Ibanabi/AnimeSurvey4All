document.addEventListener("DOMContentLoaded", () => {
    
    const introPopup = document.createElement("div");
    introPopup.innerHTML = `
        <div id="intro-popup" style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 80%;
            max-width: 600px;
            height: auto;
            background-color: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            text-align: center;
        ">
            <div id="intro-section-1">
                <p>Hello, this is the researcher. For the sake of anonymity I will be asking for a pseudonym. This survey will have 2 sections:</p>
                <p>(1) UGT - why you watch anime and what you get from it;</p>
                <p>(2) BIG5 - questions will be asked to see whether there's a correlation between the anime genres you watch and your personality type.</p>
                <button id="next-intro-section" style="
                    margin-top: 10px;
                    padding: 10px 20px;
                    background-color: #007BFF;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                ">Next</button>
            </div>
            <div id="intro-section-2" style="display: none;">
                <p>For the sake of consistency, do make sure to be honest. At the end you will see what your personality type is according to the Big 5 OCEAN: Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism (Emotional Instability).</p>
                <p>This will only take up to 10-15 minutes of your time. Thank you!</p>
                <button id="close-intro-popup" style="
                    margin-top: 10px;
                    padding: 10px 20px;
                    background-color: #007BFF;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                ">Got it!</button>
            </div>
        </div>
    `;

    document.body.appendChild(introPopup);

    const style = document.createElement("style");
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes fadeInSlideDown {
            from {
                opacity: 0;
                transform: translate(-50%, -60%);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%);
            }
        }

        #intro-popup {
            animation: fadeInSlideDown 0.5s ease;
            border: 2px solid #007BFF;
            box-shadow: 0 0 10px #007BFF, 0 0 20px #007BFF, 0 0 30px #007BFF;
        }

        @keyframes glowing {
            0% { box-shadow: 0 0 5px #007BFF; }
            50% { box-shadow: 0 0 20px #007BFF; }
            100% { box-shadow: 0 0 5px #007BFF; }
        }

        #intro-popup {
            animation: glowing 1.5s infinite;
        }

        #results-section-1, #results-section-2 {
            border: 2px solid #007BFF;
            box-shadow: 0 0 10px #007BFF, 0 0 20px #007BFF, 0 0 30px #007BFF;
        }

        #results-section-1, #results-section-2 {
            animation: glowing 1.5s infinite;
        }
    `;
    document.head.appendChild(style);

    // Add navigation logic for the intro popup
    const nextIntroSectionButton = document.getElementById("next-intro-section");
    const introSection1 = document.getElementById("intro-section-1");
    const introSection2 = document.getElementById("intro-section-2");

    nextIntroSectionButton.addEventListener("click", () => {
        introSection1.style.display = "none";
        introSection2.style.display = "block";
    });

    document.getElementById("close-intro-popup").addEventListener("click", () => {
        introPopup.remove();
    });

    const section1 = document.getElementById("section-1");
    const section2 = document.getElementById("section-2");
    const section3 = document.getElementById("section-3");
    const thankYou = document.getElementById("thank-you");

    const toSection2Button = document.getElementById("to-section-2");
    const toSection3Button = document.getElementById("to-section-3");
    const genreForm = document.getElementById("genre-questions");

    function showScrollDownPopup() {
        const popup = document.createElement("div");
        popup.textContent = "Scroll down to continue!";
        popup.style.position = "fixed";
        popup.style.bottom = "20px"; // Place at the bottom of the screen
        popup.style.left = "50%"; // Center horizontally
        popup.style.transform = "translateX(-50%)"; // Adjust for true centering
        popup.style.backgroundColor = "rgba(0, 0, 0, 0.8)"; // Transparent dark background
        popup.style.color = "white";
        popup.style.padding = "10px 20px";
        popup.style.borderRadius = "5px";
        popup.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
        popup.style.zIndex = "1000";
        popup.style.textAlign = "center";
        document.body.appendChild(popup);

        setTimeout(() => {
            popup.remove();
        }, 3000); 
    }

    // Navigation logic
    toSection2Button.addEventListener("click", () => {
        section2.style.display = "block"; // 
        toSection2Button.style.display = "none";
        showScrollDownPopup(); 
    });

    toSection3Button.addEventListener("click", () => {
        const selectedGenres = document.querySelectorAll("input[name='genre']:checked");
        if (selectedGenres.length > 3) {
            alert("You can select up to 3 genres only.");
            return;
        }

        section3.style.display = "block"; 
        toSection3Button.style.display = "none"; 
        showScrollDownPopup();

        // Show questions for selected genres
        selectedGenres.forEach(genre => {
            const genreSection = document.getElementById(`${genre.value}-Genre`);
            if (genreSection) {
                genreSection.style.display = "block";
            }
        });
    });

    
    genreForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        
        const selectedGenres = Array.from(document.querySelectorAll("input[name='genre']:checked"))
            .map(genre => genre.value);

        
        document.querySelectorAll("#section-3 input, #section-3 textarea").forEach(input => {
            input.removeAttribute("required");
        });

        
        selectedGenres.forEach(genre => {
            const genreSection = document.getElementById(`${genre}-Genre`);
            if (genreSection) {
                genreSection.querySelectorAll("input, textarea").forEach(input => {
                    input.setAttribute("required", "required");
                });
            }
        });

        
        if (!genreForm.checkValidity()) {
            alert("Please complete all required fields for the selected genres.");
            return;
        }

        
        const pseudonym = document.getElementById("pseudonym").value;
        const age = document.getElementById("age").value;
        const gender = document.getElementById("gender").value;
        const email = document.getElementById("email").value;
        const watchFrequency = document.getElementById("watch-frequency").value;
        const ugtQ1 = document.querySelector("select[name='ugt-q1']").value;
        const ugtQ2 = document.querySelector("select[name='ugt-q2']").value;
        const ugtQ3 = document.querySelector("select[name='ugt-q3']").value;
        const ugtQ4 = document.querySelector("select[name='ugt-q4']").value;
        const ugtQ5 = document.querySelector("select[name='ugt-q5']").value;
        const ugtQ6 = document.querySelector("select[name='ugt-q6']").value;
        const ugtQ7 = document.querySelector("select[name='ugt-q7']").value;
        const ugtQ8 = document.querySelector("select[name='ugt-q8']").value;
        const ugtQ9 = document.querySelector("select[name='ugt-q9']").value;
        const ugtQ10 = document.querySelector("select[name='ugt-q10']").value;
        const ugtQ11 = document.querySelector("select[name='ugt-q11']").value;
        const ugtQ12 = document.querySelector("select[name='ugt-q12']").value;
        const ugtQ13 = document.querySelector("select[name='ugt-q13']").value;
        const ugtQ14 = document.querySelector("select[name='ugt-q14']").value;
        const ugtQ15 = document.querySelector("select[name='ugt-q15']").value;
        const ugtQ16 = document.querySelector("select[name='ugt-q16']").value;
        const ugtQ17 = document.querySelector("select[name='ugt-q17']").value;
        const ugtQ18 = document.querySelector("select[name='ugt-q18']").value;
        const ugtQ19 = document.querySelector("select[name='ugt-q19']").value;
        const ugtQ20 = document.querySelector("select[name='ugt-q20']").value;
        const ugtQ21 = document.querySelector("select[name='ugt-q21']").value;
        const ugtQ22 = document.querySelector("select[name='ugt-q22']").value;
        const ugtQ23 = document.querySelector("select[name='ugt-q23']").value;
        const ugtQ24 = document.querySelector("select[name='ugt-q24']").value;
        const ugtQ25 = document.querySelector("select[name='ugt-q25']").value;

        
        const genreQuestions = {};
        const genreReasons = {};
        selectedGenres.forEach(genre => {
            const genreInputs = document.querySelectorAll(`#${genre}-Genre input[type='radio']:checked`);
            genreQuestions[genre] = Array.from(genreInputs).reduce((acc, input) => {
                const questionKey = input.name;
                acc[questionKey] = input.value;
                return acc;
            }, {});

           
            const reasonTextarea = document.querySelector(`#${genre}-Genre textarea[name='${genre.toLowerCase()}-reason']`);
            if (reasonTextarea) {
                genreReasons[genre] = reasonTextarea.value;
            }
        });

        
        const result = calculateGenreScores(selectedGenres); // Calculate the genre scores before using it in the data object

        // Prepare data for API
        const data = {
            Pseudonym: pseudonym,
            Age: age,
            Gender: gender,
            Email: email,
            WatchFrequency: watchFrequency,
            YearLevel: document.getElementById("year-level").value, 
            UGT_Questions: JSON.stringify({
                ugtQ1, ugtQ2, ugtQ3, ugtQ4, ugtQ5, ugtQ6, ugtQ7, ugtQ8, ugtQ9, ugtQ10,
                ugtQ11, ugtQ12, ugtQ13, ugtQ14, ugtQ15, ugtQ16, ugtQ17, ugtQ18, ugtQ19, ugtQ20,
                ugtQ21, ugtQ22, ugtQ23, ugtQ24, ugtQ25
            }),
            SelectedGenres: JSON.stringify(selectedGenres),
            Action_Genre: JSON.stringify(genreQuestions.Action || {}),
            Adventure_Genre: JSON.stringify(genreQuestions.Adventure || {}),
            Comedy_Genre: JSON.stringify(genreQuestions.Comedy || {}),
            Drama_Genre: JSON.stringify(genreQuestions.Drama || {}),
            Fantasy_Genre: JSON.stringify(genreQuestions.Fantasy || {}),
            Horror_Genre: JSON.stringify(genreQuestions.Horror || {}),
            Romance_Genre: JSON.stringify(genreQuestions.Romance || {}),
            SciFi_Genre: JSON.stringify(genreQuestions.SciFi || {}),
            Genre_Reasons: JSON.stringify(genreReasons),
            Result: JSON.stringify(result) 
        };

        try {
            
            const response = await fetch("http://localhost:3000/api", { 
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ data: [data] }) 
            });

            if (response.ok) {
                console.log("Submission successful. Displaying thank-you page.");
                section1.style.display = "none";
                section2.style.display = "none";
                section3.style.display = "none";
                thankYou.style.display = "block"; 
            } else {
                console.error("Submission failed with status:", response.status);
                alert("Failed to submit the survey. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting the survey:", error);
            alert("An error occurred while submitting the survey. Please try again.");
        }
    });

    function calculateGenreScores(selectedGenres) {
        const traitLabels = {
            O: "Openness",
            C: "Conscientiousness",
            E: "Extraversion",
            A: "Agreeableness",
            N: "Neuroticism"
        };

        const traitDescriptions = {
            extremelyHigh: "Extremely High",
            high: "High",
            moderate: "Moderate",
            low: "Low",
            extremelyLow: "Extremely Low"
        };

        const results = selectedGenres.map(genre => {
            const scores = { O: 0, C: 0, E: 0, A: 0, N: 0 };

            
            Object.keys(scores).forEach(trait => {
                for (let i = 1; i <= 5; i++) { // Assuming 5 questions per trait
                    const inputName = `${genre.toLowerCase()}-${trait.toLowerCase()}-${i}`;
                    const input = document.querySelector(`input[name='${inputName}']:checked`);
                    console.log(`Looking for input: ${inputName}`); // Debugging log
                    if (input) {
                        const value = parseInt(input.value, 10);
                        scores[trait] += value; // Sum up the scores
                        console.log(`Found input: ${inputName}, Value: ${value}`); // Debugging log
                    } else {
                        console.warn(`No input found for Genre: ${genre}, Trait: ${trait}, Question: ${i}`); // Debugging log
                    }
                }
            });

            
            const traitLevels = {};
            Object.keys(scores).forEach(trait => {
                const percentage = (scores[trait] / 25) * 100; // Divide by max score. Dito (5 questions * 5 max score)
                if (percentage >= 80) {
                    traitLevels[trait] = traitDescriptions.extremelyHigh;
                } else if (percentage >= 60) {
                    traitLevels[trait] = traitDescriptions.high;
                } else if (percentage >= 40) {
                    traitLevels[trait] = traitDescriptions.moderate;
                } else if (percentage >= 20) {
                    traitLevels[trait] = traitDescriptions.low;
                } else {
                    traitLevels[trait] = traitDescriptions.extremelyLow;
                }
            });

            return { genre, scores, percentages: {
                O: (scores.O / 25) * 100,
                C: (scores.C / 25) * 100,
                E: (scores.E / 25) * 100,
                A: (scores.A / 25) * 100,
                N: (scores.N / 25) * 100
            }, traitLevels };
        });

        return results;
    }

    function ensureInputsAreVisible(selectedGenres) {
        selectedGenres.forEach(genre => {
            const genreSection = document.getElementById(`${genre}-Genre`);
            if (genreSection) {
                genreSection.style.display = "block"; // the section is visible (sec1-3)
            }
        });
    }

    function generateGenreDescriptions(results, pseudonym) {
        const traitDescriptions = {
            O: "Openness, indicating that you value creativity, imagination, and exploring new ideas.",
            C: "Conscientiousness, showing that you are organized, disciplined, and dependable.",
            E: "Extraversion, suggesting that you thrive in social settings and enjoy high-energy activities.",
            A: "Agreeableness, indicating that you value emotional connection, empathy, and harmony in relationships.",
            N: "Neuroticism, reflecting a tendency to experience emotional intensity and sensitivity."
        };

        let description = `<h3>Personality Results for ${pseudonym}:</h3>`;

        results.forEach(result => {
            let highestTrait = null;
            let highestScore = 0;

            // this will find the highest scoring trait for the genre
            Object.keys(result.scores).forEach(trait => {
                if (result.scores[trait] > highestScore) {
                    highestScore = result.scores[trait];
                    highestTrait = trait;
                }
            });

            if (highestTrait) {
                description += `<p>For the ${result.genre} genre, ${pseudonym} shows an extremely high ${traitDescriptions[highestTrait]}</p>`;
            }
        });

        return description;
    }

    function displayResultsPopup(results, pseudonym) {
        const popup = document.createElement("div");
        popup.style.position = "fixed";
        popup.style.top = "50%";
        popup.style.left = "50%";
        popup.style.transform = "translate(-50%, -50%)";
        popup.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
        popup.style.color = "white";
        popup.style.padding = "20px";
        popup.style.borderRadius = "10px";
        popup.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
        popup.style.zIndex = "1000";
        popup.style.textAlign = "center";
        popup.style.maxWidth = "80%";
        popup.style.overflowY = "auto";

        popup.innerHTML = `
            <div id="results-section-1">
                <h2>Results</h2>
                ${results.map(result => `
                    <h3>${result.genre} Genre</h3>
                    <p>Openness: ${result.traitLevels.O}</p>
                    <p>Conscientiousness: ${result.traitLevels.C}</p>
                    <p>Extraversion: ${result.traitLevels.E}</p>
                    <p>Agreeableness: ${result.traitLevels.A}</p>
                    <p>Neuroticism: ${result.traitLevels.N}</p>
                `).join('')}
                <button id="next-results-section" style="
                    margin-top: 10px;
                    padding: 10px 20px;
                    background-color: #007BFF;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                ">Next</button>
            </div>
            <div id="results-section-2" style="display: none;">
                <h2>Personality Result</h2>
                <ul>
                    ${results.map(result => {
                        const highestTrait = Object.keys(result.scores).reduce((a, b) => result.scores[a] > result.scores[b] ? a : b);
                        const lowestTrait = Object.keys(result.scores).reduce((a, b) => result.scores[a] < result.scores[b] ? a : b);

                        const traitDescriptions = {
                            O: "Openness, valuing creativity and imagination.",
                            C: "Conscientiousness, being organized and dependable.",
                            E: "Extraversion, thriving in social settings.",
                            A: "Agreeableness, valuing empathy and harmony.",
                            N: "Neuroticism, experiencing emotional intensity."
                        };

                        const lowerTraitDescriptions = {
                            O: "less open to new ideas and experiences.",
                            C: "less organized and disciplined.",
                            E: "less outgoing and energetic.",
                            A: "less empathetic and cooperative.",
                            N: "less emotionally sensitive or reactive."
                        };

                        return `
                            <li>
                                For the ${result.genre} genre, ${pseudonym} is more ${traitDescriptions[highestTrait]}.
                                However, ${pseudonym} is ${lowerTraitDescriptions[lowestTrait]}.
                            </li>
                        `;
                    }).join('')}
                </ul>
                <button id="close-results-popup" style="
                    margin-top: 10px;
                    padding: 10px 20px;
                    background-color: #007BFF;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                ">Close</button>
            </div>
        `;

        document.body.appendChild(popup);

        const nextResultsSectionButton = document.getElementById("next-results-section");
        const resultsSection1 = document.getElementById("results-section-1");
        const resultsSection2 = document.getElementById("results-section-2");

        nextResultsSectionButton.addEventListener("click", () => {
            resultsSection1.style.display = "none";
            resultsSection2.style.display = "block";
        });

        document.getElementById("close-results-popup").addEventListener("click", () => {
            popup.remove();
        });
    }

    function calculateAndDisplayGenreScores() {
        const selectedGenres = Array.from(document.querySelectorAll("input[name='genre']:checked"))
            .map(input => input.value);

        const traitLabels = {
            O: "Openness",
            C: "Conscientiousness",
            E: "Extraversion",
            A: "Agreeableness",
            N: "Neuroticism"
        };

        const results = selectedGenres.map(genre => {
            const scores = { O: 0, C: 0, E: 0, A: 0, N: 0 };

            
            Object.keys(scores).forEach(trait => {
                for (let i = 1; i <= 5; i++) { 
                    const inputName = `${genre.toLowerCase()}-${trait.toLowerCase()}-${i}`;
                    const input = document.querySelector(`input[name='${inputName}']:checked`);
                    if (input) {
                        scores[trait] += parseInt(input.value, 10); // Sum up the scores
                    }
                }
            });

            return {
                genre,
                scores
            };
        });

       
        const popup = document.createElement("div");
        popup.style.position = "fixed";
        popup.style.top = "50%";
        popup.style.left = "50%";
        popup.style.transform = "translate(-50%, -50%)";
        popup.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
        popup.style.color = "white";
        popup.style.padding = "20px";
        popup.style.borderRadius = "10px";
        popup.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
        popup.style.zIndex = "1000";
        popup.style.textAlign = "center";
        popup.style.maxWidth = "80%";
        popup.style.overflowY = "auto";

        let content = "<h2>Personality Traits by Genre</h2><table style='width: 100%; border-collapse: collapse;'>";
        content += "<tr><th style='border: 1px solid white; padding: 8px;'>Genre</th>";
        Object.values(traitLabels).forEach(label => {
            content += `<th style='border: 1px solid white; padding: 8px;'>${label}</th>`;
        });
        content += "</tr>";

        results.forEach(result => {
            content += `<tr><td style='border: 1px solid white; padding: 8px;'>${result.genre}</td>`;
            Object.keys(result.scores).forEach(trait => {
                content += `<td style='border: 1px solid white; padding: 8px;'>${result.scores[trait]}</td>`;
            });
            content += "</tr>";
        });

        content += "</table><button id='close-popup' style='margin-top: 10px; padding: 10px 20px; background-color: #007BFF; color: white; border: none; border-radius: 5px; cursor: pointer;'>Close</button>";
        popup.innerHTML = content;

        document.body.appendChild(popup);

        document.getElementById("close-popup").addEventListener("click", () => {
            popup.remove();
        });
    }

    //  
    const thankYouPage = document.getElementById("thank-you");
    const observer = new MutationObserver(() => {
        if (thankYouPage.style.display === "block") {
            const selectedGenres = Array.from(document.querySelectorAll("input[name='genre']:checked")).map(input => input.value);
            ensureInputsAreVisible(selectedGenres);
            const results = calculateGenreScores(selectedGenres);
            const pseudonym = document.getElementById("pseudonym").value;
            displayResultsPopup(results, pseudonym);
            saveResultToGoogleSheet(results);
        }
    });

    observer.observe(thankYouPage, { attributes: true, attributeFilter: ["style"] });

    
    const progressBarContainer = document.createElement("div");
    progressBarContainer.style.position = "fixed";
    progressBarContainer.style.top = "0";
    progressBarContainer.style.right = "0";
    progressBarContainer.style.width = "10px";
    progressBarContainer.style.height = "100%";
    progressBarContainer.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
    progressBarContainer.style.zIndex = "1000";

    
    const progressBar = document.createElement("div");
    progressBar.style.width = "100%";
    progressBar.style.height = "0";
    progressBar.style.backgroundColor = "#007BFF";
    progressBarContainer.appendChild(progressBar);

    document.body.appendChild(progressBarContainer);

    
    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = (scrollTop / documentHeight) * 100;
        progressBar.style.height = `${scrollPercentage}%`;
    });
});