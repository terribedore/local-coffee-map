import React, { Component } from 'react'
import escapeRegExp from 'escape-string-regexp'

// Places Data
class Search extends Component {

    state = {
        query: '',
        places: this.props.places
    }

    updateQuery = (query) => {
        this.setState({ query })

        let allPlaces = this.props.places


        if(this.state.query && (this.state.query !== '')) {
            const match = new RegExp(escapeRegExp(query), 'i');
            let newPlaces = allPlaces.filter((place) => match.test(place.venue.name))
            this.setState({places: newPlaces})
            this.props.updatePlaces(newPlaces)
        } else {
            this.setState({places: allPlaces})
        }
    }

    triggerMarkerClick = (placeTitle) => {
        this.props.markers.forEach((marker) => {
            if(marker.title === placeTitle) {
                window.google.maps.event.trigger(marker, 'click');
            }
        })
    }

    render() {
        return (
            <aside>
                <div className="search-form">
                    <label htmlFor="searchQuery">Find Your Java!</label>
                    <input
                        id="searchQuery"
                        type="text"
                        role="search"
                        aria-label="search"
                        placeholder="Search Here"
                        onChange={(e) => this.updateQuery(e.target.value)}
                        value={this.state.query}
                    />
                </div>

                {this.state.places.length !== 0 && (
                    <ul className="search-result">
                        {this.state.places.map((place, index) => (
                            <li
                                key={index}
                                tabIndex={index}
                                className="item"
                                aria-label="search-results"
                                onKeyPress={() => this.triggerMarkerClick(place.venue.name)}
                                onClick={() => this.triggerMarkerClick(place.venue.name)}
                            >
                                {place.venue.name}
                            </li>
                        ))}
                    </ul>
                )}

                {this.state.places === 0 && (
                    <ul className="search-result">
                        <li className="item">No Places Found..</li>
                    </ul>
                )}

            </aside>

        )
    }
}

export default Search