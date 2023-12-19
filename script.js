let totalPrecio = 0;

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
    { id: 3, nombre: "Sudadera Suelta Versión Coreana Pepsi", precio: 125850, img: "ropa/sudadera3.webp" },
    { id: 4, nombre: "Buzo Hoodie Capota Naruto Clan Akatsuki Anime Manga", precio: 92900, img: "ropa/buzo4.webp" },
    { id: 5, nombre: "Sudadera Y Cremallera Grunge Aesthetic", precio: 161848, img: "ropa/sudadera5.webp" },
    { id: 6, nombre: "Camiseta Toxic Girl y Pantalón Gucci exclusivo", precio: 90250, img: "ropa/camisa6.webp" },
    { id: 7, nombre: "Pijamas Cálidos De Dibujos Animados De Pareja", precio: 408605, img: "ropa/pijama7.webp" },
    { id: 8, nombre: "Jean Clásico 088 Lec Lee Para Hombre - Índigo Claro", precio: 111990, img: "ropa/jin8.webp" },
    { id: 9, nombre: "Pantalones Cargo Lavados Azules, Múltiples Bolsillos", precio: 222567, img: "ropa/pantalon9.webp" },
    { id: 10, nombre: "Combo X 2 Camisetas Interior Frio Ropa Termica", precio: 150000, img: "ropa/camisa10.webp" },
    { id: 11, nombre: "Pantuflas Pochita Babuchas Slippers Chainsaw-man", precio: 49900, img: "ropa/pantunflas11.webp" },
    { id: 12, nombre: "Camisa A Cuadros De Manga Larga Para Hombre", precio: 78411, img: "ropa/camisa1.webp" },
];

document.addEventListener("DOMContentLoaded", () => {
    pintar();
    const vaciarCarritoButton = document.getElementById("vaciarCarrito");
    vaciarCarritoButton.addEventListener("click", vaciarCarrito);
});

function vaciarCarrito() {
    // Obtén la tabla y elimina todas las filas


    const tabla = document.getElementById("tBody");
    tabla.innerHTML = '';

    // Reinicia las cantidades a 0 (puedes ajustar según tu estructura de datos)
    productos.forEach((item) => {
        let filaExistente = document.querySelector(`#tBody tr[data-id="${item.id}"]`);


        if (filaExistente) {
            let tdCantidad = filaExistente.querySelector('.cantidad');
            tdCantidad.textContent = 0;
        }
    });
}
// También puedes reiniciar el total u otras acciones según sea necesario

function pintar() {
    productos.forEach((item) => {
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
            // Buscar la fila existente para el producto
            let filaExistente = document.querySelector(`#tBody tr[data-id="${item.id}"]`);

            if (filaExistente) {
                // Si la fila existe, actualizar la cantidad
                let tdCantidad = filaExistente.querySelector('.cantidad');
                let nuevaCantidad = parseInt(tdCantidad.textContent, 10) + 1;
                tdCantidad.textContent = nuevaCantidad;
                contadorClics = nuevaCantidad; // Resetear contadorClics al valor correcto
                let tdPrecio = filaExistente.querySelector('.precio');
                tdPrecio.textContent = '$' + " " + formatoNumerico(item.precio * nuevaCantidad);
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
                tdCantidad.textContent = 1; // Iniciar la cantidad en 1
                tdEliminar.textContent = "❌";

                fila.appendChild(tdImagen);
                fila.appendChild(tdNombre);
                fila.appendChild(tdPrecio);
                fila.appendChild(tdCantidad);
                fila.appendChild(tdEliminar);
                document.getElementById("tBody").appendChild(fila);

                imgProducto.classList.add('pruebaaaa')
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

                        // Obtener el elemento de precio en la fila
                        let tdPrecio = filaExistente.querySelector('.precio');

                        // Obtener la cantidad original del producto
                        let cantidadOriginal = parseInt(tdCantidad.dataset.originalCantidad, 10);

                        // Obtener el precio original del producto
                        let precioOriginal = parseInt(tdPrecio.dataset.originalPrecio, 10);

                        // Actualizar la cantidad (reducir en 1)
                        let nuevaCantidad = parseInt(tdCantidad.textContent, 10) - 1;

                        // Calcular el precio actualizado
                        let precioActualizado = item.precio * nuevaCantidad;

                        // Verificar si la cantidad es mayor que cero antes de actualizar
                        if (nuevaCantidad > 0) {
                            tdCantidad.textContent = nuevaCantidad;

                            let tdPrecio = filaExistente.querySelector('.precio');
                            tdPrecio.textContent = '$' + " " + formatoNumerico(item.precio * nuevaCantidad);

                        } else {
                            // Si la cantidad es 0 o menos, eliminar la fila
                            filaExistente.remove();
                        }

                        // Restar el precio unitario del producto al total
                        totalPrecio -= item.precio;

                        // Si el total es menor que 0, establecerlo en 0
                        totalPrecio = Math.max(0, totalPrecio);

                        // Actualizar el total mostrado en el span
                        document.getElementById("totalPrecio").textContent = formatoNumerico(totalPrecio);

                        // Aquí puedes agregar lógica adicional, como actualizar el total, etc.
                        // Verificar si no hay filas restantes y establecer el total en cero
                        if (document.querySelectorAll('#tBody tr').length === 0) {
                            totalPrecio = 0;
                            document.getElementById("totalPrecio").textContent = '0';
                        }
                    }
                });
            }
        });

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
        p.classList.add('p');
        button.classList.add('button');

        // ... (your existing code)

        button.addEventListener("click", () => {
            // ... (your existing code)

            // Update totalPrecio when a new item is added
            totalPrecio += item.precio;

            // Update the total displayed in the span
            document.getElementById("totalPrecio").textContent = formatoNumerico(totalPrecio);
        });

        // ... (your existing code)
    });
}

function vaciarCarrito() {

    const tabla = document.getElementById("tBody");
    tabla.innerHTML = '';

    // Reinicia las cantidades a 0 (puedes ajustar según tu estructura de datos)
    productos.forEach((item) => {
        let filaExistente = document.querySelector(`#tBody tr[data-id="${item.id}"]`);

        if (filaExistente) {
            let tdCantidad = filaExistente.querySelector('.cantidad');
            tdCantidad.textContent = 0;
        }
    });

    // Establecer el totalPrecio a 0 al vaciar el carrito
    totalPrecio = 0;

    // Actualizar el total displayed en el span solo si hay productos en el carrito
    if (productos.some(item => parseInt(item.cantidad, 10) > 0)) {
        document.getElementById("totalPrecio").textContent = formatoNumerico(totalPrecio);
    } else {
        // Si no hay productos en el carrito, mostrar 0 en el total sin formato
        document.getElementById("totalPrecio").textContent = '0';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var carrito = document.querySelector(".carrito");
    var ctabla = document.querySelector(".ctabla");

    carrito.addEventListener('click', function(event) {
        event.stopPropagation();
        if (ctabla.style.display === "none" || ctabla.style.display === "") {
            ctabla.style.display = "block";
        } else {
            ctabla.style.display = "none";
        }
    });

    // Evitar que se cierre al hacer clic en .ctabla
    ctabla.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    // Cerrar .ctabla si se hace clic fuera de ella
    document.addEventListener('click', function(event) {
        // Verificar si se hizo clic en la imagen del carrito
        if (!event.target.classList.contains('carrito')) {
            // Si no se hizo clic en la imagen del carrito, no ocultar la tabla
            event.stopPropagation();
        }
    });
});
