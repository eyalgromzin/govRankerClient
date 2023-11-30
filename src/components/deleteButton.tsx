// Import necessary components and styles
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { EntityType } from '../models';
import { deleteGovernment } from '../apis/governmentApi';
import { useDispatch } from 'react-redux';


type ChooserProps = {
    entityUUID: string | undefined,
    entityType: EntityType,
    onSuccess: Function
};

// Define the DeleteButton component
const DeleteButton: React.FC<ChooserProps> = ({entityUUID, entityType, onSuccess}) => {
  // State to manage the dialog open/close
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  // Function to handle opening the dialog
  const handleOpenDialog = () => {
    if (!entityUUID){
        alert('plz select government')
        return
    }

    setOpen(true);
  };

  // Function to handle closing the dialog
  const handleCloseDialog = () => {
    setOpen(false);
  };

  // Function to handle deletion (you can customize this function)
  const handleDelete = async () => {
    // Add your delete logic here    
    console.log(`Deleting ${entityType}...`);

    let addResult = undefined
    if(entityType == EntityType.government && entityUUID){
        addResult = await deleteGovernment(dispatch, entityUUID)
        onSuccess()
    }else if(entityType == EntityType.party){
        addResult = await deleteParty(dispatch, entityUUID)
        onSuccess()
    }else if(entityType == EntityType.partyMember){
        // addResult = await deletePartyMember(dispatch, data)
    }

    if (addResult?.error){
        console.error(`failed to delete ${entityType}`)
        return 
    }

    handleCloseDialog();
  };

  return (
    <>
      {/* Delete button with trash icon */}
      <Button
        style={{"height": '36px'}}
        variant="contained"
        color="secondary"
        startIcon={<DeleteIcon />}
        onClick={handleOpenDialog}
      >
        Delete
      </Button>

      {/* Confirmation dialog */}
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* Cancel button to close the dialog */}
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          {/* Delete button to confirm deletion */}
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteButton;