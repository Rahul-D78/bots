const taskRoute = require('express').Router();
const { Tasks } = require('../db');

taskRoute.get('/tasks', async(req, res) => {
    res.send(await Tasks.findAll());
});

taskRoute.post('/tasks', async(req, res) => {
    res.send(await Tasks.create(req.body));
});

taskRoute.patch('/tasks/:id', (req, res) => {
    const {name, desc, done, priority } = req.body;

    Tasks.findOne({where: {id: req.params.id}})
    .then((task) => {
        task.update({
            name: (task.name != undefined)? name: task.name,
            desc: (task.desc != undefined)? desc: task.desc,
            done: (task.done != undefined)? done: task.done,
            priority: (task.priority != undefined)? priority: task.priority
        })
        task.save()
        res.status(200).send(task)
    }).catch((e) => {
        res.status(500).send(`error while patching the resources ${e}`)
    });
});

taskRoute.delete('/task/:id', (req, res) => {
    Tasks.destroy({where: {id: req.params.id}})
    .then((deleteOne) => {
        res.status(200).send(deleteOne)
    }).catch((e) => {
        res.status(500).send(`error while deleting tasks ${e}`)
    });
});

module.exports = { 
    taskRoute 
}