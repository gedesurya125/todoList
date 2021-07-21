import { Container, TextField, Typography, makeStyles, Button } from '@material-ui/core'
import React, {useState, useEffect} from 'react'
import SaveIcon from '@material-ui/icons/Save';
import { useParams, useHistory } from 'react-router-dom';


const useStyle = makeStyles(theme => ({
  
  inputContainer: {
    '& .MuiTextField-root':{
      marginBottom: theme.spacing(1)
    },
  }
}))

//============= Component =========================
const EditList = ({toDoList, updateData}) => {
  const history = useHistory();
  const [todoData, setTodoData] = useState({
    id: '',
    title: '',
    details: ''
  })
  const params = useParams();
  const classes = useStyle();

  const handleChange = (e) => {
    setTodoData(state => ({
      ...state,
      [e.target.id]:e.target.value
    }))
  }



  const handleSubmit = async(e) => {
    e.preventDefault();
    await updateData(todoData);
    history.push("/"); // kembali ke halaman awal;
  }

  useEffect(() => {
    const dataToEdit = toDoList.find((todo => todo.id === params.id));
    if(!dataToEdit) return alert("No Data Matched"); //prevent error
    setTodoData({
      id: dataToEdit.id,
      title: dataToEdit.title,
      details: dataToEdit.details
    })
  },[])
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Typography variant="h3" align="center" gutterBottom>Edit List</Typography>
        <Container className={classes.inputContainer}>
          <TextField id="title" value={todoData.title} onChange={handleChange} variant="outlined" label="Title" fullWidth/>
          <TextField id="details" value={todoData.details} onChange={handleChange} variant="outlined" multiline rows={6} label="Details" fullWidth/>
        <Button 
          variant="contained" 
          type="submit"
          color="primary" 
          fullWidth
          startIcon={<SaveIcon/>}
        >Save
        </Button>
        </Container>
      </form>
    </div>
  )
}

export default EditList;

