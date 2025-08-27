 document.addEventListener("DOMContentLoaded", (event) => {
    if (localStorage.getItem("usuario")){
        window.location.replace("/index.html");
    }
  });


document.getElementById("loginButton").addEventListener("click",()=>{
    let usuario  = document.getElementById("username").value.trim()
    let password = document.getElementById("password").value.trim()

    if (password.length > 0 && usuario.length>0){
            localStorage.setItem("usuario", usuario);  
             window.location.replace("/index.html");
    } else {
        alert ("Debe completar ambos campos.");
    }
})