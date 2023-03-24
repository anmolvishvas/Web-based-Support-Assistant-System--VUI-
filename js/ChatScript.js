let mic = document.getElementById("mic");
let waves = document.getElementById("waves");
let chatareaMain = document.querySelector(".chatContainer");
let texts = document.querySelector(".imessage");

var introduction = [
	"Hey there, I am your Support Assistant. How can I help you?",
	"Hello, enter a voice command from the provided list in the help section.",
	"Hi, how may i help you?",
];

var fine = [
	"I am fine thanks, what about you?",
	"I am doing well.",
	"I am doing well, What about you?",
];

const emailLink = "https://www.outlook.com/live.mdx.ac.uk";
var email = [
	"Opening outlook...",
	"I am redirecting you to the login page.",
	"Redirecting you to outlook's login page!",
];

const unihubLink = "https://myunihub.mdx.ac.uk/";
var unihub = [
	"I am redirecting you to the login page",
	"Sure, i am opening the sign in page in a new tab. Please check if you have enabled pop-up.",
	"Opening myUnihub page for you",
];

const gradesLink =
	"https://misis.mdx.ac.uk/ssomanager/c/SSB?pkg=mdx_mymodules_pkg.mdx_student_check_prog_p";
var grades = [
	"Your grades results is found on myUnihub website under My Study section.",
	"Your progression can be found on myUnihub website.",
	"I am redirecting you to the grades and progression page",
];

var task =
	"Please speak your reminder and the time when it should be scheduled";

var submissionsList = [
	"For which module would you like to get more information?",
	"For which module?",
	"Here are the list of module, choose one of them: User Experience, Novel Interaction Technologies,Undergraduate Individual Project, Business Intelligence",
];

var novel = [
	"You have this system to submit along with a report for week 23 and a reflective report which is due for week24.",
	"You have a VUI system along with a report which is due for the 23rd March 2023 and a reflective report which is due for week 24 - right after Easter breaks",
];

var UX = [
	"You have the group report related to the evaluation of your UI which is due for week 24 and MCQ test which will take place in week 25.",
	"You have the group report related to the evaluation of your UI and MCQ test which are due for week 24 - 25",
];

var BI = [
	"You have an individual report to submit on the 14th April 2023 followed by a presentation that will take place on the 17th April 2023. ",
	"You have an individual report to submit on the 14th April 2023 and a presentation that will take place in the week after. ",
];

var project = [
	"You have dissertation to submit on the 30th April 2023 which includes a report and a developed system, followed by a presentation - viva.",
	"You have a report to submit on the 30th April 2023 which includes  a developed system, followed by a presentation - viva.",
];

var undergraduate =
	"You have to complete the implementation phase of your system, start the testing and evaluation of the system, finalize your final report and practice for the presentation";

var stop = [
	"Alright, i am disabling the microphone..",
	"The listening process has been stopped!",
];

var goodbye = [
	"Goodbye. I look forward to help you again.",
	"It was a pleasure talking to you. Have a great day!",
	"Bye and have a great day!",
];

var errors = [
	"Sorry, I didn't understand. Can you try re-phrasing please?",
	"I didn't quite catch that! Can you please repeat?",
];

const SpeechRecognition =
	window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continuous = false;
recognition.lang = "en-US";

function showusermsg(usermsg) {
	let output = "";
	output += `<p class='from-me'>${usermsg}</p>`;
	texts.innerHTML += output;
	chatareaMain.scrollTop = chatareaMain.scrollHeight;
	return texts;
}

function showchatbotmsg(chatbotmsg) {
	let output = "";
	output += `<p class='from-them'>${chatbotmsg}</p>`;
	texts.innerHTML += output;
	chatareaMain.scrollTop = chatareaMain.scrollHeight;
	return texts;
}

function chatbotvoice(message) {
	const speech = new SpeechSynthesisUtterance();
	if (
		message.includes("hello") ||
		message.includes("hi") ||
		message.includes("hey") ||
		message.includes("Good morning")
	) {
		let finalresult =
			introduction[Math.floor(Math.random() * introduction.length)];
		speech.text = finalresult;
		window.speechSynthesis.speak(speech);
	} else if (
		message.includes("mail") ||
		message.includes("Outlook") ||
		message.includes("email") ||
		message.includes("email login")
	) {
		let finalresult = email[Math.floor(Math.random() * email.length)];
		speech.text = finalresult;
		window.speechSynthesis.speak(speech);
		window.setTimeout(function () {
			window.open(emailLink);
		}, 3000);
	} else if (
		message.includes("how are you") ||
		message.includes("how are you doing")
	) {
		let finalresult = fine[Math.floor(Math.random() * fine.length)];
		speech.text = finalresult;
		window.speechSynthesis.speak(speech);
	} else if (message.includes("fine")) {
		let finalresult = "That's great!";
		speech.text = finalresult;
		window.speechSynthesis.speak(speech);
	} else if (
		message.includes("university") ||
		message.includes("website") ||
		message.includes("university portal")
	) {
		let finalresult = unihub[Math.floor(Math.random() * unihub.length)];
		speech.text = finalresult;
		window.speechSynthesis.speak(speech);
		window.setTimeout(function () {
			window.open(unihubLink);
		}, 3000);
	} else if (
		message.includes("grades") ||
		message.includes("progress") ||
		message.includes("grade") ||
		message.includes("marks") ||
		message.includes("progression")
	) {
		let finalresult = grades[Math.floor(Math.random() * grades.length)];
		speech.text = finalresult;
		window.speechSynthesis.speak(speech);
		window.setTimeout(function () {
			window.open(gradesLink);
		}, 3000);
	} else if (
		message.includes("reminders") ||
		message.includes("schedule") ||
		message.includes("reminder") ||
		message.includes("task")
	) {
		if (!message.includes("Schedule reminder for")) {
			let finalresult = task;
			speech.text = finalresult;
			window.speechSynthesis.speak(speech);
		}
		if (message.includes("Schedule reminder for")) {
			// Extract the reminder title and time from the transcript
			const title = message.split("Schedule reminder for")[1].trim();
			let time = new Date();

			// Check if the transcript contains a time value
			if (message.includes("at")) {
				speech.text =
					"Time should will be set on google calendar. I can fill the reminder title for you.";
				window.speechSynthesis.speak(speech);
			} else {
				// Create the reminder object with the title and time properties
				const reminder = {
					title: title,
					time: time,
				};

				// Store the reminder object in localStorage
				localStorage.setItem("reminder", JSON.stringify(reminder));

				// Check if the time property is a valid date object
				if (
					Object.prototype.toString.call(reminder.time) === "[object Date]" &&
					!isNaN(reminder.time)
				) {
					// Generate the calendar URL with the reminder details
					const start = reminder.time.toISOString();
					const end = new Date(
						reminder.time.getTime() + 30 * 60000
					).toISOString();
					const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
						reminder.title
					)}&dates=${start}/${end}&details=${encodeURIComponent(
						reminder.title
					)}`;

					// Open the calendar URL in a new window
					window.open(calendarUrl, "_blank");
				}
			}
		}
	} else if (
		message.includes("submissions") ||
		message.includes("submission") ||
		message.includes("deadlines") ||
		message.includes("deadline") ||
		message.includes("coursework")
	) {
		let finalresult =
			submissionsList[Math.floor(Math.random() * submissionsList.length)];
		speech.text = finalresult;
		window.speechSynthesis.speak(speech);
	} else if (
		message.includes("novel") ||
		message.includes("interaction") ||
		message.includes("technology")
	) {
		let finalresult = novel[Math.floor(Math.random() * novel.length)];
		speech.text = finalresult;
		window.speechSynthesis.speak(speech);
	} else if (
		message.includes("ux") ||
		message.includes("UX") ||
		message.includes("User experience") ||
		message.includes("user")
	) {
		let finalresult = UX[Math.floor(Math.random() * UX.length)];
		speech.text = finalresult;
		window.speechSynthesis.speak(speech);
	} else if (
		message.includes("bi") ||
		message.includes("BI") ||
		message.includes("b i") ||
		message.includes("business intelligence")
	) {
		let finalresult = BI[Math.floor(Math.random() * BI.length)];
		speech.text = finalresult;
		window.speechSynthesis.speak(speech);
	} else if (
		message.includes("left for project") ||
		message.includes("left for undergraduate individual project")
	) {
		let finalresult = undergraduate;
		speech.text = finalresult;
		window.speechSynthesis.speak(speech);
	} else if (
		message.includes("project") ||
		message.includes("undergraduate individual project") ||
		message.includes("individual") ||
		message.includes("individual project") ||
		message.includes("FYP")
	) {
		let finalresult = project[Math.floor(Math.random() * project.length)];
		speech.text = finalresult;
		window.speechSynthesis.speak(speech);
	} else if (
		message.includes("learn coding") ||
		message.includes("practice coding") ||
		message.includes("links to learn")
	) {
		let finalresult = "Which Programming Language would you like to learn?";
		speech.text = finalresult;
		window.speechSynthesis.speak(speech);
	} else if (message.includes("python")) {
		let finalresult =
			"There are several websites where you can practice Python. Some popular options include: <br>HackerRank (https://www.hackerrank.com/), <br>LeetCode (https://leetcode.com/), <br>Codewars (https://www.codewars.com/), <br>Codecademy (https://www.codecademy.com/), <br>Project Euler (https://projecteuler.net/)";
		speech.text = finalresult;
	} else if (message.includes("javascript") || message.includes("JavaScript")) {
		let finalresult =
			"Here are some websites where you can practice JavaScript:<br>Codecademy: https://www.codecademy.com/learn/introduction-to-javascript, <br>FreeCodeCamp: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/, <br>Codewars: https://www.codewars.com/, <br>HackerRank: https://www.hackerrank.com/domains/javascript";
		speech.text = finalresult;
	} else if (message.includes("java") || message.includes("Java")) {
		let finalresult =
			"Here are some resources to practice Java:<br>CodingBat: https://codingbat.com/java, <br>Java Tutorials and Exercises: https://www.w3schools.com/java/exercise.asp,<br>Java Practice Problems: https://www.javatpoint.com/java-practice-problems, <br>Practice-it: https://practiceit.cs.washington.edu/";
		speech.text = finalresult;
	} else if (message.includes("c++")) {
		let finalresult =
			"There are several websites that offer practice problems and challenges for C++ programming:<br>Codeforces: https://codeforces.com/problemset?tags=implementation,<br>CodeChef: https://www.codechef.com/problems/easy,<br>SPOJ: https://www.spoj.com/problems/classical/";
		speech.text = finalresult;
	} else if (
		message.includes("html") ||
		message.includes("HTML") ||
		message.includes("CSS") ||
		message.includes("css")
	) {
		let finalresult =
			"Here are some links for practicing HTML and CSS:<br>W3Schools - HTML/CSS Exercises: https://www.w3schools.com/exercise/default.asp, <br>HTML Dog - HTML/CSS Exercises: https://www.htmldog.com/exercises/,<br>CSS Zen Garden - CSS Practice: http://www.csszengarden.com/";
		speech.text = finalresult;
	} else if (
		message.includes("open navigation") ||
		message.includes("nav") ||
		message.includes("help")
	) {
		let finalresult = "Opening the help section for you!";
		speech.text = finalresult;
		openNav();
	} else if (message.includes("stop recording") || message.includes("stop")) {
		let finalresult = stop[Math.floor(Math.random() * stop.length)];
		speech.text = finalresult;
		window.speechSynthesis.speak(speech);
		recognition.stop();
	} else if (message.includes("bye") || message.includes("goodbye")) {
		let finalresult = goodbye[Math.floor(Math.random() * goodbye.length)];
		speech.text = finalresult;
		window.speechSynthesis.speak(speech);
	} else {
		let finalresult = errors[Math.floor(Math.random() * errors.length)];
		speech.text = finalresult;
		window.speechSynthesis.speak(speech);
	}

	chatareaMain.appendChild(showchatbotmsg(speech.text));
}

recognition.onend = function (element) {
	mic.style.display = "block";
	waves.style.display = "none";
};

recognition.onresult = function (element) {
	let resultIndex = element.resultIndex;
	let transcript = element.results[resultIndex][0].transcript;
	chatareaMain.appendChild(showusermsg(transcript));
	chatbotvoice(transcript);
	console.log(transcript);
};

mic.addEventListener("click", function () {
	recognition.start();
	waves.style.display = "block";
	mic.style.display = "none";
	console.log("Activated");
});

waves.addEventListener("click", function () {
	recognition.stop();
	mic.style.display = "block";
	waves.style.display = "none";
	console.log("Deactivated");
});
