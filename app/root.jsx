//importamos Meta como componente que se llama desde <head> con los datos de la fn meta()
import { Meta, Links, Outlet, Scripts, LiveReload, useCatch, Link } from '@remix-run/react' //hay varias opciones, react si es del cliente, node si es del servidor
import Footer from './components/footer'
import Header from './components/header' //como queremos que se muestre en todo, lo agregamos en root
import styles from './styles/index.css' //ruta que llamamos en href de links()
import { useEffect, useState } from 'react'



//funcion que tomará valores de meta que van en head de archivo HTML
//sirve solo para lo que esta en routes
export function meta(){
    return (
        {
            charset: 'utf-8',
            title: 'Guitar-LA Remix',
            viewport: 'width=device-width, initial-scale=1'
        }
    )
}


//fn para importar hojas de estilo, sirve solo para lo que esta en routes
export function links(){ //se podria exportar en distintos componentes si queremos otros estilos
    return [{
        rel:'stylesheet',
        href: 'https://necolas.github.io/normalize.css/8.0.1/normalize.css'
    },
    {
        rel: 'stylesheet',
        href: styles
    },
    {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com'
    },
    {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: "true"
    },
    {
        rel:'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&family=Outfit:wght@400;700;900&display=swap'
    }
    ]
}

export default function App() {

    //preguntamos si existe un carrito en LS, si está trae la data, si no crea un array vacio
    /*sin el typeof window arroja un error por usar localStorage fuera del useEffect, 
    remix trabaja tanto en cliente como en servidor, en la parte de servidor 
    no tiene el objeto de window (navegador si), entonces le estamos diciendo, si este codigo 
    es del servidor no haga nada, pero si es del nav que obtenga la data de localStorage*/
    const carritoLS = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('carrito')) ?? [] : null
    const [carrito, setCarrito] = useState(carritoLS)

    useEffect(()=>{
        //debe guardar solo string, por ello el array se pasa a stringcon el metodo
        localStorage.setItem('carrito',JSON.stringify(carrito))
        console.log("carrito...");
    },[carrito])

    //recibimos la guitarraSeleccionada desde $guitarraUrl donde ejecutó la fn y le paso el parametro
    const agregarCarrito = guitarra =>{
        console.log("agregando..", guitarra.nombre);
        /*nos esta pasando que si agregamos una guitarra con x cantidad y luego agrego la misma guitarra
        con otra cantidad crea 2 registros en carrito, para ello consultamos usando some*/ 
        if(carrito.some(guitarraState => guitarraState.id === guitarra.id)){
            //registro ya existe en array   
            const carritoActualizado = carrito.map(gState => {
                if(gState.id === guitarra.id){
                    //reescribir la cantidad
                    gState.cantidad = guitarra.cantidad
                }
                //va retornand al nuevo array el elemento
                return gState
            })
             //terminado el ciclo, modifica el array con la cantidad del elemento actualizada 
            setCarrito(carritoActualizado)
        }else{
            //Nuevo registro, no hay otras guitarras con ese id
        //usamos el modificador y a lo que ya tenga, le agregamos la que recibe la fn
            setCarrito([...carrito, guitarra])
        }
    }
//desde carrito enviamos como argumento un objeto con id y cantidad para actualizar 
    const actualizarCantidad = guitarra =>{
        console.log("guitarra", guitarra);
        const productoActualizado = carrito.map(g => {
            if(g.id === guitarra.id){
                g.cantidad = guitarra.cantidad
            }
            return g
        })
        setCarrito(productoActualizado)
    }

    const eliminarGuitarra = id =>{
        const carritoActualizado = carrito.filter(g => g.id !== id)
        setCarrito(carritoActualizado)
    }

  return (
    <>
        <Document>
            <Outlet 
                context={{
                   carrito,
                   agregarCarrito,
                   actualizarCantidad,
                   eliminarGuitarra
                }}
            />
        </Document>
    </>
  )
}

//funciona como un componente, se le puede llamar Layout tb
function Document( { children }){ //recibe children para mostrar todo lo que reciba

    return (
        <html>
            <head>
                {/* <title>Guitar-La Remix</title> */}
                <Meta />
                <Links />
            </head>
            <body>
                <Header />
                {/* este children recibe lo que se inyecte en Outlet en fn App */}
                {children}
                <Footer />
                {/* Scripts (importado en root) es un componente que tiene todas las optimizaciones de Remix */}
                <Scripts />
                {/* LiveReload - para que se refresque sola la pagina luego de un cambio en el codigo */}
                <LiveReload />
            </body>
        </html>
    )
}

/****** MANEJO DE ERRORES CON REMIX  *********/

export function CatchBoundary(){
    //se llama al hook para capturar el error
    const error = useCatch()
    return (
        <Document>
            <p className='error'>{error.status} {error.statusText}</p>
            <Link className='error-enlace' to='/'>Vuelve al Inicio</Link>
        </Document>
    )
}

export function ErrorBoundary( {error} ){
    return (
        <Document>
            <p className='error'>{error.status} {error.statusText}</p>
            <Link className='error-enlace' to='/'>Vuelve al Inicio</Link>
        </Document>
    )
}