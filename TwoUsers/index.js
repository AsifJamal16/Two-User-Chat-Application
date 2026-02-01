let chatBox = document.getElementById("chatBox");
let messageInput = document.getElementById("messageInput");
let sendBtn = document.getElementById("sendBtn");
let userRadios = document.getElementsByName("user");

window.addEventListener("load", loadChats);

function getCurrentUser() {
    let user;
    userRadios.forEach(radio => {
        if (radio.checked) user = radio.value;
    });
    return user;
}

function sendMessage() {
    let text = messageInput.value.trim();
    if (text === "") return;

    let user = getCurrentUser();
    let messageObj = { user, text };

    addMessageToUI(messageObj);
    saveMessage(messageObj);

    messageInput.value = "";
}

function addMessageToUI(msg) {
    let div = document.createElement("div");
    div.classList.add("message");
    div.classList.add(msg.user === "A" ? "userA" : "userB");
    div.innerText = msg.text;

    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function saveMessage(msg) {
    let chats = JSON.parse(localStorage.getItem("twoUserChats")) || [];
    chats.push(msg);
    localStorage.setItem("twoUserChats", JSON.stringify(chats));
}

function loadChats() {
    let chats = JSON.parse(localStorage.getItem("twoUserChats")) || [];
    chats.forEach(msg => addMessageToUI(msg));
}

sendBtn.addEventListener("click", sendMessage);

messageInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});