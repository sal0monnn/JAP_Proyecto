function showProduct(product) {
    let htmlContentToAppend = "";

    let priceToShow = `${product.cost} ${product.currency}`;
    let soldCountText = `${product.soldCount} vendidos`;

    htmlContentToAppend = `
        <div class="col-md-6 col-sm-12 col-lg-4 mb-4">
            <div class="card col-12 elementList" onclick="setProductID(${product.id})">
                <img src="${product.image}" class="card-img-top img-fluid" alt="${product.name}">
            </div>
            <div class="col-md-6">
                <h2 class="mb-3">${product.name}</h2>
                <div class="mb-3">
                    <strong>${priceToShow}</strong>
                    <p class="mb-4">${soldCountText}</p>
                </div>
                <h5>Descripción:</h5>
                <p class="mb-4">${product.description}</p>
            </div>
        </div>
    `;

    document.getElementById("product-info").innerHTML = htmlContentToAppend;
}

document.addEventListener("DOMContentLoaded", function () {
    showSpinner();

    let productID = localStorage.getItem("productID");
    let url = PRODUCT_INFO_URL + productID + ".json";

    getJSONData(url).then(function (resultObj) {
        hideSpinner();

        if (resultObj.status === "ok") {
            let product = resultObj.data; // It's a single product object
            showProduct(product);
        } else {
            console.error("Error:", resultObj.data);
            document.getElementById("product-info").innerHTML = `
                <div class="col-12">
                    <div class="alert alert-danger text-center">
                        No se pudo cargar el producto.
                    </div>
                </div>
            `;
        }
    });
});