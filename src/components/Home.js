import React from 'react';
import './styles/Home.css';
import { getUrl } from '../services/apirest';
import axios from 'axios';
import { Formik } from 'formik';

class Home extends React.Component {



    /*     handleSubmit = () => {
            // let url = getUrl + 'api.php/4132652440189887/batman';
    
            axios.get(getUrl + 'api.php/4132652440189887/search/batman')
                .then(response => {
                    console.log("Tengo response");
                    console.log(response.data);
                }).catch(
                    error => console.log("Ups ocurrio un error", error)
                )
    
        } */

    render() {
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
                        error.nombre = 'solo se aceptan letras, numeros y espacios' //length
                    }
                    return error;
                }}

                onSubmit={(valor) => {
                    
                    let url = getUrl + 'api.php/4132652440189887/search/' + valor.nombre;

                    axios.get(url)
                        .then(response => {
                            console.log("Tengo response");
                            console.log(response.data.results);    
                        }).catch(
                            error => console.log("Ups ocurrio un error", error)
                        )

                }}

            >

                {({ values, errors,touched, handleSubmit, handleChange }) => (

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
                        <table className="table table-hover mt-3">
                            {/*  <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Handle</th>
                        </tr>
                    </thead> */}
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td colSpan="2">Larry the Bird</td>
                                    <td>@twitter</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </Formik>

        )
    }

}

export default Home;