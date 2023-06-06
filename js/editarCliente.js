import { limpiarHTML } from "./utilidades.js";
(function() {

    const alumnos = JSON.parse(localStorage.getItem('alumnos'));
    const formulario =document.querySelector('.formulario')
    const divMensaje = document.querySelector('.mensaje')
    let arregloAlumnoEditado = [];
    let arregloAlumnoNoEditados = [];
    let agregarlocalStorage = [];
    const objtAlumnoEditado={
        nombre:'',
        apellido:'',
        documento:'',
        padre:'',
        telefono:''
    };

    const nombreAlumno =  document.querySelector('#nombre');
    const apellidoAlumno =  document.querySelector('#apellido');
    const padreAlumno =  document.querySelector('#padre');
    const documentoAlumno =  document.querySelector('#documento');
    const telefonoAlumno =  document.querySelector('#telefono');
    const parametrosURL = new URLSearchParams(window.location.search);
    const idAlumnos =parametrosURL.get('id')

    document.addEventListener('DOMContentLoaded', ()=> {

        //Verificar el ID de la URL

        

        
        formulario.addEventListener('submit',leerFormulario)

        if(idAlumnos) {
            obtenerAlumnos(idAlumnos)
            alumnosNoEditados(idAlumnos)
        }
         
    })

    //Filter al arreglo
    function obtenerAlumnos(id) {
       arregloAlumnoEditado= alumnos.filter(alumno =>{
           return alumno.id === id
       })
       editarAlumno(arregloAlumnoEditado) 
    }

    function alumnosNoEditados(id) {
        arregloAlumnoNoEditados = alumnos.filter(alumno => {
            return alumno.id !== id
        })

        // agregarLocalStorage(arregloAlumnoNoEditados)
    }

    //
    function editarAlumno(alumnoEditar) {
        alumnoEditar.forEach(alumno => {
            const {nombre,apellido,documento,padre,telefono,id} = alumno;
            document.querySelector('#nombre').value =nombre        
            document.querySelector('#apellido').value = apellido ;
            document.querySelector('#telefono').value = telefono;
            document.querySelector('#padre').value =padre ;
            document.querySelector('#documento').value = documento;

            nombreAlumno.addEventListener('input',e => {
                objtAlumnoEditado.nombre = e.target.value
            })

            apellidoAlumno.addEventListener('input',e => {
                objtAlumnoEditado.apellido = e.target.value
            })

            telefonoAlumno.addEventListener('input',e => {
                objtAlumnoEditado.telefono = e.target.value
            })

            documentoAlumno.addEventListener('input',e => {
                objtAlumnoEditado.documento = e.target.value
            })

            padreAlumno.addEventListener('input',e => {
                objtAlumnoEditado.padre = e.target.value
            })

            objtAlumnoEditado.id = id
            objtAlumnoEditado.nombre=nombre;
            objtAlumnoEditado.apellido=apellido;
            objtAlumnoEditado.documento=documento;
            objtAlumnoEditado.padre=padre;
            objtAlumnoEditado.telefono=telefono;
            
        })
        // alumnos.filter(alumno => alumno.id === idAlumnos)
        // .forEach(alumno=> {
        //     const {nombre,apellido,padre,telefono,documento} = objtAlumnoEditado
        //     alumno.nombre =nombre
        //     alumno.apellido = apellido
        //     alumno.padre = padre
        //     alumno.telefono = telefono
        //     alumno.documento = documento
        // })
    
    }
   

        console.log(alumnos)

    function leerFormulario(e) {
        e.preventDefault()

        const {nombre,apellido,telefono,padre,documento} = objtAlumnoEditado
        
        if(telefono === '' || nombre === '' || padre === '' || apellido === '' || documento === '' ) {
            imprimirMensaje("Todos los campos son obligatorios",true)
            return
        }
        imprimirMensaje("Guardado Correctamnete")

        formulario.reset()
        agregarlocalStorage = [...agregarlocalStorage,objtAlumnoEditado]

        

        arregloAlumnoNoEditados.forEach(alumno=> {
            agregarlocalStorage = [...agregarlocalStorage,alumno]
        })

        localStorage.setItem('alumnos',JSON.stringify(agregarlocalStorage))

        // setTimeout(()=>{
        //     window.location.href="/";
        // },2000)

        
        console.log(agregarlocalStorage)
        console.log(arregloAlumnoNoEditados)
        
    }

    

    function imprimirMensaje(mensaje,error=false) {
        limpiarHTML(divMensaje)
        const contenidoMensaje = document.createElement('P');
        contenidoMensaje.textContent=mensaje
        if(error) {
            contenidoMensaje.classList.add('error')
            divMensaje.appendChild(contenidoMensaje)         
        } else {
            contenidoMensaje.classList.add('correcto')
            divMensaje.appendChild(contenidoMensaje)
        }
    
    
        setTimeout(() => {
            contenidoMensaje.remove()

        }, 3500);
    
    }


   

})();