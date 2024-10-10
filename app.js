const get= (e) =>{
    return document.querySelector(e)
}
const msgerForm = get(".msger-input")
const msgerInput = get(".input-area")
const msgerChat = get(".msger-chat")
const botImg = 'e0f25b4e828ff0f1821bb9cf22905c23.jpg';
const userImg = 'user.jpg';
const BOT_NAME = 'BOT';
const USER_NAME = 'Marcel'

const prompts = [
    ['hi', 'hey', 'hello', 'good morning', 'good afternoon'],
    ['how are you', 'how is life', 'how are things'],
 ['what are you doing', 'what is going on', 'what is up'],
['how old are you'],
['who are you', 'are you human', 'are you bot', 'are you human or bot'],
 ['who created you', 'who made you'],
 ['your name please', 'your name', 'what is your name', 'may i know your name', ' what do you call yourself'],
['i love you'],
 ['happy', 'good', 'fun', 'wonderful', 'fantastic', 'cool', "fine"],
['bad', 'bored', 'tired'],

['help me', 'tell me a joke', ' tell me story'],
 ['ah', 'yes', 'ok', 'okay', 'nice'],
['bye', 'good bye', 'goodbye', 'see you later'],
['what should i eat today'],
['bro'],
 ['what', 'why', 'how', 'where', 'when'],
 ['no', 'not sure', 'maybe', 'no thanks'],
 ['haha', 'ha', 'lol', 'hehe', 'funny', 'joke']
]

const replies = [
    ['Hello', 'Hi', 'Hey', 'Hi there!', 'Howdy'],
['fine... how are you?', 'pretty well, how are you?', 'Fantastic, how are you'],
['nothing much', 'about to go to sleep', 'can you guess?', "i don't know actually"],
['i am infinite']
, ['i am just a  bot', 'i am a bot', 'what are you?'],
['the awesome developer Chima marcel'],
['i am marcy the bot'], 
['i love you too', 'me too'],
['have you ever felt bad?', 'glad to hear it', "that is great", "that is nice"
],
['why?', "why? what happened!", 'try watching tv'],
['what about', 'once upon a time...'],
['tell me a joke', 'tell me a story', 'tell me about yourself'],
 ['bye', 'goodbye', 'see you later'],
  ['sushi', 'pizza']
['bro!'],
['great question'], 
["that's ok", 'i understand', 'what do you want to talk about?'],
['please say something:(*'], 
['haha!', 'good one']
]

const alternatives = [
    'same', "Go on...", "Bro...", "Try again", "i'm listening...", "I don't understand :/"
   ]

const robot = ['how do you, fellow human', "i am not a bot"]
console.log(replies.length);
msgerForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    const message = msgerInput.value;
    if(!message) return
    addChat(USER_NAME, userImg, "right", message)
     outPut(message)
     msgerInput.value= ""
     
})

const outPut =  (input)=>{
 
    let product;
    let text = input?.toLowerCase().replace(/[\W\s]/gi, " ").replace(/[\d]/gi, "").trim()
    text = text
    .replace(/i feel/g, "")
    .replace(/what s/g, "what is")
    .replace(/please/g, "")
    .replace(/ please/g, "")
    .replace(/r u/g, "are you");


    if(compare(prompts, replies, text)){
        product = compare( prompts, replies, text)
    }else if(text.match(/thanks/gi)){
        product = "My pleasure"
    }else if (text.match(/(robot|bot|robo)/gi)){
        product= robot[Math.floor(Math.random() * robot.length)]
    }else{
        product= alternatives[Math.floor(Math.random() * alternatives.length)];
    }

    const delay = input.split(" ").length * 1000;
    setTimeout(
       ()=>{ addChat(BOT_NAME, botImg, "left", product)}, delay
    )
}
// ES5 func model
function compare(promptArr, repliesArr, text) {
    let reply;
    let replyFound = false;
    console.log(text);
    for (let x = 0; x < promptArr.length; x++) {
        // console.log(promptArr[x]);
        for (let y = 0; y < promptArr[x].length; y++) {

            if ( text == promptArr[x][y]) {
                let replies = repliesArr[x]
                reply =replies[Math.floor(Math.random() * replies.length)]
                replyFound = true;
                break;
            }
        }
        if (replyFound) {
            break;
           } 
        
    }
    // console.log(reply);
    return reply
}

function addChat(name, img, side, text){
    const msgHtml = `
    <div class="msg ${side}-msg">
            <div class="msg-img" style="background-image:url(${img})"></div>
            <div class="msg-bubble">
                <div class="msg-info">
                    <div class="msg-info-name">${name}</div>
                    <div class="msg-info-time">${messageTime(new Date())}</div>
                </div>
                <div class="msg-text">
                   ${text}
                </div>
            </div>
        </div>
    `
    msgerChat.insertAdjacentHTML("beforeend", msgHtml)
    msgerChat.scrollTop += 500;
}

function messageTime(date){
    const hour = "0" + date.getHours()
    const min = "0" + date.getMinutes()
    return `${hour.slice(-2)}:${min.slice(-2)}`;
}
function random(min, max){
    return Math.floor(Math.random() *(max  - min) + min)
}
