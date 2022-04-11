const reducer = (state, action) => {
  if (action.type === 'loaded') {
    return { ...state, loading: false }
  }

  return { ...state }
}

export default reducer;