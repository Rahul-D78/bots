const express = require('express');
const { db } = require('./db');
const { allRoutes } = require('./Routes/allRoutes');
require('./bot');
const app = express();

app.use(express.json());
app.use(allRoutes);

const PORT = process.env.PORT || 3000;

app.get('/healthz', (req, res) => {
    res.send('server is up and running');
});

//TODO: add a method so that we can differneciate between prod and dev env

db.sync({ alter:true }).then(() => {
    app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
});
