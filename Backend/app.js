// Controla la interfaz de gestión, productos y ventas.
// Aquí se puede añadir más adelante una base de datos SQLite.

const vistaLogin = document.getElementById('loginVista');
const vistaAdmin = document.getElementById('adminVista');
const formLogin = document.getElementById('formLogin');
const formCrearUsuario = document.getElementById('formCrearUsuario');
const botonCerrarSesion = document.getElementById('botonCerrarSesion');
const usuarioAdminValor = document.getElementById('usuarioAdminValor');
const mensajeLogin = document.getElementById('mensajeLogin');
const circleAdmin = document.getElementById('circleAdmin');
const circulosUsuarios = document.getElementById('circulosUsuarios');
const btnAgregarUsuarioUnder = document.getElementById('btnAgregarUsuarioUnder');
const modalLogin = document.getElementById('modalLogin');
const cerrarModalLogin = document.getElementById('cerrarModalLogin');
const formLoginModal = document.getElementById('formLoginModal');
const usuarioModalLogin = document.getElementById('usuarioModalLogin');
const claveModalLogin = document.getElementById('claveModalLogin');
const mensajeLoginModal = document.getElementById('mensajeLoginModal');
const cancelLoginModal = document.getElementById('cancelLoginModal');
const aggUsuario = document.getElementById('aggUsuario');
const modalCrearUsuario = document.getElementById('modalCrearUsuario');
const cerrarModalCrearUsuario = document.getElementById('cerrarModalCrearUsuario');
const formCrearUsuarioModal = document.getElementById('formCrearUsuarioModal');
const btnCancelarCrearUsuario = document.getElementById('btnCancelarCrearUsuario');
const inputNombreNuevo = document.getElementById('nombreNuevo');
const inputApellidosNuevo = document.getElementById('apellidosNuevo');
const inputCelularNuevo = document.getElementById('celularNuevo');
const inputDireccionNuevo = document.getElementById('direccionNuevo');
const inputUsuarioNuevo = document.getElementById('usuarioNuevo');
const inputClaveNuevaModal = document.getElementById('claveNuevaModal');
const inputConfirmarClaveModal = document.getElementById('confirmarClaveModal');
const inputAdminClaveCrear = document.getElementById('adminClaveCrear');
const botonAgregarProducto = document.getElementById('botonAgregarProducto');
const botonGenerarReporte = document.getElementById('botonGenerarReporte');
const botonAjustes = document.getElementById('botonAjustes');
const menuAjustes = document.getElementById('menuAjustes');
const cerrarSesionAjustes = document.getElementById('cerrarSesionAjustes');
const cambiarCuentaAjustes = document.getElementById('cambiarCuentaAjustes');
const eliminarCuentaAjustes = document.getElementById('eliminarCuentaAjustes');
const cambiarContrasenaAjustes = document.getElementById('cambiarContrasenaAjustes');
const verPerfilesAjustes = document.getElementById('verPerfilesAjustes');
const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
const tablaProductos = document.getElementById('tablaProductos');
const mensajeSinProductos = document.getElementById('mensajeSinProductos');
const areaReporte = document.getElementById('areaReporte');
const areaFactura = document.getElementById('areaFactura');
const modalProducto = document.getElementById('modalProducto');
const modalPerfiles = document.getElementById('modalPerfiles');
const cerrarModalPerfiles = document.getElementById('cerrarModalPerfiles');
const listaPerfiles = document.getElementById('listaPerfiles');
const cerrarModalProducto = document.getElementById('cerrarModalProducto');
const formProducto = document.getElementById('formProducto');
const tituloModalProducto = document.getElementById('tituloModalProducto');
const inputProductoId = document.getElementById('productoId');
const inputNombreProducto = document.getElementById('nombreProducto');
const inputCodigoProducto = document.getElementById('codigoProducto');
const inputPrecioProducto = document.getElementById('precioProducto');
const inputStockProducto = document.getElementById('stockProducto');
const modalVenta = document.getElementById('modalVenta');
const cerrarModalVenta = document.getElementById('cerrarModalVenta');
const formVenta = document.getElementById('formVenta');
const ventaProductoNombre = document.getElementById('ventaProductoNombre');
const inputCantidadVenta = document.getElementById('cantidadVenta');

const LLAVE_PRODUCTOS = 'tiendaAlexanderProductos';
let productoEnVenta = null;
let usuarioActual = '';
let rolActual = '';

function leerProductos() {
    const datos = localStorage.getItem(LLAVE_PRODUCTOS);
    return datos ? JSON.parse(datos) : [];
}

function guardarProductos(productos) {
    localStorage.setItem(LLAVE_PRODUCTOS, JSON.stringify(productos));
}

function inicializarProductosBase() {
    const productos = leerProductos();
    if (!Array.isArray(productos)) {
        guardarProductos([]);
    }
}

function mostrarMensajeLogin(texto, tipo = 'info') {
    if (!mensajeLogin) {
        return;
    }
    mensajeLogin.textContent = texto;
    mensajeLogin.className = `mensaje ${tipo}`.trim();
}

function obtenerParametroUrl(nombre) {
    const params = new URLSearchParams(window.location.search);
    return params.get(nombre) || '';
}

function configurarPermisos(rol) {
    if (rol === 'admin') {
        if (aggUsuario) aggUsuario.style.display = '';
        if (circulosUsuarios) circulosUsuarios.style.display = '';
        if (botonGenerarReporte) botonGenerarReporte.style.display = '';
        if (areaReporte) areaReporte.style.display = '';
        if (areaFactura) areaFactura.style.display = '';
    } else {
        if (aggUsuario) aggUsuario.style.display = 'none';
        if (circulosUsuarios) circulosUsuarios.style.display = 'none';
        if (botonGenerarReporte) botonGenerarReporte.style.display = 'none';
        if (areaReporte) areaReporte.style.display = 'none';
        if (areaFactura) areaFactura.style.display = 'none';
    }
}

function redirigirAlLogin() {
    window.location.href = 'Login.html';
}

function mostrarAdmin(usuario, rol) {
    usuarioActual = usuario || '';
    rolActual = rol || (usuario.toLowerCase() === 'admin' ? 'admin' : 'usuario');
    if (vistaLogin) {
        vistaLogin.classList.remove('vista-activa');
    }
    if (vistaAdmin) {
        vistaAdmin.classList.add('vista-activa');
    }
    if (usuarioAdminValor) {
        usuarioAdminValor.textContent = `Usuario: ${usuarioActual}`;
    }
    configurarPermisos(rolActual);
    // Mostrar nombre completo en hero si existe
    try {
        const perfil = obtenerUsuarioPorNombre(usuarioActual);
        const heroTitle = document.getElementById('heroUserTitle');
        const heroAvatar = document.getElementById('heroAvatarImg');
        const heroSub = document.getElementById('heroUserSub');
        if (perfil && heroTitle) {
            const nombreCompleto = (perfil.nombre || '') + (perfil.apellidos ? ' ' + perfil.apellidos : '');
            heroTitle.textContent = nombreCompleto.trim() || perfil.usuario || 'Administrador';
            if (perfil.avatar && heroAvatar) {
                heroAvatar.src = perfil.avatar;
            }
            if (heroSub) {
                heroSub.textContent = rolActual === 'admin' ? 'Administrador' : 'Inventario activo';
            }
        }
    } catch (e) {
        // no bloquear si no existe la función auxiliar
    }
    actualizarReporte();
    renderProductos();
}

function mostrarLogin() {
    redirigirAlLogin();
}

function abrirModalLogin(prefillUser) {
    if (!modalLogin) return;
    modalLogin.classList.add('modal-activo');
    modalLogin.setAttribute('aria-hidden', 'false');
    if (usuarioModalLogin) usuarioModalLogin.value = prefillUser || '';
    if (claveModalLogin) claveModalLogin.value = '';
    if (mensajeLoginModal) mensajeLoginModal.textContent = '';
}

function cambiarTab(tabId) {
    document.querySelectorAll('.tab-pane').forEach(function (pane) {
        pane.classList.remove('tab-activa');
    });
    document.querySelectorAll('.sidebar-nav .nav-item').forEach(function (item) {
        item.classList.remove('nav-item-activa');
    });
    const tab = document.getElementById(tabId);
    if (tab) tab.classList.add('tab-activa');
    const boton = document.querySelector(`.sidebar-nav .nav-item[data-tab="${tabId}"]`);
    if (boton) boton.classList.add('nav-item-activa');
}

function cerrarModalLoginFn() {
    if (!modalLogin) return;
    modalLogin.classList.remove('modal-activo');
    modalLogin.setAttribute('aria-hidden', 'true');
}

function mostrarMensajeLoginModal(texto, tipo = 'info') {
    if (!mensajeLoginModal) return;
    mensajeLoginModal.textContent = texto;
    mensajeLoginModal.className = `mensaje ${tipo}`.trim();
}

function validarProducto(nombre, codigo, precio, stock) {
    const errores = [];
    if (!nombre || nombre.trim().length < 2) {
        errores.push('El nombre debe tener al menos 2 caracteres.');
    }
    if (!codigo || codigo.trim().length < 2) {
        errores.push('El código es obligatorio.');
    }
    if (isNaN(precio) || precio <= 0) {
        errores.push('El precio debe ser mayor que 0.');
    }
    if (!Number.isInteger(stock) || stock < 0) {
        errores.push('El stock debe ser un número entero igual o mayor a 0.');
    }
    return errores;
}

function abrirModalProducto(producto) {
    if (!modalProducto) {
        return;
    }
    modalProducto.classList.add('modal-activo');
    modalProducto.setAttribute('aria-hidden', 'false');

    if (producto) {
        inputProductoId.value = producto.id;
        inputNombreProducto.value = producto.nombre;
        inputCodigoProducto.value = producto.codigo;
        inputPrecioProducto.value = producto.precio;
        inputStockProducto.value = producto.stock;
        tituloModalProducto.textContent = 'Editar producto';
    } else {
        inputProductoId.value = '';
        formProducto.reset();
        tituloModalProducto.textContent = 'Agregar producto';
    }
}

function cerrarModalProductoFn() {
    if (!modalProducto) {
        return;
    }
    modalProducto.classList.remove('modal-activo');
    modalProducto.setAttribute('aria-hidden', 'true');
}

function abrirModalVenta(producto) {
    if (!modalVenta || !ventaProductoNombre) {
        return;
    }
    productoEnVenta = producto;
    ventaProductoNombre.textContent = producto.nombre;
    inputCantidadVenta.value = 1;
    modalVenta.classList.add('modal-activo');
    modalVenta.setAttribute('aria-hidden', 'false');
}

function cerrarModalVentaFn() {
    if (!modalVenta) {
        return;
    }
    modalVenta.classList.remove('modal-activo');
    modalVenta.setAttribute('aria-hidden', 'true');
    productoEnVenta = null;
}

function alternarMenuAjustes() {
    if (!menuAjustes) return;
    menuAjustes.classList.toggle('oculto');
}

function ocultarMenuAjustes() {
    if (!menuAjustes) return;
    menuAjustes.classList.add('oculto');
}

function cerrarSesion() {
    redirigirAlLogin();
}

function cambiarCuenta() {
    redirigirAlLogin();
}

function eliminarCuenta() {
    alert('Función de eliminar cuenta activada.');
}

function cambiarContrasena() {
    alert('Función de cambiar contraseña activada.');
}

function mostrarPerfiles() {
    if (!modalPerfiles || !listaPerfiles) return;
    const usuarios = leerUsuarios();
    listaPerfiles.innerHTML = '';
    if (usuarios.length === 0) {
        listaPerfiles.innerHTML = '<p>No hay perfiles disponibles.</p>';
    } else {
        usuarios.forEach(function (usuario) {
            const perfil = document.createElement('div');
            perfil.className = 'perfil-item';
            perfil.innerHTML = `
                <h4>${usuario.usuario} (${usuario.rol})</h4>
                <p>Nombre: ${usuario.nombre || '-'} ${usuario.apellidos || ''}</p>
                <p>Celular: ${usuario.celular || '-'}</p>
                <p>Dirección: ${usuario.direccion || '-'}</p>
                <p>Contraseña: <strong>${usuario.clave}</strong></p>
            `;
            listaPerfiles.appendChild(perfil);
        });
    }
    modalPerfiles.classList.add('modal-activo');
    modalPerfiles.setAttribute('aria-hidden', 'false');
}

function guardarProducto(evento) {
    evento.preventDefault();
    const id = inputProductoId.value;
    const nombre = inputNombreProducto.value.trim();
    const codigo = inputCodigoProducto.value.trim();
    const precio = parseFloat(inputPrecioProducto.value);
    const stock = parseInt(inputStockProducto.value, 10);

    const errores = validarProducto(nombre, codigo, precio, stock);
    if (errores.length > 0) {
        alert(errores.join('\n'));
        return;
    }

    const productos = leerProductos();
    if (id) {
        const index = productos.findIndex((item) => item.id === id);
        if (index >= 0) {
            productos[index] = { id, nombre, codigo, precio, stock };
        }
    } else {
        const nuevoProducto = {
            id: `prod-${Date.now()}`,
            nombre,
            codigo,
            precio,
            stock,
        };
        productos.push(nuevoProducto);
    }

    guardarProductos(productos);
    cerrarModalProductoFn();
    renderProductos();
    actualizarReporte();
}

function renderProductos() {
    if (!tablaProductos || !mensajeSinProductos) {
        return;
    }
    const productos = leerProductos();
    tablaProductos.innerHTML = '';

    if (productos.length === 0) {
        mensajeSinProductos.style.display = 'block';
        return;
    }
    mensajeSinProductos.style.display = 'none';

    productos.forEach((producto) => {
        const acciones = [
            `<button type="button" class="boton boton-secundario boton-accion" data-id="${producto.id}" data-accion="editar">Editar</button>`,
            `<button type="button" class="boton boton-secundario boton-accion" data-id="${producto.id}" data-accion="eliminar">Eliminar</button>`
        ];
        if (rolActual === 'admin') {
            acciones.splice(1, 0, `<button type="button" class="boton boton-secundario boton-accion" data-id="${producto.id}" data-accion="vender">Vender</button>`);
        }
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.codigo}</td>
            <td>$${producto.precio.toFixed(2)}</td>
            <td>${producto.stock}</td>
            <td class="acciones-tabla">
                ${acciones.join('')}
            </td>
        `;
        tablaProductos.appendChild(fila);
    });
}

function eliminarProducto(id) {
    const productos = leerProductos();
    const filtrados = productos.filter((item) => item.id !== id);
    guardarProductos(filtrados);
    renderProductos();
    actualizarReporte();
}

function venderProducto(cantidad) {
    if (!productoEnVenta) {
        return;
    }
    const productos = leerProductos();
    const index = productos.findIndex((item) => item.id === productoEnVenta.id);
    if (index < 0) {
        return;
    }
    if (cantidad < 1 || cantidad > productos[index].stock) {
        alert('Cantidad no válida o no hay suficiente stock.');
        return;
    }
    productos[index].stock -= cantidad;
    guardarProductos(productos);
    renderProductos();
    actualizarReporte();
    mostrarFactura(productoEnVenta, cantidad);
    cerrarModalVentaFn();
}

function actualizarReporte() {
    if (!areaReporte) {
        return;
    }
    const productos = leerProductos();
    const totalProductos = productos.length;
    const valorInventario = productos.reduce((suma, item) => suma + item.precio * item.stock, 0);
    areaReporte.innerHTML = `
        <div class="reporte-celda">
            <h5>Total productos</h5>
            <strong>${totalProductos}</strong>
        </div>
        <div class="reporte-celda">
            <h5>Valor inventario</h5>
            <strong>$${valorInventario.toFixed(2)}</strong>
        </div>
        <div class="reporte-celda">
            <h5>Productos con stock cero</h5>
            <strong>${productos.filter((item) => item.stock === 0).length}</strong>
        </div>
    `;
}

function mostrarFactura(producto, cantidad) {
    if (!areaFactura) {
        return;
    }
    const total = producto.precio * cantidad;
    areaFactura.innerHTML = `
        <div class="factura-celda">
            <h5>Factura de venta</h5>
            <p>Producto: <strong>${producto.nombre}</strong></p>
            <p>Código: <strong>${producto.codigo}</strong></p>
            <p>Cantidad vendida: <strong>${cantidad}</strong></p>
            <p>Precio unitario: <strong>$${producto.precio.toFixed(2)}</strong></p>
            <p>Total: <strong>$${total.toFixed(2)}</strong></p>
            <p class="nota">Esta es una vista previa. Se puede conectar a una base de datos SQL para facturas reales.</p>
        </div>
    `;
}

function obtenerProductoPorId(id) {
    const productos = leerProductos();
    return productos.find((item) => item.id === id);
}

if (formLogin) {
    formLogin.addEventListener('submit', function (evento) {
        evento.preventDefault();
        const nombre = document.getElementById('usuario').value.trim();
        const clave = document.getElementById('clave').value;
        if (validarCredenciales(nombre, clave)) {
            const rol = nombre.toLowerCase() === 'admin' ? 'admin' : 'usuario';
            mostrarAdmin(nombre, rol);
        } else {
            mostrarMensajeLogin('Usuario o contraseña incorrectos.', 'error');
        }
    });
}


// Abrir modal de creación al pulsar la imagen
if (aggUsuario) {
    aggUsuario.addEventListener('click', function () {
        if (modalCrearUsuario) {
            modalCrearUsuario.classList.add('modal-activo');
            modalCrearUsuario.setAttribute('aria-hidden', 'false');
        }
    });
}

if (btnAgregarUsuarioUnder) {
    btnAgregarUsuarioUnder.addEventListener('click', function () {
        if (modalCrearUsuario) {
            modalCrearUsuario.classList.add('modal-activo');
            modalCrearUsuario.setAttribute('aria-hidden', 'false');
        }
    });
}

// Admin circle opens login modal (no prefill)
if (circleAdmin) {
    circleAdmin.addEventListener('click', function () {
        abrirModalLogin('admin');
    });
}

// Helper to create a user circle in login view
function agregarCirculoUsuario(username) {
    if (!circulosUsuarios) return;
    const btn = document.createElement('button');
    btn.className = 'user-circle user-circle-created';
    btn.title = username;
    btn.setAttribute('data-usuario', username);
    btn.innerHTML = `<span class="user-circle-label">${username}</span>`;
    btn.addEventListener('click', function () {
        abrirModalLogin(username);
    });
    circulosUsuarios.appendChild(btn);
}

// On successful creation, add circle
if (formCrearUsuarioModal) {
    formCrearUsuarioModal.addEventListener('submit', function (evt) {
        evt.preventDefault();
        const usuarioVal = inputUsuarioNuevo.value.trim();
        const claveVal = inputClaveNuevaModal.value;
        const confirmar = inputConfirmarClaveModal.value;
        const adminClave = inputAdminClaveCrear ? inputAdminClaveCrear.value : '';
        if (!usuarioVal || !claveVal) {
            alert('Completa usuario y contraseña.');
            return;
        }
        if (claveVal !== confirmar) {
            alert('Las contraseñas no coinciden.');
            return;
        }
        // verificar contraseña de admin antes de crear
        if (!validarCredenciales('admin', adminClave)) {
            alert('Contraseña de administrador incorrecta.');
            return;
        }
        const extra = {
            nombre: inputNombreNuevo.value.trim(),
            apellidos: inputApellidosNuevo.value.trim(),
            celular: inputCelularNuevo.value.trim(),
            direccion: inputDireccionNuevo.value.trim(),
            avatar: document.getElementById('heroAvatarImg') ? document.getElementById('heroAvatarImg').src : ''
        };
        const resultado = registrarUsuario(usuarioVal, claveVal, extra);
        if (!resultado.ok) {
            alert(resultado.errores.join('\n'));
            return;
        }
        cerrarModalCrearUsuarioFn();
        formCrearUsuarioModal.reset();
        agregarCirculoUsuario(usuarioVal);
        alert('Usuario creado exitosamente.');
    });
}

if (cerrarModalLogin) {
    cerrarModalLogin.addEventListener('click', cerrarModalLoginFn);
}

if (cancelLoginModal) {
    cancelLoginModal.addEventListener('click', function () {
        cerrarModalLoginFn();
    });
}

if (formLoginModal) {
    formLoginModal.addEventListener('submit', function (evt) {
        evt.preventDefault();
        const nombre = usuarioModalLogin.value.trim();
        const clave = claveModalLogin.value;
        if (validarCredenciales(nombre, clave)) {
            cerrarModalLoginFn();
            const rol = nombre.toLowerCase() === 'admin' ? 'admin' : 'usuario';
            mostrarAdmin(nombre, rol);
        } else {
            mostrarMensajeLoginModal('Usuario o contraseña incorrectos.', 'error');
        }
    });
}

function cerrarModalCrearUsuarioFn() {
    if (!modalCrearUsuario) return;
    modalCrearUsuario.classList.remove('modal-activo');
    modalCrearUsuario.setAttribute('aria-hidden', 'true');
}

if (cerrarModalCrearUsuario) {
    cerrarModalCrearUsuario.addEventListener('click', cerrarModalCrearUsuarioFn);
}

if (btnCancelarCrearUsuario) {
    btnCancelarCrearUsuario.addEventListener('click', function () {
        cerrarModalCrearUsuarioFn();
        mostrarLogin();
    });
}


// cerrar modal con click fuera
if (modalCrearUsuario) {
    modalCrearUsuario.addEventListener('click', function (evento) {
        if (evento.target === modalCrearUsuario) {
            cerrarModalCrearUsuarioFn();
        }
    });
}

if (botonAjustes) {
    botonAjustes.addEventListener('click', function (evt) {
        evt.stopPropagation();
        alternarMenuAjustes();
    });
}

if (cerrarSesionAjustes) {
    cerrarSesionAjustes.addEventListener('click', cerrarSesion);
}

if (cambiarCuentaAjustes) {
    cambiarCuentaAjustes.addEventListener('click', cambiarCuenta);
}

if (eliminarCuentaAjustes) {
    eliminarCuentaAjustes.addEventListener('click', eliminarCuenta);
}

if (cambiarContrasenaAjustes) {
    cambiarContrasenaAjustes.addEventListener('click', cambiarContrasena);
}

if (verPerfilesAjustes) {
    verPerfilesAjustes.addEventListener('click', function () {
        ocultarMenuAjustes();
        mostrarPerfiles();
    });
}

document.addEventListener('click', function (evento) {
    if (!evento.target.closest('.ajustes-wrapper')) {
        ocultarMenuAjustes();
    }
});

navItems.forEach(function (item) {
    item.addEventListener('click', function () {
        const tabId = this.getAttribute('data-tab');
        if (tabId) {
            cambiarTab(tabId);
        }
    });
});

if (botonCerrarSesion) {
    botonCerrarSesion.addEventListener('click', mostrarLogin);
}

if (botonAgregarProducto) {
    botonAgregarProducto.addEventListener('click', function () {
        abrirModalProducto(null);
    });
}

if (botonGenerarReporte) {
    botonGenerarReporte.addEventListener('click', actualizarReporte);
}

if (cerrarModalPerfiles) {
    cerrarModalPerfiles.addEventListener('click', function () {
        if (!modalPerfiles) return;
        modalPerfiles.classList.remove('modal-activo');
        modalPerfiles.setAttribute('aria-hidden', 'true');
    });
}

if (cerrarModalProducto) {
    cerrarModalProducto.addEventListener('click', cerrarModalProductoFn);
}

if (formProducto) {
    formProducto.addEventListener('submit', guardarProducto);
}

if (cerrarModalVenta) {
    cerrarModalVenta.addEventListener('click', cerrarModalVentaFn);
}

if (formVenta) {
    formVenta.addEventListener('submit', function (evento) {
        evento.preventDefault();
        const cantidad = parseInt(inputCantidadVenta.value, 10);
        venderProducto(cantidad);
    });
}

document.addEventListener('click', function (evento) {
    const boton = evento.target.closest('[data-accion]');
    if (!boton) {
        return;
    }
    const id = boton.getAttribute('data-id');
    const accion = boton.getAttribute('data-accion');
    const producto = obtenerProductoPorId(id);
    if (!producto) {
        return;
    }
    if (accion === 'editar') {
        abrirModalProducto(producto);
    }
    if (accion === 'eliminar') {
        eliminarProducto(id);
    }
    if (accion === 'vender') {
        abrirModalVenta(producto);
    }
});

if (modalProducto) {
    modalProducto.addEventListener('click', function (evento) {
        if (evento.target === modalProducto) {
            cerrarModalProductoFn();
        }
    });
}

if (modalVenta) {
    modalVenta.addEventListener('click', function (evento) {
        if (evento.target === modalVenta) {
            cerrarModalVentaFn();
        }
    });
}

inicializarProductosBase();
// Inicializar sesión y permisos según parámetros de URL
function inicializarSesion() {
    const role = obtenerParametroUrl('role');
    const user = obtenerParametroUrl('user');
    if (role === 'admin') {
        mostrarAdmin('admin', 'admin');
    } else if (role === 'usuario' && user) {
        const perfil = obtenerUsuarioPorNombre(user);
        if (perfil && perfil.rol === 'usuario') {
            mostrarAdmin(user, 'usuario');
        } else {
            redirigirAlLogin();
        }
    } else {
        redirigirAlLogin();
    }
}

inicializarSesion();

// Inicializar círculos para usuarios existentes (excepto admin)
try {
    const usuariosExistentes = leerUsuarios();
    usuariosExistentes.forEach(function (u) {
        if (u && u.rol === 'usuario') {
            agregarCirculoUsuario(u.usuario);
        }
    });
} catch (e) {
    // ignore
}
