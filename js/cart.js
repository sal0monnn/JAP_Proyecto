document.addEventListener("DOMContentLoaded", function() {
    let cartItems = localStorage.getItem("cart");
    cartItems = JSON.parse(cartItems);

    const container = document.getElementById(itemList);

    let containerProducts = document.getElementById("containCart"); 
    let emptyCart = document.getElementById('emptyCart'); 

    if (cartItems.length > 0 || !cartItems) {
        containerProducts.style.display = 'inline';
        emptyCart.style.display = 'none'; 
    } else {
       containerProducts.style.display = 'none';
       emptyCart.style.display = 'inline'; 
    }

})