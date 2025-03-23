import express from 'express';
import { Todo } from '../models/Todo';
import bodyParser from 'body-parser';
import cors from 'cors';

const router = express.Router();
let todos: Todo[] = [{"id":1,"title":"Learn TypeScript","completed":false,"createdAt":new Date(),"description":"SSSHHHIIITTT"}];

// Getting last id
let nextId: number = 1;
for (let todo of todos) {
  nextId = Math.max(nextId, todo.id)+1;
}

router.use(bodyParser.json());
router.use(cors());


// Get all tasks
router.get('/', (req, res) => {
  res.json(todos);
});


// Get task by id
router.get('/:id', (req, res) => {
  const id: number = Number(req.params.id);

  // Sending task if exist else {}
  res.json(todos.find((todo) => todo.id === id) || {});
});


// Create new task
router.post('/', (req, res): any => {
  const { title, description } = req.body;
  
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const newTodo: Todo = {
    id: nextId++,
    title,
    completed: false,
    createdAt: new Date(),
  };

  if (description) {
    newTodo.description = description;
  }

  todos.push(newTodo);
  return res.status(201).json(newTodo);
});


// Update task
router.put('/:id', (req, res): any => {
  const id: number = Number(req.params.id);
  const { title, description, completed }: { title: string, description: string, completed: boolean } = req.body;


  let thisTodoIndex: number = -1;
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      thisTodoIndex = i;
      break;
    }
  }

  // Not found
  if (thisTodoIndex === -1) {
    return res.status(404).json({error: 'Not found'});
  }

  const thisTodo = todos[thisTodoIndex];

  if (title) { thisTodo.title = title; };
  if (description) { thisTodo.description = description; };
  if (description === '') { delete todos[thisTodoIndex].description; }
  if (completed === true || completed === false) { thisTodo.completed = completed; };

  // Rewrite task
  todos[thisTodoIndex] = thisTodo;

  return res.status(201).json(thisTodo);
});


// Remove task
router.delete('/:id', (req, res): any => {
  const id: number = Number(req.params.id);
  const removedTask = todos.filter((todo) => todo.id === id);
  todos = todos.filter((todo) => todo.id !== id);

  // Removing item
  return res.status(201).json(removedTask);
});


export default router;
