import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { getDatabase, ref,  push, set, get, child, onValue, onChildAdded, } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";
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
  console.log(database);

  const storage = window.localStorage;
  const addRoomInp = document.getElementById("inp");
  const allRoomsDataRef = ref(database, "all-rooms");
  const olList = document.getElementById("olList");
  const subscribeBtns = document.getElementsByClassName("subscribe");
  const goToRoomsBtns = document.getElementsByClassName("go");
  const user = storage.getItem("username");

  const usersDataref = ref(database,"users/" + user);
//set(usersRef,{
//  "roomName": roomName
//})

  function go(){
  Array.from(goToRoomsBtns).forEach((el)=>{
      el.addEventListener("click", ()=>{
          var rName = el.parentElement.firstElementChild.textContent;
          storage.setItem("current-room", rName);
          goToRoom(rName, el);
        })
  })
  
}
//go();
function goToRoom(room, fromBtn){
    var aEl = document.createElement('a');
    var btnInner = fromBtn.textContent;
    fromBtn.innerHTML="";
    fromBtn.appendChild(aEl);
    aEl.innerHTML = btnInner;
    aEl.href="./currentRoom.html";
}

addRoomInp.addEventListener("change", event =>{
    var newRoomName = event.target.value;

    var allRoomsRef = push(allRoomsDataRef);
    set(allRoomsRef,{
        "roomName": newRoomName,
        "createdBy": window.localStorage.getItem("username")
    })
    event.target.value ="";
})


function hideButtons(){
    Array.from(subscribeBtns).forEach((el)=>{
        el.nextElementSibling.setAttribute("hidden",true);
        el.nextElementSibling.nextElementSibling.setAttribute("hidden",true);
    })
}


onChildAdded(allRoomsDataRef, data =>{
    var dataContent = data.val();
    var listItem = document.createElement("li");
    listItem.innerHTML = `
    <div class="list" subscribed>
      <span class="room-name" id="${dataContent.roomName}">${dataContent.roomName}</span>
      <button class="subscribe" id="${dataContent.roomName+"btn"}">Subscribe</button>
    </div>
    `
    olList.appendChild(listItem);
    //hideButtons();
    console.log(listItem);

    var newBtn=document.getElementById(dataContent.roomName+"btn");
    console.log(newBtn)
    var newDiv = newBtn.parentElement; 
    
    newBtnFunc(newBtn, dataContent.roomName);
    
    /*
    newBtn.addEventListener('click', () =>{
      // newBtn.nextElementSibling.removeAttribute("hidden");
      // newBtn.nextElementSibling.nextElementSibling.removeAttribute("hidden");
      newBtn.innerHTML = "Suscribed";  
      var subscribedRoomsRef = push(subscribedRooms);
         set(subscribedRoomsRef,{
             "room": dataContent.roomName,
             "user": window.localStorage.getItem("username")
         })
        newBtn.classList.add("subscribed-btn");
    })*/
})

function newBtnFunc(newBtn, room){
    //const subscribedRooms= ref(database, "my-rooms/"+ room);  
    newBtn.addEventListener('click', () =>{
       newBtn.innerHTML = "Suscribed";
       const usersRef = push(usersDataref);
         set(usersRef,{
             room: room
         })
     
       // var subscribedRoomsRef = push(subscribedRooms);
         //  set(subscribedRoomsRef,{
           //    "room": room,
            //   "user": window.localStorage.getItem("username")
           //})
          newBtn.classList.add("subscribed-btn");
      })
      addChild(usersDataref, room); 
}


function  addChild(usersDataref, roomName){
onChildAdded(usersDataref, data=>{
    const dataContent = data.val();
   // console.log(dataContent.room);
    //console.log(document.getElementById(data.val().room +"btn"));
    var myBtn = document.getElementById(data.val().room +"btn");
    myBtn.innerHTML="Subscribed";
    myBtn.classList.add("subscribed-btn");
    //console.log(myBtn.parentElement);

    var btnInvite = document.createElement("button");
    btnInvite.classList.add("invite");
    btnInvite.innerHTML="Invite";

    console.log(btnInvite);
    var btnGo = document.createElement("button");
    btnGo.classList.add("go");
    btnGo.innerHTML="Go to room";
    
    console.log(btnGo);

    if(!myBtn.nextElementSibling){
    myBtn.parentElement.append(btnInvite,btnGo);
    }
    btnGo.addEventListener("click", ()=>{
          var rName = btnGo.parentElement.firstElementChild.textContent;
           storage.setItem("current-room", rName);
           goToRoom(rName, btnGo);
        })
})
}
       
const db5 = ref(getDatabase());
function a(){
    get(child(db5, 'users/' + user)).then((snapshot)=>{
        if(snapshot.exists()){
            //Object.entries(snapshot);
            const data = snapshot.val();
             console.log(snapshot.val());
            // console.log(Object.values(data)[0].room);
            //console.log(data.room);
        }else{
            alert("no data available");
        }
    }).catch((error) => {
      console.error(error);
    });
}

a();

