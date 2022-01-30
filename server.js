import express from 'express'
const app = express()

const PORT = process.env.PORT || 3000

app.get('/healthz', (req, res) => {
    res.send('server is up and running')
})

app.listen(PORT, () => console.log(`server is running on ${PORT}`))