// Create an empty array to store the page's questions in.
var questions = [];

    /* Create Questions */

var q1 = new Question("standards-1-1");
q1.setQuestion("How many errors does the above code snippet throw when run through W3C's validator?");
q1.setTitle("Getting you into gear...");
q1.setAnswer("12");
q1.setPicture("images/sections/standards/validator.png");
q1.setSuccess("success(" + q1.getMATCH_ID() + ")");
q1.setFail("fail(" + q1.getMATCH_ID() + ")");
questions[0] = q1;