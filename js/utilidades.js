// Utilidades
function limpiarHTML (selector) {
    while(selector.firstChild) {
        selector.removeChild(selector.firstChild)
    }
}

function generarId () { 
    return Math.random().toString(30).substring(2);           
}

export {limpiarHTML}
export {generarId}

