import React, { useState, useEffect } from 'react';
import './styles/Home.css';
import { getUrl } from '../services/apirest';
import axios from 'axios';
import { Formik } from 'formik';
import Team from './Team';
import Results from './Results';
import Acumulativo from './Acumulativo';
import { connect } from "react-redux";

const mapStateToProps = state => ({
    team: state.team
})


export default connect(mapStateToProps, {})(function Home({ team }) {
    const [respuesta, setRespuesta] = useState([]);
    const [coincidencias, setCoincidencias] = useState(null);


    useEffect(() => {
        if (coincidencias > 1) { document.title = `se encontraron ${coincidencias} coincidencias` }
        else if (coincidencias === 1) { document.title = `se encontro ${coincidencias} coincidencia` }
        else if (coincidencias === 0) { document.title = "no se encontro coincidencias" }
    })

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
                heroes.forEach(element => {
                    element.biography.alignment = element.biography.alignment.replace('-', 'neutral') || 'neutral'
                });
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
                    <Results showResults={values.nombre && !errors.nombre} results={respuesta}/>
                    <Acumulativo />

                    <div className="container-fluid">
                        <Team />
                    </div>

                </div>
            )}
        </Formik>
    );
})