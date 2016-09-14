import xhr from 'xhr';

export function setData(data) {
  return {
    type: 'SET_DATA',
    data: data
  }
}

export function setDates(dates) {
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

export function fetchData(url) {
  return function thunk(dispatch) {
    xhr({
      url: url
    }, function (err, data) {
      var body         = JSON.parse(data.body),
          list         = body.list,
          dates        = [],
          temperatures = [];

      for (var i = 0; i < list.length; i++) {
        dates.push(list[i].dt_txt);
        temperatures.push(list[i].main.temp);
      }

      dispatch(setData(body));
      dispatch(setDates(dates));
      dispatch(setTemperatures(temperatures));
      dispatch(setSelectedDate(''));
      dispatch(setSelectedTemperature(null));
    });
  }
}

