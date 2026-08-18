import logging
import tkinter as tk
from tkinter import ttk, messagebox

# Configuración del logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class InventarioApp(tk.Tk):
    def __init__(self):
        super().__init__()

        self.title("Inventario")
        self.geometry("940x415")
        self.resizable(False, False)
        self.configure(bg="#999999")  # Fondo similar al de Java

        # Inicialización del gestor (simulado)
        # self.gestor = GestorInventario()

        self._init_components()

    def _init_components(self):
        # Frame superior para los controles
        frame_superior = tk.Frame(self, bg="#999999")
        frame_superior.pack(fill=tk.X, padx=20, pady=15)

        # 1. Combo Box de Categorías
        categorias = [
            "Seleccione una categoría...",
            "Productos para el hogar",
            "Electrodomesticos",
            "Productos Limpieza",
            "Alimentos y Abarrotes",
            "Cuidado Personal",
            "Tecnología y Electrónica"
        ]
        
        self.item_listado = ttk.Combobox(
            frame_superior, 
            values=categorias, 
            state="readonly", 
            width=25,
            font=("Tahoma", 10, "bold")
        )
        self.item_listado.current(0)
        self.item_listado.pack(side=tk.LEFT, padx=(0, 15))
        self.item_listado.bind("<<ComboboxSelected>>", self.item_listado_action_performed)

        # 2. Botón Añadir Producto
        self.btn_agregar = tk.Button(
            frame_superior, 
            text="Añadir productos", 
            command=self.btn_agregar_producto_action_performed
        )
        self.btn_agregar.pack(side=tk.LEFT, padx=15)

        # 3. Botón Eliminar Producto
        self.btn_eliminar = tk.Button(
            frame_superior, 
            text="Eliminar", 
            command=self.btn_eliminar_producto_action_performed
        )
        self.btn_eliminar.pack(side=tk.LEFT, padx=15)

        # Frame inferior para la Tabla
        frame_tabla = tk.Frame(self)
        frame_tabla.pack(fill=tk.BOTH, expand=True, padx=20, pady=(0, 20))

        # 4. Tabla (Treeview)
        columnas = ("Nombre", "Tipo", "Precio", "ID", "Stock")
        self.tabla = ttk.Treeview(frame_tabla, columns=columnas, show="headings")

        # Configurar encabezados
        for col in columnas:
            self.tabla.heading(col, text=col)
            self.tabla.column(col, anchor=tk.CENTER, width=120)

        # Scrollbar vertical para la tabla
        scrollbar = ttk.Scrollbar(frame_tabla, orient=tk.VERTICAL, command=self.tabla.yview)
        self.tabla.configure(yscroll=scrollbar.set)
        
        scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        self.tabla.pack(fill=tk.BOTH, expand=True)

    # --- MÉTODOS DE LÓGICA ---

    def filtrar_por_categoria(self, categoria: str):
        # Lógica de filtrado con gestor...
        # self.gestor.cargar_tabla_filtrada(self.tabla, categoria)
        pass

    def agregar_producto_tabla(self, nombre: str, tipo: str, precio: str, id_prod: str, stock: str):
        """Añade un elemento a la tabla."""
        self.tabla.insert("", tk.END, values=(nombre, tipo, precio, id_prod, stock))

    def eliminar_fila_por_id(self, id_prod: str):
        """Busca el ID en la columna correspondiente y elimina la fila."""
        for item in self.tabla.get_children():
            valores = self.tabla.item(item, "values")
            if str(valores[3]) == str(id_prod):  # La columna ID es el índice 3
                self.tabla.delete(item)
                break

    # --- EVENTOS ---

    def item_listado_action_performed(self, event=None):
        opcion_seleccionada = self.item_listado.get()

        match opcion_seleccionada:
            case "Seleccione una categoría...":
                pass
            case "Productos para el hogar":
                print("Cargando productos para el hogar...")
            case "Electrodomesticos":
                print("Cargando electrodomésticos...")
            case "Productos Limpieza":
                print("Cargando productos de limpieza...")
            case "Alimentos y Abarrotes":
                print("Cargando alimentos y abarrotes...")
            case "Cuidado Personal":
                print("Cargando productos de cuidado personal...")
            case "Tecnología y Electrónica":
                print("Cargando tecnología...")

    def btn_agregar_producto_action_performed(self):
        # Lógica para abrir la ventana de 'sistemaguardado'
        print("Abrir ventana de guardado")

    def btn_eliminar_producto_action_performed(self):
        # Ejemplo: Si hay un elemento seleccionado en la tabla, lo elimina directamente
        # o abre la ventana externa como en tu código original
        print("Abrir ventana de eliminación")


if __name__ == "__main__":
    app = InventarioApp()
    app.mainloop()