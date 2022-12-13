//con este enlace dinamico, muestro la guitarra que seleccione, pasandole la url por param al loader
import { useLoaderData, useOutletContext } from '@remix-run/react'
import { useState } from 'react';
import {getGuitarra} from '~/models/guitarras.server'
//import styles from '~/styles/guitarras.css'



export async function loader({params}){
    
  const {guitarraUrl} = params
  //llamamos al metodo desde guitarras.server.js y le pasamos la url desde el params
  const guitarra = await getGuitarra(guitarraUrl)
  console.log(guitarra.data[0].attributes.nombre);
  console.log(guitarra);
  
  if(guitarra.data.length === 0){
      throw new Response('', {
        status: 404,
        statusText: 'Guitarra no encontrada'
      })
  }
  return guitarra
}
/*
Para hacer un title dinamico, creamos la fn meta la que recibe un parametro {data} que una vez que el loader
logra retornar algo envia la informacion al componente, esta va a estar disponible, si no retorna nada, estará vacio
*/

export function meta({data}){
  if(!data){
    return{
        title:'Guitarra no encontrada',
        description: 'Guitar-La | Venta de guitarras, guitarra no encontrada'
    }
  }
  //si viene con algo el data, es decir el loader retorno algo, hace esto de abajo
  return {
    title: `Guitar-LA | ${data.data[0].attributes.nombre}`,
    description: 'Guitar-La | Venta de guitarras'
  }
}

//la quitamos porque la tenemos definida en guitarras.jsx
// export function links(){
//   return [
//     {
//       rel:'stylesheet',
//       href: styles
//     }
//   ]
// }

function Guitarra() {

  /*como es hijo en otra ruta, no se le puede pasar directo el context, por tanto en guitarras.jsx (hijo 1er nivel)
  se debe asignar el context al Outlet que esta ahi con el hook, y asi se puede acceder desde aca */
    //const data = useOutletContext(); console.log(data);
  //podemos desestructurar el objeto recibido
    const {agregarCarrito} = useOutletContext()

    const [cantidad, setCantidad] = useState(0) 

    const guitarra = useLoaderData()
  
    //como el json tiene 2 items (data y meta) se debe indicar que es el index[0] y luego entramos a attributes
    const {nombre, descripcion, imagen, precio} = guitarra.data[0].attributes

    function handleSubmit(e){
      e.preventDefault()
      console.log(cantidad);
      if(cantidad < 1){
        
        alert("Debes elegir una cantidad")
        return
      }
      //creamos un objeto para evitar estar haciendo llamadas a la API (buena practica)
      const guitarraSeleccionada = 
      {
        id: guitarra.data[0].id,
        imagen: imagen.data.attributes.url,
        nombre,
        precio,
        cantidad
      }
      console.log(guitarraSeleccionada);
      //llamamos la fn que nos trajimos con el context y le pasamos la guitarra seleccionada
      agregarCarrito(guitarraSeleccionada)
    }



    //creamos la estructura para mostrar la guitarra y importamos el estilo desde styles/guitarras.css 
  return (
    <div className='guitarra'>
        <img className='imagen' src={imagen.data.attributes.url} alt={`Imagen de guitarra ${nombre}`} />
        <div className='contenido'>
          <h2 className='heading'>{nombre}</h2>
          <p className='texto'>{descripcion}</p>
          <p className='precio'>${precio}</p>

          <form className='formulario'
              onSubmit={handleSubmit}
          >
              <label htmlFor="cantidad">Cantidad:</label>
              <select name="" id="cantidad"
                  onChange={e => setCantidad(e.target.value)}
              >
                  <option value="0">--Seleccione--</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
              </select>
              <input type="submit" value="Agregar al carrito"/>
          </form>
        </div>
    </div>
  )
}

export default Guitarra
