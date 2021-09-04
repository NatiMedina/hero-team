import React from "react";



const RowResults = ({ hero, inTeam, maxSquad, maxTeam, addHero }) => {

    const candAddMember = () => {
        return !inTeam && !maxSquad && !maxTeam
    }

    const messageCantAddMember = (hero) => {
        if (inTeam) {
            return 'En equipo'
        }

        if (maxSquad) {
            return hero.biography.alignment.charAt(0).toUpperCase() + hero.biography.alignment.slice(1) + ' full'
        }

        return 'Equipo full'
    }

    return (
        <tr>
            <td> <img src={hero.image.url} className="rounded" style={{ width: '96px', height: '96px' }} alt={hero.name}></img></td>
            <td> <h4>{hero.name}</h4> </td>
            <td>
                {
                    candAddMember() ? <button className='btn btn-primary' onClick={() => { addHero(hero) }}>Agregar</button>
                        : <button className='btn btn-secondary' disabled={true}> {messageCantAddMember(hero)} </button>
                }
            </td>
        </tr>
    );


};

export default RowResults;



