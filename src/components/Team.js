import React from 'react';
import CardHeroTeam from './CardHeroTeam';
import { connect } from "react-redux";

const Team = ({ team }) => {

    return (
        <div className="container-fluid  py-3">
            <h1 className='text-center'>Equipo de superhéroes</h1>
            <div className='row justify-content-center pt-3'>
                {
                    team.length === 0 ?
                        <div className="text-center">Sin miembros en el equipo</div> :
                        team.map(el => <CardHeroTeam key={el.id} hero={el} />)
                }
            </div>
        </div>
    );
};

export default connect(state => ({ team: state.team }), {})(Team);