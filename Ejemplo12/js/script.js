const COSTO_BASE = 100;
let historialViajes = [];

document.getElementById("btnCalcular").addEventListener("click", calcularViaje);

function calcularViaje() {
    let nombre = document.getElementById("inputNombre").value.trim();
    let destino = document.getElementById("selectDestino").value.toLowerCase();
    let dias = parseInt(document.getElementById("inputDias").value);
    let fecha = document.getElementById("inputFecha").value;
    let divResultado = document.getElementById("divResultado");

    // Validación de campos vacíos
    if (nombre === "" || destino === "" || isNaN(dias) || fecha === "") {
        divResultado.innerHTML = `<p class="error">Por favor, completa todos los campos.</p>`;
        return;
    }

    let costo = calcularCosto(destino, dias, fecha);
    let resumen = generarResumen(nombre, destino, dias, fecha, costo);

    // Guardar en historial
    historialViajes.push({
        nombre: nombre,
        destino: destino,
        dias: dias,
        fecha: fecha,
        costo: costo
    });

    let historialHTML = generarHistorial();

    divResultado.innerHTML = resumen + historialHTML;
}

function calcularCosto(destino, dias, fecha) {
    let costoTotal = COSTO_BASE * dias;

    if (destino === "playa") {
        costoTotal += 50;
    } else if (destino === "volcan") {
        costoTotal += 30;
    } else {
        costoTotal += 20;
    }

    // Temporada alta: diciembre
    let mes = new Date(fecha).getMonth() + 1;
    if (mes === 12) {
        costoTotal += 100;
    }

    if (dias > 5) {
        costoTotal *= 0.9;
    }

    return costoTotal.toFixed(2);
}

function generarResumen(nombre, destino, dias, fecha, costo) {
    let fechaFormateada = new Date(fecha).toLocaleDateString();

    return `
        <h3>Resumen del Viaje</h3>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Destino:</strong> ${destino}</p>
        <p><strong>Días:</strong> ${dias}</p>
        <p><strong>Fecha:</strong> ${fechaFormateada}</p>
        <p><strong>Total:</strong> Q${costo}</p>
    `;
}

function generarHistorial() {
    let html = `<h3>Historial de Viajes</h3>`;

    for (let i = 0; i < historialViajes.length; i++) {
        html += `
            <p>
                ${i + 1}. ${historialViajes[i].nombre} - 
                ${historialViajes[i].destino} - 
                ${historialViajes[i].dias} días - 
                Q${historialViajes[i].costo}
            </p>
        `;
    }

    return html;
}