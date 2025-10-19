let email = document.getElementById("email")
let apellido = document.getElementById("apellido")
let celular= document.getElementById("celular")
let nombre_perfil = document.getElementById("nombre_perfil")


let input_img = document.getElementById("input_image")
let profile_picture = document.getElementById("profile_picture")

document.addEventListener("DOMContentLoaded",()=>{

    if (!localStorage.getItem("email")) {
        let usuario= localStorage.getItem("usuario")
        localStorage.setItem("email",usuario)
        email.value = usuario
    }else{
        email.value = localStorage.getItem("email")
    }
    if(localStorage.getItem("celular")){
        celular.value=localStorage.getItem("celular")

    }
    if(localStorage.getItem("apellido")){
        apellido.value=localStorage.getItem("apellido")
    }
    if(localStorage.getItem("nombre_perfil")){
        nombre_perfil.value=localStorage.getItem("nombre_perfil")
    }
    if(!localStorage.getItem("profile_picture")){
        profile_picture.src="img/img_perfil.png"
        localStorage.setItem("profile_picture","img/img_perfil.png")
    }else{
       profile_picture.src= localStorage.getItem("profile_picture")
    }
})

let edit_button   = document.getElementById("editing_button")
let cancel_button = document.getElementById("cancel_editing_button")
let save_button   = document.getElementById("save_edit_button")



edit_button.addEventListener("click",()=>{
    save_button.style.display="inline"
    cancel_button.style.display="inline"
    edit_button.style.display="none"

    const fields= document.querySelectorAll(".input_field_profile")
    fields.forEach((campo)=>campo.disabled=false)
})

save_button.addEventListener("click",()=>{

    save_button.style.display="none"
    cancel_button.style.display="none"
    edit_button.style.display="inline"

    localStorage.setItem( "nombre_perfil",nombre_perfil.value)
    localStorage.setItem( "apellido",apellido.value)
    localStorage.setItem( "email",email.value)
    localStorage.setItem( "celular",celular.value)

    const fields= document.querySelectorAll(".input_field_profile")
    fields.forEach((campo)=>campo.disabled=true)
})
cancel_button.addEventListener("click",()=>{

    apellido.value= localStorage.getItem("apellido")
    nombre_perfil.value= localStorage.getItem("nombre_perfil")
    celular.value=localStorage.getItem("celular")
    email.value=  localStorage.getItem("email")
    
    

    save_button.style.display="none"
    cancel_button.style.display="none"
    edit_button.style.display="inline"

    const fields= document.querySelectorAll(".input_field_profile")
    fields.forEach((campo)=>campo.disabled=true)
})





input_img.onchange=()=>{
    const fr= new FileReader()
    fr.readAsDataURL(input_img.files[0])
    fr.addEventListener("load",()=>{
        const urlImg= fr.result
        profile_picture.src=urlImg
        localStorage.setItem("profile_picture",urlImg)
    })

}
document.getElementById("img_delete").addEventListener("click",()=>{
    profile_picture.src="img/img_perfil.png"
    localStorage.setItem("profile_picture","img/img_perfil.png")
})