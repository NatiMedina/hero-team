import React from "react";

const Acumulativo = ({ team }) => {


    const castStat = ((stat) => {
        if (!stat || stat === "null") {
            return 0;
        }

        return parseInt(stat, 10)
    })

    const castKgCmToNumber = ((stat) => {
        let matches = stat.match(/(\d+)/)

        if (matches) {
            return parseInt(matches[0], 10);
        }

        return 0
    })

    const getMaxStatus = ((stats) => {

        const maxValue = Math.max(...Object.values(stats));
        const maxStat = Object.keys(stats).filter(stat => stats[stat] === maxValue).join(",")

        return { stat: maxStat, value: maxValue }

    })


    const getStats = ((team) => {
        let stats = {
            combat: 0,
            durability: 0,
            intelligence: 0,
            power: 0,
            speed: 0,
            strength: 0
        }

        team.forEach(hero => {
            Object.keys(hero.powerstats).forEach(stat => stats[stat] += castStat(hero.powerstats[stat]))
        });

        return stats;
    })

    const getAppearance = ((team) => {

        let appearance = {
            weight: 0,
            height: 0
        }

        team.forEach(hero => {
            appearance.height += castKgCmToNumber(hero.appearance.height[1])
            appearance.weight += castKgCmToNumber(hero.appearance.weight[1])
        });

        appearance.height = Math.round((appearance.height / team.length) * 100) / 100
        appearance.weight = Math.round((appearance.weight / team.length) * 100) / 100

        return appearance
    });

    return (
        <div className={'container-fluid'}>
            {team.length > 0 && <h3 className={'mx-5 mt-5'}> Team {getMaxStatus(getStats(team))["stat"]}
            </h3>}

            {team.length > 0 && <h5 className={'mx-5 '}>
                Peso promedio: {getAppearance(team)["weight"] + " kg Altura promedio:" + getAppearance(team)["height"] + " cm"}
            </h5>}

            <div className="card-group w-100">
                {Object.entries(getStats(team)).map(data =>
                    <div key={data[0]} className="card mx-1">
                        <div class="card-header text-center">
                            <h4 className="card-title"> {data[0]} </h4>
                        </div>
                        <div className="card-body text-center">
                            <h3 className="card-text">{data[1]}</h3>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

export default Acumulativo;