import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { FaFacebookF, FaInstagram, FaTwitter, FaBoxOpen } from "react-icons/fa";
import { LuNotebookPen } from "react-icons/lu";
import { useRecoilState } from 'recoil';
import { userAtom } from '../../Atoms/userAtom';
import { useNavigate } from 'react-router';
import { CountNotes } from '../../Atoms/CountNotes';

function BasicExample() {
  let navigate =useNavigate()

      let [Token,setToken]  =useRecoilState(userAtom)
            let [notes,setNotes]  =useRecoilState(CountNotes)
      

      const handleLogout = () => {
        localStorage.removeItem("token");
        setToken(null); 
        navigate('/SignIn');
      };
  
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/" className="fw-bolder fs-2 d-flex align-items-center">
          Sticky App
          
          <span className="p-2">
            <LuNotebookPen />
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="d-flex justify-content-between w-100">
            {Token? <Nav className="d-flex align-items-center">
              <span className="p-3 position-relative">
                <span className="position-absolute top-0 fw-medium">
                  {notes}
                </span>
                <FaBoxOpen color="blue" size={20} />
              </span>
              <Nav.Link href="/Logout" className="signup text-primary fs-5" onClick={handleLogout}>Logout</Nav.Link>
            </Nav>
            :
            <Nav className="d-flex align-items-center">
              <Nav.Link href="/SignIn" className="signin text-primary fs-5">Sign In</Nav.Link>
              <Nav.Link href="/SignUp" className="signup text-primary fs-5">Register</Nav.Link>
            </Nav>}
            
            <div className="p-3 d-flex">
                <FaFacebookF size={20} className="mx-2" />
                <FaInstagram size={20} className="mx-2" />
                <FaTwitter size={20} className="mx-2" />
              </div>
            
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
