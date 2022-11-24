// let carrito = [];
let carrito = JSON.parse(localStorage.getItem("carrito"));
if (carrito == undefined) {
    carrito = [];
}
let stock = [];

const tabla = document.getElementById("items");
const agregar = document.querySelector("#agregar");
const descuento = document.querySelector("#aumentar");
const ordenar = document.getElementById("ordenar");
const vaciar = document.getElementById("vaciar");
const productosEnStock = document.getElementById("productos");
const cotizar = document.getElementById("cotizar");

stock.push(new Producto("Plan Classic X Individual de 20 a 30 años", 11000));
stock.push(new Producto("Plan Classic X Individual de 30 a 40 años", 13000));
stock.push(new Producto("Plan Classic X Individual de 40 a 50 años", 15000));
stock.push(new Producto("Plan Classic X Individual de 50 a 60 años", 18000));
stock.push(new Producto("Plan Classic X Matrimonio de 20 a 30 años", 10000));
stock.push(new Producto("Plan Classic X Matrimonio de 30 a 40 años", 11500));
stock.push(new Producto("Plan Classic X Matrimonio de 40 a 50 años", 14000));
stock.push(new Producto("Plan Classic X Matrimonio de 50 a 60 años", 16500));
stock.push(new Producto("Plan Classic X Hijo hasta 20 años", 8000));
stock.push(new Producto("Plan Classic X Hijo hasta 30 años", 10000));
stock.push(new Producto("Plan Wagon Individual de 20 a 30 años", 13500));
stock.push(new Producto("Plan Wagon Individual de 30 a 40 años", 15000));
stock.push(new Producto("Plan Wagon Individual de 40 a 50 años", 18000));
stock.push(new Producto("Plan Wagon Individual de 50 a 60 años", 20000));
stock.push(new Producto("Plan Wagon Matrimonio de 20 a 30 años", 12500));
stock.push(new Producto("Plan Wagon Matrimonio de 30 a 40 años", 14000));
stock.push(new Producto("Plan Wagon Matrimonio de 40 a 50 años", 16500));
stock.push(new Producto("Plan Wagon Matrimonio de 50 a 60 años", 18500));
stock.push(new Producto("Plan Wagon Hijo hasta 20 años", 10000));
stock.push(new Producto("Plan Wagon Hijo hasta 30 años", 12000));
stock.push(new Producto("Plan Cober X Individual de 20 a 30 años", 15500));
stock.push(new Producto("Plan Cober X Individual de 30 a 40 años", 17000));
stock.push(new Producto("Plan Cober X Individual de 40 a 50 años", 20000));
stock.push(new Producto("Plan Cober X Individual de 50 a 60 años", 22000));
stock.push(new Producto("Plan Cober X Matrimonio de 20 a 30 años", 14500));
stock.push(new Producto("Plan Cober X Matrimonio de 30 a 40 años", 16000));
stock.push(new Producto("Plan Cober X Matrimonio de 40 a 50 años", 18500));
stock.push(new Producto("Plan Cober X Matrimonio de 50 a 60 años", 21500));
stock.push(new Producto("Plan Cober X Hijo hasta 20 años", 12000));
stock.push(new Producto("Plan Cober X Hijo hasta 30 años", 14000));


stock.forEach((producto) => {
    const option = document.createElement("option");
    option.innerText = `${producto.nombre} a $${producto.precio}`;
    option.value = stock.indexOf(producto);
    productosEnStock.append(option);
});

function newRow(item) {
    const row = document.createElement("tr");
    const pos = carrito.indexOf(item);
    let aux = document.createElement("th");
    aux.innerText = item.producto.nombre;
    row.append(aux);

    aux = document.createElement("th");
    aux.innerText = item.cantidad;
    const suma = document.createElement("button");
    suma.className = "btn btn-primary";
    suma.innerText = "+";
    const resta = document.createElement("button");
    resta.className = "btn btn-primary";
    resta.innerText = "-";

    suma.onclick = () => {
        carrito[pos].cantidad++;
        localStorage.setItem("carrito", JSON.stringify(carrito));
        listadoUpdate();
    };
    resta.onclick = () => {
        if (carrito[pos].cantidad > 0) {
            carrito[pos].cantidad--;
            localStorage.setItem("carrito", JSON.stringify(carrito));
            listadoUpdate();
        }
    };

    aux.append(resta);
    aux.append(suma);

    row.append(aux);
    aux = document.createElement("th");
    aux.innerText = item.producto.precio;
    row.append(aux);
    const eliminarBtn = document.createElement("button");
    eliminarBtn.className = "btn btn-danger";
    eliminarBtn.innerText = "Eliminar";
    eliminarBtn.onclick = () => {
        carrito.splice(pos, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        listadoUpdate();
    };
    const th = document.createElement("th");
    th.append(eliminarBtn);
    row.append(th);
    tabla.append(row);
    const total = document.getElementById("total");
    total.innerText = carrito.reduce(
        (total, item) => total + item.producto.precio * item.cantidad,
        0
    );
}

function listadoUpdate() {
    tabla.innerHTML = "";
    carrito.forEach((item) => {
        newRow(item);
    });
    total.innerText = carrito.reduce(
        (total, item) => total + item.producto.precio * item.cantidad,
        0
    );
}

agregar.addEventListener("submit", (e) => {
    e.preventDefault();
    let producto = stock[productosEnStock.value];
    if (
        typeof carrito.find(
            (el) => el.producto.nombre == stock[productosEnStock.value].nombre
        ) === "undefined"
    ) {
        let nuevoElementoEnCarrito = new Item(producto, 1);
        carrito.push(nuevoElementoEnCarrito);
        newRow(nuevoElementoEnCarrito);
    }
});

descuento.addEventListener("submit", (e) => {
    e.preventDefault();
    const valor = document.getElementById("Descuento").value;
    if (valor > 0) {
        carrito = carrito.map((item) => {
            return new Item(
                new Producto(
                    item.producto.nombre,
                    item.producto.precio * ((100 - valor) / 100)
                ),
                item.cantidad
            );
        });
        listadoUpdate();
    }
});

ordenar.onclick = () => {
    carrito.sort(
        (actual, siguiente) =>
            actual.producto.precio - siguiente.producto.precio
    );
    listadoUpdate();
};

vaciar.onclick = () => {
    carrito = [];
    listadoUpdate();
};
cotizar.onclick = () => {
    Swal.fire({
        title: "El Total del Plan es: " + "$"+(total.innerText),
        position: 'top mid',
        icon: 'success',
    })
    
};

listadoUpdate();