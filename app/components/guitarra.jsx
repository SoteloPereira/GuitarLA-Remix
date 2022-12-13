//con este componente muestro de a una todas las guitarras
import {Link} from '@remix-run/react'

function Guitarra( {guitarra} ) {

    const {nombre, precio, descripcion,imagen, url} = guitarra
    //console.log(guitarra);
    //console.log(imagen.data.attributes.formats.medium.url); obtener la ruta de la url de la imagen de cloudinary
    const rutaImagenM = imagen.data.attributes.formats.medium.url
  return (
    <div className="guitarra">
        <img src={rutaImagenM} alt={`Imagen guitarra ${nombre}`} />
            <div className="contenido">
                <h3 className="titulo">{nombre}</h3>
                <p className="descripcion">{descripcion}</p>
                <p className="precio">${precio}</p>
                <Link className='enlace' to={`/guitarras/${url}`}>Ver producto</Link>
            </div>
    </div>
  )
}

export default Guitarra
