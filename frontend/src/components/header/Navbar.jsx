import React from 'react';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

const navBar = () => {
    const { t } = useTranslation();
    const token = localStorage.getItem("token");
    const navigate = useNavigate();


    const logout = () => {
        try {
          localStorage.removeItem("token"); // Удаляем только токен
        navigate("/login");
        } catch (error) {
        console.error("Ошибка при выходе:", error);
        }
    };

return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container fluid>
      <Navbar.Brand href="/" style={{ color: '#333', marginLeft: '43rem' }}>Hexlet Chat</Navbar.Brand>
      </Container>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {token ? (
            <Button variant="outline-danger" onClick={logout}> {}
              {t("logout")}
            </Button>
          ) : null}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default navBar;
