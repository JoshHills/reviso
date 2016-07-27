// Declare variables to hold node and page information for brevity.
var bodyId;
var topicId;
var topicIndex;
var topicSize;

// When the document is ready...
$(document).ready(function() {

    /* Initialise useful variables based on the user profile and current page. */
    
    // The full tag of the section.
    bodyId = $('body').attr('id');
    // The name of the topic.
    topicId = bodyId.split('-')[0];
    // The index of the topic.
    topicIndex = bodyId.split('-')[1];
    // The number of sections in the topic.
    for(var i = 0; i < user.topicCompletion.length; i++) {
        
        if(user.topicCompletion[i].topicName === topicId) {

            topicSize = user.topicCompletion[i].sections.length;
            break;
            
        }
        
    }
    
    // Now load progress bar into page using this information.
    drawProgressBar();
    
});

// Method initialises a progress bar influenced by the user's profile.
function drawProgressBar() {
    
    // Remove elements from the progress bar (they're being redrawn anyway).
     $('#progress-bar *').remove();
        
    // Update bar via the user's status.
    for(var i = 0; i < user.topicCompletion.length; i++) {

        // Locate the right section...
        if(user.topicCompletion[i].topicName === topicId) {
            
            var runningTotal = 0;

            // For each page in the section...
            for(var j = 0; j < user.topicCompletion[i].sections.length; j++) {

                // If it's the page we're on now...
                if(user.topicCompletion[i].sections[j].sectionName === bodyId) {
                    
                    // Log that it's been viewed.
                    user.topicCompletion[i].sections[j].hasViewed = true;
                    
                    // If there are no questions on the page, it is technically already complete!
                    if($('.question').length == 0) {

                          user.topicCompletion[i].sections[j].completion = 100;

                    }

                }
                
                // Add a div to the progress bar representing the section- apply a unique identifier.
                $('#progress-bar').append('<div class="progress-chunk" id="' +
                    user.topicCompletion[i].sections[j].sectionName + '"></div>');
                
                // If the user has viewed the section...
                if(user.topicCompletion[i].sections[j].hasViewed) {

                    // Add a class to visually represent this.
                    $('#progress-bar #' + user.topicCompletion[i].sections[j].sectionName).addClass('viewed');
                    
                }
                
                // If the user has completed the section...
                if(user.topicCompletion[i].sections[j].completion == 100) {
                 
                    // Add a class to visually represent this.
                    $('#progress-bar #' + user.topicCompletion[i].sections[j].sectionName).addClass('completed');
                    
                }
                
                runningTotal += user.topicCompletion[i].sections[j].completion;

            }
            
            // If the user has completed the section in its entirety, style the border of the progress bar too.
            if(runningTotal / user.topicCompletion[i].sections.length == 100) {
                
                $('#progress-bar').css('border-color', '#4b9141');
                
            }

        }

    }
    
}