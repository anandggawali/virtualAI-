let box = document.querySelector(".box");
let btn = document.querySelector("button");

const speakFunc = (input) => {
    let speakInput = new SpeechSynthesisUtterance(input);
    speakInput.lang = 'en-US';  // Changed to 'en-US' for better compatibility
    window.speechSynthesis.speak(speakInput);
};

window.onload = () => {
   greetingFunc();
};

const greetingFunc = () => {
    let date = new Date();
    let hour = date.getHours();
    if (hour >= 0 && hour < 12) {
        speakFunc("Good Morning Sir, How can I help you?");
    } else if (hour >= 12 && hour < 16) {
        speakFunc("Good Afternoon Sir, How can I help you?");
    } else {
        speakFunc("Good Evening Sir, How can I help you?");
    }
};

const startVoiceInput = () => {
    if ('webkitSpeechRecognition' in window) {
        let recognition = new webkitSpeechRecognition();
        recognition.lang = 'en-US'; // Set language for speech recognition

        recognition.onresult = (e) => {
            console.log('Speech recognized:', e.results[0][0].transcript);
            let spokenText = e.results[0][0].transcript.toLowerCase();
            handleCommands(spokenText);
        };

        recognition.onerror = (e) => {
            console.error('Error occurred in recognition:', e.error);
        };

        recognition.onend = () => {
            console.log('Speech recognition ended.');
            box.classList.remove("btn-box");
            btn.innerHTML = '<i class="fa-solid fa-microphone-lines-slash"></i>';
        };

        recognition.start();
    } else {
        alert("Your browser does not support speech recognition.");
    }
};

btn.onclick = () => {
    box.classList.add("btn-box");
    btn.innerHTML = '<i class="fa-solid fa-microphone-lines"></i>';
    startVoiceInput();
};

const handleCommands = (command) => {
    console.log(command);
    if (command.includes("hello") || command.includes("hii") || command.includes("hey")) {
        speakFunc("Hello sir, How can I help you?");
    } else if (command.includes("who are you") || command.includes("developed") || command.includes("who are you")) {
        speakFunc("I am Virtual Assistant, Developed by Anand!");
    } else if (command.includes("open youtube") || command.includes("open channel")) {
        speakFunc("Opening... YouTube");
        window.open("https://www.youtube.com/");
    } else if (command.includes("open portfolio") || command.includes("portfolio website")) {
        speakFunc("Opening... Anand Gawali's Portfolio");
        window.open("https://anandggawali.github.io/Resume-Website/");
    } else if (command.includes("open google") || command.includes("google")) {
        speakFunc("Opening... Google");
        window.open("https://www.google.com/");
    } else if (command.includes("open facebook") || command.includes("facebook")) {
        speakFunc("Opening... Facebook");
        window.open("https://www.facebook.com/");
    } else if (command.includes("open instagram") || command.includes("instagram")) {
        speakFunc("Opening... Instagram");
        window.open("https://www.instagram.com/");
    } else if (command.includes("open calculator") || command.includes("calculator")) {
        speakFunc("Opening... Calculator");
        window.open("calculator://");
    } else if (command.includes("open chat gpt") || command.includes("chat g p t")) {
        speakFunc("Opening... Chat GPT");
        window.open("https://chatgpt.com/");
    } else if (command.includes("what is time") || command.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: 'numeric', minute: 'numeric' });
        speakFunc(time);
    } else if (command.includes("what is date") || command.includes("date")) {
        let date = new Date().toLocaleString(undefined, { day: 'numeric', month: 'long' });
        speakFunc(date);
    } else {
        speakFunc(`This is what I found on the internet regarding "${command}"`);
        window.open(`https://www.google.com/search?q=${command}`);
    }
};
