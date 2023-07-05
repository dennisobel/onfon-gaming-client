import React, { useState } from "react";
import {
    TextField,
    Card,
    Button,
    InputLabel
} from "@mui/material";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import { getUsername, verifyPassword } from "../../../helper";
import { useDispatch } from "react-redux";
import { setLoggedUser } from "../../state";
import jwt_decode from "jwt-decode";

import "./style.scss";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formValues, setFormValues] = useState({
        msisdn: "",
        password: "",
    });

    const [formErrors, setFormErrors] = useState({
        msisdn: false,
        password: false,
    });

    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = {
            email: !validator.isEmail(formValues.email),
            password: validator.isEmpty(formValues.password),
        };

        setFormErrors(errors);

        if (!Object.values(errors).some(Boolean)) {
            let loginPromise = verifyPassword(formValues)
            loginPromise
            .then(res => {
                let { token } = res.data;
                let decoded = jwt_decode(token)
                localStorage.setItem('token', token);
                return decoded
            })
            .then(
                getUsername()
                .then(res => dispatch(setLoggedUser(res)))
                .then(navigate('/otp'))
            )
            
        }
    };

    return (
        <div class="signupContainer">
            <h2 class="title">Login</h2>
            <Card sx={{ maxWidth: 500, margin: "0 auto", mt: 5, p: 3 }}>
                <form class="signupForm" onSubmit={handleSubmit}>
                    <div class="formGroup">
                        <InputLabel id="select-label">Phone Number</InputLabel>
                        <TextField
                            size="small"
                            required
                            fullWidth
                            margin="normal"
                            name="email"
                            type="email"
                            value={formValues.email}
                            onChange={handleChange}
                            error={formErrors.email}
                            helperText={formErrors.email && "Please enter a valid email"}
                        />
                    </div>
                    <div class="formGroup">
                        <InputLabel id="select-label">Password</InputLabel>
                        <TextField
                            size="small"
                            required
                            fullWidth
                            margin="normal"
                            name="password"
                            type="password"
                            value={formValues.password}
                            onChange={handleChange}
                            error={formErrors.password}
                            helperText={formErrors.password && "Please enter your password"}
                        />
                    </div>

                    <p style={{ textAlign: "center", marginTop: "1rem" }}>
                        You don't have an account? <a href="/signup">Sign Up</a>
                    </p>

                    <Button
                        variant="contained"
                        type="submit"
                        sx={{
                            marginTop: 4,
                            paddingX: 4,
                            paddingY: 2,
                            borderRadius: 2,
                            boxShadow: "none",
                            backgroundColor: "teal",
                            color: "#fff",
                            "&:hover": {
                                backgroundColor: "#0039cb",
                                boxShadow: "none",
                            },
                        }}
                    >
                        Login
                    </Button>

                </form>
            </Card>
        </div>
    )
}

export default Login