import React from 'react';
import './App.css';
import xhr from 'xhr';
import Plot from './Plot.js';
import {connect} from 'react-redux';
import {
    changeLocation,
    setSelectedDate,
    setSelectedTemperature,
    setData,
    setDates,
    setTemperatures
} from './actions';

class App extends React.Component {
  fetchData = (event) => {
    event.preventDefault();

    var location = encodeURIComponent(this.props.location);

    var urlPrefix = 'http://api.openweathermap.org/data/2.5/forecast?q=';
    var urlSuffix = '&APPID=85fa5281c2772ffb08d84752a4e1181d&units=metric';
    var url = urlPrefix + location + urlSuffix;

    var self = this;

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

      self.props.dispatch(setData(body));
      self.props.dispatch(setDates(dates));
      self.props.dispatch(setTemperatures(temperatures));
      self.props.dispatch(setSelectedDate(''));
      self.props.dispatch(setSelectedTemperature(null));
    });
  };

  changeSearchedLocation = (event) => {
    this.props.dispatch(changeLocation(event.target.value));
  };

  onPlotClick = (data) => {
    if (data.points) {
      var number = data.points[0].pointNumber;
      this.props.dispatch(setSelectedDate(this.props.dates[number]));
      this.props.dispatch(setSelectedTemperature(this.props.temperatures[number]));
    }
  };

  render() {
    var currentTemperature = 'Data has not been loaded yet';
    if (this.props.data.list) {
      currentTemperature = this.props.data.list[0].main.temp;
    }
    return (
        <div>

          <h1>Weather</h1>
          <form onSubmit={this.fetchData}>
            <label>
              <p>I want to know the weather for</p>
              <input
                  placeholder={"City, Country"}
                  type="text"
                  value={this.props.location}
                  onChange={this.changeSearchedLocation}
              />
            </label>
          </form>

          {/*
           Render the current temperature and the forecast if we have data
           otherwise return null
           */}
          {(this.props.data.list) ? (
              <div>
                {
                  this.props.selected.temperature
                      ? <p>The temperature on { this.props.selected.date } will be { this.props.selected.temperature } °C</p>
                      : <p>The current temperature is { currentTemperature } °C</p>
                }
                <h2>Forecast</h2>
                <Plot
                    xData={this.props.dates}
                    yData={this.props.temperatures}
                    onPlotClick={this.onPlotClick}
                    type="scatter"
                />
              </div>
          ) : null}

        </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(App);

