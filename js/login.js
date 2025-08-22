document.getElementById("loginButton").addEventListener("click",()=>{
    let usuario  = document.getElementById("username").value.trim()
    let password = document.getElementById("password").value.trim()

    console.log(usuario)
    if (password.length > 0 && usuario.length>0){
        console.log(usuario)
        window.location.replace("/index.html") }
})