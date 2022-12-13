import { Outlet } from '@remix-run/react'
//import {getPosts} from '~/models/blog.server'
import styles from '~/styles/blog.css'
//import ListadoPosts from '~/components/listado-posts'

export function meta(){
  return {
          title: 'Guitar-La | Blog',
          description: 'Guitar-LA, entradas de información para aprender sobre musica'
      }
}

// export async function loader(){
//     const postsApi = await getPosts() //me trae todos los post obtenidos desde la fn en el archivo importado
//     //retornamos un nivel abajo (data) la respuesta del fetch  
//     console.log(postsApi); 
//     return postsApi.data
// }

export function links(){
  return[
    {
      rel:'stylesheet',
      href: styles
    }
  ]
}

function Blog() {

  //const posts = useLoaderData()

  return (
    <main className="contenedor">
          <Outlet />
    </main>
  )
}

export default Blog
