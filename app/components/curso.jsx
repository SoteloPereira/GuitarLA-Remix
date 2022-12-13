

function Curso({curso}) {
    console.log(curso);
    const {titulo, contenido, imagen} = curso.attributes
  return (
    <section className="curso">
    {/* para acceder a la imagen que trae en data, usamos esta sintaxis, un style dentro del componente */}
        <style jsx="true">
            {`
                .curso{
                    background-image: linear-gradient(to right, rgb(0 0 0/ .65), rgb(0 0 0/ .7)),
                    url(${imagen.data.attributes.url}) ;
                }
            `}
        </style>

        <div className="curso-grid">
            <div className="contenido">
                 <h2 className="heading">{titulo}</h2>
                 <p className="texto">{contenido}</p>
            </div>
        </div>
        
    </section>
  )
}

export default Curso
