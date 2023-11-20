function formatoNumerico(numero) {
    if (typeof numero === 'number') {
        numero = numero.toString();
    }

    if (numero.length >= 4 && numero.length <= 9) {
        let formatoActualizado = numero.split("");
        formatoActualizado.splice(-3, 0, ".");
        if (numero.length == 7 || numero.length == 8 || numero.length == 9) {
            formatoActualizado.splice(-7, 0, ".");
        }
        return formatoActualizado.join("");
    }
}

let productos = [
    { id: 1, nombre: "Pijama De Una Pieza Anime Teletubbies De Terciopelo", precio: 127485, img: "ropa/pijama12.webp" },
    { id: 2, nombre: "Camibuzo Junji-ito exclusiva de la Serie Hong Join", precio: 140600, img: "ropa/buzo2.webp" },
    { id: 3, nombre: "Sudadera Con Capucha Suelta Versión Coreana Pepsi", precio: 125850, img: "ropa/sudadera3.webp" },
    { id: 4, nombre: "Buzo Hoodie Capota Naruto Clan Akatsuki Anime Manga", precio: 92900, img: "ropa/buzo4.webp" },
    { id: 5, nombre: "Sudadera Con Capucha Y Cremallera Grunge Aesthetic", precio: 161848, img: "ropa/sudadera5.webp" },
    { id: 6, nombre: "Camiseta Toxic Girl y Pantalón Gucci exclusivo", precio: 90250, img: "ropa/camisa6.webp" },
    { id: 7, nombre: "Pijamas Cálidos De Dibujos Animados De Pareja", precio: 408605, img: "ropa/pijama7.webp" },
    { id: 8, nombre: "Jean Clásico 088 Lec Lee Para Hombre - Índigo Claro", precio: 111990, img: "ropa/jin8.webp" },
    { id: 9, nombre: "Pantalones Cargo Lavados Azules Con Múltiples Bolsillos", precio: 222567, img: "ropa/pantalon9.webp" },
    { id: 10, nombre: "Combo X 2 Camisetas Interior Frio Invierno Ropa Termica", precio: 150000, img: "ropa/camisa10.webp" },
    { id: 11, nombre: "Pantuflas Pochita Babuchas Slippers Anime Chainsaw-man", precio: 49900, img: "ropa/pantunflas11.webp" },
    { id: 12, nombre: "Camisa A Cuadros De Manga Larga Para Hombre", precio: 78411, img: "ropa/camisa1.webp" },
];

document.addEventListener("DOMContentLoaded", () => {
    pintar();
});

function pintar() {
    productos.forEach((item, index) => {
        let contadorClics = 0;

        let fragment = document.createDocumentFragment();
        let div = document.createElement("div");
        let img = document.createElement("img");
        let h2 = document.createElement("h2");
        let p = document.createElement("p");
        let button = document.createElement("button");

        img.src = item.img;
        h2.textContent = item.nombre;
        button.textContent = "Agregar al carrito";
        button.addEventListener("click", () => {
            console.log(item.id);
            contadorClics++;

            // Buscar la fila existente para el producto
            let filaExistente = document.querySelector(`#tBody tr[data-id="${item.id}"]`);

            if (filaExistente) {
                // Si la fila existe, actualizar la cantidad
                let tdCantidad = filaExistente.querySelector('.cantidad');
                tdCantidad.textContent = contadorClics;
            } else {
                // Si la fila no existe, crear una nueva fila
                let fila = document.createElement("tr");
                fila.setAttribute('data-id', item.id); // Añadir un atributo para identificar el producto

                let tdImagen = document.createElement("td");
                let tdNombre = document.createElement("td");
                let tdPrecio = document.createElement("td");
                let tdCantidad = document.createElement("td");
                let tdEliminar = document.createElement("td");

                // Crear un elemento img y asignar el src
                let imgProducto = document.createElement("img");
                imgProducto.src = item.img;

                tdImagen.appendChild(imgProducto);
                tdNombre.textContent = item.nombre;
                tdPrecio.textContent = '$' + " " + formatoNumerico(item.precio);
                tdCantidad.textContent = contadorClics;
                tdEliminar.textContent = "❌";

                fila.appendChild(tdImagen);
                fila.appendChild(tdNombre);
                fila.appendChild(tdPrecio);
                fila.appendChild(tdCantidad);
                fila.appendChild(tdEliminar);

                document.getElementById("tBody").appendChild(fila);

                fila.classList.add('fila');
                tdImagen.classList.add('imagen');
                tdNombre.classList.add('nombre');
                tdPrecio.classList.add('precio');
                tdCantidad.classList.add('cantidad');
                tdEliminar.classList.add('eliminar');

                tdEliminar.addEventListener("click", () => {
                    // Buscar la fila existente para el producto
                    let filaExistente = document.querySelector(`#tBody tr[data-id="${item.id}"]`);

                    if (filaExistente) {
                        // Obtener el elemento de cantidad en la fila
                        let tdCantidad = filaExistente.querySelector('.cantidad');

                        // Actualizar la cantidad (reducir en 1)
                        let nuevaCantidad = parseInt(tdCantidad.textContent, 10) - 1;

                        // Verificar si la cantidad es mayor que cero antes de actualizar
                        if (nuevaCantidad > 0) {
                            tdCantidad.textContent = nuevaCantidad;
                        } else {
                            // Si la cantidad es 0 o menos, eliminar la fila
                            filaExistente.remove();
                        }

                        // Aquí puedes agregar lógica adicional, como actualizar el total, etc.
                    }
                });
            }
        });

        p.textContent = item.precio;
        p.textContent = '$' + " " + formatoNumerico(item.precio);

        div.appendChild(img);
        div.appendChild(h2);
        div.appendChild(p);
        div.appendChild(button);
        fragment.appendChild(div);
        document.getElementById("container").appendChild(fragment);

        div.classList.add('div');
        img.classList.add('img');
        h2.classList.add('h2');
        div.classList.add('div');
        img.classList.add('img');
        h2.classList.add('h2');
        p.classList.add('p');
        button.classList.add('button');
    });
}