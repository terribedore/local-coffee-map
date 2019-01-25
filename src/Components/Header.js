import React, { Component } from 'react'

class Header extends Component {

    toggleMenu = () => {
        const menu = document.querySelector('aside')
        menu.classList.toggle("toggle")
    }

    render() {

        return (
            <header className="App-header">
              <span className="toggle-menu fas fa-bars" onClick={this.toggleMenu}></span>
              <h1 className="App-title">Independent Coffeehouses</h1>
              <h3 className="App-desc">Coffee that isn't Starbucks!</h3>
              <p className="App-joke">(Just Kidding. Starbucks has taken over...!)</p>
            </header>
        )
    }
}

export default Header