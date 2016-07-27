/* File encapsulates the bespoke demonstration functions for this page. */

// Method to be called after page has finished loading.
function initIndexFromProfile() {

    /* Fill user profile box with information based off the user profile! */
    
    $('#user-name').text(user.name);
    $('#days-remaining').text(user.daysUntilExam);
    
    /* Statistics. */
    $('#questions-answered').text(user.pageQuestionsAnswered.length);
    $('#overall-completion').text(user.overallCompletion);
    $('#date-started').text(user.startDate.toString().substring(0, 10));
    
    /* Progress-bars. */
    $(user.topicCompletion).each(function() {
        
        // Grab topic box of the correct div.
        var topicBox = $('#' + this.topicName);
        
        // Grab the progress bar.
        var progressBar = $('#' + this.topicName + ' div.completion-bar img');
        
        /* Calculate the topic completion. */
        
        var topicCompletion = 0;
        
        for(var i = 0; i < this.sections.length; i++) {
            
            topicCompletion += this.sections[i].completion;
            
        }
        
        // Now have the topic completion average.
        topicCompletion = topicCompletion / this.sections.length;
        
        // Set clipping of rectangle to mimic loading bar.
        progressBar.css('clip', 'rect(0px,' + 
                Math.round(((335 * topicCompletion) / 100))  +'px,32px,0px)');
        
        // Remove placeholder.
        if(topicCompletion != 0) {
            
            $('#' + this.topicName + ' div.completion-bar p').removeClass('unviewed');
            
        }
        
        // If the user is finished, congratulate them!
        if(user.overallCompletion == 100) {
            
            // Show an alert.
            showAlert("Congratulations! You've completed the course!", false);
            // Play a nice noise.
            playSound("sounds/win-sound.wav");
            
            // Make the message box display an encouraging message.
            $('#message-name').text("Bravo!");
            $('#message-content').text("You've finished the content here; nice one. Head over to that 'more resources' page to get started with the rest of your undoubtedly incredible career in tech!");
            
        }            
        
    })

}

// Handles reset of profile.
function resetProfile() {
 
    var r = confirm("Are you sure you want to reset your profile?");
    
    if(r) {
     
        defaultUser();
        
    }
    
}