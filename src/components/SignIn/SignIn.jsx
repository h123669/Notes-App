import React, { useState } from 'react'
import "./SignIn.module.css"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import photo from '../../img/clip-message-sent 1.png'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useRecoilState } from 'recoil';
import { userAtom } from '../../Atoms/userAtom';

export default function SignIn() {
    let navigate =useNavigate()
    let [Token,setToken]  =useRecoilState(userAtom)
  async function submitformik(val) {
    try {
      let res = await axios.post('https://note-sigma-black.vercel.app/api/v1/users/signIn', val);
      console.log(res.data.msg);
      
      if(res.data.msg == "done"){
        localStorage.setItem("token",res.data.token)
        setToken(res.data.token)
        navigate("/")
      }
      
    } catch (error) {
      console.log(error);
    }
  }
   const validationSchema = Yup.object({
      email: Yup.string().email("Invalid email format").required("Email is required"),
      password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
      
    });



  let formik =useFormik({
    initialValues:{
      email:"",
      password:""
    },
    onSubmit:submitformik,
    validationSchema

  })
  return <>
  <Container>
  <Row>
  <Col md={6}>
    <Form className='p-3' onSubmit={formik.handleSubmit}>
        <Form.Group as={Col}>
          <Form.Label>email</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid ={formik.errors.email && formik.touched.email}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.email}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label >password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.errors.password && formik.touched.password}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.password}
          </Form.Control.Feedback>
        </Form.Group>
      <Button type="submit" className='mt-3'>Submit</Button>
    </Form>
    </Col>
    <Col md={6} className='p-3 d-flex justify-content-center align-content-center'>
    <img src={photo} className='p-10 w-100' alt="" />
    </Col>
    
  </Row>
</Container>
  
  </>
}
