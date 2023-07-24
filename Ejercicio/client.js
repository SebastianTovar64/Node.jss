function generarTablaClientes() {
    const tbody = document.getElementById("tbody-clientes");

    fetch("http://localhost:3030/api/clientes") 
        .then((response) => response.json())
        .then((clientes) => {
        clientes.forEach(function (cliente) {
            const fila = tbody.insertRow();
            const celdaId = fila.insertCell();
            const celdaNombre = fila.insertCell();
            const celdaApellido = fila.insertCell();
            const celdaValorNeto = fila.insertCell();
            const celdaValorFinal = fila.insertCell();
            const celdaEmpresa = fila.insertCell();
          //--- Se declaran los valores que se insertan en las columnas ---//
            celdaId.textContent = cliente.id;
            celdaNombre.textContent = cliente.nombre;
            celdaApellido.textContent = cliente.apellido;
            celdaValorNeto.textContent = cliente.valorNeto;
            celdaValorFinal.textContent = cliente.valorFinal;
            celdaEmpresa.textContent = cliente.constructora;
        });
        });
    }

    generarTablaClientes();
