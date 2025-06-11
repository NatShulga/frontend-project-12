import React from 'react';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { toast } from 'react-toastify'; 
import { useDispatch } from 'react-redux';

const navBar = () => {
    const { t } = useTranslation();
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const dispatch = useDispatch();

  
    const logout = async () => {
        try {
          await dispatch(resetStore());
          localStorage.removeItem('token');
        navigate("/login");
        toast.success(t("Вы успешно вышли"));
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
      <Nav className="ml-auto" style={{ position: 'relative' }}>
  {token && (
    <Button 
      variant="outline-danger"
      onClick={logout}
      className="logout-btn"
      style={{
        position: 'absolute',
        right: '80px',
        top: '-18px',
        backgroundColor: '#eec111',
        color: 'white',
        border: 'none',
      }}
    >
      {t("Выйти")}
    </Button>
  )}
</Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default navBar;
