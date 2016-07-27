/* This slew of javascript handles generally applicable page-operations for my website; these include interactive features. */

    /* Global page fields. */

// Initialize the user profile.
if(typeof initProfile !== 'undefined') {

    initProfile();

}

// Load user preference.
var soundEnabled = user.soundEnabled;

//  If the page is not embedded...
if(window == window.top) {
    
    // Perform initialisation operations on its load.
    $(document).ready(function() {
            
        // Attach functionality to 'tooltip' elements.
        $('.peekable').hover(reposition);

        // Initialize plugin first page-wide, as 'loadSnippets' may not provide blanket functionality.
        hljs.initHighlighting();

        // Generate content from page acting as a code repository.
        loadSnippets();

        // Generate scripted questions if any exist for the page.
        if(typeof questions !== 'undefined') {

            initPageQuestions(questions);

        }
        
        // If we're on the index, initialise user profile display.
        if(document.getElementsByTagName("body")[0].id === 'index') {
            
            initIndexFromProfile();   
            
        }
        
        // Update the user's completion.
        updateCompletion(user);

    });
    
}

    /* Code Functions. */

// Function loads code snippets from file into specified html blocks for streamlined code separation.
function loadSnippets() {
    
    // "For each element of the class load"...
    $(".load").each(function() {
        
        // Retrieve the ID to match.
        var matchID = $(this).attr("id");
        
        // Set the inner content of the element in question to the retrieved content.                  
        for(var i = 0; i < codeSnippets.length; i++) {
            
            // Find the match in local storage.
            if(matchID === codeSnippets[i].key) {

                // Set it to the desired text.
                $(this).text(codeSnippets[i].code);
                // Done now, stop traversal.
                break;

            }

        }
        
        // Reinitialize plugin to highlight new content.
        hljs.initHighlighting.called = false;
        hljs.initHighlighting();
        
    });
    
}

    /* Alert Functions. */

// Function displays alert bar with a message.
function showAlert(alertString, alertNoise) {
    
    // Establish array of relevant sound effects.
    var soundEffects = [
           
        "sounds/alert-sound-1.wav",
        "sounds/alert-sound-2.wav"
    
    ];
    
    // Play a sound effect.
    if(soundEnabled && alertNoise) {
        playSound(soundEffects[Math.floor(Math.random() * soundEffects.length)]);
    }
    
    // Find and set the alert text.
    $('#alert-text').text(alertString);
    
    // Find and show the alert bar by setting its display properties to full.
    $('#alert-container').addClass('shown');    
    
}

// Overloaded method provides support for auto-hide after timeout.
function showAlertTimeOut(alertString, alertNoise, timeOut) {
    
    // Show the alert.
    showAlert(alertString, alertNoise);
    
    // Apply a timer until the next hide function.
    setTimeout(function() { hideAlert(); }, timeOut);
    
}

/* Function hides alert bar. */
function hideAlert() {
    
    // Find and hide the alert bar by setting its display properties to naught.
    $('#alert-container').removeClass('shown');
    
}

/* Play a sound-effect from file. */
function playSound(soundFile) {
    
    if(soundEnabled) {
    
        // Create a new sound object.
        var sound = new Audio();

        // Set its source to the passed argument.
        sound.src = soundFile;

        // Play it!
        sound.play();
        
    }
    
}

    /* Footer functions. */

// Open the HTML source code for the active page in a new entity.
function viewSource() {
    
    // Assert a reference variable to the new open entity.
    var win = window.open("view-source:" + window.location, '_blank');
    
    // Give the entity browser-focus.
    win.focus();
    
}

// This function displays the website's legal information in an alert box.
function viewTerms() {

    // Display the locally stored string of terms.
    window.alert(terms);
    
}

// Function toggles global sound variable true/false.
function toggleSound() {
    
    if(soundEnabled) { soundEnabled = false; user.soundEnabled = false; showAlertTimeOut('Sound muted!', false, 1000); }
    else {soundEnabled = true; user.soundEnabled = true; showAlertTimeOut('Sound enabled!', true, 1000); }
    
}

    /* Question Functions. */

// Generically applicable success function.
function success(matchID) {
    
    // Establish array of relevant sound effects.
    var soundEffects = [
           
        "sounds/success-sound-1.wav",
        "sounds/success-sound-2.wav",
        "sounds/success-sound-3.wav"
    
    ];
    
    /* TODO - IF THE USER HAS JUST COMPLETED THE SECTION DISPLAY AN ALERT AND PLAY WIN SOUND WAV */
    // Play a sound effect.
    if(soundEnabled) {
        playSound(soundEffects[Math.floor(Math.random() * soundEffects.length)]);
    }
    
    // Replace button with message.
    $('#' + matchID + ' button').replaceWith("<p><strong>Correct!</strong></p>");
    
    // Add a class to demonstrate success.
    $('#' + matchID).addClass('success');
    
    // Strobe the styling of the question box to indicate success.
    $('#' + matchID + ' .user-input input:checked + label').css('color', 'rgba(80,230,60,.9)');
    $('#' + matchID).css('box-shadow', '0px 0px 15px rgb(80,230,60)');
    setTimeout(function() {
            
            $('#' + matchID).css('box-shadow', 'none');
    
        }, 500);
    
}

// Generally applicable failure function.
function fail(matchID) {
    
    // Establish array of relevant sound effects.
    var soundEffects = [
           
        "sounds/fail-sound-1.wav",
        "sounds/fail-sound-2.wav"
    
    ];
    
    // Play a sound effect.
    if(soundEnabled) {
        playSound(soundEffects[Math.floor(Math.random() * soundEffects.length)]);
    }
        
    // Strobe the styling of the question box to indicate failure.
    $('#' + matchID).css('box-shadow', '0px 0px 15px #ff0000');
        setTimeout(function() {
            
            $('#' + matchID).css('box-shadow', 'none');
    
        }, 500);    
    
    // Establish array of toast-texts.
    var condolences = [
     
        "Uh oh! Give it another shot?",
        "Nope! Try again.",
        "Almost..",
        
    ]
    
    // Display one of them.
    showAlertTimeOut(condolences[Math.floor(Math.random() * condolences.length)], false, 3000);
    
}

// Function which logs the completed question in the user's profile, and recalculates the user's page completion, then redraws the progress bar.
function logSuccess(matchID) {
    
    // Store that the user has entered this question correctly.
    user.pageQuestionsAnswered.push(matchID);
    updateCompletion(user);
    
    // Fire generic success function.
    success(matchID);
    
    // Update bar via the user's status.
    for(var i = 0; i < user.topicCompletion.length; i++) {

        // Locate the right section...
        if(user.topicCompletion[i].topicName === topicId) {
            
            for(var j = 0; j < user.topicCompletion[i].sections.length; j++) {

                if(user.topicCompletion[i].sections[j].sectionName === bodyId) {
                    
                    // Update the topic's completion.
                    user.topicCompletion[i].sections[j].completion = getPageQuestionCompletion();
                    
                }
                
            }
            
        }
    
    }
    // Update the progress bar.
    drawProgressBar();
    
    // Save the profile.
    saveProfile(user);
    
}

// Function calculates the percentage completion of the paged based off its questions.
function getPageQuestionCompletion() {
    
    return ($('.success').length / $('.question').length) * 100;
    
}