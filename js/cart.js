document.addEventListener("DOMContentLoaded", function() {
    let cartItems = localStorage.getItem("carrito");
    cartItems = JSON.parse(cartItems);

    let containerProducts = document.getElementById("containCart"); 
    let emptyCart = document.getElementById('emptyCart'); 

    if (cartItems.length === 0 || !cartItems) {
        containerProducts.style.display = 'none';
        emptyCart.style.display = 'block'; 
    } else {
       containerProducts.style.display = 'inline';
       emptyCart.style.display = 'none'; 
       showCartItems(cartItems);
    }

})

function showCartItems(cartItems){
    let htmlCartItems = "";
    let precioTotal = 0;
    let contador = 0;

    cartItems.forEach((cartItem) => {
        if (cartItem.moneda==="UYU"){
            precioTotal+=cartItem.costo;
        }else{
            precioTotal+=cartItem.costo*40;
        }
        contador+=1;
        htmlCartItems += 
        `<div class="row main align-items-center border-top border-bottom p-3">
            <div class="col-2"><img class="img-fluid" src="${cartItem.imagen}"></div>
                <div class="col">
                    <div class="row text-muted">${cartItem.nombre}</div>
                    <div class="row">${cartItem.descripcion}</div>
                </div>
            <div class="col">
                <!-- AJUSTAR CANTIDADES AQUI -->
            </div>
            <div class="col">${cartItem.moneda} ${cartItem.costo}</div>
        </div>
        `; 
    }); 
    document.getElementById("itemList").innerHTML = htmlCartItems;

    const finalLenght = document.createElement("p");
    finalLenght.innerText = `${contador}`;
    document.getElementById('listLenght').appendChild(finalLenght);
    const totalPrice = document.createElement("p");
    totalPrice.innerText = `UYU ${precioTotal}`;
    document.getElementById('listTotal').appendChild(totalPrice);
}