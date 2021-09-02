import React from "react";



const CardHeroTeam = ({ hero, delHero }) => {

    const classAlignmentHero = (hero) => {
        if (hero.biography.alignment === "good") {
            return 'far fa-smile'
        }
        if (hero.biography.alignment === "bad") {
            return 'far fa-angry'
        }

        return 'far fa-meh-blank'
    }

    return (

        <div className="card-border-0 shadow-lg" style={{ width: '19rem' }}>
            <div className="position-relative">
                <img src={hero.image.url} className="rounded-circle rounded mx-auto d-block my-3 border border border-5" style={{ width: '150px', height: '150px' }} alt={hero.name} />

                <div className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-info" style={{ width: '40px', height: '40px', position: 'absolute', top:'0%', left:'0%' }} >
                    <i className={classAlignmentHero(hero)}></i>
                </div>

            </div>

            <h3 className="card-title text-center">{hero.name}</h3>

            <div className="card-body">
                <ul style={{ paddingTop: '3px', listStyleType: 'none', marginLeft: '5px' }}>

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



