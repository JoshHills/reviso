// Create an empty array to store the page's questions in.
var questions = [];

    /* Create Questions */

var q1 = new Question('html-1-1');
q1.setQuestion("Using your newfound skills of HTML inspection, find the hidden empty element in this page with an unusal ID attribute. What is it?");
q1.setTitle("Let's go sleuthing..");
q1.setAnswer("nosferatu");
q1.setSuccess("logSuccess(" + q1.getMATCH_ID() + ")");
q1.setFail("fail(" + q1.getMATCH_ID() + ")");
questions.push(q1);