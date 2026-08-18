const formLogin = document.getElementById('formLogin');
const usuarioLogin = document.getElementById('usuarioLogin');
const claveLogin = document.getElementById('claveLogin');
const mensajeLogin = document.getElementById('mensajeLogin');
const abrirRegistro = document.getElementById('abrirRegistro');
const modalRegistro = document.getElementById('modalRegistro');
const cerrarModalRegistro = document.getElementById('cerrarModalRegistro');
const registroPaso1 = document.getElementById('registroPaso1');
const registroPaso2 = document.getElementById('registroPaso2');
const siguientePaso = document.getElementById('siguientePaso');
const regresarPaso = document.getElementById('regresarPaso');
const cancelarPaso1 = document.getElementById('cancelarPaso1');
const formRegistro = document.getElementById('formRegistro');
const nombreNuevo = document.getElementById('nombreNuevo');
const apellidosNuevo = document.getElementById('apellidosNuevo');
const celularNuevo = document.getElementById('celularNuevo');
const direccionNuevo = document.getElementById('direccionNuevo');
const usuarioNuevo = document.getElementById('usuarioNuevo');
const claveNueva = document.getElementById('claveNueva');
const confirmarClave = document.getElementById('confirmarClave');
const adminClaveCrear = document.getElementById('adminClaveCrear');

function mostrarMensaje(texto) {
    mensajeLogin.textContent = texto;
}

function abrirModalRegistroFn() {
    if (!modalRegistro) return;
    modalRegistro.classList.add('modal-activo');
    modalRegistro.setAttribute('aria-hidden', 'false');
    if (registroPaso1) registroPaso1.classList.remove('registro-paso-oculto');
    if (registroPaso2) registroPaso2.classList.add('registro-paso-oculto');
}

function cerrarModalRegistroFn() {
    if (!modalRegistro) return;
    modalRegistro.classList.remove('modal-activo');
    modalRegistro.setAttribute('aria-hidden', 'true');
}

if (abrirRegistro) {
    abrirRegistro.addEventListener('click', abrirModalRegistroFn);
}

if (cerrarModalRegistro) {
    cerrarModalRegistro.addEventListener('click', cerrarModalRegistroFn);
}

if (cancelarPaso1) {
    cancelarPaso1.addEventListener('click', function () {
        cerrarModalRegistroFn();
    });
}

if (siguientePaso) {
    siguientePaso.addEventListener('click', function () {
        if (!nombreNuevo.value.trim() || !apellidosNuevo.value.trim()) {
            alert('Completa nombre y apellidos.');
            return;
        }
        registroPaso1.classList.add('registro-paso-oculto');
        registroPaso2.classList.remove('registro-paso-oculto');
    });
}

if (regresarPaso) {
    regresarPaso.addEventListener('click', function () {
        registroPaso2.classList.add('registro-paso-oculto');
        registroPaso1.classList.remove('registro-paso-oculto');
    });
}

if (formRegistro) {
    formRegistro.addEventListener('submit', function (evento) {
        evento.preventDefault();
        if (claveNueva.value !== confirmarClave.value) {
            alert('Las contraseñas no coinciden.');
            return;
        }
        const adminVal = adminClaveCrear.value;
        if (!validarCredenciales('admin', adminVal)) {
            alert('Contraseña de administrador incorrecta.');
            return;
        }
        const resultado = registrarUsuario(usuarioNuevo.value.trim(), claveNueva.value, {
            nombre: nombreNuevo.value.trim(),
            apellidos: apellidosNuevo.value.trim(),
            celular: celularNuevo.value.trim(),
            direccion: direccionNuevo.value.trim(),
            avatar: ''
        });
        if (!resultado.ok) {
            alert(resultado.errores.join('\n'));
            return;
        }
        alert('Usuario creado exitosamente.');
        cerrarModalRegistroFn();
        formRegistro.reset();
        registroPaso1.classList.remove('registro-paso-oculto');
        registroPaso2.classList.add('registro-paso-oculto');
    });
}

if (formLogin) {
    formLogin.addEventListener('submit', function (evento) {
        evento.preventDefault();
        const usuario = usuarioLogin.value.trim();
        const clave = claveLogin.value;
        if (validarCredenciales(usuario, clave)) {
            if (usuario.toLowerCase() === 'admin') {
                window.location.href = 'index.html?role=admin';
            } else {
                window.location.href = 'index.html?role=usuario&user=' + encodeURIComponent(usuario);
            }
        } else {
            mostrarMensaje('Usuario o contraseña incorrectos.');
        }
    });
}
