import axios from 'axios'

export const listCryptocurrencies = page => {
    let headers = {
        'X-CMC_PRO_API_KEY': '22fa8537-60fc-4603-811e-85c49368e589',
        'Content-Type': 'application/json'
    }
    let params = {
        start: (page - 1) * 100 + 1,
        limit: 100
    }
    return axios
        .get('http://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', { params, headers })
        .then(res => {
            console.log(res.data)
            return res.data
        })
        .catch(err => {
            return err
        })
}

export const listTickers = page => {
    return axios.all([
        axios.get(`https://api.coinmarketcap.com/v1/ticker/?start=${(page - 1) * 100}&limit=100`),
        axios.get('https://s2.coinmarketcap.com/generated/search/quick_search.json'),
        axios.get('watchs')
    ])
        .then(axios.spread(function (tickers, quick_searchs, watchs) {
            tickers.data.forEach(element => {
                let result = quick_searchs.data.find(item => element.name === item.name)
                element.coinId = result.id
                result = watchs.data.find(item => element.coinId === item.coinId)
                element.checked = result ? false : true
            })
            return tickers.data
        }))
        .catch(err => {
            return err
        })
}

export const convertSpace = (string) => {
    return string.split(' ').join('-')
}

export const listWatchs = () => {
    return axios.get('watchObjects')
        .then(res => {
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const addOrDelWatchList = coinId => {
    return axios
        .post('watch', {
            coinId: coinId
        })
        .then(response => {
            console.log('add WatchList success!')
        })
        .catch(err => {
            console.log(err)
        })
}