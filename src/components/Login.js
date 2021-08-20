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
                        errores.email = 'por favor ingresa un correo válido'
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
                            if (typeof (Storage) !== "undefined") {
                                console.log(response);
                                if (response.data && response.data.token) {
                                    localStorage.setItem('token', response.data.token);
                                    valores.email = "";
                                    valores.password = "";


                                    window.location = '/home';
                                }
                            } else {
                                console.log("No se puede almacenar el token de seguridad")
                            }
                        }).catch(
                            error => console.log("Ups ocurrio un error", error)
                        )
                }}
            >



                {({ values, errors, touched, handleSubmit, handleChange, handleBlur }) => (

                    <div className="container">
                        <div className="row"></div>
                        <div className="row">
                        <div className="col-lg-4 col-md-1 col-sm-12"></div>
                            <div className="col-lg-4 col-md-10 col-sm-12">
                                <div className="d-flex justify-content-center h-100">
                                    <div className="card">
                                        <div className="card-header">
                                            <h1 className="display-5 text-center pt-3">HeroTeam</h1>
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
                                                    <div>
                                                        {touched.email && errors.email && <div className="error alert alert-warning p-1 m-0">{errors.email}</div>}
                                                    </div>
                                                </div>
                                                <div className="input-group form-group mb-3">
                                                    <div class="input-group">
                                                        <span class="input-group-text" id="inputGroup-sizing-default"><i className="fas fa-key"></i></span>
                                                        <input
                                                            type="password"
                                                            className="form-control"
                                                            name="password"
                                                            value={values.password}
                                                            placeholder="contraseña"
                                                            aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur} />
                                                    </div>
                                                    <div>
                                                        {touched.password && errors.password && <div className="error alert alert-warning p-1 m-0">{errors.password}</div>}
                                                    </div>
                                                </div>
                                                <div className="d-grid gap-2">
                                                    <button className="w-100 btn btn-lg btn-primary b-0" type="button" onClick={handleSubmit} >Iniciar sesión</button>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="card-footer">
                                        </div>
                                        {/*  <rect width="100%" height="100%" fill="#777"><img src="https://dam.smashmexico.com.mx/wp-content/uploads/2020/03/dc-comics-plataformas-digitales-contenidos-cuarentena.coronavirus-cover.jpg"></img></rect> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12"></div>
                    </div>
                )}
            </Formik>
        )
    }
}

export default Login;