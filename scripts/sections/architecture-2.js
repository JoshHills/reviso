/* File encapsulates the bespoke demonstration functions for this page. */

var statusCodes = {
    
    102 : "The server has recieved and is processing the request.",
    200 : "The standard response for successful HTTP requests.",
    201 : "The request has been fulfilled, new resource created.",
    300 : "Multiple options for the resource delivered.",
    305 : "Content located elsewhere, retrieve from there.",
    400 : "Request cannot be fulfilled due to bad syntax.",
    402 : "Payment required.",
    404 : "Requested resource could not be found.",
    408 : "The server timed out.",
    418 : "I'm a teapot. (I'm not kidding)",
    429 : "User has sent too many requests in a given amount of time.",
    500 : "Generic error message.",
    503 : "The server is currently unavailable.",
    508 : "The server detected an infinite loop while processing the request."
    
}

function generateRandomStatusCode() {
    
    // Create array of codes.
    var codes = Object.keys(statusCodes);
    
    randomCode = codes[Math.floor(Math.random() * codes.length)];
    
    $('#status').text(randomCode);
    
    $('#status-description').text(statusCodes[randomCode]);
    
}

var codeArray


function updateMethodDescription() {
    
    // Get the selection.
    var selected = $('#methods select').find(':selected').attr('value');
    
    // Get the currently visible element.
    current = $('.description.visible');
    
    // Hide it.
    if(current) {
        
        $(current).removeClass('visible');   
        
    }
    
    // Make the new one visible.
    $('#' + selected).addClass('visible');
    
}