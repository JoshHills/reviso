// Create an empty array to store the page's questions in.
var questions = [];

    /* Create Questions */

var q1 = new MultipleChoiceQuestion("javascript-1-1");
q1.setQuestion("which is the generally preferred method?");
q1.setTitle("When it comes to incorporating scripts...");
q1.setAnswer("Including a link to the script in the head, as it is stored elsewhere.");
q1.setOptions(["Including the script after the body, so it loads afterwards.", "Including a link to the script in the head, as it is stored elsewhere.", "Including it in the head, so it loads before the web-page does.", "Nothing at all, I hate JavaScript!"]);
q1.setSuccess("success(" + q1.getMATCH_ID() + ")");
q1.setFail("fail(" + q1.getMATCH_ID() + ")");
questions[0] = q1;