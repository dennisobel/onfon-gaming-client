import React, { useState } from "react";
import {
    TextField,
    Card,
    Button,
    InputLabel
} from "@mui/material";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../helper";
import { useDispatch } from "react-redux";
import { setSignup } from "../../state";
import jwt_decode from "jwt-decode";

import "./style.scss";

function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        msisdn: "",
        password: "",
    });

    const [formErrors, setFormErrors] = useState({
        name: false,
        email: false,
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
            name: validator.isEmpty(formValues.name),
            msisdn: validator.isEmpty(formValues.msisdn),
            email: !validator.isEmail(formValues.email),
            password: validator.isEmpty(formValues.password),
        };

        setFormErrors(errors);

        if (!Object.values(errors).some(Boolean)) {
            console.log("Form submitted successfully:", formValues);
            let registerPromise = registerUser(formValues)
            dispatch(setSignup(formValues))
            registerPromise.then(res => navigate('/login'));
            // setTimeout(() => {
            //   navigate("/login");
            // }, 2000);
          }
    };

    return (
        <div class="signupContainer">
            <h2 class="title">Sign Up</h2>
            <Card sx={{ maxWidth: 500, margin: "0 auto", mt: 5, p: 3 }}>
                <form class="signupForm" onSubmit={handleSubmit}>
                    <div class="formGroup">
                        <InputLabel id="select-label">Name</InputLabel>
                        <TextField
                            size="small"
                            required
                            fullWidth
                            margin="normal"
                            name="name"
                            value={formValues.name}
                            onChange={handleChange}
                            error={formErrors.name}
                            helperText={formErrors.name && "Please enter your name"}
                        />
                    </div>
                    <div class="formGroup">
                        <InputLabel id="select-label">Phone Number</InputLabel>
                        <TextField
                            size="small"
                            required
                            fullWidth
                            margin="normal"
                            name="msisdn"
                            type="text"
                            value={formValues.msisdn}
                            onChange={handleChange}
                            error={formErrors.msisdn}
                            helperText={formErrors.msisdn && "Please enter a valid phone_number"}
                        />
                    </div>
                    <div class="formGroup">
                        <InputLabel id="select-label">Email</InputLabel>
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
                            helperText={formErrors.email && "Please enter a valid email address"}
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
                        Already have an account? <a href="/login">Log in</a>
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
                        Create User
                    </Button>

                </form>
            </Card>
        </div>
    )
}

export default Signup