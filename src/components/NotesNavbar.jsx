import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/Authentication/AuthActions';
import getAbsolutePathUrl from '../utils/URLManager';
import { Navbar, Nav, Container, Spinner } from 'react-bootstrap';


function NotesNavbar(props) {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => !!state.auth.token);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logout());
    navigate(getAbsolutePathUrl());
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href={getAbsolutePathUrl()}>Notes CRUD</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="me-auto">
            {!isAuthenticated && (
              <>
                <Nav.Link as={NavLink} to={getAbsolutePathUrl()}>
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to={getAbsolutePathUrl("signup")}>
                  Sign up
                </Nav.Link>
              </>
            )}
            {isAuthenticated && (
              <>
                <Nav.Link as={NavLink} to={getAbsolutePathUrl("notes/")}>
                  Notes
                </Nav.Link>
                <Nav.Link as={NavLink} to={getAbsolutePathUrl("notes/archived/")}>
                  Archive
                </Nav.Link>
                <Nav.Link variant="light" onClick={handleLogout}>
                  Logout
                </Nav.Link>
              </>
            )}
            {props.navigationState === 'loading' && <Spinner animation="border" role="status" variant="dark">
                <span className="visually-hidden">Loading...</span>
            </Spinner>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NotesNavbar;