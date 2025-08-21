
document.addEventListener("DOMContentLoader", (event)=>{
    let btn = document.getElementById("btnLogin");


    btn.addEventListener('click', function(event) {
    let username = document.getElementById("user");
    let pass = document.getElementById("pass");

    if (username>0 && pass>0){
        document.location="index.html";
        document.localStorage.setItem('Usuario', username);
    }
    });
});