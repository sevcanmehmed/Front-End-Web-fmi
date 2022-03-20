// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { getDatabase, ref, onChildAdded, push, set, get } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";

const storage = window.localStorage;
const roomName = document.getElementById("rName").textContent;
const inputEl = document.getElementById("msg-input");
const user = storage.getItem("username");
const messageList = document.querySelector("#message-list");

console.log(user);

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxijkKtDB81pViLKyoo1t7bG_FPWO8rWI",
  authDomain: "meow-chat-5306c.firebaseapp.com",
  projectId: "meow-chat-5306c",
  storageBucket: "meow-chat-5306c.appspot.com",
  messagingSenderId: "1045994365224",
  appId: "1:1045994365224:web:c68714372dccedf4b3b01d",
  measurementId: "G-4M4278E2NL"
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const messagesDataRef = ref(database, "/rooms/"+ roomName);

const roomsDataRef = ref(database, "/rooms/" + roomName);
const requests = ref(database,"requests/" + user);
//const users = ref(database,"/users/" + user);


const requestsRef = push(requests);
/*set(requestsRef, {
  "username": user  
})*/
 
inputEl.addEventListener("change", event => {
  const messagesRef = push(messagesDataRef);
  set(messagesRef,{
   "username": window.localStorage.getItem("username"),
   "Date": Date.now(),
   "text": event.target.value
  })
 event.target.value = "";
  
})

onChildAdded(messagesDataRef, data => {
  const message = data.val();
  const listItem = document.createElement("li");
  // console.log(message.textContent);
  //console.log(message);
  listItem.innerHTML=`
        <div class="msg-info">
        <span class="username"><b>${message.username}</b></span>
        <span class="date">${new Date(message.Date).toLocaleString()}</span>
        </div> 
        <span class="msg-text">${message.text}</span>
  `
  messageList.appendChild(listItem);  
})

/*
if(window.localStorage.getItem("username:")){
  console.log(window.localStorage["username:"]);
}

const msgInput = document.querySelector("#msg-input");
const list = document.querySelector("#list");

msgInput.addEventListener("input", event => {
  let msg = event.target.value;
  let li = document.createElement('li');
  li.innerHTML = `
  
  `

})
*/