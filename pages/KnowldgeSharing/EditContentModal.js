import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity } from 'react-native';

const EditContentModal = ({ visible, data, onSave, onCancel }) => {
  const [title, setTitle] = useState(data.title);
  const [description, setDescription] = useState(data.description);
  const [imgLink, setImgLink] = useState(data.imgLink);

  
  const handleSave = () => {
    const newData = {
      ...data,
      title,
      description,
      imgLink,
    };
    onSave(newData);
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style>
        <Text>Edit Content</Text>
        <TextInput value={title} onChangeText={setTitle} />
        <TextInput value={description} onChangeText={setDescription} />
        <TextInput value={imgLink} onChangeText={setImgLink} />
        <TouchableOpacity onPress={handleSave}>
          <Text>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onCancel}>
          <Text>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default EditContentModal;