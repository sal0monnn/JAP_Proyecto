 document.addEventListener("DOMContentLoaded", (event) => {
    if (localStorage.getItem("Usuario").length>0){
        window.location.replace("/index.html");
    }
  });


document.getElementById("loginButton").addEventListener("click",()=>{
    let usuario  = document.getElementById("username").value.trim()
    let password = document.getElementById("password").value.trim()

    if (password.length > 0 && usuario.length>0){
        window.location.replace("/index.html");
        localStorage.setItem("Usuario", usuario);  
    }
})