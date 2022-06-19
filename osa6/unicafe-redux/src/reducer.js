const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case "GOOD":
      initialState.good = initialState.good + 1;
      return initialState;
    case "OK":
      initialState.ok = initialState.ok + 1;
      return initialState;
    case "BAD":
      initialState.bad = initialState.bad + 1;
      return initialState;
    case "ZERO":
      Object.keys(initialState).forEach(i => initialState[i] = 0);
      return initialState;
    default:
      return state;
  }
}

export default counterReducer