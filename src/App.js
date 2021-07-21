import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { AddList } from './pages/AddList';
import { ShowList } from './pages/ShowList';
import EditList from './pages/EditList';
import { Divider, Typography } from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    background: 'linear-gradient(100deg, #a85632, #949151)'
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  logo:{
    background: theme.palette.secondary.dark,
    padding: theme.spacing(0, 1),
  },
  active:{
    background: 'rgba(0,0,0, 0.4)'
  }
}));



const toDoUrl = "http://localhost:3001/toDoList";

export default function App() {
  const [toDoList, setToDoList] = useState([])
  const classes = useStyles();
  const history = useHistory();
  let location = useLocation();

//============ API ============================
  const getData = async (url) => {//move
    const response = await axios.get(url);
    return response.data;
  }

  const postData = async (url, data) => {
    try {
      await axios.post(url, data);
    } catch (err) {
      console.log(err);
      return err
    }
  }
  const deleteData = async (url, id) => {
    try{
      await axios.delete(url+'/'+id);
    }catch(err){
      console(err)
    }
  }
  const patchData = async (url, data) => {
    const params = new URLSearchParams();
    params.append('title', data.title);
    params.append('details', data.details);
    try{
      await axios.patch(url+'/'+data.id, params);
    }catch(err){
      console.log(err)
    }
  }

//============= Action to State =================

  const updateData = async(data) => {
    try{
      await patchData(toDoUrl, data);
      //update in state also
      const newToDo = toDoList.map(toDo => {
        if(toDo.id !== data.id) return toDo;
        const updatedData = {
          ...toDo,
          title: data.title,
          details: data.details
        };
        return updatedData;
      });
      setToDoList(newToDo);

    }catch(err){
      console.log(err)
    }
  }

  const deleteTodo = async(id) => {
    try{
      await deleteData(toDoUrl, id)
      //Delete data from state
      const newToDo = toDoList.filter(todo => todo.id !== id);
      setToDoList(newToDo);
    }catch(err){
      console.log(err)
    }

  }
  const addTodo = async (todo) => {
    try {
      await postData(toDoUrl, todo)
      setToDoList(state => ([
        ...state,
        {
          id: todo.id,
          title: todo.title,
          details: todo.details
        }
      ]))
    } catch (err) {
      console.log(err)
    }

  }
  useEffect(() => { // move
    getData(toDoUrl)
      .then(data => setToDoList(data));
  }, [])

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <Typography className={classes.logo} component="div" variant="h3">SB</Typography>
        <Divider/>
        <List>
          <ListItem button onClick={() => history.push('/')} className={location.pathname === "/" ? classes.active : null}>
            <ListItemIcon><ViewComfyIcon /></ListItemIcon>
            <ListItemText primary="Show" />
          </ListItem>

          <ListItem button onClick={() => history.push('/add_list')} className={location.pathname === "/add_list" ? classes.active : null}>
            <ListItemIcon><NoteAddIcon /></ListItemIcon>
            <ListItemText primary="Add" />
          </ListItem>
        </List>

      </Drawer>
      <main className={classes.content}>
        <Switch>
          <Route path="/" exact component={(props) => <ShowList toDoList={toDoList} deleteTodo={deleteTodo} />} />
          <Route path="/add_list" exact component={(props) => <AddList addTodo={addTodo} />} />
          <Route path="/edit_list/:id" component={(props) => <EditList  toDoList={toDoList} updateData={updateData}/> }/>
        </Switch>
      </main>
    </div>
  );
}
