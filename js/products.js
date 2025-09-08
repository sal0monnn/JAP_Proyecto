let tarjetasOriginales = []; 

function showProductsList(productCards) {
    let container = document.getElementById("products-container");
    container.innerHTML = productCards.join('');  // vuelve el array un string, los '' son espaciados
}

function createProductCard(productsArray) {
    let cards = [];  // array con todas las tarjetas
    for (let i = 0; i < productsArray.length; i++) {
        let product = productsArray[i];

        let priceToShow = `${product.cost} ${product.currency}`;
        let soldCountText = `${product.soldCount} vendidos`;

        // se carga al array
        cards.push(`
            <div class="col-md-6 col-sm-12 col-lg-4 mb-4">
                <div class="card h-100 shadow-sm border-0 rounded-4 custom-card cursor-active elementList" onclick="setProductID(${product.id})">
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
        `);
    }
    return cards;
}

function setProductID(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html";
}

document.addEventListener("DOMContentLoaded", function () {
    showSpinner();

    let catID = localStorage.getItem("catID") || 101;

    let url = PRODUCTS_URL + catID + ".json";

    getJSONData(url).then(function (resultObj) {
        hideSpinner();

        if (resultObj.status === "ok") {
            const productsArray = resultObj.data.products;
            tarjetasOriginales = createProductCard(productsArray);  // guardo las tarjetas originales
            showProductsList(tarjetasOriginales);  // se muestran las cartas originales
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

// buscador de productos
document.getElementById("inputSearch").addEventListener("input", searchProducts);

function searchProducts(e) {
    let input = document.getElementById("inputSearch").value.trim().toLowerCase();
    let filteredProducts = tarjetasOriginales.filter(productCard => {
        return productCard.toLowerCase().includes(input);
    });

    showProductsList(filteredProducts);
}