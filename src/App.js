// node pkgs and files
import React, { Component } from 'react'
import axios from 'axios'
import './App.css'

// components
import Search from './Components/Search'
import Map from './Components/Map'
import Header from './Components/Header'

class App extends Component {

  state = {
    allPlaces: [],
    places: [],
    markers: [],
    latLong: "29.424349, -98.491142",
    isLoading: true,
    errors: null
  }

  componentDidMount() {
    this.getPlaces("coffee", "San Antonio")
  }

  loadMap = () => {
    loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyB2zYe9o94C1ECzcD8Kv7gQEKhAaDHuwo0&callback=initMap')
    window.initMap = this.initMap
  }

  getPlaces = (query, location) => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const params = {
      client_id: "G04GDHOHNV44SCN05HBQDM0TACJMTYVR13OWDX4NJ3N3JUWL",
      client_secret: "KE10VXIQUO1L2FFLOKYWDHTZOKNU23RFRFNXEMYMX1E31QM4",
      query: query,
      near: location,
      v: "20190122"
    }

  // Fetch
  axios.get(endPoint + new URLSearchParams(params))
    .then(response => {
      this.setState({
        allPlaces: response.data.response.groups[0].items,
        places: response.data.response.groups[0].items,
        isLoading: false
      }, this.loadMap)
    })
    .catch(error =>
      this.setState({ error, isLoading: false })
      alert("Hello! I am an alert box!!")
    )
  }


  /* Map */
  initMap = () => {

    // Show Map
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 29.424349, lng: -98.491142},
      zoom: 10
    })

    let infowindow = new window.google.maps.InfoWindow()

    this.state.places.forEach((place) => {

      // Create Markers
      let marker = new window.google.maps.Marker({
        position: {lat: place.venue.location.lat, lng: place.venue.location.lng},
        map: map,
        animation: window.google.maps.Animation.DROP,
        title: place.venue.name
      })

      // Add each created marker to the 'markers' array
      this.state.markers.push(marker)

      // Create InfoWindow
      let content = `
        <h1>${place.venue.name}</h1>
        <p>Address: ${place.venue.location.formattedAddress[0]} ${place.venue.location.formattedAddress[1]}</p>
        <p>lat: ${place.venue.location.lat}, long: ${place.venue.location.lng}</p>
        `

      // Display the InfoWindow after clicking on the Marker
      marker.addListener('click', function() {

        // Update 'InfoWindow' content
        infowindow.setContent(content)

        // Open An 'InfoWindow'
        infowindow.open(map, marker)

        // Animate The Marker
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(window.google.maps.Animation.BOUNCE);
        }
      })
    })

  }

  updatePlaces = (newPlaces) => {
    this.setState({places: newPlaces})
  }

  render() {
    return (
      <div>
        <Header/>
        <main>
          <Search
              places={this.state.allPlaces}
              markers={this.state.markers}
              updatePlaces={this.updatePlaces}
          />
          <Map/>
        </main>
        <footer className="App-footer">
          <h6> By <a href="https://github.com/terribedore">@terribedore</a>. Map provided by Google Maps API. Marker information provided by FourSquare.</h6>
        </footer>
      </div>
    )
  }
}

function loadJS(src) {
  var ref = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = src;
  script.async = true;
  ref.parentNode.insertBefore(script, ref);
}

//document.getElementById("map").onerror = function() {myFunction()};
//function myFunction() {
//  document.getElementById("map").innerHTML = "The map could not be loaded.";
//}


export default App