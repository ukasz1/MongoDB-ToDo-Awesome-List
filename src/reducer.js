const reducer = (state, action) => {
  if (action.type === 'kasuj') {
    return { ...state, loading: false }
  }

  return { ...state }
}

export default reducer;