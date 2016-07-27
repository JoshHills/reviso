/* File encapsulates the bespoke demonstration functions for this page. */

var renderedCode;

$(document).ready(function() {
     
    // Grab the code that has been rendered to the dynamic selection block.
    renderedCode = $('#css-1-3-dynamicdoc').text();
    
    $('#user-selection-path').on("input", function() {
        
        queryHighlight();
        
    });
    
    // Set up demo.
    $('#user-selection-path').val("#container p.styled");
    queryHighlight();
    
});

// Method highlights a block of code dynamically!
function queryHighlight() {
        
    // Reset the code.
    $('#css-1-3-dynamicdoc').text(renderedCode);
    
    // Reinitialize plugin to highlight new content.
    hljs.initHighlighting.called = false;
    hljs.initHighlighting();
    
    // Get elements text to query.
    var htmlString = renderedCode;

    // Get the user's selection path.
    var userSelectionPath = $('#user-selection-path').val();
    
    // Grab selected element(s), if any.
    try {
        
        var selectedElements = $(htmlString).find(userSelectionPath);
    
    } catch(e) {
    
        // Alert user that this selection was invalid.
        $('#num-elements').text("Invalid selection!");
        
        return;
    
    }
    
    // Output the number of elements matched.
    if(selectedElements.length == 1) {
        $('#num-elements').text(selectedElements.length + " element found!");
    }
    else {
        $('#num-elements').text(selectedElements.length + " elements found!");
    }
        
    // For efficiency, return if nothing was matched.
    if(selectedElements.length == 0) {
    
        // Provide visual feedback.
        $('#user-selection-path').addClass('nomatch');
        
        return;
    
    }
    $('#user-selection-path').removeClass('nomatch');
    
    // For each element...
    $(selectedElements).each(function() {
        
        // Grab the HTML of the element.
        var temp = $(this).html().trim();

        // Wrap a span around it.
        $('#css-1-3-dynamicdoc').html(function(_, html) {
            return html.replace(temp, '<span class="highlighted">' + temp + '</span>')
        });
        
    });
    
}