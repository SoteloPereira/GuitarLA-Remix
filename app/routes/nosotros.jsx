//import { useOutletContext } from '@remix-run/react'
import imagenNosotros from '../../public/img/nosotros.jpg'
import stylesNos from '../styles/nosotros.css'

export function links(){
  return [
    {
      rel:'stylesheet',
      href: stylesNos
    },
    //para elementos muy grandes (videos, imagen), le decimos, una vez que este listo, muestralo por el navegador
    {
      rel: 'preload',
      href: imagenNosotros,
      as: 'image'
    }
  ]
}

export function meta(){
  return {
    title: 'Guitar-LA | Nosotros',
    description: 'Venta de guitarras, blog de musica'
  }
}

function Nosotros() {

  // Al ser hijo directo del componente principal, puede recibir directamente el valor/contenido
  // del useContext, usando el hook y guardandolo en una variable
    //const data = useOutletContext(); console.log(data);
  //se puede desestructurar tambien
    //const {agregarCarrito, carrito} = useOutletContext()
    //y usar la fn sumar aqui y mostrar valores
    

  return (
    <div>
        <main className="contenedor nosotros">
            <h2 className="heading">Nosotros</h2>
            <div className="contenido">
                <img src={imagenNosotros} alt="imagen nosotros" />
                <div>
                  <p>Contrary to popular belief, Lorem Ipsum is not simply random text. - Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
                  <p>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>
                </div>
            </div>
        </main>
    </div>
  )
}

export default Nosotros
