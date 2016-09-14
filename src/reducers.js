var initialState = {
  location: '',
  data: {},
  dates: [],
  temps: [],
  selected: {
    date: '',
    temperature: null
  }
};

export default function mainReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_DATA':
      return Object.assign({}, state, {
        data: action.data
      });
    case 'SET_DATES':
      return Object.assign({}, state, {
        dates: action.dates
      });
    case 'SET_TEMPERATURES':
      return Object.assign({}, state, {
        temperatures: action.temperatures
      });
    case 'CHANGE_LOCATION':
      return Object.assign({}, state, {
        location: action.location
      });
    case 'SET_SELECTED_DATE':
      return Object.assign({}, state, {
        date: action.date,
        temperature: state.selected.temperature
      });
    case 'SET_SELECTED_TEMPERATURE':
      return Object.assign({}, state, {
        temperature: action.temperature,
        date: state.selected.date
      });
    default:
      return state;
  }
}
