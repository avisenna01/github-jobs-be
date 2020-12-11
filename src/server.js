const express = require('express')
const fetch = require('node-fetch')
const app = express()
var cors = require('cors')

app.use(cors())

app.get('/jobdetail/:id', async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        const apiResponse = await fetch(
            `https://jobs.github.com/positions/${id}.json`
        )
        const apiResponseJson = await apiResponse.json()

        console.log(apiResponseJson)
        // res.send('Done – check console log')
        res.send(apiResponseJson)
    } catch (err) {
        console.log(err)
        res.status(500).send('Something went wrong')
    }
})

app.get('/jobdetail', async (req, res) => {
    let description = "";
    let location = "";
    let page = "";
    let search = "";

    if (req.query.description) {
        description = req.query.description;
    }

    if (req.query.location) {
        location = req.query.location;
    }

    if (req.query.page) {
        page = req.query.page;
    }

    if (req.query.search) {
        search = req.query.search;
    }

    try {
        const apiResponse = await fetch(
            `https://jobs.github.com/positions.json?description=${description}&location=${location}&page=${page}&search=${search}`
        )
        const apiResponseJson = await apiResponse.json()

        console.log(apiResponseJson)
        // res.send('Done – check console log')
        res.send(apiResponseJson)
    } catch (err) {
        console.log(err)
        res.status(500).send('Something went wrong')
    }
})


app.listen(4000, () => console.log(`Dans app listening on port 4000!`))