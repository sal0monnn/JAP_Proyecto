
let productsArray=[]

function showProductsList(productsArray) {
    let htmlContentToAppend = "";

    for (let i = 0; i < productsArray.length; i++) {
        let product = productsArray[i];

        let priceToShow = `${product.cost} ${product.currency}`;
        let soldCountText = `${product.soldCount} vendidos`;

        htmlContentToAppend += `
            <div class="col-md-6 col-sm-12 col-lg-4 mb-4 ">
                <div class="card shadow-sm rounded-4 cursor-active elementList mx-auto display-block" onclick="setProductID(${product.id})">
                    <img src="${product.image}" class="card-img-top img-fluid" alt="${product.name}">
                    <div class="card-body p-3">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <strong>${priceToShow}</strong>
                            <small class="textSold">${soldCountText}</small>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    document.getElementById("products-container").innerHTML = htmlContentToAppend;
}

function setProductID(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html";
}

   let catID = localStorage.getItem("catID");

if (!catID) {
    console.error("No se encontró un catID en localStorage.");}
    
    let url = PRODUCTS_URL + catID ;

  

document.addEventListener("DOMContentLoaded", function () {
    showSpinner();

    getJSONData(url).then(function (resultObj) {
        hideSpinner();

        if (resultObj.status === "ok") {
            productsArray = resultObj.data.products;
            showProductsList(productsArray);
        } else {
            console.error("Error:", resultObj.data);
            document.getElementById("products-container").innerHTML = `
                <div class="col-12">
                    <div class="alert alert-danger text-center">
                        No se pudieron cargar los productos.
                    </div>
                </div>
            `;
        }
    });
});


document.getElementById("boton_filtrar").addEventListener("click",()=>{

    const maxPrice= document.getElementById("max_price").value.trim()
    const minPrice= document.getElementById("min_price").value.trim()
    console.log(maxPrice)
    if ((maxPrice > minPrice )) {
        let productsArrayFiltrado = productsArray.filter((producto)=>{
             return producto.cost >= minPrice && producto.cost <= maxPrice
        })
        showProductsList(productsArrayFiltrado)
    }else{
        alert("Valor minimo tiene que ser menor que el maximo")
    }
})

document.getElementById("sort_increasing_prices").addEventListener("click",()=>{
    let productsSortedUp = productsArray
    productsSortedUp.sort((a,b)=>{
        return a.cost-b.cost
    })
    showProductsList(productsSortedUp)
})
document.getElementById("sort_decreasing_prices").addEventListener("click",()=>{
    let productsSortedDown = productsArray
    productsSortedDown.sort((a,b)=>{
        return b.cost - a.cost
    })
    showProductsList(productsSortedDown)
})
document.getElementById("relevance").addEventListener("click",()=>{
    let productsSortedDownRel = productsArray
    productsSortedDownRel.sort((a,b)=>{
        return b.soldCount - a.soldCount
    })
    showProductsList(productsSortedDownRel)
})
document.getElementById("clear_button").addEventListener("click",()=>{
    document.getElementById("max_price").value="0";
    document.getElementById("min_price").value="0";
   
    showProductsList(productsArray);
})

document.getElementById("inputSearch").addEventListener("input",()=>{
    let input = document.getElementById("inputSearch").value.trim().toLowerCase();
    let filteredProducts = productsArray.filter(product=> {
        return (product.description.toLowerCase().includes(input) || product.name.toLowerCase().includes(input));
    });
    showProductsList(filteredProducts)
})