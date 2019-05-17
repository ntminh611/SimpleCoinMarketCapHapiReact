'use strict'

const mongoose = require('mongoose')
const Watch = require('../models/Watch')
const axios = require('axios')

const convertSpace = (string) => {
    return string.split(' ').join('-').split('.').join('-')
}

const getWatchListfromListname = () => {
    let array = Watch.find((err, res) => {
        if (err) {
            return err
        }
        return res
    })
    return array.then((array) => {
        let headers = {
            'X-CMC_PRO_API_KEY': '22fa8537-60fc-4603-811e-85c49368e589',
            'Accept': 'application/json'
        }
        let params = ""
        for (let i=0; i<array.length-1; i++) {
            params += array[i].coinId + ","
        }
        params += array[array.length-1].coinId
        return axios
            .get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=' + params, { headers })
            .then(res => {
                let result = []
                array.forEach(element => {
                    result.push(res.data.data[String(element.coinId)])
                });
                return result
            })
            .catch(err => {
                console.log(err)
            })
    })
}

exports.plugin = {
    register: (server, options) => {
        server.route({
            method: 'GET',
            path: '/watchObjects',
            handler: (req, h) => {
                return getWatchListfromListname()
            }
        })

        server.route({
            method: 'GET',
            path: '/watchs',
            handler: (req, h) => {
                return Watch.find((err, res) => {
                    if (err) {
                        return err
                    }
                    return res
                })
            }
        })

        server.route({
            method: 'POST',
            path: '/watch',
            handler: (req, h) => {
                return Watch.findOne({
                    coinId: req.payload.coinId
                }, function (err, watch) {
                    if (err) {
                        return err
                    }
                    if (watch == null) {
                        let watch = new Watch()
                        watch.coinId = req.payload.coinId
                        return watch.save().then((err, res) => {
                            if (err) {
                                return err
                            }
                            return res
                        })
                    } else {
                        return Watch.deleteOne(
                            {
                                coinId: req.payload.coinId
                            },
                            (err, result) => {
                                if (err) {
                                    return err
                                }
                                if (result.n === 0) {
                                    return 'Not Found'
                                }
                                return 204
                            }
                        )
                    }
                })
            }
        })
    },
    name: 'api'
}
