import React, { Component } from 'react'

class Header extends Component {

  toggleMenu = () => {
      const menu = document.querySelector('aside')
      menu.classList.toggle("toggle")
  }

  render() {

    return (
      <header>
        <span
        tabIndex="0"
        className="toggle-menu fas fa-bars"
        onClick={this.toggleMenu}
        onKeyPress={this.toggleMenu}
        ></span>
        <h1 className="App-title">Coffee Houses</h1>
      </header>
    )
  }
}

export default Header