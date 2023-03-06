let mic = document.getElementById("mic");
let waves = document.getElementById("waves");
let chatareaMain = document.querySelector(".chatContainer");
let texts = document.querySelector(".imessage");

var introduction = [
	"Hey there, I am your Support Assistant. How can I help you?",
	"Hello, enter a voice command from the provided list in the help section.",
	"Hi, how may i help you?",
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

const SpeechRecognition =
	window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continuous = false;
recognition.lang = "en-US";

function showusermsg(usermsg) {
	let output = "";
	output += `<p class='from-me'>${usermsg}</p>`;
	texts.innerHTML += output;
	return texts;
}

function showchatbotmsg(chatbotmsg) {
	let output = "";
	output += `<p class='from-them'>${chatbotmsg}</p>`;
	texts.innerHTML += output;
	return texts;
}

function chatbotvoice(message) {
	const speech = new SpeechSynthesisUtterance();
	speech.text = "This is a test";
	if (
		message.includes("hello") ||
		message.includes("hi") ||
		message.includes("hey") ||
		message.includes("Good morning")
	) {
		let finalresult =
			introduction[Math.floor(Math.random() * introduction.length)];
		speech.text = finalresult;
	} else if (
		message.includes("mail") ||
		message.includes("Outlook") ||
		message.includes("email") ||
		message.includes("email login")
	) {
		let finalresult = email[Math.floor(Math.random() * email.length)];
		speech.text = finalresult;
		window.setTimeout(function () {
			window.open(emailLink);
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
		}
		if (message.includes("Schedule reminder for")) {
			// Extract the reminder title and time from the transcript
			const title = message.split("Schedule reminder for")[1].trim();
			let time = new Date();

			// Check if the transcript contains a time value
			if (message.includes("at")) {
				speech.text = "Time should will be set on google calendar";
			}

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
				)}&dates=${start}/${end}&details=${encodeURIComponent(reminder.title)}`;

				// Open the calendar URL in a new window
				window.open(calendarUrl, "_blank");
			}
		}
	}
	window.speechSynthesis.speak(speech);
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
