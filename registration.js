const storage = window.localStorage;
const spanInfo = document.getElementById("psw-information");
const emailSpan = document.getElementById("email-info");
const confrimPasword = document.getElementById("cpsw");
const emailRegistration = document.querySelector(".em_reg");
const passwordRegistration = document.querySelector(".psw_reg");
const confirmSpan = document.getElementById("confirm-psw");
const psw_wrapper = document.querySelector(".psw-wrapper");
const registerBtn = document.querySelector("#regBtn");

const username = document.querySelector("#user");
const userSpan = document.querySelector("#user-info");


username.addEventListener("change", event =>{
    const val = event.target.value;
     console.log(val);
    var pattern = /^[a-z\d]+$/;
    
    userSpan.toggleAttribute("incorrect",!val.match[pattern]);

    if(val.match(pattern)){
        console.log(pattern);
        console.log(val);
        userSpan.toggleAttribute("correct", !storage[val]);
        if(!storage[val]){
            storage.setItem("username",val);
            userSpan.innerHTML = "Valid username";    
          console.log(userSpan);    
    }
        else{
            userSpan.innerHTML = "This username is already in use";
        }
    }else{
        userSpan.innerHTML = "Username must be non-empty string and can't contain `.`, `#`, `$`, `[`, or `]`";
    }
})

emailRegistration.addEventListener("change", event => {
    const emailReg = event.target.value;
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if(emailReg.match(pattern)){
        //emailSpan.classList.add("valid");
       // emailSpan.classList.remove("invalid");
        emailSpan.innerHTML = "Your email address is valid";
        
        if(!storage[emailReg]){
        storage.setItem(emailReg, "");
        emailSpan.toggleAttribute("correct", !storage[emailReg])
        } 
        else{
           // emailSpan.classLis.remove("valid");
          //  emailSpan.classList.add("invalid");
         emailSpan.innerHTML = "This account already exist! Please try again!"
        }
       
    }else{
       // emailSpan.classList.add("invalid");
       // emailSpan.classList.remove("valid");
        emailSpan.innerHTML = "Please enter valid email address";    
    }
})



function isUpperCase(str)
{
    return str == str.toUpperCase() && str != str.toLowerCase();
}
passwordRegistration.onchange = () =>{ 
    var pw = document.querySelector(".psw_reg").value;  
    //check empty password field  
     if(!isUpperCase(pw[0])){
        spanInfo.innerHTML = "Password should start with capital letter";  
        return false;        
     }
     if(!(pw.includes('@') || pw.includes('$') || pw.includes('%') 
      ||  pw.includes('&') || pw.includes('*')|| pw.includes('#'))){
        spanInfo.innerHTML = "Password must contain a special character(@,$,#,%,&,*)";
    return false;  
    }
    if(pw == "") {  
       spanInfo.innerHTML = "**Fill the password please!";  
       return false;  
    }  
   //minimum password length validation  
    if(pw.length < 8) {  
        spanInfo.innerHTML = "**Password length must be atleast 8 characters";  
       return false;  
    }  
    
  //maximum length of password validation  
    if(pw.length > 15) {  
        spanInfo.innerHTML = "**Password length must not exceed 15 characters";  
       return false;  
    }
     else{
         const email = emailRegistration.value;
         localStorage[email] = pw;  
        spanInfo.innerHTML = "Password is correct!"; 
        spanInfo.classList.add("valid"); 
     }  
}  

confrimPasword.addEventListener("change", event => {
    const confirmPsw = event.target.value;
    const originalPsw = passwordRegistration.value;
     confirmSpan.toggleAttribute("correct", originalPsw == confirmPsw);  
    if(originalPsw != confirmPsw){
        confirmSpan.innerHTML = "Passwords do not match!";
    }
    else{
        confirmSpan.innerHTML = "Passwords match!";
        var aEl = document.createElement('a');
       aEl.innerHTML = "Register";
        aEl.href = "./login.html";
        aEl.style.textDecoration = "none";
        registerBtn.appendChild(aEl);
    }

})

