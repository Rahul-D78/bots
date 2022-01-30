const qesRoute = require('express').Router();
const { Questions } = require('../db');

qesRoute.get('/qes', async(req, res) => {
    res.send(await Questions.findAll());
});

qesRoute.post('/qes', async(req, res) => {
    res.send(await Questions.create(req.body));
});

qesRoute.patch('/qes/:id', (req, res) => {
    const {section, body } = req.body;

    Tasks.findOne({where: {id: req.params.id}})
    .then((question) => {
        task.update({
            name: (question.section != undefined)? section: question.section,
            desc: (question.body != undefined)? body: question.body,
        })
        question.save()
        res.status(200).send(question)
    }).catch((e) => {
        res.status(500).send(`error while patching the resources ${e}`)
    });
});

qesRoute.delete('/qes/:id', (req, res) => {
    Questions.destroy({where: {id: req.params.id}})
    .then((deleteOne) => {
        res.status(200).send(deleteOne)
    }).catch((e) => {
        res.status(500).send(`error while deleting questions ${e}`)
    });
});

module.exports = {
    qesRoute
}