import { useLoaderData} from "@remix-run/react"
//import Guitarra from "~/components/guitarra" lo llamamos en ListadoGuitarra
import { getGuitarras } from "~/models/guitarras.server"
//import stylesGuitarras from "~/styles/guitarras.css"
import ListadoGuitarras from '~/components/listado-guitarras'

export function meta(){
  return {
      title:'Guitar-LA | Tienda de Guitarras',
      description: 'Guitar-LA - Nuestra colección de guitarras'

  }
}

// export function links(){
//     return [
//       {
//         rel: 'stylesheet',
//         href: stylesGuitarras
//       } 
//     ] 
// }

export async function loader(){

  //usamos variable de entorno para la raiz de la ruta
  //usamos como opcion llamar desde aca mismo, si no desde guitarras.server.js usando el fetch
    // const respuesta = await fetch(`${process.env.API_URL}api/guitarras?populate=imagen`)
    // const resultado = await respuesta.json() 
      //usamos la fn importada desde el archivo.server.js
    const guitarrasApi = await getGuitarras()
    return guitarrasApi.data
}

function Tienda() {
  
  const guitarras = useLoaderData()
  
  return (
          <ListadoGuitarras 
            guitarras={guitarras}
          />
  )
}

export default Tienda
