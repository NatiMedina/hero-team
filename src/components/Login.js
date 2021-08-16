import React from 'react';
import { loginpostUrl } from '../services/loginpost';
import axios from 'axios';
import './styles/Login.css'
import { Formik } from 'formik';

class Login extends React.Component {

    // state = {
    //     form: {
    //         "email": "",
    //         "password": ""
    //     },
    //     error: false,
    //     errorMsg: ""
    // }

    // manejadorSubmit = (e) => { e.preventDefault() };

    // manejadorChange = async e => {
    //     await this.setState({
    //         form: {
    //             ...this.state.form,
    //             [e.target.name]: e.target.value
    //         }
    //     })
    //     console.log(this.state.form);
    // }

    // manejadorBoton = () => {
    //     let url = loginpostUrl;

    //     axios.post(url, this.state.form)
    //         .then(response => {
    //             console.log(response);
    //         }).catch(
    //             error => console.log("Ups ocurrio un error, el usuario o contrasea es erroneo", error)
    //         )
    // }

    render() {

        return (

            <Formik
                initialValues={{
                    email: "",
                    password: ""
                }}
                validate={(valores) => {
                    let errores = {};

                    if (!valores.email) {
                        errores.email = 'por favor ingresa un correo'
                    } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.email)) {
                        errores.email = 'el correo solo puede tener letras, números, puntos, guiones y guiones bajos'
                    }

                    if (!valores.password) {
                        errores.password = 'por favor ingresa una contraseña'
                    } else if (!/^[a-zA-Z0-9_.+-]{5,8}$/.test(valores.password)) {
                        errores.password = 'la contraseña debe tener entre 5 y 8 caracteres'
                    }

                    return errores;
                }}

                onSubmit={(valores) => {
                    let url = loginpostUrl;

                    axios.post(url, valores)
                        .then(response => {
                            console.log(response);
                        }).catch(
                            error => console.log("Ups ocurrio un error", error)
                        )
                }}
            >



                {({ values, errors, touched, handleSubmit, handleChange, handleBlur }) => (
                    <div className="container pt-5">
                        <div className="d-flex justify-content-center h-100">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="text-center pt-3">Login</h3>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="input-group form-group mb-3">
                                            <div class="input-group">
                                                <span class="input-group-text" id="inputGroup-sizing-default"><i className="fa fa-envelope"></i></span>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="email"
                                                    value={values.email}
                                                    placeholder="email"
                                                    aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur} />
                                            </div >
                                            {touched.email && errors.email && <div className="error alert alert-danger">{errors.email}</div>}
                                        </div>
                                        <div className="input-group form-group mb-3">
                                            <div class="input-group">
                                                <span class="input-group-text" id="inputGroup-sizing-default"><i className="fas fa-key"></i></span>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    name="password"
                                                    value={values.password}
                                                    placeholder="password"
                                                    aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur} />
                                            </div>
                                            {touched.password && errors.password && <div className="error">{errors.password}</div>}
                                        </div>
                                        <div className="d-grid gap-2">
                                            <button className="btn btn-warning" type="button" onClick={handleSubmit} >Login</button>
                                        </div>
                                    </form>
                                </div>
                                <div className="card-footer">
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Formik>
        )
    }
}

export default Login;