import React from 'react';
import './App.css';
import Plot from './Plot.js';
import {connect} from 'react-redux';
import {
    changeLocation,
    setSelectedDate,
    setSelectedTemperature,
    fetchData
} from './actions';

class App extends React.Component {
  fetchWeatherInfo = (event) => {
    event.preventDefault();

    var location = encodeURIComponent(this.props.location);

    var urlPrefix = 'http://api.openweathermap.org/data/2.5/forecast?q=';
    var urlSuffix = '&APPID=85fa5281c2772ffb08d84752a4e1181d&units=metric';
    var url = urlPrefix + location + urlSuffix;

    this.props.dispatch(fetchData(url));
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
          <form onSubmit={this.fetchWeatherInfo}>
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

