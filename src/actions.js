export function setData(data) {
  return {
    type: 'SET_DATA',
    data: data
  }
}

export function setDates(dates){
  return {
    type: 'SET_DATES',
    dates: dates
  }
}

export function setTemperatures(temperatures) {
  return {
    type: 'SET_TEMPERATURES',
    temperatures: temperatures
  }
}

export function changeLocation(location) {
  return {
    type: 'CHANGE_LOCATION',
    location: location
  };
}

export function setSelectedDate(date) {
  return {
    type: 'SET_SELECTED_DATE',
    date: date
  };
}

export function setSelectedTemperature(temperature) {
  return {
    type: 'SET_SELECTED_TEMPERATURE',
    temperature: temperature
  }
}

