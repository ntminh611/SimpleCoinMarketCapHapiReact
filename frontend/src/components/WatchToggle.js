import React, { Component } from 'react'
import { addOrDelWatchList } from './RequestData'
import icon1 from '../unchecked.svg'
import icon2 from '../checked.svg'

class WatchToggle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isToggleOn: props.checked,
      coinName: props.coinName
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    console.log(this.state.coinName)
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }))
    addOrDelWatchList(this.state.coinName).then(res => {
        
    })
  }

  render() {
    return (
      <a href="JavaScript:;" onClick={this.handleClick} className="nav-link">
        {this.state.isToggleOn ? <img src={icon1} width="20" alt="favorite" /> :
          <img src={icon2} width="20" alt="unfavorite" />}
      </a>
    )
  }
}
export default WatchToggle