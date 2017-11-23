export default (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      console.log("! " + JSON.stringify(action));
      return state + 1
    case 'INCREMENT_IF_ODD':
      return (state % 2 !== 0) ? state + 1 : state
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}
