export const peldaReducer = (state, action) => {
  switch(action.type){
    case "asd":
      return {
        ...state,
        expenses: [...expenses, action.payload]
      }
      default:
        return state;
  }
}