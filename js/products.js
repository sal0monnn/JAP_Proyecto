
let urlAutos="https://japceibal.github.io/emercado-api/cats_products/101.json"
const listaProductos= document.getElementById("catalogoAutos")
async function fetchProductos(url){
    try{
        response= await(fetch(url))
        if (!response.ok)
            throw Error(response.statusText);
        const data= await(response.json())


        for(producto of data.products){

            const info=[
                `${producto.name}`,
                `${producto.description}`,
                `Precio:${producto.cost}`,
                `Productos vendidos:${producto.soldCount}`
            ]
                let elemento= document.createElement("div")
            info.forEach(atributo=>{
                const p=document.createElement('p')
                p.textContent=atributo
                elemento.appendChild(p)
            })
            const image= document.createElement('img')
            image.src=producto.image
            elemento.appendChild(image)
            listaProductos.appendChild(elemento).classList.add("listadoElementos", "grid-item");
         }
    }catch(error){
        console.log(`Error found: ${error}`)
    }
}
fetchProductos(urlAutos)