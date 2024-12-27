import React, { useState } from 'react';
import "./SignUp.module.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import photo from '../../img/icon-register-800x600.webp';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function SignUp() {
  let navigate =useNavigate()
  
  async function submitFormik(values) {
    console.log(values);
    try {
      let res = await axios.post('https://note-sigma-black.vercel.app/api/v1/users/signUp', values);
      console.log(res);
      navigate("/SignIn")
    } catch (error) {
      console.log(error);
    }
  }

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
    age: Yup.number().required("Age is required").min(18, "You must be 18 years old or older"),
    phone: Yup.string().required("Phone number is required").matches(/^01[0125][0-9]{8}$/, "Invalid phone number")
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      phone: ""
    },
    onSubmit: submitFormik,
    validationSchema
  });

  return (
    <Container>
      <Row>
        <Col md={6} className="p-3 d-flex justify-content-center align-content-center">
          <img src={photo} className="p-10 w-100" alt="Register" />
        </Col>
        <Col md={6}>
          <Form className="p-3" onSubmit={formik.handleSubmit}>
            <Form.Group as={Col}>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Name"
                value={formik.values.name}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                isInvalid={formik.touched.name && formik.errors.name}
              />
              {formik.touched.name && formik.errors.name && (
                <Form.Control.Feedback type="invalid">
                  {formik.errors.name}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                isInvalid={formik.touched.email && formik.errors.email}
              />
              {formik.touched.email && formik.errors.email && (
                <Form.Control.Feedback type="invalid">
                  {formik.errors.email}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={formik.values.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                isInvalid={formik.touched.password && formik.errors.password}
              />
              {formik.touched.password && formik.errors.password && (
                <Form.Control.Feedback type="invalid">
                  {formik.errors.password}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                name="age"
                placeholder="Age"
                value={formik.values.age}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                isInvalid={formik.touched.age && formik.errors.age}
              />
              {formik.touched.age && formik.errors.age && (
                <Form.Control.Feedback type="invalid">
                  {formik.errors.age}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                placeholder="Phone"
                value={formik.values.phone}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                isInvalid={formik.touched.phone && formik.errors.phone}
              />
              {formik.touched.phone && formik.errors.phone && (
                <Form.Control.Feedback type="invalid">
                  {formik.errors.phone}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Button type="submit" className="mt-3">Submit</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
