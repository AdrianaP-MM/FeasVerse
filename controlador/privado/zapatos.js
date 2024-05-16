// Variables globales
const NOMBREC_INPUT = document.getElementById('nombreColor');
const MODAL_TITLE = document.getElementById('modalTitle');
const UPDATE_FORM = document.getElementById('updateForm');
const ADD_FORM = document.getElementById('addZapato');
const MODAL_TITLE_TALLA = document.getElementById('modalTitleT');
const MODAL_TITLE_DETALLE = document.getElementById('modalTitleD');

const DATA_MODAL = new bootstrap.Modal('#dataModal');
const DATA_TALLAS_MODAL = new bootstrap.Modal('#dataModalT');
const DATA_DETALLES_MODAL = new bootstrap.Modal('#dataModalD');
const TALLAS_DETALLES_MODAL = new bootstrap.Modal('#dataModalTallas');
const DESCRIPCION_INPUT = document.getElementById('descripcionInput');
const FORMADD = document.getElementById('AddTallasF')

const TALLA_INPUT = document.getElementById('idTalla');
const COLOR_INPUT = document.getElementById('Color');
const CANTIDAD_INPUT = document.getElementById('cantidad');
const IMG_INPUT = document.getElementById('selectedImageF');

const BOTON_ACTUALIZAR = document.getElementById('actualizarBtn');
const BOTON_ACTUALIZAR2 = document.getElementById('actualizarBtn2');
const BOTON_ACTUALIZAR3 = document.getElementById('actualizarBtn3');
const CARDZAPATO = document.getElementById('slider');
const BOTON_ADD_COLOR = document.getElementById('btnAddColor');
const ADD_COLOR = document.getElementById('AddColor');
const PASTILLA_COLOR = document.getElementById('contenedorFilaColores');
const ID_COLOR = document.getElementById('idColor');

document.querySelector('title').textContent = 'Feasverse - Zapatos';

const COLORES_DIV = document.getElementById('colores');
const AGREGAR_DIV = document.getElementById('agregar');
const PRINCIPAL = document.getElementById('container');
const NOMBRE_INPUT = document.getElementById('nombreColorInput');


const ZAPATOS_API = 'services/privada/zapatos.php';

document.addEventListener('DOMContentLoaded', async () => {
    // Cargar plantilla
    await loadTemplate();
    // Establecer propiedades iniciales
    NOMBREC_INPUT.readOnly = true;
    document.getElementById('registrados-tab').click();
});

const fillTableColores = async (form = null) => {
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(ZAPATOS_API, 'readAllColores');
    console.log(DATA); 
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        PASTILLA_COLOR.innerHTML ="";
        // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            PASTILLA_COLOR.innerHTML += `
            <div class="pastilla" onclick="openDetailsColores(${row.id_color}, '${row.nombre_color}')">
            <h4>${row.nombre_color}</h4>
        </div>
            `;
        });
        if (DATA.dataset == 0) {
            await sweetAlert(1, DATA.message, true);
        }
    } else {
        sweetAlert(2, DATA.error, false);
    }
}

const addColores = async() => {
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(ADD_COLOR);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(ZAPATOS_API, 'addColores', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Llama a la función 'sweetAlert' con ciertos parámetros.
        await sweetAlert(1, 'Se ha guardado correctamente', true);
        // Se carga nuevamente la tabla para visualizar los cambios.
        // Limpia los valores de los elementos de entrada y establece una imagen de marcador de posición.
        NOMBRE_INPUT.value = ' ';
        fillTableColores();
    } else {
        await sweetAlert(2, DATA.error, false);
    }
}

const addZapato = async() => {
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(ADD_FORM);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(ZAPATOS_API, 'createRow', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Llama a la función 'sweetAlert' con ciertos parámetros.
        await sweetAlert(1, 'Se ha guardado correctamente', true);
        // Se carga nuevamente la tabla para visualizar los cambios.
        // Limpia los valores de los elementos de entrada y establece una imagen de marcador de posición.
    } else {
        await sweetAlert(2, DATA.error, false);
    }
}


const fillTable = async (form = null) => {
    slider.innerHTML = '';
    const DATA = await fetchData(ZAPATOS_API, 'readAll');
    if (DATA.status) {
        DATA.dataset.forEach(row => { 
            slider.innerHTML += `
            <div class="slide" onclick="openDetalles(${row.id_zapato})">
                <img src="${SERVER_URL}helpers/images/zapatos/${row.foto_detalle_zapato}">
                <span>${row.nombre_zapato}</span>
            </div>
            `;
        });
        slides = document.getElementsByClassName('slide').length;
        slidesCount = slides - slidesPerPage;
        setParams(containerWidth);
    } else {
        sweetAlert(2, DATA.error, false);
    }
};



let id_color = null;
let nombre_color = null;


// Función para abrir los detalles de un trabajador.
const openDetailsColores = async (id_color, nombre_color) => {
    // Se define un objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idColor', id_color);
    FORM.append('nombre_color', nombre_color);
    console.log(id_color);
    console.log(nombre_color);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(ZAPATOS_API, 'readOneColores', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        DATA_TALLAS_MODAL.show();
        // Se prepara el formulario.
        UPDATE_FORM.reset();

        const ROW = DATA.dataset;
        NOMBRES_INPUT.value = ROW.nombre_trabajador;
        APELLIDOS_INPUT.value = ROW.apellido_trabajador;
        DUI_INPUT.value = ROW.dui_trabajador;
        TEL_INPUT.value = ROW.telefono_trabajador;
        CORREO_INPUT.value = ROW.correo_trabajador;
        FECHAN_INPUT.value = ROW.fecha_de_nacimiento;
        FECHAR_INPUT.value = ROW.fecha_de_registro;
        fillSelect(ZAPATOS_API, 'readMarcas', 'marcaInput');
        ESTADO_INPUT.value = findNumberValue(ROW.estado_trabajador);

        // Deshabilita la edición de los campos de entrada.
        NOMBRES_INPUT.readOnly = true;
        APELLIDOS_INPUT.readOnly = true;
        DUI_INPUT.readOnly = true;
        TEL_INPUT.readOnly = true;
        CORREO_INPUT.readOnly = true;
        FECHAN_INPUT.readOnly = true;
        FECHAR_INPUT.readOnly = true;
        ESTADO_INPUT.disabled = true;
        NIVEL_INPUT.disabled = true;
        // Actualiza el título del modal con el ID del trabajador.
        MODAL_TITLE.textContent = 'Detalles Trabajador #' + id;
    } else {
        sweetAlert(2, DATA.error, false);
    }
}


// Funciones de interacción
function showZapatos() {
    fillTable();
    COLORES_DIV.classList.add('d-none');
    AGREGAR_DIV.classList.add('d-none');
    PRINCIPAL.classList.remove('d-none');
}

function showColores(button) {
    fillTableColores();
    // Mostrar y ocultar divs correspondientes
    COLORES_DIV.classList.remove('d-none');
    AGREGAR_DIV.classList.add('d-none');
    PRINCIPAL.classList.add('d-none');

    // Restablecer colores de botones
    document.querySelectorAll('.boton-cambiar-color').forEach(boton => {
        boton.style.backgroundColor = '#146A93';
    });

    button.style.backgroundColor = '#1A89BD';
    button.style.color = 'white';
}

function showPaso2() {
    DATA_TALLAS_MODAL.show();
}

function showAgregar(button) {
    fillSelect(ZAPATOS_API, 'readMarcas', 'marcaInput');
    // Mostrar y ocultar divs correspondientes
    AGREGAR_DIV.classList.remove('d-none');
    PRINCIPAL.classList.add('d-none');
    COLORES_DIV.classList.add('d-none');
    AGREGAR_PASO_DOS_DIV.classList.add('d-none');

    // Restablecer colores de botones
    document.querySelectorAll('.boton-cambiar-color').forEach(boton => {
        boton.style.backgroundColor = '#146A93';
    });

    button.style.backgroundColor = '#1A89BD';
    button.style.color = 'white';
}

// Funciones relacionadas con los modales
DATA_MODAL._element.addEventListener('hidden.bs.modal', function () {
    BOTON_ACTUALIZAR.textContent = "Actualizar";
});

DATA_DETALLES_MODAL._element.addEventListener('hidden.bs.modal', function () {
    BOTON_ACTUALIZAR3.textContent = "Actualizar";
});

DATA_TALLAS_MODAL._element.addEventListener('hidden.bs.modal', function () {
    BOTON_ACTUALIZAR2.textContent = "Actualizar";
});

// Funciones para abrir modales
/*
async function openDetails() {
    event.preventDefault(); 
    DATA_MODAL.show();
    UPDATE_FORM.reset();
    NOMBREC_INPUT.value =
    MODAL_TITLE.textContent = 'Detalles Color: Rojo';
}*/

async function openTallas() {
    event.preventDefault(); 
    DATA_TALLAS_MODAL.show();
    UPDATE_FORM.reset();
    MODAL_TITLE_TALLA.textContent = 'Tallas y Stock del Producto';
}

const openDetalles = async (id) => {
    DATA_DETALLES_MODAL.show();
    MODAL_TITLE_DETALLE.textContent = 'Detalle del zapato';
}

async function addDetalles() {
    event.preventDefault(); 
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(ADD_FORM);
    FORM.append('descripcionInput', DESCRIPCION_INPUT.value);

    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(ZAPATOS_API, 'createRow', FORM);

    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra un mensaje de éxito.
        await sweetAlert(1, 'Se ha guardado correctamente', true);
        // Se carga nuevamente la tabla para visualizar los cambios.
        TALLAS_DETALLES_MODAL.show();
        // Resetear el formulario
        document.getElementById('addZapato').reset();
        DATA_TALLAS_MODAL
    } else {
        await sweetAlert(2, DATA.error, false);
    }
}

async function createRowPT2() {
    event.preventDefault(); 
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(FORMADD);

    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(ZAPATOS_API, 'createRowPT2', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra un mensaje de éxito.
        await sweetAlert(1, 'Se ha guardado correctamente', true);
        // Se carga nuevamente la tabla para visualizar los cambios.
        TALLAS_DETALLES_MODAL.hide();
        // Resetear el formulario
        TALLA_INPUT.value = ' ';
        COLOR_INPUT.value = ' ';
        IMG_INPUT.src = 'https://mdbootstrap.com/img/Photos/Others/placeholder.jpg';
    } else {
        await sweetAlert(2, DATA.error, false);
    }
}


// Función para mostrar imágenes seleccionadas
function displaySelectedImage(event, elementId) {
    const selectedImage = document.getElementById(elementId);
    const fileInput = event.target;

    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            selectedImage.src = e.target.result;
        };

        reader.readAsDataURL(fileInput.files[0]);
    }
}

// Funciones para actualizar y cancelar en modales
async function botonActualizar() {
    const textoBoton = BOTON_ACTUALIZAR.textContent.trim();

    if (textoBoton === 'Actualizar') {
        NOMBREC_INPUT.readOnly = false;
        BOTON_ACTUALIZAR.textContent = "Guardar";
    } else if (textoBoton === 'Guardar') {
        await sweetAlert(1, 'Se ha actualizado correctamente', true);
        DATA_MODAL.hide();
    }
}

async function botonCancelar() {
    const textoBoton = BOTON_ACTUALIZAR.textContent.trim();

    if (textoBoton === 'Actualizar') {
        const RESPONSE = await confirmAction('¿Seguro que quieres regresar?', 'Se cerrará la ventana emergente');
        if (RESPONSE.isConfirmed) {
            DATA_MODAL.hide();
        }
    } else if (textoBoton === 'Guardar') {
        const RESPONSE = await confirmAction('¿Seguro que quieres regresar?', 'Si has modificado, no se guardará');
        if (RESPONSE.isConfirmed) {
            DATA_MODAL.hide();
        }
    }
}

// Funciones para actualizar y cancelar en otros modales (similar a las anteriores)
async function botonActualizar2() {
    const textoBoton = BOTON_ACTUALIZAR2.textContent.trim();

    if (textoBoton === 'Actualizar') {
        BOTON_ACTUALIZAR2.textContent = "Guardar";
    } else if (textoBoton === 'Guardar') {
        await sweetAlert(1, 'Se ha actualizado correctamente', true);
        DATA_TALLAS_MODAL.hide();
        DATA_DETALLES_MODAL.show();
    }
}

async function botonCancelar2() {
    const textoBoton = BOTON_ACTUALIZAR2.textContent.trim();

    if (textoBoton === 'Actualizar') {
        const RESPONSE = await confirmAction('¿Seguro que quieres regresar?', 'Se cerrará la ventana emergente');
        if (RESPONSE.isConfirmed) {
            DATA_TALLAS_MODAL.hide();
            DATA_DETALLES_MODAL.show();
        }
    } else if (textoBoton === 'Guardar') {
        const RESPONSE = await confirmAction('¿Seguro que quieres regresar?', 'Si has modificado, no se guardará');
        if (RESPONSE.isConfirmed) {
            DATA_TALLAS_MODAL.hide();
            DATA_DETALLES_MODAL.show();
        }
    }
}

async function botonActualizar3() {
    const textoBoton = BOTON_ACTUALIZAR3.textContent.trim();

    if (textoBoton === 'Actualizar') {
        BOTON_ACTUALIZAR3.textContent = "Guardar";
    } else if (textoBoton === 'Guardar') {
        await sweetAlert(1, 'Se ha actualizado correctamente', true);
        DATA_DETALLES_MODAL.hide();
    }
}

async function botonCancelar3() {
    const textoBoton = BOTON_ACTUALIZAR3.textContent.trim();

    if (textoBoton === 'Actualizar') {
        const RESPONSE = await confirmAction('¿Seguro que quieres regresar?', 'Se cerrará la ventana emergente');
        if (RESPONSE.isConfirmed) {
            DATA_DETALLES_MODAL.hide();
        }
    } else if (textoBoton === 'Guardar') {
        const RESPONSE = await confirmAction('¿Seguro que quieres regresar?', 'Si has modificado, no se guardará');
        if (RESPONSE.isConfirmed) {
            DATA_DETALLES_MODAL.hide();
        }
    }
}

var container = document.getElementById('container');
var slider = document.getElementById('slider');
var slides = document.getElementsByClassName('slide').length;
var buttons = document.getElementsByClassName('btn');

var currentPosition = 0;
var slidesPerPage = 0;
var slidesCount = slides - slidesPerPage;
var containerWidth = container.offsetWidth;

window.addEventListener("resize", checkWidth);

function checkWidth() {
    containerWidth = container.offsetWidth;
    setParams(containerWidth);
}

function setParams(w) {
    if (w < 551) {
        slidesPerPage = 1;
    } else if (w < 901) {
        slidesPerPage = 2;
    } else if (w < 1101) {
        slidesPerPage = 3;
    } else {
        slidesPerPage = 4;
    }
    slidesCount = slides - slidesPerPage;
    currentPosition = Math.min(currentPosition, slidesCount);
    currentPosition = Math.max(currentPosition, 0);
    slider.style.transform = 'translateX(-' + currentPosition * (100 / slidesPerPage) + '%)';
    updateButtons();
}

function updateButtons() {
    buttons[0].classList.toggle('inactive', currentPosition <= 0);
    buttons[1].classList.toggle('inactive', currentPosition >= slidesCount - slidesPerPage);
}

setParams();

function slideRight() {
    currentPosition = Math.min(currentPosition + 1, slidesCount - slidesPerPage);
    slider.style.transform = 'translateX(-' + currentPosition * (100 / slidesPerPage) + '%)';
    updateButtons();
}

function slideLeft() {
    currentPosition = Math.max(currentPosition - 1, 0);
    slider.style.transform = 'translateX(-' + currentPosition * (100 / slidesPerPage) + '%)';
    updateButtons();
}