function enviarDatos() {
    // Obtener el nombre
    const nombre = document.getElementById('nombre').textContent;
    const telefono = document.getElementById('telefono').textContent;
    const correo = document.getElementById('correo').textContent;

    // Obtener el estado de los checkboxes
    const inscrito = document.getElementById('check-inscrito').checked;
    const notificado = document.getElementById('check-notificado').checked;
    const pago = document.getElementById('check-pago').checked;
    const matriculado = document.getElementById('check-matriculado').checked;

    // Generar el estado
    let estado = '';
    if (inscrito) {
        estado = 'Inscrito';
    }
    if (notificado) {
        estado = estado ? 'Notificado' : 'Notificado';
    }
    if (pago) {
        estado = estado ? 'Pago' : 'Pago';
    }
    if (matriculado) {
        estado = estado ? 'Matriculado' : 'Matriculado';
    }
    if (estado === '') {
        estado = 'Sin estado';
    }

    console.log(estado)

    const texto = `
        <div class="container-referidos">
            <div>
                <h2 class="header-card">${nombre}</h2>
                <div class="container-referidos-info">
                <p>${telefono}</p>
                <p>${correo}</p>
                    <div>
                        <h3>Estado:</h3>
                        <p>${estado}</p>
                    </div>
                    <article>
                        <p>Tener en cuenta que la fecha máxima para el pago de la matrícula es: 30/02/2025</p>
                    </article>
                </div>
            </div>
        </div>
    `;
    
    localStorage.setItem('referidoData', texto);
}