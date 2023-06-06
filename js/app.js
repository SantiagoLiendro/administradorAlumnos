
// Agregando al HTML lo de localstorage
import { limpiarHTML } from "./utilidades.js";

(function () {
    let alumnosLocalStorage = [];
    const tablaBody = document.querySelector('.tabla-body')
    const headingTabla = document.querySelector('.heading-tabla')
    const listaAlumnos = JSON.parse(localStorage.getItem('alumnos'))

    document.addEventListener('DOMContentLoaded', () => {
        
        listarAlumnos(listaAlumnos)
    })
    console.log(listaAlumnos.length)


    function listarAlumnos(alumnos) {
        limpiarHTML(tablaBody)


        alumnos.forEach(alumno => {

            const { nombre, apellido, documento, padre, telefono, id } = alumno;

            const contenedorTabla = document.createElement('TR');

            const nombreTabla = document.createElement('TD');
            const nombreParrafo = document.createElement('P');

            const apellidoTabla = document.createElement('TD');
            const apellidoParrafo = document.createElement('P');

            const documentoTabla = document.createElement('TD');
            const documentoParrafo = document.createElement('P')

            const padreTabla = document.createElement('TD');
            const padreParrafo = document.createElement('P')

            const telefonoTabla = document.createElement('TD');
            const telefonoParrafo = document.createElement('P')

            const botonesTabla = document.createElement('TD');
            const botonEliminar = document.createElement('BUTTON')
            const botonEditar = document.createElement('A')

            botonEditar.href = `editar-cliente.html?id=${id}`;
            botonEliminar.value = id

            botonEliminar.addEventListener('click', e => {
                const confirmar = window.confirm("¿Desea eliminar del registro?")
                if (confirmar) {
                    elimnarDeLocalStorage(e.target.value)
                }


            })


            botonesTabla.classList.add('flex');
            botonEliminar.classList.add('boton');
            botonEditar.classList.add('boton');

            botonEditar.textContent = "Editar";
            botonEliminar.textContent = "Eliminar"

            contenedorTabla.classList.add('tabla-body_contenido')

            if(alumnos.length > 0) {
                headingTabla.textContent = "Lista de alumnos";
            }
            
            console.log(alumnos.length)
            nombreParrafo.textContent = nombre
            nombreTabla.appendChild(nombreParrafo)

            apellidoParrafo.textContent = apellido;
            apellidoTabla.appendChild(apellidoParrafo);

            documentoParrafo.textContent = documento;
            documentoTabla.appendChild(documentoParrafo);

            padreParrafo.textContent = padre;
            padreTabla.appendChild(padreParrafo);

            telefonoParrafo.textContent = telefono
            telefonoTabla.appendChild(telefonoParrafo);

            botonesTabla.appendChild(botonEliminar)
            botonesTabla.appendChild(botonEditar)


            contenedorTabla.appendChild(nombreTabla)
            contenedorTabla.appendChild(apellidoTabla)
            contenedorTabla.appendChild(documentoTabla)
            contenedorTabla.appendChild(padreTabla)
            contenedorTabla.appendChild(telefonoTabla)
            contenedorTabla.appendChild(botonesTabla)

            tablaBody.appendChild(contenedorTabla)



        });


    }


    function elimnarDeLocalStorage(id) {

        alumnosLocalStorage = listaAlumnos.filter(alumnos => alumnos.id !== id)
        localStorage.setItem('alumnos', JSON.stringify(alumnosLocalStorage))
        listarAlumnos(alumnosLocalStorage)

        console.log(alumnosLocalStorage)
    }



})()


