import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import NotFoundImage from '../assets/notFoundImage.jpg';

function NotFound() {
  const { t } = useTranslation();
  
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Row className="text-center">
        <Col>
          <img 
            src={NotFoundImage} 
            alt={t("Страница не найдена")} 
            className="img-fluid mb-4"
            style={{ maxWidth: '400px' }}
          />
          
          <h2 className="mb-3">404 - {t("Страница не найдена")}</h2>
          <p className="lead mb-4">{t("Извините, запрашиваемая страница не существует.")}</p>
          
          <Link 
            to="/" 
            className="btn btn-primary"
            style={{ 
              backgroundColor: '#eec111', 
              border: 'none',
              padding: '10px 25px'
            }}
          >
            {t("Вернуться на главную")}
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default NotFound;
