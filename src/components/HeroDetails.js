import React from 'react';




const HeroDetails = ({ teamIds }) => {

    return (
        <div className="card" style={{width: '18rem'}}>
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">{teamIds}</p>
                <button className="btn btn-primary"> blabla</button>
            </div>
        </div>
    )
}

export default HeroDetails;