// Create an empty array to store the page's questions in.
var questions = [];

    /* Create Questions */

var q1 = new MultipleChoiceQuestion('architecture-1-1');
q1.setQuestion("Which of these initialisms is the protocol which handles the direct exchange of files between computers?");
q1.setAnswer("FTP");
q1.setOptions(["SMTP", "FTP", "SSH", "IMAP"]);
q1.setSuccess("logSuccess(" + q1.getMATCH_ID() + ")");
q1.setFail("fail(" + q1.getMATCH_ID() + ")");
questions.push(q1);

var q2 = new MultipleChoiceQuestion('architecture-1-2');
q2.setQuestion("Due to the unpredictability of routing, packets may not arrive...");
q2.setTitle("Uh-oh!");
q2.setAnswer("All of the above.");
q2.setOptions(["Within a fixed time.", "In the correct order.", "At all.", "All of the above."]);
q2.setSuccess("logSuccess(" + q2.getMATCH_ID() + ")");
q2.setFail("fail(" + q2.getMATCH_ID() + ")");
questions.push(q2);

var q3 = new MultipleChoiceQuestion('architecture-1-3');
q3.setQuestion("To mitigate the potential stifling of data, TCP may be able to...");
q3.setTitle("Damage control!");
q3.setAnswer("Ask for re-transmission of packets.");
q3.setOptions(["Ask for re-transmission of packets.", "Fill in the gaps.", "Stay connected indefinitely until they arrive.", "All of the above."]);
q3.setSuccess("logSuccess(" + q3.getMATCH_ID() + ")");
q3.setFail("fail(" + q3.getMATCH_ID() + ")");
questions.push(q3);

var q4 = new MultipleChoiceQuestion('architecture-1-4');
q4.setQuestion("Any computer can be turned into a web-server just by installing software.");
q4.setAnswer("True!");
q4.setOptions(["True!", "False!"]);
q4.setSuccess("logSuccess(" + q4.getMATCH_ID() + ")");
q4.setFail("fail(" + q4.getMATCH_ID() + ")");
questions.push(q4);

var q5 = new Question('architecture-1-5');
q5.setQuestion("Name the server software currently dominating the market.");
q5.setAnswer("Apache");
q5.setSuccess("logSuccess(" + q5.getMATCH_ID() + ")");
q5.setFail("fail(" + q5.getMATCH_ID() + ")");
questions.push(q5);