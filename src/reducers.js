import { fromJS } from 'immutable';

var initialState = fromJS({
  location: '',
  data: {},
  dates: [],
  temps: [],
  selected: {
    date: '',
    temperature: null
  }
});

export default function mainReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_DATA':
      return state.set('data', fromJS(action.data));

    case 'SET_DATES':
      return state.set('dates', fromJS(action.dates));

    case 'SET_TEMPERATURES':
      return state.set('temperatures', fromJS(action.temperatures));

    case 'CHANGE_LOCATION':
      return state.set('location', action.location);

    case 'SET_SELECTED_DATE':
      return state.setIn(['selected', 'date'], action.date);

    case 'SET_SELECTED_TEMPERATURE':
      return state.setIn(['selected', 'temperature'], action.temperature);

    default:
      return state;
  }
}
