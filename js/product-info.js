function showProduct(product) {
    let htmlContentToAppend = "";

    let priceToShow = `${product.cost} ${product.currency}`;
    let soldCountText = `${product.soldCount} vendidos`;

    htmlContentToAppend = `
    <div class="row">
        <div class="col-md-12">
            <div class="custom-card h-100 shadow-sm border-0 rounded-4 custom-card">
                <div class="row g-0">
                    <div class="col-md-6">
                        <div class="product-gallery">
                            <img id="product-image" class="img-fluid main-image ecommerce-gallery-main-img active w-100" src="${product.images[0]}" alt="Product image">
                        </div>
                        <div class="thumbnail-container d-flex gap-2 mt-2 flex-wrap">
                            ${product.images.map((image, index) => `
                                <img src="${image}" data-index="${index}" class="thumbnail-image img-thumbnail" alt="Thumbnail ${index + 1}" style="width: 80px; height: auto; cursor: pointer;">
                            `).join('')}
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card-body">
                        <span class="score">
                            <h2 class="mb-3">${product.name}</h2>
                            <h5 class="mb-3">${product.category}</h2>
                            <div>
                            <p class="mb-4" id="vendidos">(${soldCountText})</p>
                            <span class="score">
                                <div class="score-wrap">
                                    <span class="stars-active" style="width:88%">
                                        <i class="fa fa-star" aria-hidden="true"></i>
                                        <i class="fa fa-star" aria-hidden="true"></i>
                                        <i class="fa fa-star" aria-hidden="true"></i>
                                        <i class="fa fa-star" aria-hidden="true"></i>
                                        <i class="fa fa-star" aria-hidden="true"></i>
                                    </span>
                                    <span class="stars-inactive">
                                        <i class="fa fa-star-o" aria-hidden="true"></i>
                                        <i class="fa fa-star-o" aria-hidden="true"></i>
                                        <i class="fa fa-star-o" aria-hidden="true"></i>
                                        <i class="fa fa-star-o" aria-hidden="true"></i>
                                        <i class="fa fa-star-o" aria-hidden="true"></i>
                                     </span>
                                </div>
                            </span>
                            
                            <div>
                            <div class="mb-3">
                                <strong>${priceToShow}</strong>
                            </div>
                            <h5>Descripción de producto:</h5>
                            <p class="mb-4">${product.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

    document.getElementById("product-info").innerHTML = htmlContentToAppend;
    const thumbnails = document.querySelectorAll(".thumbnail-image");
    const mainImage = document.getElementById("product-image");

    thumbnails.forEach((thumb) => {
        thumb.addEventListener("click", () => {
            const index = thumb.getAttribute("data-index");
            mainImage.src = product.images[index];
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
    showSpinner();

    let productID = localStorage.getItem("productID");
    let url = PRODUCT_INFO_URL + productID + ".json";

    getJSONData(url).then(function (resultObj) {
        hideSpinner();

        if (resultObj.status === "ok") {
            let product = resultObj.data;
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