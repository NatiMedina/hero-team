import React from 'react';




const HeroDetails = ({ hero }) => {

    return (
        <div className="accordion accordion-flush">
            <div className="accordion-body">
                <h5>Card title</h5>
                <p className="card-text">{hero.name}</p>
                <button className="btn btn-primary"> blabla</button>
            </div>
        </div>
    )
}

export default HeroDetails;