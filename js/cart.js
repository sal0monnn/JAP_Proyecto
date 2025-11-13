let cartItems=[]

document.addEventListener("DOMContentLoaded", function() {
    cartItems = localStorage.getItem("carrito");
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
function increaseValue(id){
        producto=cartItems.find(item => item.id === id);
        producto.cantidad++
        localStorage.setItem("carrito", JSON.stringify(cartItems));
        showCartItems(cartItems)
}
function decreaseValue(id){
    
    
    producto=cartItems.find(item => item.id === id);
    if(producto.cantidad>1){
        producto.cantidad--
        localStorage.setItem("carrito", JSON.stringify(cartItems));
        showCartItems(cartItems)
    }else{
        const index= cartItems.indexOf(producto)
        cartItems.splice(index,1)
        localStorage.setItem("carrito", JSON.stringify(cartItems));
        
        let containerProducts = document.getElementById("containCart"); 
        let emptyCart = document.getElementById('emptyCart'); 

        if (cartItems.length === 0 || !cartItems) {
            containerProducts.style.display = 'none';
            emptyCart.style.display = 'block'; 
        }
        

        showCartItems(cartItems)
    }
}

function showCartItems(cartItems){
    let htmlCartItems = "";
    let precioTotal = 0;
    let contador = 0;
    
    cartItems.forEach((cartItem) => {
        if (cartItem.moneda==="UYU"){
            precioTotal+=cartItem.costo*cartItem.cantidad;
        }else{
            precioTotal+=cartItem.costo*40*cartItem.cantidad;
        }
        contador+=cartItem.cantidad;
        htmlCartItems += 
        `<div class="row main align-items-center border-top border-bottom p-0">
            <div class="col-2"><img class="img-fluid" src="${cartItem.imagen}"></div>
                <div class="col">
                    <div class="row text-muted">${cartItem.nombre}</div>
                    <div class="row">${cartItem.descripcion}</div>
                </div>
            <div class="col" style="display: flex; align-items: center; gap: 15px;">
                <button class="btn btn-primary" id="increaseValue" onClick="increaseValue(${cartItem.id})"> + </button>
                <button class="btn btn-danger" id="decreaseValue" onClick="decreaseValue(${cartItem.id})"> - </button>
                                <div class="row">${cartItem.cantidad}</div>

           
                </div>
            
            <div class="col">${cartItem.moneda} ${cartItem.costo}</div>
        </div>
        `; 
    }); 
    document.getElementById("itemList").innerHTML = htmlCartItems;

    
    document.getElementById('listLenght').innerText=contador;
    document.getElementById('listTotal').innerText=precioTotal;
}


document.getElementById("btnFinalizarCompra").addEventListener("click", function () {
    const calle = document.getElementById("calle")?.value.trim();
    const numero = document.getElementById("numero")?.value.trim();
    const esquina = document.getElementById("esquina")?.value.trim();
    const departamento = document.getElementById("departamento")?.value.trim();
    const localidad = document.getElementById("localidad")?.value.trim();
 
    if (!calle || !numero || !esquina || !departamento || !localidad) {
        alert("Debe completar todos los campos de dirección.");
        return;
    }
    let envioSeleccionado = document.querySelector('input[name="envio"]:checked');
    if (!envioSeleccionado) {
        alert("Debe seleccionar una forma de envío.");
        return;
    }
    let cantidades = document.querySelectorAll(".product-quantity");

    for (let qty of cantidades) {
        if (!qty.value || qty.value <= 0) {
            alert("La cantidad de todos los productos debe ser mayor a 0.");
            return;
        }
    }
    let metodoPago = document.querySelector('input[name="formaPago"]:checked');
    if (!metodoPago) {
        alert("Debe seleccionar una forma de pago.");
        return;
    }
    if (metodoPago.value === "tarjeta") {
        const numTarjeta = document.getElementById("numeroTarjeta")?.value.trim();
        const vencimiento = document.getElementById("vencimientoTarjeta")?.value.trim();
        const cvv = document.getElementById("cvvTarjeta")?.value.trim();

        if (!numTarjeta || !vencimiento || !cvv) {
            alert("Debe completar todos los campos de tarjeta.");
            return;
        }
    }

    if (metodoPago.value === "transferencia") {
  const nroCuenta = document.getElementById("numCuenta")?.value.trim();
        if (!nroCuenta) {
            alert("Debe ingresar el número de cuenta para transferencia.");
            return;
        }
    }
    alert("Su compra ha sido realizada con éxito.");
});
