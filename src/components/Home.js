import React, { useState, useEffect } from 'react';
import './styles/Home.css';
import { getUrl } from '../services/apirest';
import axios from 'axios';
import { Formik } from 'formik';
import Team from './Team';
import Results from './Results';
import useLocalStorage from './useLocalStorage';
import Acumulativo from './Acumulativo';


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
            good: team.filter(member => member.biography.alignment === 'good'),
            neutral: team.filter(member => member.biography.alignment === 'neutral'),
            bad: team.filter(member => member.biography.alignment === 'bad'),
            ids: getHeroIdList()
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
                    error.nombre = 'Ingresa un nombre del héroe'
                } else if (!/^[a-zA-Z0-9- ]{3,20}$/.test(valor.nombre)) {
                    if (valor.nombre.length < 3) {
                        error.nombre = 'Ingrese mas caracteres';
                        if (respuesta.length > 0) {
                            setRespuesta([])
                        }
                    } else if (valor.nombre.length <= 20) {
                        error.nombre = 'Solo se aceptan letras, números, espacios y guiones'  //length
                    } else {
                        error.nombre = 'Ingrese hasta 20 caracteres';
                    }
                }

                if (team.length >= 6) {
                    error.nombre = 'El equipo se encuentra completo'
                }

                return error;
            }}



            onSubmit={async (valor) => {
                let url = getUrl + 'api.php/4132652440189887/search/' + valor.nombre;
                let res = await axios.get(url);
                let datos = res.data;
                let heroes = datos.results || [];
                setCoincidencias(heroes.length)
                console.log(heroes)
                setRespuesta([...heroes]);
            }}
        >

            {({ values, errors, touched, handleSubmit, handleChange }) => (

                <div>
                    <nav className="navbar bg-light">

                        <h1 className="display-5 px-4">HeroTeam</h1>
                        <form className="d-flex mt-3" onSubmit={ev => { ev.preventDefault() }}>
                            <div className="input-group mb-3">
                                <input className="form-control"
                                    name="nombre"
                                    value={values.nombre}
                                    type="search"
                                    placeholder="buscador de héroes"
                                    aria-label="Search"
                                    aria-describedby="button-search"
                                    onChange={handleChange} />
                                <button className="btn btn-primary" type="submit" id="button-search" onClick={handleSubmit}>Buscar</button>


                            </div>
                        </form>
                    </nav>

                    {touched.nombre && errors.nombre && <div className="alert alert-warning alert-dismissible fade show text-center" role="alert">
                        {errors.nombre}
                    </div>}
                    <Acumulativo team={team} />
                    <Results showResults={values.nombre && !errors.nombre} results={respuesta} teamData={getTeamData()} onAddHero={(hero) => addHero(hero)} />

                    <div className="container-fluid">

                        <Team team={team} onDelHero={(hero) => removeHero(hero)} />
                    </div>


                </div>
            )}
        </Formik>
    );
}