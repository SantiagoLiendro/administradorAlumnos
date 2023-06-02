import { limpiarHTML,generarId} from "./utilidades.js";

(function() {
    let contenedorObjeto = JSON.parse(localStorage.getItem('alumnos')) ?? [];

    const divMensaje = document.querySelector('.mensaje')
    const formulario = document.querySelector('.formulario');
    
    const objFormulario ={
        nombre:'',
        apellido:'',
        documento:'',
        padre:'',
        telefono:'',
    }


    document.addEventListener('DOMContentLoaded', eventListeners)
    function eventListeners ()  {
        formulario.addEventListener('submit',leerFormulario)    
    }

    function resetearFormulario() {
        objFormulario.nombre='';
        objFormulario.apellido='';
        objFormulario.documento='';
        objFormulario.padre='';
        objFormulario.telefono='';
    }
    
    function leerFormulario(e) {
        e.preventDefault()     
        resetearFormulario()
        objFormulario.nombre = document.querySelector('#nombre').value ;
        objFormulario.apellido = document.querySelector('#apellido').value ;
        objFormulario.telefono = document.querySelector('#telefono').value ;
        objFormulario.padre = document.querySelector('#padre').value ;
        objFormulario.documento = document.querySelector('#documento').value ;
        const {telefono,nombre,apellido,padre,documento} = objFormulario
        
        if(telefono === '' && nombre === '' || padre === '' || apellido === '' || documento === '' ) {
            imprimirMensaje("Todos Los campos son obligatorios",true)
            return
        }
        imprimirMensaje("Agregado Correctamente")
                
        objFormulario.id = generarId()

        formulario.reset()
        setTimeout(() => {
            window.location.href="/"
        }, 2000);

        contenedorObjeto = [...contenedorObjeto,objFormulario]

        console.log(objFormulario)
        localStorage.setItem('alumnos',JSON.stringify(contenedorObjeto))
        
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

