let box =document.querySelector(".box");
let btn =document.querySelector("button");

const speakFunc = (input) =>{
    let speakInput =new SpeechSynthesisUtterance(input);
    // speakInput.rate = 1;
    // speakInput.pitch =1;
    // speakInput.volume=1;
    speakInput.lang='en-IN'

    window.speechSynthesis.speak(speakInput);
}
window.onload = () => {
   // speakFunc("Hello I am Anand");
   greetingFunc();
}

const greetingFunc = () => {
    let date = new Date();
    let hour =date.getHours();
   if(hour>=0 && hour<12){
    speakFunc("Good Morning Sir, How can I help you?")
   }else if(hour>=12 && hour<16){
    speakFunc("Good Afternoon Sir, How can I help you?")
   }else{
    speakFunc("Good Evening Sir, How can I help you?")
   }
}

// const startVoiceInput = () =>{
//     if('webkitSpeechRecognition' in window){
//         let recognition = new webkitSpeechRecognition();
//         recognition.lang = 'en-US';
//         recognition.onresult = (e) => {
//             console.log(e);
//         }
//         recognition.start();
//     }else{
//         alert("Your windows do not support speech recognition.")
//     }
    
// }

// btn.onclick = () =>{
//     startVoiceInput();
// }
const startVoiceInput = () => {
    if ('webkitSpeechRecognition' in window) {
        let recognition = new webkitSpeechRecognition();
        recognition.lang = 'en-US';

        // Event handler for when results are available
        recognition.onresult = (e) => {
            console.log('Speech recognized:', e.results[0][0].transcript);
            let spokenText = e.results[0][0].transcript;
            handleCommands(spokenText.toLowerCase());
        };

        // Event handler for errors
        recognition.onerror = (e) => {
            console.error('Error occurred in recognition:', e.error);
        };

        // Event handler for when speech recognition ends
        recognition.onend = () => {
            console.log('Speech recognition ended.');
             box.classList.remove("btn-box");
             btn.innerHTML='<i class="fa-solid fa-microphone-lines-slash"></i>'
        };

        recognition.start();
    } else {
        alert("Your browser does not support speech recognition.");
    }
}

btn.onclick = () => {
    box.classList.add("btn-box");
    btn.innerHTML='<i class="fa-solid fa-microphone-lines"></i>'
    startVoiceInput();
}

const handleCommands = (command) => {
    console.log(command);
    if(command.includes("Hello") || command.includes("Hii") || command.includes("hey"))
    {
        speakFunc("Hello sir,How can I help you !")
    }
    else if(command.includes("Who are you") || command.includes("developed") || command.includes("hu r u"))
        {
            speakFunc("I am Virtual Assistance, Developed by Anand!")
        }
    else if(command.includes("Open Youtube") || command.includes("Open channel"))
            {

                speakFunc("Opening... Youtube");
                window.open("https://www.youtube.com/")
            }
    else if(command.includes("Open  Portfolio") || command.includes("portfolio website"))
        {
            speakFunc("Opening... Anand Gawali's Portfolio");
            window.open("https://anandggawali.github.io/Resume-Website/")
        }
    else if(command.includes("Open Google") || command.includes("Google"))
            {
                speakFunc("Opening... Google");
                window.open("https://www.google.com/")
            }
    else if(command.includes("Open facebook") || command.includes("Facebook"))
                {
                    speakFunc("Opening... Facebook");
                    window.open("https://www.facebook.com/")
                }
    else if(command.includes("Open instagram") || command.includes("instagram"))
                    {
                        speakFunc("Opening...instagram");
                        window.open("https://www.instagram.com/")
                    }
     else if(command.includes("Open calculator") || command.includes("calculator"))
                        {
                            speakFunc("Opening...Calculator");
                            window.open("calculator://");
                        }
    else if(command.includes("Open chat gpt") || command.includes("chat g p t"))
                {
                    speakFunc("Opening...Chat g p t");
                    window.open("https://chatgpt.com/");
                }
    else if(command.includes("what is time") || command.includes("time"))
                            {
                                let time= new Date().toLocaleString(undefined,{hour:'numeric',minute:'numeric'});
                                speakFunc(time);
                            }
    else if(command.includes("what is date") || command.includes("date"))
                        {
                         let date= new Date().toLocaleString(undefined,{day:'numeric',month:'long'});
                         speakFunc(date);
                        }
    else{
        speakFunc(`This is what I found on internet regarding ${command}` );
        window.open(`https://www.google.com/search?q=${command}`)
    }
}
