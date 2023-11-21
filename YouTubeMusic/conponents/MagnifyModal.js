import React, { useState,useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

const YourPage = ({visible,onClose}) => {
  const [modalVisible, setModalVisible] = useState(true);
  useEffect(()=>{setModalVisible(visible);},[visible]);
  return (
    <View style={styles.container}>
      <Modal
        animationType='none'
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Nội dung của modal ở trang này</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>Đóng Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    fontSize: 18,
    color: 'blue',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width:'100%',
    height:'100%',
    backgroundColor: 'black',
  },
  closeButton: {
    marginTop: 10,
    color: 'red',
  },
});

export default YourPage;