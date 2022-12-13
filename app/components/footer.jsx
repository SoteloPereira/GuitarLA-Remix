import Navegacion from "./navegacion"


function Footer() {
  return (
    <div className="footer">
        {/* inyectamos el componente navegacion ya que se repite en header y footer */}
        <Navegacion />
        <p className="copyright" >Todos los derechos reservados ©️ { new Date().getFullYear()}</p>
    </div>
  )
}

export default Footer
