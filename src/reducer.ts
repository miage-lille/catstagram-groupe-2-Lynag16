import { Picture } from './types/picture.type';

type Increment = { type: 'INCREMENT' };
type Decrement = { type: 'DECREMENT' };

const increment = (): Increment => ({ type: 'INCREMENT' });
const decrement = (): Decrement => ({ type: 'DECREMENT' });

type Actions = Increment | Decrement;

export type State = {
  counter: number;
  pictures: Picture[];
  selectedPicture: Picture | null;
};

export const defaultState: State = {
  counter: 0,
  pictures: [],
  selectedPicture: null,
};

const reducer = (state: State | undefined, action: Actions): State => {
  if (!state) return defaultState; // mandatory by redux
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        counter: state.counter + 1,
        pictures: state.pictures.slice(0, state.counter + 1),
      };
    case 'DECREMENT':
      return {
        ...state,
        counter: state.counter - 1,
        pictures: state.pictures.slice(0, state.counter - 1),
      };
    case 'FETCH_CATS_COMMIT':
      return {
        ...state,
        pictures: action.payload,
      };
    case 'SELECT_PICTURE':
      return {
        ...state,
        selectedPicture: action.payload,
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        selectedPicture: null,
      };
    default:
      return state;
  }
};

export { increment, decrement, reducer };
