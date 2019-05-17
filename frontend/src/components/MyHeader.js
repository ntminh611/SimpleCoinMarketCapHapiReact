import React, { Component } from 'react'
import {
  Navbar,
  Nav
} from 'react-bootstrap'
import logo from '../logo.png'
import MyPagination from './MyPagination'

class MHeader extends Component {
  constructor(props) {
    super(props)

    this.toggleNavbar = this.toggleNavbar.bind(this)
    this.state = {
      collapsed: true
    }
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  render() {
    return (
      <Navbar bg="light" expand="lg" sticky="top" className="shadow-sm">
        <Navbar.Brand href="#home"><img src={logo} alt="logo"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">CrytoCurrencies</Nav.Link>
            <Nav.Link href="/WatchList">Watchlist</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <MyPagination />
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default MHeader