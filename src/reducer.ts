import { Picture } from './types/picture.type';
import { Cmd, loop } from 'redux-loop';
import { cmdFetch } from './commands';

import { Loop, liftState, loop } from 'redux-loop';
import { CloseModal, FetchCatsCommit, FetchCatsRequest, FetchCatsRollback, SelectPicture } from './types/actions.type';
import { fetchCatsCommit, fetchCatsRequest, fetchCatsRollback } from './actions';
import { Loading, Success, Failure } from './types/api.type';

type Increment = { type: 'INCREMENT' };
type Decrement = { type: 'DECREMENT' };

type Actions =
  | Increment
  | Decrement
  | FetchCatsRequest
  | FetchCatsCommit
  | FetchCatsRollback
  | SelectPicture
  | CloseModal;

export type State = {
  counter: number;
  pictures: Loading | Success | Failure;
  selectedPicture: Picture | null;
};

export const defaultState: State = {
  counter: 3,
  pictures: { status: 'success', data: [] }, 
  selectedPicture: null,
};

const reducer = (state: State | undefined, action: Actions): State | [State, Cmd<Actions>] => {
  if (!state) return defaultState;

  switch (action.type) {
    case 'INCREMENT':
    case 'DECREMENT': {
      const newCounter = action.type === 'INCREMENT' ? state.counter + 1 : state.counter - 1;
      if (newCounter < 1) return state; 
      return loop(
        { ...state, counter: newCounter, pictures: { status: 'loading' } },
        cmdFetch({
          type: 'FETCH_CATS_REQUEST',
          method: 'GET',
          path: `https://pixabay.com/api/?key=49486934-327a164e6009d95bc0b57ce51&per_page=${newCounter}&q=cat`,
        }),
      );
    }
    case 'FETCH_CATS_COMMIT': {
      return {
        ...state,
        pictures: { status: 'success', data: action.payload },
      };
    }
    case 'FETCH_CATS_ROLLBACK': {
      return loop(
        { ...state, pictures: { status: 'failure', error: action.error.message } },
        Cmd.run(() => console.error(action.error)),
      );
    }
    case 'SELECT_PICTURE': {
      return {
        ...state,
        selectedPicture: action.payload,
      };
    }
    case 'CLOSE_MODAL': {
      return {
        ...state,
        selectedPicture: null,
      };
    }
    default:
      return state;
  }
};

export const counterSelector = (state: State ) => state.counter;
export const picturesSelector = (state: State )  => state.pictures;
export const selectedPictureSelector = (state: State )  => state.selectedPicture;

export { reducer };