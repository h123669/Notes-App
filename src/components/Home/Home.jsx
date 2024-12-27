import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./Home.module.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { FaPlus } from "react-icons/fa";
import { FloatingLabel } from 'react-bootstrap';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { userAtom } from '../../Atoms/userAtom';
import Notes from '../Notes/Notes';
import HashLoader from './../../../node_modules/react-spinners/esm/HashLoader';
import { CountNotes } from '../../Atoms/CountNotes';
import { useFormik } from 'formik';

export default function Home() {
  let [Token] = useRecoilState(userAtom);
  let [notes, setNotes] = useRecoilState(CountNotes);
  const [getdata, setGetdata] = useState([]);
  const[notfound, setNotfound] = useState(null);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const formik = useFormik({
    initialValues: {
      title: "",
      content: ""
    },
    onSubmit: (values) => AddNotes(values)
  });

  function getNotes() {
    setNotfound(null)
    axios.get("https://note-sigma-black.vercel.app/api/v1/notes", {
      headers: {
        token: `3b8ny__${Token}`
      }
    }).then((res) => {
      if (res.data.msg) {
        setGetdata(res.data.notes);
        setNotes(res.data.notes.length);
      }
    }).catch((err) => {
      console.log(err);
      setNotfound(err.response.data.msg)
    });
  }
  function DelNotes(noteId) {
    axios.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${noteId}`, {
      headers: {
        token: `3b8ny__${Token}`
      }
    }).then((res) => {
      console.log(res);
      
      if (res.data.msg) {
        console.log(res);
      getNotes();
      setNotes(0);
      }
    }).catch((err) => {
      console.log(err);
    });
  }
  function UpdateNotes(noteId,values) {
    axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${noteId}`,values, {
      headers: {
        token: `3b8ny__${Token}`
      }
    }).then((res) => {
      console.log(res);
      
      if (res.data.msg) {
        console.log(res);
        getNotes();
          
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  function AddNotes(values) {
    axios.post('https://note-sigma-black.vercel.app/api/v1/notes', values, {
      headers: {
        token: `3b8ny__${Token}`
      }
    }).then((res) => {
      console.log(res);
      getNotes();
      handleClose();  
      formik.resetForm()
    }).catch((err) => {
      console.log(err);
    });
  }

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <>
    <Container>
      <div className='d-flex justify-content-between'>
          <h2>Notes:</h2>
          <p className='fs-4 py-2'>Notes number: {notes}</p>
        </div>
        <div className='d-flex justify-content-end mt-2'>
          <Button variant="primary" onClick={handleShow}>
            <FaPlus size={30} className='p-2' />
            Add Note
          </Button>
        </div>


        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Note</Modal.Title>
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

              <FloatingLabel controlId="floatingTextarea2" label="Leave a Note here" >

              <Form.Control className='mt-2'
                as="textarea"
                placeholder="Leave a Note here"
                name="content"
                value={formik.values.content || ''}
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
            <Button variant="primary" onClick={formik.handleSubmit}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>

    {notfound == null ?(<>
      
      <Container>
        
        <Row className='gy-2 mt-2'>
          {getdata.length === 0 ?
            <div className='d-flex justify-content-center align-items-center'>
              <HashLoader color="blue" />
            </div>
            : (getdata?.map((ele) => {
              return (
                <Notes ele={ele} handeldelete={DelNotes} handelUpdate={UpdateNotes} key={ele._id} />
              )
            }))}
        </Row>
      </Container>
    </>
      )

    :
      <div className='d-flex justify-content-center align-items-center'>
        <h2 className='text-danger'>{notfound}</h2>
      </div>
      }

    </>
  );
}
