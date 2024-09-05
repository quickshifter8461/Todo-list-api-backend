


const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let todo = [];

app.get('/', (req, res) => {
    res.send('Welcome to the Todo API');
});

app.get('/todo', (req, res) => {
    res.json(todo);
});


app.post('/todo', (req, res) => {
    const newTask = {
        id: todo.length + 1,
        title: req.body.title,
        completed: req.body.completed || false
    };
    todo.push(newTask);
    res.status(201).json(newTask);
});

app.get('/todo/:id', (req, res) => {
    const task = todo.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ message: 'Todo not found' });
    res.json(task);
});

app.put('/todo/:id', (req, res) => {
    const task = todo.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ message: 'task not found' });

    task.title = req.body.title || task.title;
    task.completed = req.body.completed !== undefined ? req.body.completed : task.completed;

    res.json(task);
});

app.delete('/todo/:id', (req, res) => {
    todo = todo.filter(t => t.id !== parseInt(req.params.id));
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
});
