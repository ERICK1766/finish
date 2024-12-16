function mostrarExito(event) {
    event.preventDefault(); // Evita el envío normal del formulario

    // Mostrar el modal de éxito
    const modal = document.getElementById('modal-exito');
    modal.style.display = 'flex';

    // Redirigir a la página de inicio después de 3 segundos
    setTimeout(() => {
        window.location.href = '/home';
    }, 3000);
}

function toggleVisibility() {
    const input = document.getElementById('codigoTarjeta');
    if (input.type === 'password') {
        input.type = 'text';
    } else {
        input.type = 'password';
    }
}
