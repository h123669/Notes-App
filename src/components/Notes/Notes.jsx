import React, { useState } from 'react'
import "./Notes.module.css"
import { Button, Card, Col, FloatingLabel, Modal } from 'react-bootstrap'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';

export default function Notes({ele,handeldelete,handelUpdate}) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const formik = useFormik({
        initialValues: {
          title: "",
          content: ""
        },
        onSubmit: () => {
          handelUpdate(ele._id,formik.values)
          handleClose();
          formik.resetForm()
        }
      });
    
  return (
  <>
    <Col md={3} key={ele._id}>
            <Card>
      <Card.Body>
        <Card.Title>{ele.title}</Card.Title>
        <Card.Text>{ele.content}</Card.Text>
        
        <Card.Link onClick={handleShow}  ><FaEdit color='blue'/></Card.Link>
        
        <Card.Link onClick={()=>{
          handeldelete(ele._id)
        }} ><FaTrash color='blue'/></Card.Link>
      </Card.Body>
    </Card>
          

    </Col>
    <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Note</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Note title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                />
              </Form.Group>

              <FloatingLabel className='mt-3' label="Leave a Note here" controlId="floatingTextarea2">
                <Form.Control
                  as="textarea"
                  placeholder="Leave a Note here"
                  name="content"
                  value={formik.values.content}
                  onChange={formik.handleChange}
                  style={{ height: '100px'}} 
                />
              </FloatingLabel>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="info" className='text-white' onClick={formik.handleSubmit}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>
    </>



)
}
