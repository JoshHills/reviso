// Create an empty array to store the page's questions in.
var questions = [];

    /* Create Questions */

var q1 = new Question('architecture-3-1');
q1.setQuestion("What is the common abbreviation for this topic?");
q1.setTitle("Just to make sure you're paying attention..");
q1.setAnswer("i18n");
q1.setSuccess("logSuccess(" + q1.getMATCH_ID() + ")");
q1.setFail("fail(" + q1.getMATCH_ID() + ")");
questions.push(q1);