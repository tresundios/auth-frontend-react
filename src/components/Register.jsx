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
            });
    
            console.log('Response Status:', response.status);
            console.log('Response Data:', response.data);
    
            // No need for response.json() since axios already parses JSON
    
            if (response.status >= 200 && response.status < 300) {
                // Clear any previous validation errors since the response was successful
                setValidationErrors({});
                
                // Assuming the server sends back a message in the response data
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: response.data.message || "Registration successful!", // Use message if available, otherwise a generic success message
                }).then(() => {
                    window.location.href = "/login";
                });
            } else {
                // Here, we assume that error data from the server includes validation errors or some message
                setValidationErrors(response.data.errors || {});
                
                // Show a generic error if there's no specific message
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: response.data.message || "Registration failed. Please check the form.",
                });
            }
    
        } catch (error) {
            // This catch block will handle network errors or any axios errors where there's no response
            if (error.response) {
                // Server responded with an error status
                setValidationErrors(error.response.data.errors || {});
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: error.response.data.message || "An error occurred during registration",
                });
            } else {
                // Network error or other issues
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "An error occurred during registration. Please try again later.",
                });
            }
        }
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await axios.post('http://127.0.0.1:8000/api/register', formdata, {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         } );

    //         console.log('Response Status:', response.status);
    //         console.log('Response Data:', response.data);

    //         //const responseData = await response.json();

    //         if(response.status >= 200 && response.status < 300) {
    //             setValidationErrors({});
    //             Swal.fire({
    //                 icon: "success",
    //                 title: "Success",
    //                 text: responseData.message,
    //             }).then(()=> {
    //                 window.location.href = "/login";
    //             })
    //         } else {
    //             setValidationErrors(response.data);
    //             if(response.data) {
    //                 setValidationErrors(response.data);
    //             }
    //             else {
    //                 Swal.fire({
    //                     icon: "error",
    //                     title: "Error",
    //                     text: response.data || "Registration failed.",
    //                 });
    //             }
    //         }


    //     } catch (error) {
    //         Swal.fire({
    //             icon: "error",
    //             title: "Error",
    //             text: "An error occurred during registration",
    //         });
    //     }
    // }

    const imagePath = `public/images/bg-image.webp`;

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