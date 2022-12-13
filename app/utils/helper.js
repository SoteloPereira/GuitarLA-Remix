export const formatearFecha = fecha => {
    //recibe la fecha cuando se llama la fn
    const fechaNueva = new Date(fecha)
    //declaramos en el objeto el formato para pasarlo como parametroa al metodo 
    const opciones ={
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    } 
    //retornamos la fecha actual y le damos el formato segun objeto
    return fechaNueva.toLocaleDateString('es-ES', opciones)

} 