const storage = window.localStorage;
const emailSpan = document.getElementById("email-info");
const emailLogin = document.querySelector(".em_log");
const passwordLogin = document.querySelector(".psw_log");
const pswSpan = document.getElementById("psw-information");
const loginBtn = document.querySelector("#login-btn");

emailLogin.addEventListener("change", event => {
    const emailLog = event.target.value;
    if(!storage[emailLog]){
        emailSpan.toggleAttribute("incorrect",!storage[emailLog]);
        emailSpan.innerHTML = "incorrect email";
    }else{
        storage.setItem("username", storage[emailLog]);
        emailSpan.innerHTML = "Email is correct";        
    }
    emailSpan.toggleAttribute("correct", storage[emailLog]);
})

passwordLogin.addEventListener("change", event => {
    const psw = event.target.value;
  console.log(storage[storage[emailLogin.value]]);
    const isCorrect = storage[storage[emailLogin.value]] == psw;
    if(isCorrect){
        pswSpan.innerHTML = "Correct password!"
        var aEl = document.createElement('a');
        aEl.innerHTML = "LOGIN";
         aEl.href = "./currentRoom.html";
         aEl.style.textDecoration = "none";
         loginBtn.appendChild(aEl);

    } else{
        pswSpan.innerHTML = "Possword is incorrect!";
    }
    pswSpan.toggleAttribute("correct", isCorrect);
})

