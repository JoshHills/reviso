// Create an empty array to store the page's questions in.
var questions = [];

    /* Create Questions */

var q1 = new MultipleChoiceQuestion('architecture-2-1');
q1.setQuestion("Which HTTP method would generally change the state of a database from form input?");
q1.setAnswer("POST");
q1.setOptions(["GET", "HEAD", "DELETE", "POST"]);
q1.setSuccess("logSuccess(" + q1.getMATCH_ID() + ")");
q1.setFail("fail(" + q1.getMATCH_ID() + ")");
questions.push(q1);

var q2 = new Question('architecture-2-2');
q2.setQuestion("Which is the status code resultingly 'I'm a teapot'.");
q2.setTitle("Using the box above...");
q2.setAnswer("418");
q2.setSuccess("logSuccess(" + q2.getMATCH_ID() + ")");
q2.setFail("fail(" + q2.getMATCH_ID() + ")");
questions.push(q2);

var q3 = new MultipleChoiceQuestion('architecture-2-3');
q3.setQuestion("Using your intuition, what is the order of a simple web request?<br />1) User types activates an URL.<br />2)HTTP request from client.<br />3) HTTP response from server.<br />4) Client makes a DNS request.<br />5) DNS server looks up IP address and responds.<br />6) TCP connection established.<br />7) Browser processes and displays response.");
q3.setTitle("Figure out the steps!");
q3.setAnswer("1 5 6 2 3 4 7");
q3.setOptions(["2 7 1 3 5 4 6", "1 5 6 2 3 4 7", "1 5 3 6 4 2 7", "1 2 4 7 5 6 3"]);
q3.setSuccess("logSuccess(" + q3.getMATCH_ID() + ")");
q3.setFail("fail(" + q3.getMATCH_ID() + ")");
questions.push(q3);