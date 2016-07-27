// Create an empty array to store the page's questions in.
var questions = [];

    /* Create Questions */

var q1 = new MultipleChoiceQuestion("example-question-1");
q1.setQuestion("...how amazing is this website?");
q1.setTitle("On a scale of 1 - 5");
q1.setAnswer("5");
q1.setOptions(["5", "4", "3", "2", "1", "0"]);
q1.setSuccess("success(" + q1.getMATCH_ID() + ")");
q1.setFail("fail(" + q1.getMATCH_ID() + ")");
questions[0] = q1;