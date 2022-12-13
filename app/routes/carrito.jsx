import { useOutletContext } from '@remix-run/react'
import styles from '~/styles/carrito.css'
import iconoEliminar from '../../public/img/eliminar.png'
import { useState, useEffect } from 'react'
import {ClientOnly} from 'remix-utils'

export function links(){
    return[
        {
            rel:'stylesheet',
            href: styles
        }
    ]
}
export function meta(){
    return {
        title: 'Guitar-LA | Carrito de compras',
        description: 'Guitar-LA | Venta de guitarras, distintos modelos y precios para todos.'
    }
}


function Carrito() {

    //usamos el context para traernos el carrito
    const {carrito, actualizarCantidad, eliminarGuitarra} = useOutletContext()
    console.log(carrito);
    const [total, setTotal] = useState(0)

    useEffect(()=>{
            const calculoTotal = carrito.reduce( (total, producto) => 
                
                total + (producto.cantidad * producto.precio),0)
            
                setTotal(calculoTotal)
    }, [carrito]) //cada vez que carrito cambie, actualice valor de total

  return (
    <ClientOnly fallback={'cargando...'}>
        {()=> (
        <main className="contenedor">
            <h1 className="heading">Carrito de compras</h1>
            <div className="contenido">   
                <div className='carrito'>
                    <h3>Articulos</h3>
    {/* una vez agregado el carrito de compra y los datos en LS, al refrescar en la ruta carrito mostraba error,
    esto porque mientras carga lo de LS y va al componente, no lo alcanza a mostrar
    por lo que se le debe agregar el opcional a carrito, asi no muestra el error */}
                {carrito?.length === 0 ? 'Carrito vacio' : (
                    carrito?.map(producto => (
                        <div key={producto.id} className='producto'>
                            <div>
                                <img src={producto.imagen} alt={`Imagen guitarra ${producto.nombre}`} />
                            </div>
                            <div>
                                <p className='nombre'>{producto.nombre}</p>
                                <label htmlFor="cantidad">Cantidad:</label>
                                <select name="" id="cantidad" className='select'
                                    value={producto.cantidad}
                                    //al cambio, llamamos a la fn y le pasamos un objeto con el id del producto y la cantidad nueva (e.target.value)
                                    onChange={ e => actualizarCantidad({
                                        //anteponemos el + para convertirlo a numero
                                        cantidad: +e.target.value,
                                        id: producto.id
                                    })}
                                >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>
                                <p className='precio'>${producto.precio}</p>
                                <p className='subtotal'>Subtotal: $<span>{producto.cantidad * producto.precio}</span></p>
                            </div>
                            <div className='eliminar'>
                                    {/* <button className='btnEliminar'
                                        onClick={ () => eliminarGuitarra(producto.id)}
                                    >
                                        X </button> */}
                                        <a href="#" className='aEliminar' onClick={ () => eliminarGuitarra(producto.id)} >
                                            <img src={iconoEliminar} className="imgEliminar" alt="icono eliminar" />
                                        </a>
                            </div>
                        </div>
                    ))
                )}
                </div>
                <aside className="resumen">
                    <h3>Resumen del pedido:</h3>
                    <p>Total a pagar: ${total}</p>
                </aside>
            </div>
        </main>
        )}
    </ClientOnly>
  )
}

export default Carrito
