import { Outlet, useOutletContext} from "@remix-run/react"
//import Guitarra from "~/components/guitarra" lo llamamos en ListadoGuitarra
//import { getGuitarras } from "~/models/guitarras.server"
import styles from "../styles/guitarras.css"
//import ListadoGuitarras from '~/components/listado-guitarras'

export function links(){
    return [
      {
        rel: 'stylesheet',
        href: styles
      } 
    ] 
}

function Tienda() {
  
  return (
    <div>
      <main className="contenedor">
        {/* como hay un Outlet, se corta el acceso al context desde el hijo $guitarrasURL.jsx
        por lo que hay que importar el hook useOutletContext y pasarlo como context al
        Outlet de este componente */}
          <Outlet 
            context = {useOutletContext()}
          />
      </main>
       
    </div>
  )
}

export default Tienda
