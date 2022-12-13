//desde aqui muestro de a uno todos los post en listado
import { Link } from "react-router-dom";
import { formatearFecha } from "~/utils/helper";

function Post({post}) {
    console.log(post);
    const {titulo, contenido, imagen, url, publishedAt } = post
    const fechaFormateada = formatearFecha(publishedAt)

  return (
        <article className="post">
                <img src={imagen.data.attributes.formats.small.url} alt={`Imagen post ${titulo}`}/>
                <div className="contenido">
                    <h3>{titulo}</h3>
                    <p className="fecha">{fechaFormateada}</p>
                    <p className="resumen">{contenido}</p>
                    <Link className="enlace" to={`/blog/${url}`}>Leer Post</Link>
                </div>
        </article>
  )
}

export default Post