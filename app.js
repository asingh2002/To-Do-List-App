const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1/todo', { useNewUrlParser: true, useUnifiedTopology: true });

const taskSchema = new mongoose.Schema({
  task: String,
});

const Task = mongoose.model('Task', taskSchema);

app.listen(8080, () => {
  console.log('Server started on http://127.0.0.1:8080');
});


app.get('/', (req, res) => {
    Task.find({})
      .then(tasks => {
        res.render('index.ejs', { tasks: tasks });
      })
      .catch(err => {
        console.log(err);
      });
  });
  
  app.post('/', (req, res) => {
    const task = new Task({
      task: req.body.newTask,
    });
  
    task.save()
      .then(() => {
        res.redirect('/');
      })
      .catch(err => {
        console.log(err);
      });
  });
  
  