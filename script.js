// script.js

// 1. Inicializa EmailJS con tu Public Key
(function () {
    emailjs.init("lqhKzB-Qk9b-BBIXh"); // reemplaza con tu clave pública de EmailJS
})();

// 2. Referencias al formulario y al botón
const form = document.getElementById('reporteForm');
const btnEnviar = form.querySelector('button[type="submit"]');

// 3. Listas de campos por tipo (deben coincidir con los id/name del HTML)
const camposTexto = ['fecha', 'equipo', 'obra', 'consumos_repuestos', 'otros_filtros'];

const camposCheckbox = [
    'consumos_aceite_moto',
    'consumos_aceite_transmision',
    'consumos_grasa',
    'consumos_aceite_hidraulico',
    'consumos_conbustible',
    'filtros_aceite',
    'filtros_combustible',
    'filtros_separador',
    'filtros_aire_interno',
    'filtros_aire_externo',
    'filtros_aire_cabina',
    'filtros_hidraulico'
];

const camposRadio = [
    'actividad_documento',
    'actividad_cinturon',
    'actividad_tablero',
    'actividad_espejos',
    'actividad_luces',
    'actividad_frenos',
    'actividad_alarma',
    'actividad_bocina',
    'actividad_equipo_carretera',
    'actividad_llantas',
    'actividad_orugas',
    'actividad_motor',
    'actividad_tension',
    'actividad_bateria',
    'actividad_tanques',
    'actividad_fugas',
    'actividad_refigerante',
    'actividad_bomba_hidraulica',
    'actividad_eje',
    'actividad_carpado',
    'actividad_rodillo'
];

// 4. Arma el objeto de parámetros que se enviará a EmailJS
function armarParametros() {
    const params = {};

    camposTexto.forEach(function (nombre) {
        const input = form.querySelector('#' + nombre);
        params[nombre] = input.value.trim() !== '' ? input.value : '-';
    });

    camposCheckbox.forEach(function (nombre) {
        const input = form.querySelector('#' + nombre);
        params[nombre] = input.checked ? 'Sí' : 'No';
    });

    camposRadio.forEach(function (nombre) {
        const seleccionado = form.querySelector('input[name="' + nombre + '"]:checked');
        params[nombre] = seleccionado ? seleccionado.value : '-';
    });

    return params;
}

// 5. Manejo del envío
form.addEventListener('submit', function (e) {
    e.preventDefault(); // evita que la página se recargue

    btnEnviar.disabled = true;
    btnEnviar.textContent = 'Enviando...';

    const templateParams = armarParametros();

    emailjs.send('service_w75ffai', 'template_bz4b1bs', templateParams)
        .then(function () {
            alert('¡Reporte enviado con éxito!');
            form.reset(); // limpia todos los campos a su estado por defecto
        })
        .catch(function (error) {
            alert('Hubo un error al enviar el reporte. Intenta de nuevo.');
            console.error('Error EmailJS:', error);
        })
        .finally(function () {
            btnEnviar.disabled = false;
            btnEnviar.textContent = 'Enviar';
        });
});