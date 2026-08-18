import tkinter as tk
from tkinter import ttk, messagebox


class SistemaGuardado(tk.Toplevel):
    def __init__(self, ventana_inventario=None):
        super().__init__()

        self.ventana_inventario = ventana_inventario

        self.title("Sistema Guardado")
        self.geometry("450x350")
        self.resizable(False, False)

        # Centrar la ventana en la pantalla (equivalente a setLocationRelativeTo(null))
        self.eval('tk::PlaceWindow . center')

        self._init_components()

    def _init_components(self):
        # 1. ComboBox de Categorías
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
            self, 
            values=categorias, 
            state="readonly", 
            font=("Tahoma", 10, "bold")
        )
        self.item_listado.current(0)
        self.item_listado.grid(row=0, column=0, columnspan=2, padx=20, pady=15, sticky="ew")
        self.item_listado.bind("<<ComboboxSelected>>", self.item_listado_action_performed)

        # 2. Labels y Entradas (Grid de 2x2 para Producto, Precio, ID y Stock)
        
        # Fila 1: Producto y Precio
        tk.Label(self, text="Producto:").grid(row=1, column=0, padx=20, pady=(10, 2), sticky="w")
        tk.Label(self, text="Precio:").grid(row=1, column=1, padx=20, pady=(10, 2), sticky="w")

        self.txt_producto = tk.Entry(self, width=20)
        self.txt_producto.grid(row=2, column=0, padx=20, pady=(0, 10))

        self.txt_precio = tk.Entry(self, width=20)
        self.txt_precio.grid(row=2, column=1, padx=20, pady=(0, 10))

        # Fila 2: ID y Stock
        tk.Label(self, text="ID:").grid(row=3, column=0, padx=20, pady=(10, 2), sticky="w")
        tk.Label(self, text="Stock:").grid(row=3, column=1, padx=20, pady=(10, 2), sticky="w")

        self.txt_id_producto = tk.Entry(self, width=20)
        self.txt_id_producto.grid(row=4, column=0, padx=20, pady=(0, 10))

        self.txt_stock = tk.Entry(self, width=20)
        self.txt_stock.grid(row=4, column=1, padx=20, pady=(0, 10))

        # 3. Botones (Guardar y Regresar)
        frame_botones = tk.Frame(self)
        frame_botones.grid(row=5, column=0, columnspan=2, pady=25)

        self.btn_guardar = tk.Button(
            frame_botones, 
            text="Guardar", 
            command=self.btn_guardar_action_performed,
            width=12
        )
        self.btn_guardar.pack(side=tk.LEFT, padx=10)

        self.btn_regresar = tk.Button(
            frame_botones, 
            text="Regresar", 
            command=self.btn_regresar_action_performed,
            width=12
        )
        self.btn_regresar.pack(side=tk.LEFT, padx=10)

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

    def btn_guardar_action_performed(self):
        # 1. Capturar los datos de los campos de texto
        producto = self.txt_producto.get().strip()
        id_prod = self.txt_id_producto.get().strip()
        stock = self.txt_stock.get().strip()
        precio = self.txt_precio.get().strip()
        categoria = self.item_listado.get()

        # 2. Validar que no estén vacíos
        if not producto or not id_prod or not stock or not precio:
            messagebox.showwarning("Advertencia", "Por favor, complete todos los campos.", parent=self)
        else:
            # 3. Enviar datos a la ventana principal de Inventario
            if self.ventana_inventario:
                self.ventana_inventario.agregar_producto_tabla(producto, categoria, precio, id_prod, stock)

            # 4. Confirmar y cerrar
            messagebox.showinfo("Éxito", "Producto guardado correctamente.", parent=self)
            self.destroy()  # Cierra esta ventana (equivalente a this.dispose())

    def btn_regresar_action_performed(self):
        # Si se requiere reabrir o mostrar la ventana principal al cerrar
        if self.ventana_inventario:
            self.ventana_inventario.deiconify()  # Muestra la ventana anterior si estaba oculta
        self.destroy()


if __name__ == "__main__":
    app = SistemaGuardado()
    app.mainloop()