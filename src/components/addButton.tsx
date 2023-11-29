import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { addEntity } from '../apis/common';
import { useDispatch } from 'react-redux';

type ChooserProps = {
    serverMethodName: string
};

const YourComponent: React.FC<ChooserProps> = ({serverMethodName}) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddClick = async () => {
    console.log('name:', name);
    console.log('imageUrl:', imageUrl);
    console.log('description:', description);

    const data = { name, imageUrl, description }

    const addResult = await addEntity(dispatch, 'government/createGovernment', data)


    
    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open Dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <TextField
            label="Input 1"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Input 2"
            variant="outlined"
            fullWidth
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            style={{ marginTop: '16px' }}
          />
          <TextareaAutosize
            aria-label="Textarea"
            placeholder="Textarea"
            minRows={3}
            style={{ width: '100%', marginTop: '16px' }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddClick}
            style={{ marginTop: '16px' }}
          >
            Add to Log
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default YourComponent;