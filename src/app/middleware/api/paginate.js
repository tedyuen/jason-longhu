const paginate = ({ types, cleanType }) => {
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected types to be an array of three elements.')
  }
  if (!types.every(t => typeof t === 'string')) {
    throw new Error('Expected types to be strings.')
  }

  const [ requestType, successType, failureType ] = types
  
  return  (state = {
    isFetching: false,
    fetchStatus:requestType
  }, action) => {
    switch (action.type) {
      case requestType:
        return {
          ...state,
          fetchStatus:requestType,
          isFetching:true,
          error:action.error,
          payload:action.payload
        }
      case successType:
        return {
          ...state,
          isFetching:false,
          fetchStatus:successType,
          payload: action.payload
        }
      case failureType:
        return {
          ...state,
          fetchStatus:failureType,
          isFetching:false,
          error:action.error
        }
      case cleanType:
        return {
          ...state,
          fetchStatus:cleanType,
          isFetching:false,
          payload:undefined
        }
      default:
        return state
    }
  }
}

export default paginate
