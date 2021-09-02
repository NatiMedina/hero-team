import React from "react";



const CardHeroTeam = ({ hero, delHero }) => {

    const classColorAlignment = (hero, bootstrapclass) => {
        if (hero.biography.alignment === "good") {
            return bootstrapclass + 'success'
        }
        if (hero.biography.alignment === "bad") {
            return bootstrapclass + 'danger'
        }

        return bootstrapclass + 'warning'
    }

    return (

        <div className="card-border-0" style={{ width: '19rem' }}>
            <div className="d-flex position-relative justify-content-center">
                <img src={hero.image.url} className={classColorAlignment(hero, "rounded-circle border border-3 border-")}  style={{ width: '150px', height: '150px' }} alt={hero.name} />

                <span className={classColorAlignment(hero, "position-absolute rounded-circle bg-")} style={{ width: '25px', height: '25px', left: '175px', bottom: '9px' }} title={hero.biography.alignment} >
                </span>
            </div>

            <h3 className="mt-3 card-title text-center">{hero.name}</h3>

            <div className="card-body">
                <ul style={{ paddingTop: '3px', listStyleType: 'none', marginLeft: '10%' }}>

                    <li><h5><span className="badge rounded-pill bg-primary">{hero.powerstats.combat}</span> Combate</h5></li>
                    <li><h5><span className="badge rounded-pill bg-primary">{hero.powerstats.durability}</span> Durabilidad</h5></li>
                    <li><h5><span className="badge rounded-pill bg-primary">{hero.powerstats.intelligence}</span> Inteligencia</h5></li>
                    <li><h5><span className="badge rounded-pill bg-primary">{hero.powerstats.power}</span> Poder</h5></li>
                    <li><h5><span className="badge rounded-pill bg-primary">{hero.powerstats.speed}</span> Velocidad</h5></li>
                    <li><h5><span className="badge rounded-pill bg-primary">{hero.powerstats.strength}</span> Fuerza</h5></li>
                </ul>
            </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-center pb-3">
                <button className="rounded-pill btn btn-info"><i className="fas fa-search px-1"></i>detalle</button>
                <button className="rounded-pill btn btn-secondary" onClick={() => { delHero(hero) }}><i className="fas fa-trash px-1"></i>eliminar</button>

            </div>
        </div >

    );


};

export default CardHeroTeam;



