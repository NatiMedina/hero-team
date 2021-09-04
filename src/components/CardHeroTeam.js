import React, { useState } from "react";




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

    const returnQuestionWhenIsNull = (attribute) => {
        return attribute !== "null" ? attribute : '?'
    }

    const [selectHero, setSelectHero] = useState(false);

    return (

        <div className="col-lg-2 col-md-4 col-sm-12 card card-border-1 mb-3">
            <div className="d-flex justify-content-center mt-3">
                <img src={hero.image.url} className={classColorAlignment(hero, "rounded-circle border border-5 shadow-lg border-")} style={{ width: '150px', height: '150px' }} alt={hero.name} />
            </div>

            <div className="mt-3 card-title text-center">
                <h3>{hero.name}</h3>
                <p><span className={classColorAlignment(hero, "badge rounded-pill bg-")}>{hero.biography.alignment}</span></p>
            </div>

            <div className="card-body">
                {
                    !selectHero &&
                    <ul style={{ paddingTop: '3px', listStyleType: 'none', marginLeft: '10%', fontSize: '1.10rem' }}>
                        <li><p><span className="badge rounded-pill bg-primary">{returnQuestionWhenIsNull(hero.powerstats.combat) }</span> Combate</p></li>
                        <li><p><span className="badge rounded-pill bg-primary">{returnQuestionWhenIsNull(hero.powerstats.durability)}</span> Durabilidad</p></li>
                        <li><p><span className="badge rounded-pill bg-primary">{returnQuestionWhenIsNull(hero.powerstats.intelligence)}</span> Inteligencia</p></li>
                        <li><p><span className="badge rounded-pill bg-primary">{returnQuestionWhenIsNull(hero.powerstats.power)}</span> Poder</p></li>
                        <li><p><span className="badge rounded-pill bg-primary">{returnQuestionWhenIsNull(hero.powerstats.speed)}</span> Velocidad</p></li>
                        <li><p><span className="badge rounded-pill bg-primary">{returnQuestionWhenIsNull(hero.powerstats.strength)}</span> Fuerza</p></li>
                    </ul>
                }

                {
                    selectHero &&
                    <ul style={{ paddingTop: '3px', listStyleType: 'none', marginLeft: '10%', fontSize: '1.10rem' }}>
                        <li><p>Alias: {hero.biography["full-name"]}</p></li>
                        <li><p>Peso <span className="badge rounded-pill bg-primary">{hero.appearance.weight[1]}</span></p></li>
                        <li><p>Altura <span className="badge rounded-pill bg-primary">{hero.appearance.height[1]}</span></p></li>
                        <li><p>Ojos <span className="badge rounded-pill bg-primary">{hero.appearance["eye-color"]}</span></p></li>
                        <li><p>Cabello <span className="badge rounded-pill bg-primary">{hero.appearance["hair-color"]}</span></p></li>
                        <li><p>Trabajo:</p></li>
                        {
                            hero.work.base.replace(";", ",").split(",").map(word => <li key={word+hero.id} ><span className="badge rounded-pill bg-primary" style={{ fontSize: '.75rem' }}>{word}</span></li>)
                        }

                    </ul>}
            </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-center pb-3">
                <button className="rounded-pill btn btn-info" onClick={() => { setSelectHero(!selectHero) }}><i className="fas fa-search px-1"></i>{!selectHero && 'detalle'}{selectHero && 'volver'}</button>
                <button className="rounded-pill btn btn-secondary" onClick={() => { delHero(hero) }}><i className="fas fa-trash px-1"></i>eliminar</button>

            </div>

        </div >

    );


};

export default CardHeroTeam;