import { getGuitarras } from "~/models/guitarras.server"
import {getPosts} from '~/models/blog.server' 
import {useLoaderData} from '@remix-run/react'
import ListadoGuitarras from "~/components/listado-guitarras"
import ListadoPosts from '~/components/listado-posts'
import stylesGuitarras from '~/styles/guitarras.css'
import stylesPosts from '~/styles/blog.css'
import stylesCurso from '~/styles/curso.css'
import { getCurso } from "../models/curso.server"
import Curso from "../components/curso"

export function meta(){
  
}

export async function loader(){
  
  //como queremos traer toda la info, asi lo hariamos, 2 request
    //const guitarras = await getGuitarras()
 //pero getPosts empezaria solo cuando termine getGuitarras, lo que afecta la performance
    //const posts = await getPosts()
  
  //esta es la mejor opcion, ya que empiezan al mismo tiempo mejorando performace
  const [guitarras, posts, curso] = await Promise.all( [getGuitarras(), getPosts(),getCurso()] )

  //devolvemos un objeto con las respuestas, o podriamos crear un objeto dentro y luego devolver ese objeto const = data { guitarras, posts} y en el return devolver data  
  return { 
          guitarras: guitarras.data, 
          posts: posts.data,
          curso: curso.data
        }
}

export function links(){
  return[
    {
      rel: 'stylesheet',
      href: stylesGuitarras
    },
    {
      rel: 'stylesheet',
      href: stylesPosts
    },
    {
      rel: 'stylesheet',
      href: stylesCurso
    }
  ]
}

function Index() {
  //desestructuramos altiro 
  const {guitarras, posts, curso} = useLoaderData()
  console.log(guitarras);
  console.log(posts);

  return (
    <>
        <main className="contenedor">
            <ListadoGuitarras 
              guitarras={guitarras}
            />
        </main>
        <section>
            <Curso 
                curso={curso}
            />
        </section>
        <section className="contenedor">
            <ListadoPosts 
                posts={posts}
            />
        </section>
    </>
  )
}

export default Index
