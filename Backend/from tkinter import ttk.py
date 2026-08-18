from tkinter import ttk
from typing import List, Optional


class Producto:
    """Clase modelo para representar un Producto."""
    def __init__(self, nombre: str, tipo: str, precio: float, id_producto: str, stock: int):
        self.nombre = nombre
        self.tipo = tipo
        self.precio = precio
        self.id_producto = id_producto
        self.stock = stock


class GestorInventario:
    # Atributo de clase (equivalente al 'static List<Producto> inventario' en Java)
    _inventario: List[Producto] = []

    def agregar_producto_objeto(self, p: Producto) -> None:
        """Agrega un objeto Producto a la lista en memoria."""
        GestorInventario._inventario.append(p)

    def get_inventario(self) -> List[Producto]:
        """Devuelve la lista actual de productos."""
        return GestorInventario._inventario

    def agregar_producto(self, tabla: ttk.Treeview, nombre: str, tipo: str, precio: str, id_producto: str, stock: str) -> None:
        """
        Inserta una nueva fila directamente en el Treeview (tabla).
        Equivalente a model.addRow(...) en Java.
        """
        tabla.insert("", "end", values=(nombre, tipo, precio, id_producto, stock))

    def eliminar_producto(self, tabla: ttk.Treeview, id_producto: str) -> None:
        """
        Recorre el Treeview buscando el ID (columna 3 / índice 3)
        y elimina la fila coincidente.
        """
        for item in tabla.get_children():
            valores = tabla.item(item, "values")
            # En Python los índices empiezan en 0, la columna ID es la posición 3
            if len(valores) > 3 and str(valores[3]) == str(id_producto):
                tabla.delete(item)
                break

    def cargar_tabla_filtrada(self, tabla: ttk.Treeview, categoria: str) -> None:
        """
        Equivalente al método pendiente por implementar.
        Limpiaría la tabla y cargaría los elementos según la categoría.
        """
        raise NotImplementedError("Método no soportado aún.")