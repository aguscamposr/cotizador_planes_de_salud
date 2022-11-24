class Item {
    constructor(producto, cantidad) {
        this.producto = producto;
        this.cantidad = cantidad;
    }

    precioTotal() {
        return this.cantidad * this.producto.precio;
    }
}