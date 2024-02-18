/*
*   Controlador de uso general en las páginas web del sitio privado.
*   Sirve para manejar la plantilla del encabezado y pie del documento.
*/

// Constante para establecer el elemento del contenido principal.
const MAIN = document.querySelector('main');
// Se establece el título de la página web.
document.querySelector('title').textContent = 'FeasVerse Panel Privado';
const MAIN_TITLE = document.getElementById('mainTitle');
MAIN_TITLE.classList.add('text-center', 'py-3');

/*  Función asíncrona para cargar el encabezado y pie del documento.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const loadTemplate = async () => {
    // *Se agrega el encabezado de la página web antes del contenido principal.
    MAIN.insertAdjacentHTML('beforebegin', `
    <header>
    <nav class="navbar fixed-top navbar-expand-lg bg-body-tertiary">
        <div class="container">
            <a class="navbar-brand" href="dashboard.html">
                <img src="../../resources/img/logo.png" alt="CoffeeShop" width="50">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarContent">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="producto.html">Productos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="categoria.html">Categorías</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="administrador.html">Administradores</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Cuenta: <b>${DATA.username}</b></a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="profile.html">Editar perfil</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="#" onclick="logOut()">Cerrar sesión</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</header>
            `);
    // Se agrega el pie de la página web después del contenido principal.
    MAIN.insertAdjacentHTML('afterend', `
                <footer> asasasas
                    <nav class="navbar fixed-bottom bg-body-tertiary">
                        <div class="container">
                            <div>
                                <p><a class="nav-link" href="https://github.com/dacasoft/coffeeshop" target="_blank"><i class="bi bi-github"></i> CoffeeShop</a></p>
                                <p><i class="bi bi-c-square-fill"></i> 2018-2024 Todos los derechos reservados</p>
                            </div>
                            <div>
                                <p><a class="nav-link" href="../public/" target="_blank"><i class="bi bi-cart-fill"></i> Sitio público</a></p>
                                <p><i class="bi bi-envelope-fill"></i> dacasoft@outlook.com</p>
                            </div>
                        </div>
                    </nav>
                </footer>
            `);
}
