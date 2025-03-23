import styled from 'styled-components';
import ReactDOM from 'react-dom';
import React, { useEffect } from 'react';

const Container = styled.div`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
`;

const Button = styled.button`
  position: absolute;
  top: 15px;
  right: 35px;
  color: white;
  background: transparent;
  border: none;
  font-size: 30px;
  font-weight: bold;
  cursor: pointer;
`;

const Image = styled.img`
  max-width: 90%;
  max-height: 90%;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

interface ModalProps {
  largeFormat: string;
  close(): void;
}

const Modal = ({ largeFormat, close }: ModalProps) => {

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [close]);

  return (
    <Container>
      <Image src={largeFormat} alt="Large format" />
      <Button onClick={close} aria-label="Close modal">
        &times;
      </Button>
    </Container>
  );
};

const portalRoot = document.getElementById('modal-root'); 
const ModalPortal = ({ largeFormat, close }: ModalProps) => {
  if (!portalRoot) {
    console.error('Modal root element not found. Please ensure an element with id "modal-root" exists in your HTML.');
    return null;
  }

  return ReactDOM.createPortal(<Modal largeFormat={largeFormat} close={close} />, portalRoot);
};

export default ModalPortal;