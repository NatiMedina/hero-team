import React from 'react';
import { connect } from 'react-redux';
import RowResults from './RowResults';

const Results = ({ showResults, results, team }) => {
    const teamData = {
        good: team.filter(member => member.biography.alignment === 'good'),
        neutral: team.filter(member => member.biography.alignment === 'neutral'),
        bad: team.filter(member => member.biography.alignment === 'bad'),
        ids: team.map(hero => hero.id)
    }

    return (
        showResults && results.length > 0 &&
        <ul className='list-group overflow-auto dropdown-menu w-100' style={{ maxHeight: '400px' }} >
            {
                results.map(result =>
                    <li key={result.id} className='list-group-item list-group-item-action'>
                        <RowResults key={result.id} hero={result} inTeam={teamData.ids.includes(result.id)} maxSquad={teamData[result.biography.alignment].length >= 3} maxTeam={teamData.ids.length >= 6} />
                    </li>
                )}
        </ul>
    )
}

const mapStateToProps = state => ({
    team: state.team
})


export default connect(mapStateToProps, {})(Results);