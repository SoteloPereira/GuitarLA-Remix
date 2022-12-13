/*
Si un componente lo quieres usar en una de las paginas, lo agregas en el archivo de routes
Si el componente va en todos, lo agregamos en root.jsx
*/

import { Link} from "@remix-run/react"
import Logo from '../../public/img/logo.svg'
import Navegacion from "./navegacion";

function Header() {

  return (
    <header className="header">
        <div className="contenedor barra">
            <Link to='/'>
                <img className="logo" src={Logo} alt="imagen del logo" />
            </Link>
            <Navegacion />
        </div>
    </header>
  )
}

export default Header
