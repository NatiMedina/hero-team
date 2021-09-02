import React from 'react';
import CardHeroTeam from './CardHeroTeam';


const Team = ({ team, onDelHero }) => {

    return (
        <div className="container-fluid  py-3">
            <h1 className='text-center'>Equipo de superhéroes</h1>
            <div className='row justify-content-md-center pt-3'>
                {
                    team.length === 0 ?
                        <tr><td colSpan="4">Sin miembros en el equipo</td></tr> :
                        team.map(el => <CardHeroTeam key={el.id} hero={el} delHero={(hero) => onDelHero(hero)} />)
                }
            </div>
        </div>
    );
};

export default Team;