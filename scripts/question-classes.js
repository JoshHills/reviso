/*
 * This script is structured in an object-oriented manner; it creates classes and sub-classes
 * which model questions that align with the construction of HTML's input elements, and provides
 * some relevant utility methods to interact and link such questions to their website counterparts.
 * 
 * As the 'Question' objects are established in javaScript, they are decoupled from the main website;
 * the benefit of this is that if one or more question scripts were to fail to load, the page would
 * degrade with absolutely no repurcussions- it would simply lose some functionality.
 *
 */

/* 
 * As a note of credit, the 'inheritPrototype' function is an example of 'Prototypal Inheritance',
 * pioneered by Douglas Crockford. I read up on the best implementation of Javascript inheritance
 * from the link below; as such, this method is nearly identical to the one outlined there-
 * it's simply the best practice!
 * 
 * http://javascriptissexy.com/oop-in-javascript-what-you-need-to-know/ by Richard Bovell.
 */

    /* Question Class */

// Parent pseudo-class allows sub-types of questions to be defined, provides model.
function Question(matchID) {
    
    // Passed as constructor to separate meta info from content info.
    var MATCH_ID = matchID;
    
    // Fields model question, defaulted to null.
    this.question = "";
    this.title = "";    // Descriptor for question. May be omitted.
    this.picture = "";  // Pitcure to illustrate question. May be omitted.
    this.answer = "";
    this.success = "";  // Function to run if right. May be omitted.
    this.fail = "";     // Function to run if wrong. May be omitted.
    
    // Return private match identifier.
    this.getMATCH_ID = function() {
     
        return MATCH_ID;
        
    }
    
}
// Add methods to parent class, using an object literal for brevity.
Question.prototype = {
    
    // Because using '=' overwrites, ensure it still incorporates the original constructor.
    constructor: Question,

    // Accessor/mutator methods allow for creation of questions within Javascript.
    getQuestion:function() { return this.question; },
    getTitle:function() { return this.title; },
    getPicture:function() { return this.picture; },
    getAnswer:function() { return this.answer; },
    getSuccess:function() { return this.success; },
    getFail:function() { return this.fail; },
    setQuestion:function(question) { this.question = question; },
    setTitle:function(title) { this.title = title; },
    setPicture:function(picture) { this.picture = picture; },
    setAnswer:function(answer) { this.answer = answer; }, 
    setSuccess:function(success) { this.success = success; },
    setFail:function(fail) { this.fail = fail; }
    
}

    /* MultipleChoiceQuestion Class */

// Create a sub-class of question.
function MultipleChoiceQuestion(matchID) {
    
    // Call the parent's constructor.
    Question.call(this, matchID);  
    
    // Multiple options to choose from.
    this.options = [];
    
}
// Make MultipleChoiceQuestion inherit from Question.
inheritPrototype(MultipleChoiceQuestion, Question);
// Add extra methods.
MultipleChoiceQuestion.prototype.getOptions = function() { return this.options; };
MultipleChoiceQuestion.prototype.setOptions = function(options) { this.options = options; };

    /* Utility Methods */

// Method forces a specified class to inherit the contents and properties of another class.
function inheritPrototype(child, parent) {
    
    // Copy contents and resulting properties from the parent into a placeholder variable.
    var parentCopy = Object.create(parent.prototype);
    
    // Manually set the copy's constructor to the sub-class.
    parentCopy.constructor = child;

    // Set the child's prototype to encapsulate everything about the parent.
    child.prototype = parentCopy;
    
}

// For pages with multiple questions, automatically call 'questionFactory' to produce a div for each.
function initPageQuestions(questions) {
    
    $.each(questions, function(key, question) {
     
        questionFactory(question);
        
    });
    
}

// This method finds and fills a div with a linked question.
function questionFactory(question) {
    
    // Find and store the HTML block to inject the question into.
    var matchedDiv = document.getElementById(question.getMATCH_ID());
    
    // Break if no match was found!
    if(matchedDiv == null) { alert('Something went wrong loading a page-question!'); return; }
    
    // Declare a variable to hold incremental HTML produced by evalutating the properties of the question.
    var innerHTML = "";
    
    // If the question has a title...
    if(question.getTitle()) {
        
        // Add the necessary HTML tags and information to the spool for display.
        innerHTML = "<h3>" + question.getTitle() + "</h3>";
        
    }
    
    // If there is a picture related to the question...
    if(question.getPicture()) {
        
        innerHTML += "<img src=\"" + question.getPicture() + "\" alt=\"Question descriptor.\" />";
        
    }
    
    // Question is necessary so no checking is done.
    innerHTML += "<p>" + question.getQuestion() + "</p>";
    
        /* User Input */
    
    innerHTML += "<div class=\"user-input\">";
    
    /* Check the question type and provide input options. */
    if(question.constructor.name == 'MultipleChoiceQuestion') {
        
        $.each(question.getOptions(), function(key, value) {
            
            innerHTML += "<input type=\"radio\" name=\"" + question.getMATCH_ID() + "\" value=\"" + value + "\" /><label>" + value + "</label><br />";
            
        });
               
    }
    else {
        
        
        innerHTML += "<input type=\"text\" />";        
        
    }
    
    innerHTML += "</div>";
    
        /* Check Button. */
    
    innerHTML += "<div class=\"check-container\"><button onclick=\"checkAnswer(\'" + question.getMATCH_ID() + "\')\">Check Answer!</button></div>";
    
        /* Fill block. */

    matchedDiv.innerHTML = innerHTML;
    
    // Check if the question should be set to completed.
    if(user.pageQuestionsAnswered.indexOf(question.getMATCH_ID()) !== -1) {
        
        $('#' + question.getMATCH_ID()).addClass('success');
        // Replace button with message.
        $('#' + question.getMATCH_ID() + ' button').replaceWith("<p><strong>Correct!</strong></p>");
        
    }
    
}

// Function checks a user's choice against the answer of the question and then executes the relevant function.
function checkAnswer(matchID) {
    
    // Retrieve the relevant question.
    var question = new function() {
        
        // Loop through the page's questions array, find the relevant one.
        for(var i = 0; i < questions.length; i++) {
         
            if(questions[i].getMATCH_ID() === matchID) { return questions[i]; }
            
        }
        
    };
    
    // Use jQuery to easily select the user-input section of the question to extract their answer.
    var userAnswer;
    if(question.constructor.name == 'MultipleChoiceQuestion') {
    
        // Grab the checked option.
        userAnswer = ($('#' + matchID + ' .user-input input:checked').attr('value'));
        
    }
    else {
     
        // Retrieve the input-text.
        userAnswer = ($('#' + matchID + ' .user-input input').val());
        
    }
    
    // If the answer was correct...
    if(userAnswer.toLowerCase() == question.getAnswer().toLowerCase()) {
     
        /* Retrieve the success function as a string, convert it to a runnable function... */
        var successFunction = question.getSuccess();
        
        // Retrieve argument(s) if it exists.
        var arguments = successFunction.match(/[^\(\)]+(?=\))/);
        
        // Remove the argument from the passed function.
        successFunction = successFunction.replace(/\(.+\)/, "");
        
        successFunction = window[successFunction];     
        
        // If everything went okay, run it!
        if(typeof successFunction === 'function') {
            successFunction(arguments[0]);
        }
        
    }
    else {
        
        /* Retrieve the failure function as a string, convert it to a runnable function... */
        var failFunction = question.getFail();

        // Retrieve argument(s) if it exists.
        var arguments = failFunction.match(/[^\(\)]+(?=\))/);
        
        // Remove the argument from the passed function.
        failFunction = failFunction.replace(/\(.+\)/, "");       
        
        failFunction = window[failFunction];       
        
        // If everything went okay, run it!
        if(typeof failFunction === 'function') {
            failFunction(arguments[0]);
        }
        
    }
    
}