import React from 'react';
import NotFoundImage from '@/assets/NotFoundImage.jpg'; 
import { useTranslation } from 'react-i18next';

function NotFound() {
  const {t} = useTranslation();
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Row className="text-center">
        <Col>
          
          <img 
            src={NotFoundImage} 
            alt="Страница не найдена" 
            className="img-fluid mb-4"
            style={{ maxWidth: '400px' }}
          />
          
          <h2 className="mb-3">404 - Страница не найдена</h2>
          <p className="lead mb-4">Извините, запрашиваемая страница не существует.</p>
          
          <Link 
            to="/" 
            className="btn btn-primary"
            style={{ 
              backgroundColor: '#eec111', 
              border: 'none',
              padding: '10px 25px'
            }}
          >
            Вернуться на главную
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default NotFound;