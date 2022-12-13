import Guitarra from "~/components/guitarra"

function ListadoGuitarras({guitarras}) {
  return (
    <>
     <h2 className="heading">Nuestra colección de guitarras</h2>
     {/* se existe el array de guitarras */}
         {guitarras?.length && (
            <div className="guitarras-grid contenedor">
              {guitarras.map( guitarra =>(
                // llamamos componente y le pasamos props del array
                <Guitarra 
                  key={guitarra?.id} //o podriamos pasarle la attribute.url que es unica tambien
                  guitarra={guitarra?.attributes} //en el json, attributes tiene la data
                />
              ))}
            </div>
       )}
    </>
  )
}

export default ListadoGuitarras
