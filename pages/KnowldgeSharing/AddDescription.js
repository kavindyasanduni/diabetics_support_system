import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native';

const  AddDescription= () => {
  const [text, setText] = useState('');
  useEffect (()=>{
    // console.log(text);
    setText(text);

  },[text])

  return (
    <TextInput
      style={{ height: 60,width:250, borderColor: 'gray', borderWidth: 1,borderRadius:10 ,padding:20  }}
      onChangeText={setText}
      value={text}
      placeholder="Description"
    />
  );
};

export default AddDescription;