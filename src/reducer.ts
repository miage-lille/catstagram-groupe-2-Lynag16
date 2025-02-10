type Increment = { type: 'INCREMENT' };
type Decrement = { type: 'DECREMENT' };

const increment = (): Increment => ({ type: 'INCREMENT' });
const decrement = (): Decrement => ({ type: 'DECREMENT' });

type Actions = Increment | Decrement;

export type State = {
  counter: number;
};

export const defaultState: State = {
  counter: 0
};

const reducer = (state: State | undefined, action: Actions): State => {
  if (!state) return defaultState; // mandatory by redux
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, counter: state.counter + 1 };
    case 'DECREMENT':
      return state.counter > 3 ? { ...state, counter: state.counter - 1 } : state;
    default:
      return state;
  }
};

export { increment, decrement, reducer };
