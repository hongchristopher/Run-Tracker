import 'dotenv/config';
import * as runs from './runs_model.mjs';
import express from 'express';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

// /runs - POST
app.post('/runs', async (req, res) => {
    runs.createRun(req.body.distance, req.body.time, req.body.rpe, req.body.date, req.body.notes)
        .then(run => {
            res.status(201).json(run)
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Failed Request'})
        });
});

// /runs - GET - by id
app.get('/runs/:_id', (req, res) => {
    const runId = req.params._id
    runs.findRunById(runId)
        .then(run => {
            if (run !== null) {
                res.json(run)
            } else {
                res.status(404).json({ Error: 'Requested resource not found'})
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Failed to send request'});
        });
});

// /runs - GET - all
app.get('/runs', (req, res) => {
    runs.findRuns()
        .then(run => {
            if (run !== null) {
                res.json(run)
            } else {
                res.status(404).json({ Error: 'No running sessions found'})
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed'});
        });
});

// /runs - PUT
app.put('/runs/:_id', (req, res) => {
    runs.replaceRun(req.params._id, req.body.distance, req.body.time, req.body.rpe, req.body.date, req.body.notes)
        .then(numUpdated => {
            if (numUpdated === 1) {
                res.json({ _id: req.params._id, distance: req.body.distance, time: req.body.time, rpe: req.body.rpe, date: req.body.date, notes: req.body.notes})
            } else {
                res.status(404).json({ Error: 'Resource not found'})
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Req failed'})
        });
});

// /runs - DELETE
app.delete('/runs/:_id', (req, res) => {
    runs.deleteById(req.params._id)
        .then(numDeleted => {
            if (numDeleted === 1) {
                res.status(204).send();
            } else {
                res.status(404).json ({ Error: 'Resource not found'})
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Req failed'})
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});