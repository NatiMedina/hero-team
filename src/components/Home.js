import React, { useState, useEffect } from 'react';
import './styles/Home.css';
import { getUrl } from '../services/apirest';
import axios from 'axios';
import { Formik } from 'formik';
import Team from './Team';
import Results from './Results';
import useLocalStorage from './useLocalStorage';
import HeroDetails from './HeroDetails';

export default function Home() {
    const [respuesta, setRespuesta] = useState([]);
    const [team, setTeam] = useLocalStorage('team', []);
    const [coincidencias, setCoincidencias] = useState(null);


    useEffect(() => {
        if (coincidencias > 1) { document.title = `se encontraron ${coincidencias} coincidencias` }
        else if (coincidencias === 1) { document.title = `se encontro ${coincidencias} coincidencia` }
        else if (coincidencias === 0) { document.title = "no se encontro coincidencias" }
    })

    const removeHero = (hero) => {
        const i = team.indexOf(hero);
        if (i >= 0) {
            let newTeam = team.filter(member => member.id !== hero.id)
            setTeam([...newTeam]);
        }
    };

    const getTeamData = () => {

        return {
            bad : team.filter(member => member.biography.alignment === 'bad'),
            good : team.filter(member => member.biography.alignment === 'good'),
            neutral : team.filter(member => member.biography.alignment === 'neutral'),
            ids : getHeroIdList()
        }

    }

    const addHero = (hero) => {
        if (team.length > 6) return;

        const bad = team.filter(member => member.biography.alignment === 'bad');
        const good = team.filter(member => member.biography.alignment === 'good');
        const neutral = team.filter(member => member.biography.alignment === 'neutral');

        if (hero.biography.alignment === 'bad' && bad.length < 3) {
            setTeam([...team, hero])
        }

        if (hero.biography.alignment === 'good' && good.length < 3) {
            setTeam([...good, hero, ...neutral, ...bad])
        }

        if (hero.biography.alignment === 'neutral') {
            setTeam([...good, ...neutral, hero, ...bad])
        }
    }


    const getHeroIdList = () => {
        return team.map(hero => hero.id);
    }

    return (

        <Formik

            initialValues={{
                nombre: ""
            }}

            validate={(valor) => {
                let error = {};

                if (!valor.nombre) {
                    error.nombre = 'por favor ingresa un nombre de héroe'
                } else if (!/^[a-zA-Z0-9- ]{3,20}$/.test(valor.nombre)) {

                    error.nombre = valor.nombre.length >= 3 ? 'Solo se aceptan letras, numeros y espacios' : 'Ingrese mas caracteres'; //length
                }
                return error;
            }}



            onSubmit={async (valor) => {
                let url = getUrl + 'api.php/4132652440189887/search/' + valor.nombre;
                let res = await axios.get(url);
                let datos = res.data;
                let heroes = datos.results || [];
                console.log("Tengo response");
                console.log(heroes);
                setCoincidencias(heroes.length)
                setRespuesta([...heroes]);
            }}

        >

            {({ values, errors, touched, handleSubmit, handleChange }) => (

                <div>
                    <nav className="navbar bg-light">
                        <div className="container-fluid">
                            <div className="navbar p-2">
                                <h1 className="display-5 px-4">HeroTeam</h1>
                                <form className="d-flex" onSubmit={ev => { ev.preventDefault() }}>
                                    <input className="form-control me-2"
                                        name="nombre"
                                        value={values.nombre}
                                        type="search"
                                        placeholder="buscador de héroes"
                                        aria-label="Search"
                                        onChange={handleChange} />
                                    <div>
                                        {touched.nombre && errors.nombre && <div className="error alert alert-warning p-1 m-0">{errors.nombre}</div>}
                                    </div>
                                    <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Buscar</button>
                                </form>
                            </div>
                        </div>
                    </nav>
                    <div>
                        {respuesta.length > 0 && <Results results={respuesta} teamData={getTeamData()} teamIds={getHeroIdList()} onAddHero={(hero) => addHero(hero)} />}
                        <Team team={team} onDelHero={(hero) => removeHero(hero)} />
                    </div>
                    {/* <div className='row'>
                        <HeroDetails teamIds={getHeroIdList()} />
                    </div> */}

                </div>
            )}
        </Formik>
    );
}