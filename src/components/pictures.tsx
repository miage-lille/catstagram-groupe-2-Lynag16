import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { selectPicture } from '../actions';
import { Picture } from '../types/picture.type';
import ModalPortal from './modal';

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

const picturesSelector = (state: { pictures: Picture[] }) => state.pictures;
const selectedPictureSelector = (state: { selectedPicture: Picture | null }) => state.selectedPicture;

const Pictures = () => {
  const pictures = useSelector(picturesSelector);
  const selectedPicture = useSelector(selectedPictureSelector);
  const dispatch = useDispatch();

  return (
    <Container>
      {pictures.map((picture) => (
        <Image
          key={picture.previewFormat}
          src={picture.previewFormat}
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
