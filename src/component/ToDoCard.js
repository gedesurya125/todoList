import React, {useState} from 'react'
import { Card, CardHeader, IconButton, makeStyles, CardContent, Typography } from '@material-ui/core'
import { red } from '@material-ui/core/colors'
import { MoreVert } from '@material-ui/icons'
import CardButton from './CardButton'

const useStyles = makeStyles(theme => ({

  root: {
    width: 340,
    margin: theme.spacing(1),
    '& > .MuiCardHeader-root': {
      background: 'linear-gradient(100deg, #a85632, #949151)',
    }
  },
  avatar: {
    backgroundColor: red[500],
  },
}))

const ToDoCard = ({ todo, deleteTodo }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <CardButton toDoId = {todo.id} deleteTodo={deleteTodo}/>
        }
        title={todo.title}
      />
      <CardContent>
        <Typography variant="body2" component="p">
          {todo.details}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default ToDoCard
