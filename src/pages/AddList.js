import { Container, TextField, Typography, makeStyles, Button } from '@material-ui/core'
import React, {useState} from 'react'
import SaveIcon from '@material-ui/icons/Save';
import {v4 as uuidv4} from 'uuid';

const useStyle = makeStyles(theme => ({
  
  inputContainer: {
    '& .MuiTextField-root':{
      marginBottom: theme.spacing(1)
    },
  }
}))
export const AddList = ({addTodo}) => {
  const [todoData, setTodoData] = useState({
    id: uuidv4(),
    title: '',
    details: ''
  })
  const classes = useStyle();

  const handleChange = (e) => {
    setTodoData(state => ({
      ...state,
      [e.target.id]:e.target.value
    }))
  }

  const clearForm = () => {
    setTodoData(state => ({
      ...state,
      id: uuidv4(),
      title: '',
      details: ''
    }))
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Iam Submited")
    await addTodo(todoData);
    clearForm();

  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Typography variant="h3" align="center" gutterBottom>Add List</Typography>
        <Container className={classes.inputContainer}>
          <TextField id="title" value={todoData.title} onChange={handleChange} variant="outlined" label="Title" fullWidth/>
          <TextField id="details" value={todoData.details} onChange={handleChange} variant="outlined" multiline rows={6} label="Details" fullWidth/>
        <Button 
          variant="contained" 
          type="submit"
          color="primary" 
          fullWidth
          startIcon={<SaveIcon/>}
        >Add
        </Button>
        </Container>
      </form>
    </div>
  )
}


