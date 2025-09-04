function showProduct(productArray) {
    let htmlContentToAppend = "";

    for (let i = 0; i < productArray.length; i++) {
        let product = productArray[i];

        let priceToShow = `${product.cost} ${product.currency}`;
        let soldCountText = `${product.soldCount} vendidos`;

        htmlContentToAppend += `
       <div class="col-md-6 col-sm-12 col-lg-4 mb-4">
            <div class="card h-100 shadow-sm border-0 rounded-4 custom-card cursor-active elementList" onclick="setProductID(${product.id})">
                <img src="${product.image}" class="card-img-top img-fluid" alt="${product.name}">
            </div>
            <div class="col-md-6">
                <h2 class="mb-3">${product.name}</h2>
                <div class="mb-3">
                    <strong>${priceToShow}</strong>
                    <p class="mb-4">${soldCountText}</p>
                </div>
                <h5>Descripcion:</h5>
                <p class="mb-4">${product.description}</p>
            </div>
        </div>
        `;
    }

    document.getElementById("product-info").innerHTML = htmlContentToAppend;
}

document.addEventListener("DOMContentLoaded", function () {
    showSpinner();

    let productID = localStorage.getItem("productID");
    let url = PRODUCT_INFO_URL + productID + ".json";

    getJSONData(url).then(function (resultObj) {
        hideSpinner();

        if (resultObj.status === "ok") {
            let productArray = resultObj.data;
            showProduct(productArray);
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