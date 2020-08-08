import React, { useState, useEffect } from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { useForm } from 'react-hook-form';
import Container from '@material-ui/core/Container';
import axios from 'axios';

export default function Contactform({
    setModoregistro,
    titulo,
    estiloLogin,
}) {
    const classes = estiloLogin();
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = data => {
        console.log(data.email);
        axios
            .post("http://localhost:5000/api/usuario", {
                nombre: data.nombre,
                mail: data.email,
                pass: data.password
            })
            .then(
                (response) => {
                    console.log(response.data);

                    if (response.data.mensaje == 'correcto') {
                        localStorage.setItem('TOKEN_APP_TALLER', response.data.token)
                        window.location = '/menu';
                    }
                }
            )
            .catch((err) => {
                if (err.response) {
                    if (err.response.status == 401) {
                        let motivo = err.response.data.mensaje;
                        alert(`No autorizado: ${motivo}`)
                    }
                    console.log(err.response.data.mensaje)
                } else if (err.request) {
                    // client never received a response, or request never left
                } else {
                    // anything else
                }
            });
    }

    console.log(errors);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {titulo}
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="nombre"
                        label="Nombre"
                        name="nombre"
                        autoComplete="Nombre"
                        autoFocus
                        inputRef={register}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Correo electrónico"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        inputRef={register}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Contraseña"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        inputRef={register}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Registrarse
                    </Button>
                </form>
                <button onClick={() => setModoregistro(false)}>
                    CERRAR
                </button>
            </div>
        </Container>
    );
}