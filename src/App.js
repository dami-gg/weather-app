import React from 'react';
import './App.css';
import xhr from 'xhr';
import Plot from './Plot.js';

class App extends React.Component {
  state = {
    location: '',
    data: {},
    dates: [],
    temps: [],
    selected: {
      date: '',
      temp: null
    }
  };

  fetchData = (event) => {
    event.preventDefault();

    var location = encodeURIComponent(this.state.location);

    var urlPrefix = 'http://api.openweathermap.org/data/2.5/forecast?q=';
    var urlSuffix = '&APPID=85fa5281c2772ffb08d84752a4e1181d&units=metric';
    var url = urlPrefix + location + urlSuffix;

    var self = this;

    xhr({
      url: url
    }, function (err, data) {
      var body = JSON.parse(data.body);
      var list = body.list;
      var dates = [];
      var temps = [];
      for (var i = 0; i < list.length; i++) {
        dates.push(list[i].dt_txt);
        temps.push(list[i].main.temp);
      }

      self.setState({
        data: body,
        dates: dates,
        temps: temps,
        selected: {
          date: '',
          temp: null
        }
      });
    });
  };

  changeLocation = (event) => {
    this.setState({
      location: event.target.value
    });
  };

  onPlotClick = (data) => {
    if(data.points) {
      this.setState({
        selected: {
          date: data.points[0].x,
          temp: data.points[0].y
        }
      });
    }
  };

  render() {
    var currentTemp = 'not loaded yet';
    if (this.state.data.list) {
      currentTemp = this.state.data.list[0].main.temp;
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
                value={this.state.location}
                onChange={this.changeLocation}
            />
          </label>
        </form>

        {/*
         Render the current temperature and the forecast if we have data
         otherwise return null
         */}
        {(this.state.data.list) ? (
            <div className="wrapper">
              <p className="temp-wrapper">
                <p>
                  <span className="temp">
                    { this.state.selected.temp ? this.state.selected.temp : currentTemp }
                  </span>
                  <span className="temp-symbol">°C</span>
                </p>
                <p className="temp-date">
                  { this.state.selected.temp ? this.state.selected.date : '' }
                </p>
              </p>
              <h2>Forecast</h2>
              <Plot
                  xData={this.state.dates}
                  yData={this.state.temps}
                  onPlotClick={this.onPlotClick}
                  type="scatter"
              />
            </div>
        ) : null}

      </div>
    );
  }
}

export default App;

