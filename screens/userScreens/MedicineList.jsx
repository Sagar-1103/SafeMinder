// // Import libraries
// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, FlatList } from 'react-native';
// import firestore from '@react-native-firebase/firestore';
// import { useLogin } from '../../context/LoginProvider';

// // Create a component
// const MedicineList = () => {
//     const [medicines, setMedicines] = useState([]);
//     const { user } = useLogin();

//     // Fetch medicines based on user.id
//     useEffect(() => {
//         if (user?.id) {
//             firestore()
//                 .collection('Medications')
//                 .where('code', '==', user.id)  // Filter by user id
//                 .get()
//                 .then(snapshot => {
//                     const fetchedMedicines = snapshot.docs.map(doc => {
//                         const data = doc.data();
//                         return {
//                             id: doc.id,
//                             medicineName: data.medicineName,
//                             medicineType: data.medicineType,
//                             dosageUnit: data.dosageUnit,
//                             fromDate: data.fromDate?.toDate().toLocaleDateString(),  // Convert Timestamp to Date string
//                             toDate: data.toDate?.toDate().toLocaleDateString(),  // Convert Timestamp to Date string
//                         };
//                     });
//                     setMedicines(fetchedMedicines);
//                 })
//                 .catch(error => console.error('Error fetching medicines:', error));
//         }
//     }, [user]);

//     // Render each medicine item
//     const renderItem = ({ item }) => (
//         <View style={styles.itemContainer}>
//             <Text style={styles.itemText}>Medicine Name: {item.medicineName}</Text>
//             <Text style={styles.itemText}>Medicine Type: {item.medicineType}</Text>
//             <Text style={styles.itemText}>Dosage: {item.dosageUnit}</Text>
//             <Text style={styles.itemText}>From: {item.fromDate}</Text>
//             <Text style={styles.itemText}>To: {item.toDate}</Text>
//         </View>
//     );

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Medicine List</Text>
//             {medicines.length > 0 ? (
//                 <FlatList
//                     data={medicines}
//                     renderItem={renderItem}
//                     keyExtractor={(item) => item.id}
//                 />
//             ) : (
//                 <Text style={styles.noData}>No medicines available</Text>
//             )}
//         </View>
//     );
// };

// // Define styles
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//         backgroundColor: '#f7f7f7',
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         textAlign: 'center',
//         marginBottom: 20,
//     },
//     itemContainer: {
//         padding: 15,
//         backgroundColor: '#fff',
//         borderRadius: 8,
//         marginBottom: 10,
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//     },
//     itemText: {
//         fontSize: 16,
//         color: '#2c3e50',
//         marginBottom: 5,
//     },
//     noData: {
//         fontSize: 18,
//         color: '#e74c3c',
//         textAlign: 'center',
//     },
// });

// export default MedicineList;

// Import libraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient'; // Import gradient library
import { useLogin } from '../../context/LoginProvider';

// Create a component
const MedicineList = () => {
    const [medicines, setMedicines] = useState([]);
    const { user } = useLogin();

    // Fetch medicines based on user.id
    useEffect(() => {
        if (user?.id) {
            firestore()
                .collection('Medications')
                .where('code', '==', user.id) // Filter by user id
                .get()
                .then((snapshot) => {
                    const fetchedMedicines = snapshot.docs.map((doc) => {
                        const data = doc.data();
                        return {
                            id: doc.id,
                            medicineName: data.medicineName,
                            medicineType: data.medicineType,
                            dosageUnit: data.dosageUnit,
                            fromDate: data.fromDate?.toDate().toLocaleDateString(), // Convert Timestamp to Date string
                            toDate: data.toDate?.toDate().toLocaleDateString(), // Convert Timestamp to Date string
                        };
                    });
                    setMedicines(fetchedMedicines);
                })
                .catch((error) => console.error('Error fetching medicines:', error));
        }
    }, [user]);

    // Render each medicine item
    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemHeader}>Medicine Name: <Text style={styles.itemDetail}>{item.medicineName}</Text></Text>
            <Text style={styles.itemHeader}>Medicine Type: <Text style={styles.itemDetail}>{item.medicineType}</Text></Text>
            <Text style={styles.itemHeader}>Dosage: <Text style={styles.itemDetail}>{item.dosageUnit}</Text></Text>
            <Text style={styles.itemHeader}>From: <Text style={styles.itemDetail}>{item.fromDate}</Text></Text>
            <Text style={styles.itemHeader}>To: <Text style={styles.itemDetail}>{item.toDate}</Text></Text>
        </View>
    );

    return (
        <LinearGradient
            colors={['#FF8C00', '#FF4500']} // Orange gradient
            style={styles.gradientBackground}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Medicine List</Text>
                {medicines.length > 0 ? (
                    <FlatList
                        data={medicines}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.flatListContent}
                    />
                ) : (
                    <Text style={styles.noData}>No medicines available</Text>
                )}
            </View>
        </LinearGradient>
    );
};

// Define styles
const styles = StyleSheet.create({
    gradientBackground: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FFF', // White title
        marginBottom: 20,
    },
    itemContainer: {
        padding: 15,
        backgroundColor: '#FFF', // White box
        borderRadius: 8,
        marginBottom: 10,
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
    },
    itemHeader: {
        fontSize: 16,
        color: '#FF4500', // Orange header text
        marginBottom: 5,
        fontWeight: 'bold',
    },
    itemDetail: {
        fontSize: 16,
        color: '#000', // Black detail text
        fontWeight: 'normal',
    },
    noData: {
        fontSize: 18,
        color: '#FFF', // White no data text
        textAlign: 'center',
    },
    flatListContent: {
        paddingBottom: 20,
    },
});

export default MedicineList;
