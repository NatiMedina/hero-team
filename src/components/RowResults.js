import React from "react";



const RowResults = ({ hero, showAdd, addHero }) => {


    return (
        <tr>
            <td> <img src={hero.image.url} className="rounded" style={{ width: '96px', height: '96px' }} alt={hero.name}></img></td>
            <td> <h4>{hero.name}</h4> </td>
            <td>
                {
                    showAdd ? <button className='btn btn-primary' onClick={() => { addHero(hero) }}>Agregar</button>
                        : <button className='btn btn-secondary' disabled={true}> En equipo </button>
                }
            </td>
        </tr>
    );


};

export default RowResults;



