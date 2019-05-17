import React, { Component } from 'react'
import axios from 'axios'
import Pagination from 'rc-pagination'
import 'rc-pagination/assets/index.css'


class PaginationCustom extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pages: 1,
            current: 1
        }
    }

    componentDidMount() {
        let currentPage = parseInt(window.location.pathname.substr(1))
        if (isNaN(currentPage)) {
            currentPage = 1
        } 
        axios.get('https://s2.coinmarketcap.com/generated/search/quick_search.json')
            .then(res => {
                this.setState({
                    pages: res.data.length / 100,
                    current: currentPage
                })
            })
            .catch(error => console.log(error))
    }

    onChange = (page) => {
        this.setState({
            current: page,
        });
        window.location.href = `/${page}`
    }

    handlePageChange(pageNumber) {
        this.setState({ activePage: pageNumber })
        this.props.history.push(`/${pageNumber}`)
    }

    render() {
        if (window.location.pathname.includes("WatchList")) {
            return null
        }
        return (<Pagination onChange={this.onChange} current={this.state.current} total={this.state.pages} defaultPageSize={1} />)
    }
}

export default PaginationCustom;