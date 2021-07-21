import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core'
import ToDoCard from '../component/ToDoCard'
import Masonry from 'react-masonry-css';

const useStyle = makeStyles(theme => ({
  masonry: {
    display: 'flex',
    width: '100%'
    // justifyContent: 'center'
  },
  masonryColumn: {
    // backgroundClip: 'padding-box'
  }
}))

export const ShowList = ({ toDoList, deleteTodo }) => {
  const classes = useStyle();
  return (
    // <div className={classes.root}>

    <Masonry
      breakpointCols={3}
      className={classes.masonry}
      columnClassName={classes.masonryColumn}>
      {/* array of JSX items */}
      {
        toDoList.map(todo => (
          <ToDoCard key={todo.id} todo={todo} deleteTodo={deleteTodo} />
        ))
      }
    </Masonry>
    // </div>
  )
}
