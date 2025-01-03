import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from 'axios';

const Register = () => {
    const [formdata, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        gender: "",
        role: "",
    });

    const [validationErrors, setValidationErrors] = useState({});

    const handleChange = (e) => {
        setFormData({...formdata, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register', formdata, {
                headers: {
                    'Content-Type': 'application/json'
                }
            } );

            const responseData = await response.json();

            if(response.ok) {
                setValidationErrors({});
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: responseData.message,
                }).then(()=> {
                    window.location.href = "/login";
                })
            } else {
                setValidationErrors(responseData);
                if(responseData) {
                    setValidationErrors(responseData);
                }
                else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: responseData || "Registration failed.",
                    });
                }
            }


        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "An error occurred during registration",
            });
        }
    }

    const imagePath = `${import.meta.env.PUBLIC_URL}/images/bg-image.webp`;

    return (
        <section className="vh-100 bg-image" style={{ backgroundImage: `url('${imagePath}')`  }}>
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div className="card" style={{ borderRadius: '15px' }}>
                                <div className="card-body p-5">
                                    <h2 className="text-uppercase text-center mb-5">Create an account</h2>
                                    <form method="POST" onSubmit={handleSubmit}>
                                        <div className="form-outline mb-4">
                                            <input type="text" name="name" placeholder="Enter Full Name" className="form-control form-control-lg" onChange={handleChange} />
                                            {validationErrors.name && <span className="text-danger">{validationErrors.name[0]}</span>}
                                        </div>
                                        <div className="form-outline mb-4">
                                            <input type="email" name="email" placeholder="Enter Email" className="form-control form-control-lg" onChange={handleChange} />
                                            {validationErrors.email && <span className="text-danger">{validationErrors.email[0]}</span>}
                                        </div>
                                        <div className="form-outline mb-4">
                                            <input type="password" name="password" placeholder="Enter Password" className="form-control form-control-lg" onChange={handleChange} />
                                            {validationErrors.password && <span className="text-danger">{validationErrors.password[0]}</span>}
                                        </div>
                                        <div className="form-outline mb-4">
                                            <input type="text" name="gender" placeholder="Enter Gender" className="form-control form-control-lg" onChange={handleChange} />
                                            {validationErrors.gender && <span className="text-danger">{validationErrors.gender[0]}</span>}
                                        </div>
                                        <div className="form-outline mb-4">
                                            <input type="text" name="role" placeholder="Enter Role" className="form-control form-control-lg" onChange={handleChange} />
                                            {validationErrors.role && <span className="text-danger">{validationErrors.role[0]}</span>}
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <button type="submit" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                                        </div>
                                    </form>
                                    <p className="text-center text-muted mt-5 mb-0">Have already an account? <a className="fw-bold text-body" href="/login"><u>Login here</u></a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register;