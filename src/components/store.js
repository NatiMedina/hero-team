import { createStore } from "redux"

function getFromLocalStorage() {
    const item = window.localStorage.getItem('team');
    return item ? JSON.parse(item) : [];
}

function setToLocalStorage(value) {
    window.localStorage.setItem('team', JSON.stringify(value));
}


const initialState = {
    team: getFromLocalStorage(),
}

const HeroTeam = (state = initialState, action) => {

    if (action.type === "ELIMINAR_HERO") {
        let newTeam = state.team.filter(hero => hero.id !== action.hero.id);
        setToLocalStorage(newTeam);

        return {
            ...state,
            team: newTeam,
        }
    }

    if (action.type === "AGREGAR_HERO") {
        let newTeam = state.team.concat(action.hero);
        setToLocalStorage(newTeam);
        return {
            ...state,
            team: newTeam,
        }
    }

    return state
}

export default createStore(HeroTeam)