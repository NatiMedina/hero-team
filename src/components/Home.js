import React, { useState, useEffect } from 'react';
import './styles/Home.css';
import { getUrl } from '../services/apirest';
import axios from 'axios';
import { Formik } from 'formik';
import FormTeam from './FormTeam';
import Results from './Results';
import useLocalStorage from './useLocalStorage';

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
        let newTeam = team.filter( member => member.id !== hero.id)
            setTeam([...newTeam]);
        }
    };


    return (

        <Formik

            initialValues={{
                nombre: ""
            }}

            validate={(valor) => {
                let error = {};

                if (!valor.nombre) {
                    error.nombre = 'por favor ingresa un nombre de héroe'
                } else if (!/^[a-zA-Z0-9 ]{3,20}$/.test(valor.nombre)) {

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
                                    <button className="btn btn-success" type="submit" onClick={handleSubmit}>Search</button>
                                </form>
                            </div>
                        </div>
                    </nav>
                    <div>
                        {/*   {
                            respuesta.map(i => i.name + ' * ')
                        } */}
                        {respuesta.length > 0 && <Results results={respuesta} onAddHero={(hero) => setTeam([...team, hero])} />}
                        
                        {/*  <Table data={respuesta}  onAddHero={setTeam}/>
                        <Form  team={team} /> */
                        <FormTeam team={team} onDelHero={(hero) => removeHero(hero)} />}
                    </div>
                </div>
            )}
        </Formik>
    );
}