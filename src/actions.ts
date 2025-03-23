import {Picture} from './types/picture.type';
import { Decrement, FetchCatsCommit, FetchCatsRequest, FetchCatsRollback, Increment, SelectPicture, CloseModal } from './types/actions.type';

export const increment = (): Increment => ({ type: 'INCREMENT' });
export const decrement = (): Decrement => ({ type: 'DECREMENT' });

export const fetchCatsRequest = (): FetchCatsRequest => ({
  type: 'FETCH_CATS_REQUEST',
  method: 'GET',
  path: 'https://pixabay.com/api/?key=49486934-327a164e6009d95bc0b57ce51&per_page=[counter_value]&q=cat',
}); 

export const fetchCatsCommit = (payload: Picture[]): FetchCatsCommit => ({ type: 'FETCH_CATS_COMMIT', payload }); 

export const fetchCatsRollback = (error: Error): FetchCatsRollback => ({ type: 'FETCH_CATS_ROLLBACK', error });

export const selectPicture = (payload: Picture): SelectPicture => ({ type: 'SELECT_PICTURE', payload });

export const closeModal = (): CloseModal => ({ type: 'CLOSE_MODAL' });


