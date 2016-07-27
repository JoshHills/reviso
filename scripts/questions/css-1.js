// Create an empty array to store the page's questions in.
var questions = [];

    /* Create Questions */

var q1 = new Question('css-1-1');
q1.setQuestion("What is the simplest selector that selects only the first list element classed as a 'sub-menu'?");
q1.setAnswer(".sub-menu:first-child");
q1.setSuccess("logSuccess(" + q1.getMATCH_ID() + ")");
q1.setFail("fail(" + q1.getMATCH_ID() + ")");
questions.push(q1);