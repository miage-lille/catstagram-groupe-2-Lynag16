import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import ModalPortal from './modal';
import { picturesSelector, selectedPictureSelector } from '../reducer'; 
import { Picture } from '../types/picture.type';
import { selectPicture, closeModal } from '../actions';

const Container = styled.div`
  padding: 1rem;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
`;

const Image = styled.img`
  margin: 10px;
  object-fit: contain;
  transition: transform 1s;
  max-width: fit-content;
  &:hover {
    transform: scale(1.2);
  }
`;

const Pictures = () => {
  const pictures = useSelector(picturesSelector);
  const selectedPicture = useSelector(selectedPictureSelector); 
  const dispatch = useDispatch();

  if (pictures.status === 'loading') {
    return <div>Loading...</div>;
  }

  if (pictures.status === 'failure') {
    return <div>Error: {pictures.error}</div>;
  }

  return (
    <Container>
      {pictures.data.map((picture: Picture) => (
        <Image
          key={picture.previewFormat}
          src={picture.previewFormat}
          alt={picture.author}
          onClick={() => dispatch(selectPicture(picture))} 
        />
      ))}
      {selectedPicture && (
        <ModalPortal
          largeFormat={selectedPicture.largeFormat} 
          close={() => dispatch(closeModal())} 
        />
      )}
    </Container>
  );
};

export default Pictures;


