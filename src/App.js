import db from './firebase-config'
import firebase from 'firebase';
import { AddCircleOutlineRounded, DeleteOutlineRounded, Edit } from '@material-ui/icons';
import { Button, TextField, Container, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Dialog, DialogContent, DialogActions } from '@material-ui/core';
import './App.css';
import React,{ useEffect,useState } from 'react';


function App() {
//adding and maintaining todo objects
const [todos, setTodos] = useState([]);
const [input, setInput] = useState('');
const [open, setOpen] = useState(false);
const [update, setUpdate] = useState('');
const [toUpdateId, setToUpdateId] = useState('');
//to maintain real-time snapshot of to-dos
useEffect(() => {
  
  db.collection('todos').orderBy('datetime', 'desc').onSnapshot(snapshot => {
    
    setTodos(snapshot.docs.map(doc => {
      return {
        id: doc.id,
        name: doc.data().todo,
        datatime: doc.data().datatime
      }
    }))
  })

}, []);

//function for addition in to-dos list
const addTodo = (event) => {
  event.preventDefault();
  db.collection('todos').add({
    todo: input,
    datetime: firebase.firestore.FieldValue.serverTimestamp()
  })
  setInput('');
}
//function for delete in to-do list
const deleteTodo = (id) => {
  db.collection('todos').doc(id).delete().then(res => {
    console.log('Deleted!', res);
  });
}
const openUpdateDialog = (todo) => {
  setOpen(true);
  setToUpdateId(todo.id);
  setUpdate(todo.name);
}
//editing the to-do
const editTodo = () => {
  db.collection('todos').doc(toUpdateId).update({
    todo: update
  });
  setOpen(false);
}
//closing the dialog 
const handleClose = () => {
  setOpen(false);
}

  return (
    <Container maxWidth="sm">
      <h1>To-do app 🌻 </h1>
      <form noValidate>
        
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="todo"
          label="Enter ToDo"
          name="todo"
          autoFocus
          value={input}
          onChange={event => setInput(event.target.value)}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          onClick={addTodo}
          disabled={!input}
          startIcon={<AddCircleOutlineRounded />}
        >
          Add Todo
      </Button>

      </form>
      <List dense={true}>
        {
          todos.map(todo => (

            <ListItem key={todo.id} >

              <ListItemText
                primary={todo.name}
                secondary={todo.datetime}
              />

              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="Edit" onClick={() => openUpdateDialog(todo)}>
                  <Edit />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => deleteTodo(todo.id)}>
                  <DeleteOutlineRounded />
                </IconButton>
              </ListItemSecondaryAction>

            </ListItem>
          ))
        }
      </List>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <TextField
            autoFocus
            margin="normal"
            label="Update Todo"
            type="text"
            fullWidth
            name="updateTodo"
            value={update}
            onChange={event => setUpdate(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={editTodo} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

    </Container >
  );
}

export default App;
