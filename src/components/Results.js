import React from 'react';
import RowResults from './RowResults';

const Results = ({ showResults, results, teamData, onAddHero }) => {

    return (
        showResults && results.length > 0 &&
        <ul className='list-group overflow-auto dropdown-menu w-100' style={{ maxHeight: '400px' }} >
            {
                results.map(result =>
                    <li key={result.id} className='list-group-item list-group-item-action'>
                        <RowResults key={result.id} hero={result} inTeam={teamData.ids.includes(result.id)} maxSquad={teamData[result.biography.alignment].length >= 3} maxTeam={teamData.ids.length >= 6} addHero={(hero) => onAddHero(hero)} />
                    </li>
                )}
        </ul>
    )
}

export default Results;