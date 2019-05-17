import React, { Component } from 'react'
import { listWatchs } from './RequestData'
import numeral from 'numeral'
import { Table } from 'react-bootstrap'
import WatchToggle from './WatchToggle'
import './style.css'

class WatchList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null
        }
    }

    componentDidMount() {
        listWatchs().then(res => {
            this.setState({
                data: res
            })
        })
            .catch(err => {
                console.log(err)
            })
            
    }

    renderRow() {
        return this.state.data.map((item, k) => {
            return (
                <tr key={k}>
                    <th scope="row">{item.rank}</th>
                    <th>
                        <img alt={item.name} src={`https://s2.coinmarketcap.com/static/img/coins/32x32/${item.id}.png`} /> {item.name}
                    </th>
                    <td className="rightText">{numeral(item.market_cap_usd).format('$0,0[.]00')}</td>
                    <td className="rightText">{numeral(item.price_usd).format('$0,0[.]00')}</td>
                    <td className="rightText">{numeral(item['24h_volume_usd']).format('$0,0[.]00')}</td>
                    <td className="rightText">{numeral(item.available_supply).format('0,0.0000')} {item.symbol}</td>
                    <td className="rightText">{item.percent_change_24h}</td>
                    <td className="rightText"><img alt={item.name} src={`https://s2.coinmarketcap.com/generated/sparklines/web/7d/usd/${item.id}.png`} /></td>
                    <td><WatchToggle checked={item.checked} coinName={item.id} /></td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Table striped hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th className="rightText">Market Cap</th>
                        <th className="rightText">Price</th>
                        <th className="rightText">Volume (24h)</th>
                        <th className="rightText">Circulating Supply</th>
                        <th className="rightText">Change (24h)</th>
                        <th>Price Graph (7d)</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                {<tbody>
                    {this.state.data ? this.renderRow() : null}
                </tbody>}
            </Table>
        )
    }
}

export default WatchList