import React, { useState } from 'react';
import { createArticle } from '../apis/articleAPi';
import { useDispatch } from 'react-redux';

interface MyComponentProps {
  notify: Function
}

const CreateArticle: React.FC<MyComponentProps> = ({notify}) => {
  // State for each field
  const [url, setUrl] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [rating, setRating] = useState<number>(0);
  const [creationDate, setCreationDate] = useState('');

  const dispatch = useDispatch();
  
  // Function to handle the "create" button click
  const handleCreateClick = async () => {
    // Log all the field values
    console.log('URL:', url);
    console.log('Date:', date);
    console.log('Description:', description);
    console.log('Image URL:', imageUrl);
    console.log('Rating:', rating);
    console.log('Creation Date:', creationDate);

    await createArticle(dispatch, url, date, description, imageUrl, rating, governmentUUID, partyMemberUUID)

    notify('created article')
  };

  return (
    <div style={{padding: '10px', backgroundColor: 'lightcoral'}}>
      <label>
        URL:
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
      </label>

      <label>
        Date:
        <input type="text" value={date} onChange={(e) => setDate(e.target.value)} />
      </label>

      <label>
        Description:
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <br />

      <label>
        Image URL:
        <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
      </label>

      <label>
        Rating:
        <input type="number" value={rating} onChange={(e) => setRating(Number(e.target.value))} />
      </label>

      <label>
        Creation Date:
        <input type="text" value={creationDate} onChange={(e) => setCreationDate(e.target.value)} />
      </label>
      <br />

      <button onClick={handleCreateClick} style={{padding: '5px', backgroundColor: 'lightgray'}}>Create</button>
    </div>
  );
};

export default CreateArticle;