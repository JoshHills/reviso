/* This script encapsulates operations pertaining to a user-profile. */

/* Global user variables. */

// Give the storage function a more global scope.
var store;

// Declare a user variable to store.
var user;

/* Function initializes a user profile. */
function initProfile() {
    
    // Initialise polyfil to bypass browser storage restrictions or fringe cases of incompatibility.
    polyfillStorage();

    // Retrieve and parse string-representation of the user's profile from local storage.
    user = store('userProfile');

    // If one did not exist, or it was corrupted...
    if(!user || typeof user.name === 'undefined') {

        // Load and store a default one.
        defaultUser();
        saveProfile(user);

    }
    // Otherwise, if the user profile loaded correctly.
    else {

        /* Run model-based initialisation - update a couple of on-load variables. */

        // Set the date last-visited to now.
        user.lastVisited = new Date();

    }
    
}

/* Function which resets the user-profile to a default state. */
function defaultUser() {
    
    /* Construct a default user. */
    user = {

        /* Single mandatory fields. */
        name: "Guest",
        startDate: new Date(),
        daysUntilExam: '?',
        lastVisited: new Date(),
        streak: 0,
        /* Streak start date? */
        hasAnswered: false,
        overallCompletion: 0,
        topicCompletion: [

            new topic("architecture", [

                new section("architecture-1"),
                new section("architecture-2"),  
                new section("architecture-3")

            ]),                
            new topic("html", [

                new section("html-1"),
                new section("html-2"),  
                new section("html-3")

            ]),            
            new topic("standards", [

                new section("standards-1")

            ]),            
            new topic("css", [

                new section("css-1"),
                new section("css-2"),  
                new section("css-3")

            ]),
            new topic("javascript", [

                new section("javascript-1")

            ])

        ],
        pageQuestionsAnswered: [],
        soundEnabled: true

    };

    initPrompts();
    
    // Save new default.
    saveProfile(user);   
    
}

// Method initialises user-determined information.
function initPrompts() {
 
    // Ask for user information.
    var userName = prompt("Hey there! What's your name?", "Guest");
    if(userName != null) {
     
        user.name = userName;
        
    }
    var daysTil = prompt("Okay, how many days left until your exam? If you don't know or this is irellevant, just cancel.", "?");
    if(!isNaN(parseFloat(daysTil))) {
     
        user.daysUntilExam = daysTil;
        
    }
    
    // If we're on the index, re-initialise user profile display.
    if(document.getElementsByTagName("body")[0].id === 'index') {
        
        initIndexFromProfile();
        
    }
    
    
}

/* Declare objects that model the website's content to aid progress-tracking; this would likely be superceded by a more sophisticated system in a website hosted remotely, as access to local files would enable the object to be dynamically updated with additional content. */

function topic(topicName, sections) {
    
    this.topicName = topicName;
    this.sections = sections;
    
}

function section(sectionName) {
    
    this.sectionName = sectionName;
    this.completion = 0;
    this.hasViewed = false;
    
}

    /* Functions that manage the content of the user profile. */

// Save the user's profile to browser local storage.
function saveProfile(selectedUser) {


    // Unload the object by performing a shut-down routine on state variables.
    selectedUser.lastVisited = new Date();

    // Store a string-representation of the object in local storage.
    store('userProfile',
        selectedUser);

}

// Check to see if the user is still on a streak.
function updateStreak(selectedUser) {

    // Store time difference in milliseconds between now and last user action.
    var timeDifference = Math.abs(new Date() - selectedUser.lastVisited);

    // If the difference was more than a day, reset streak.

    /* UPDATE THIS TO ADD TO THE STREAK */
    if(timeDifference > 86400000) {

        selectedUser.streak = 0;

    }

}

// Recalculate and update the overall course completion. If there was any more abstracted nesting I would produce a recursive solution to this problem.
function updateCompletion(selectedUser) {

    // Store a running total of the percentages of each topic to take an average of.
    var runningTopicPercentage = 0;

    // For every topic...
    for(var i = 0; i < selectedUser.topicCompletion.length; i++) {

        // Store a running total of the percentages of each section within the topic to take an average of.
        var runningSectionPercentage = 0;

        // For every section within the topic...
        for(var j = 0; j < selectedUser.topicCompletion[i].sections.length; j++) {

            // Retrieve its completion and add it to the running total.
            runningSectionPercentage += selectedUser.topicCompletion[i].sections[j].completion;

        }

        // Take an average of the sections and add this to the overall running total.
        runningTopicPercentage += runningSectionPercentage / selectedUser.topicCompletion[i].sections.length;

    }

    // Take an average of the topic and store this as the overall completion.
    selectedUser.overallCompletion = Math.round(runningTopicPercentage / selectedUser.topicCompletion.length);

}

/* Storage Polyfill by Kent Safranski */
function polyfillStorage(){store=function(t,e){function a(t,e,a){var n=new Date;n.setTime(n.getTime()+24*a*60*60*1e3);var o="; expires="+n.toGMTString();document.cookie=t+"="+e+o+"; path=/"}function n(t){for(var e=t+"=",a=document.cookie.split(";"),n=0,o=a.length;o>n;n++){for(var r=a[n];" "===r.charAt(0);)r=r.substring(1,r.length);if(0===r.indexOf(e))return r.substring(e.length,r.length)}return null}var o=!1;if(localStorage&&(o=!0),"undefined"!=typeof e&&null!==e&&("object"==typeof e&&(e=JSON.stringify(e)),o?localStorage.setItem(t,e):a(t,e,30)),"undefined"==typeof e){data=o?localStorage.getItem(t):n(t);try{data=JSON.parse(data)}catch(r){data=data}return data}null===e&&(o?localStorage.removeItem(t):a(t,"",-1))}}

// Attach an unload method to the body of the page (as it's the only guaranteed element) which saves the user's profile.
window.onunload = function() { saveProfile(user) };