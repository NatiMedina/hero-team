import React from 'react';
import RowResults from './RowResults';

const Results = ({ results, teamIds, onAddHero }) => {

    return (


        <div className="container-fluid table-responsive pt-3">
            <h3 className='text-center'>Resultados de búsqueda</h3>
            <table className="table align-middle">
                <tbody>
                    {results.length === 0 ?
                        <tr><td colSpan="3">Sin datos</td></tr> :
                        results.map((el) => <RowResults key={el.id} hero={el} showAdd={!teamIds.includes(el.id)} addHero={(hero) => onAddHero(hero)} />)}
                </tbody>
            </table>
        </div>
    )
}

export default Results;