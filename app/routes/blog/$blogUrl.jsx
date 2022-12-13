import { useLoaderData, Link } from "@remix-run/react"
import { getPost } from "~/models/blog.server"
import { formatearFecha } from "~/utils/helper";
import styles from '~/styles/blog.css'

export function meta({data}){
    if(!data){
      return{
          title:'Entrada no encontrada',
          description: 'Guitar-La | Venta de guitarras, entrada no encontrada'
      }
    }
    //si viene con algo el data, es decir el loader retorno algo, hace esto de abajo
    return {
        title: `Guitar-LA | ${data.data[0].attributes.titulo}`,
        description: 'Guitar-La | Venta de guitarras, aprende sobre musica'
    }
}

export async function loader( {params} ){
    
    const {blogUrl} = params
    console.log(blogUrl);
    const post = await getPost(blogUrl)
    return post
}
export function links(){
    return [
        {
            rel:'stylesheet',
            href: styles
        }
    ]
}
function Post() {

    const post = useLoaderData()
    const {titulo, contenido, imagen, publishedAt} = post.data[0].attributes
    const fechaFormateada = formatearFecha(publishedAt)

  return (
    <article className="post mt-3">
            <img src={imagen.data.attributes.url} alt={`Imagen post ${titulo}`}/>
            <div className="contenido">
                <h3>{titulo}</h3>
                <p className="fecha">{fechaFormateada}</p>
                <p className="texto">{contenido}</p>
                <Link className="blog-back" to={`/blog`}>◀️Volver al Blog</Link>
            </div>    
    </article>
  )
}

export default Post
