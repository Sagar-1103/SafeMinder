import React from 'react';
import { View, Text, Modal,StyleSheet,TouchableOpacity } from 'react-native';

const ModalComponent = ({modalVisible,setModalVisible,title,description,showBtn}) => {
    return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>{title}</Text>
                    <Text style={styles.modalDescription}>
                      {description}
                    </Text>
                    <View
                      style={styles.buttonGroup}>
                      {showBtn && <TouchableOpacity
                        style={styles.closeButton}
                        onPress={handleLimitExceeded}>
                        <Text style={styles.closeButtonText}>Login</Text>
                      </TouchableOpacity>}
                      <TouchableOpacity
                        style={styles.closeButton}
                        onPress={()=>setModalVisible(false)}>
                        <Text style={styles.closeButtonText}>Close</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      closeButton: {
        marginTop: 10,
        backgroundColor: 'rgb(233,108,56)',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal:20
      },
      closeButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
      },
      buttonGroup : {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
      },
      modalView: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        elevation: 5,
      },
      modalTitle: {
        marginBottom: 20,
        textAlign: 'center',
        color: 'black',
        fontSize: 20,
        fontWeight: '900',
      },
      modalDescription: {
        marginBottom: 20,
        textAlign: 'center',
        color: 'black',
        fontSize: 16,
        fontWeight: '500',
        width: 250,
      },
})


export default ModalComponent;
