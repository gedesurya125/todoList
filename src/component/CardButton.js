import React, { useState, useRef, useEffect, createRef } from 'react'
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { MoreVert, Delete, Edit } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'
const CardButton = ({ toDoId, deleteTodo }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const anchorRef = useRef()
  const history = useHistory();
  const handleClose = () => {
    setAnchorEl(null);
  }
  const handleOpen = () => {
    console.log(anchorRef.current)
    setAnchorEl(anchorRef.current);
  }

  const handleDelete = async() => {
    try{
      await deleteTodo(toDoId);
      handleClose();
    }catch(err){
      console.log(err)
    }
  }
  const handleEdit = () => {
    history.push(`/edit_list/${toDoId}`)
  }

  return (
    <React.Fragment>
      <IconButton onClick={handleOpen} ref={anchorRef} aria-controls="simple-menu" aria-haspopup="true">
        <MoreVert />
      </IconButton>
      <Menu
        
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleDelete}><Delete/></MenuItem>
        <MenuItem onClick={handleEdit}><Edit/></MenuItem>
      </Menu>
    </React.Fragment>
  )
}

export default CardButton
