function showProduct(product) { 
    let priceToShow = `${product.cost} ${product.currency}`;
    let soldCountText = `${product.soldCount} vendidos`;

    let htmlContentToAppend = `
    <div class="row">
        <div class="col-md-12">
            <div class="card shadow-sm p-4 rounded-4">
                <div class="row g-0">
                    <!-- GALERÍA DE IMÁGENES -->
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

                    <!-- DETALLES DEL PRODUCTO -->
                    <div class="col-md-6">
                        <div class="card-body">
                            <h2 class="mb-3">${product.name}</h2>
                            <h5 class="mb-3">${product.category}</h5>
                            <p class="mb-4" id="vendidos">(${soldCountText})</p>

                            <!-- CALIFICACIÓN VISUAL -->
                            <div class="rating mb-4">
                                <i class="fa fa-star" data-value="1"></i>
                                <i class="fa fa-star" data-value="2"></i>
                                <i class="fa fa-star" data-value="3"></i>
                                <i class="fa fa-star" data-value="4"></i>
                                <i class="fa fa-star" data-value="5"></i>
                            </div>

                            <!-- PRECIO -->
                            <div class="mb-3">
                                <strong>${priceToShow}</strong>
                            </div>

                            <!-- DESCRIPCIÓN -->
                            <h5>Descripción de producto:</h5>
                            <p class="mb-4">${product.description}</p>
                        </div>
                    </div>
                  <button id="btnComprar" class="btn btn-primary">Comprar</button>
                      
                </div>
            </div>
        </div>
    </div>
    `;

    // Insertar HTML
    document.getElementById("product-info").innerHTML = htmlContentToAppend;

    // GALERÍA DE THUMBNAILS
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
    let commentUrl=PRODUCT_INFO_COMMENTS_URL+ productID + ".json"
    

    getJSONData(url).then(function (resultObj) {
        hideSpinner();

        if (resultObj.status === "ok") {
            let product = resultObj.data;
            showProduct(product);
            


            showRelatedProducts(product);

            //  Aquí agregamos la sección de calificaciones
            // Cargamos las calificaciones que se encuentran en archivo json
            getJSONData(commentUrl).then((res)=>{
                if(res.status ==="ok"){
                    let calificaciones= res.data;
                    showRatings(calificaciones);
                } else{
                    console.log("Error:", res.data)
                }   
            })

            
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



// Renderiza calificaciones y formulario
function showRatings(calificaciones) {
    
    if(Array.isArray(calificaciones) && calificaciones.length >=1){
        let ratings = document.getElementById("ratings-list")
        if (ratings.querySelector("p")) ratings.innerHTML = "";   
        for(calificacion of calificaciones){
             const nueva_calificacion=`
                    <div class="mb-3 border-bottom pb-2">
                        <strong class="text-primary">${calificacion.user}</strong>
                        <span class="text-warning">${"★".repeat(calificacion.score)}${"☆".repeat(5 - calificacion.rating)}</span>
                        <span class="text-muted small"> - ${calificacion.dateTime}</span>
                        <p>${calificacion.description}</p>
                     </div>`;    
                    ratings.insertAdjacentHTML("afterbegin", nueva_calificacion);
            }    
        }
  renderStars();
  document.getElementById("submit-rating").addEventListener("click", saveRating);
 
}

//  Renderiza las estrellitas
function renderStars(rating = 0) {
  const starsDiv = document.getElementById("rating-stars");
  starsDiv.innerHTML = "";
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("span");
    star.classList.add("fa", "fa-star", "star");
    if (i <= rating) star.classList.add("checked");
    star.dataset.value = i;
    star.addEventListener("click", function () {
      renderStars(i);
      starsDiv.dataset.selected = i;
    });
    starsDiv.appendChild(star);
  }
}

//  Guarda la calificación
function saveRating() {
  const starsDiv = document.getElementById("rating-stars");
  const opinion = document.getElementById("opinion").value;
  const rating = starsDiv.dataset.selected || 0;

  if (rating == 0 || opinion.trim() === "") {
    alert("Por favor, completa la calificación y la opinión.");
    return;
  }

  const user = localStorage.getItem("usuario") || "USUARIO";
  const today = new Date().toLocaleDateString("es-ES");

  const newRating = `
    <div class="mb-3 border-bottom pb-2">
      <strong class="text-primary">${user}</strong>
      <span class="text-warning">${"★".repeat(rating)}${"☆".repeat(5 - rating)}</span>
      <span class="text-muted small"> - ${today}</span>
      <p>${opinion}</p>
    </div>
  `;

  let ratingsList = document.getElementById("ratings-list");
  if (ratingsList.querySelector("#default-ratings")) ratingsList.innerHTML = "";
  ratingsList.insertAdjacentHTML("afterbegin", newRating);

  document.getElementById("opinion").value = "";
  renderStars();

}

// productos relacionados
function showRelatedProducts(product){
    let relatedProducts = product.relatedProducts;
    let htmlRelatedProducts = "";
    
    relatedProducts.forEach((relatedProduct) => {
        htmlRelatedProducts += 
        `<div class="col-12 col-md-12 col-lg-4 m-3 related-product-card">
            <div class="card" onclick="setProductID(${relatedProduct.id})" id="related-product">
                <img src="${relatedProduct.image}" class="card-img-top" alt="${relatedProduct.name}">
                <div class="card-body">
                <h5 class="card-title">${relatedProduct.name}</h5>
                </div>
            </div>
        </div>
        `; 
    }); 
    document.getElementById("related-products").innerHTML = htmlRelatedProducts;
}

function setProductID(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html";

}