import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { getDatabase, ref, onChildAdded, push, set } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";
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

const newRoomInp = document.getElementById("inp");
//const createBtn = document.querySelector("#create_room");
//const createDiv = document.querySelector("#create_div");
const roomsDiv = document.querySelector("#wrapper");
const ol = document.getElementById("olList");
const roomList = document.getElementsByClassName("list");
const subscribeBtns = document.getElementsByClassName("subscribe");

/*
function addRoomsToFirebase(){
    var subscribedRooms = document.getElementsByClassName("subscribed");
    Array.from(subscribedRooms).forEach((el) =>{
            console.log("rooms to firebase: " + el);
            var roomsDataRef = ref(database, "/rooms/" + el.textContent);
            var roomsRef = push(roomsDataRef);
            set(roomsRef,{
                  "username": window.localStorage.getItem("username"),
                  "Date": new Date(Date.now()).toLocaleString()
                })
                console.log(el);
                console.log(el.parentElement.firstElementChild);
    })
}
*/

var roomsSubscribedDataRef = ref(database, "/subscribed-rooms/");
onChildAdded(roomsSubscribedDataRef, data =>{
    const dataContent2 = data.val();
     var idRoom = dataContent2.roomName;
console.log(idRoom);
    var rn = document.getElementById(idRoom);
    console.log(rn);
   // console.log(rn.nextElementSibling.textContent);
    rn.nextElementSibling.textContent = "Subscribed";
    var invite = document.createElement("button");
    invite.classList.add("invite");
    invite.innerHTML="Invite";
    

    var goToRoom = document.createElement("button");
    goToRoom.classList.add("go");
    goToRoom.innerHTML="Go to room";

    rn.parentElement.appendChild(invite);
    rn.parentElement.appendChild(goToRoom);
})

function subscribtion(){
    Array.from(subscribeBtns).forEach((el) =>{
        el.addEventListener("click", () =>{
            
          //  el.textContent = "Subscribed";
          //  el.parentElement.parentElement.classList.add("subscribed");
            
          //  console.log(el.parentElement.firstElementChild);

          //  el.parentElement.setAttribute("subscribed", String.empty);
          //  el.classList.add("subscribed-btn");
         //   el.nextElementSibling.removeAttribute("hidden")
       //     el.nextElementSibling.nextElementSibling.removeAttribute("hidden")   
       
             //console.log(el.parentElement.firstElementChild);
            var roomsSubscribedRef = push(roomsSubscribedDataRef);
            set(roomsSubscribedRef,{
                  "roomName": el.parentElement.firstElementChild.textContent,
                  "username": window.localStorage.getItem("username"),
                  "Date": new Date(Date.now()).toLocaleString()
                })
        })
        })
}
function hideButtons(){
    Array.from(roomList).forEach((el) =>{
        if(!el.hasAttribute("subscribed")){
            el.firstElementChild.nextElementSibling.nextElementSibling.setAttribute("hidden", true);
            el.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.setAttribute("hidden",true);          
        }
    })
}

//hideButtons();

const roomsDataRef2 = ref(database, "/all-rooms/");

newRoomInp.addEventListener("change", (event) =>{ 
    //createInput.addEventListener('change', event => {
        const roomName2 = event.target.value;
        const roomsRef2 = push(roomsDataRef2);
        set(roomsRef2,{
             "created-by": window.localStorage.getItem("username"),
             "roomName": roomName2
         })
          event.target.value="";
});

 onChildAdded(roomsDataRef2, data=>{
    const dataContent2 = data.val();
    const listItem2 = document.createElement("li");
    console.log(dataContent2.roomName);
    listItem2.innerHTML=`
    <div class="list">
      <span class="room-name" id="${dataContent2.roomName}">${dataContent2.roomName}</span>
      <button class="subscribe">Subscribe</button>
    x</div>`
    ol.appendChild(listItem2);

    subscribtion();
}) 



subscribtion();