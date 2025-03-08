document.getElementById('verificar-referido').addEventListener('change', function () {
    var codigoReferido = document.getElementById('code');

    if (this.value === 'Si') {
        codigoReferido.hidden = false;
    } else {
        codigoReferido.hidden = true;
        codigoReferido.value = '';
    }
});

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('success')) {
    // Muestra el mensaje de éxito con SweetAlert
    Swal.fire({
        icon: 'success',
        title: 'Formulario Enviado Correctamente',
        text: '¡Gracias por tu envío!',
        timer: 3000,
        showConfirmButton: false,
        willClose: () => { window.location.href = '../index.html' }
    });
}