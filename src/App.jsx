import React, { Fragment } from 'react';
import logo from './logo.svg';
import Spinner from './component/Spinner'
import Services from './utils/api';
import './App.css';

//Images

import Planet1 from './img/planet_1.png';
import Planet2 from './img/planet_2.png';
import Planet3 from './img/planet_3.png';
import Planet4 from './img/planet_4.png';
import Planet5 from './img/planet_5.png';
import Planet6 from './img/planet_6.png';
import Planet7 from './img/planet_7.png';
import Planet8 from './img/planet_8.png';
import Planet9 from './img/planet_9.png';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      planets:null,
      planetsPics: [
        {pic1:Planet1},
        {pic2:Planet2},
        {pic3:Planet3},
        {pic4:Planet4},
        {pic5:Planet5},
        {pic6:Planet6},
        {pic7:Planet7},
        {pic8:Planet8},
        {pic9:Planet9},
      ],
      planetCard: null,
    }
  }

  apiServices = new Services();

  componentDidMount() {
    this.updatePlanet();
  }
  
  updatePlanet = () => {
    this.apiServices.getPlanets()
    .then((res) => {
      this.setState({ 
        ...this.state,
        planets: res,
        planetCard: res[0],
      });
      console.log(this.state)
    })
  };

  changePlanet = (key) => {
    const planets = this.state.planets;

    const planetCard = planets.filter((item, index) => index === key)[0];
    
    this.setState({
      ...this.state,
      planetCard
    })
  };

  render() {

    const { planets=[], planetCard={} } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <DataBlock>
            <ListPlanet 
              onChangePlanet={this.changePlanet} 
              planets={planets}
            />

            <Planet planet={planetCard}/>
          </DataBlock>
        </header>
      </div>
    );
  }
}

function ListPlanet({planets, onChangePlanet}) {
  if(planets === null) {
      return(
          <Spinner/>
      )
  } else {
      return (
          <div>
              <h3>Список планет</h3>
              <div className='planet_list'>
                  {
                      planets.map((item, index) => 
                          <span 
                            onClick={() => onChangePlanet(index)}
                            href="/" 
                            className='planet-item' 
                            key={index}
                          > 
                              {item.name}
                          </span>
                      )
                  }
              </div>
          </div>
      )
  }
}

function DataBlock({children}) {
  return(
      <div className='data-block'>
        {children}
      </div>
  )
};

function Planet (props) {

    const { planet={} } = props

    if(planet == null) {
      return (
        <div></div>
      )
    }
    return (
      <div className="planet">
          <img alt='planet' src={Planet1}/>
          <h3 className="planet-name">{planet.name}</h3>

          <div className="planet-info">
            <span className="planet-info__item">
              Rotation period:
            </span>
            <span className="planet-info__item-text">
              {planet.rotation_period}
            </span>
          </div>

          <div className="planet-info">
            <span className="planet-info__item">
              Orbital period:
            </span>
            <span className="planet-info__item-text">
              {planet.orbital_period}
            </span>
          </div>

          <div className="planet-info">
            <span className="planet-info__item">
              Diameter:
            </span>
            <span className="planet-info__item-text">
              {planet.diameter}
            </span>
          </div>

          <div className="planet-info">
            <span className="planet-info__item">
              Population:
            </span>
            <span className="planet-info__item-text">
              {planet.population}
            </span>
          </div>
      </div>
    );
  }

export default App;
