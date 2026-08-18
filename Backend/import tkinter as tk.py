import tkinter as tk
from tkinter import messagebox


class VentanaEliminar(tk.Toplevel):
    def __init__(self, parent=None):
        super().__init__()

        # Referencia a la ventana principal (Inventario)
        self.parent = parent

        self.title("Eliminar Producto")
        self.geometry("350x220")
        self.resizable(False, False)

        # Centrar la ventana en pantalla (setLocationRelativeTo(null))
        self.eval('tk::PlaceWindow . center')

        self._init_components()

    def _init_components(self):
        # Frame contenedor para centrar los elementos ordenadamente
        container = tk.Frame(self)
        container.pack(expand=True, fill="both", padx=20, pady=20)

        # 1. Label de ID
        self.lbl_id = tk.Label(container, text="ID del producto:", font=("Arial", 10, "bold"))
        self.lbl_id.pack(anchor="w", pady=(5, 2))

        # 2. Campo de texto (txt_clear_ID)
        self.txt_clear_id = tk.Entry(container, width=30, font=("Arial", 10))
        self.txt_clear_id.pack(fill="x", pady=(0, 20))
        self.txt_clear_id.focus()  # Poner el foco en el input al abrir

        # 3. Frame para los botones Aceptar y Cancelar
        frame_botones = tk.Frame(container)
        frame_botones.pack(pady=10)

        self.btn_aceptar = tk.Button(
            frame_botones, 
            text="Aceptar", 
            command=self.btn_aceptar_action_performed,
            width=10,
            bg="#d9534f",
            fg="white"
        )
        self.btn_aceptar.pack(side=tk.LEFT, padx=10)

        self.btn_cancelar = tk.Button(
            frame_botones, 
            text="Cancelar", 
            command=self.btn_cancelar_action_performed,
            width=10
        )
        self.btn_cancelar.pack(side=tk.LEFT, padx=10)

    # --- EVENTOS ---

    def btn_aceptar_action_performed(self):
        id_a_buscar = self.txt_clear_id.get().strip()

        if id_a_buscar:
            # Llamamos al método de eliminación en la ventana Inventario principal
            if self.parent and hasattr(self.parent, 'eliminar_fila_por_id'):
                self.parent.eliminar_fila_por_id(id_a_buscar)
            
            # Cerrar esta ventana (equivalente a this.dispose())
            self.destroy()
        else:
            messagebox.showwarning("Advertencia", "Por favor ingrese un ID válido.", parent=self)

    def btn_cancelar_action_performed(self):
        # Si la ventana principal estaba oculta, la volvemos a mostrar
        if self.parent:
            self.parent.deiconify()
        self.destroy()


if __name__ == "__main__":
    # Prueba independiente de la ventana
    app = VentanaEliminar()
    app.mainloop()