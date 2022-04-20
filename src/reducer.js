const reducer = (state, action) => {
  if (action.type === 'LOADING') {
    return { ...state, loading: true }
  }
  else if (action.type === 'LOADED') {
    return { ...state, loading: false }
  }

  return { ...state }
}

export default reducer;