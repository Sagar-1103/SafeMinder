import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import firestore from '@react-native-firebase/firestore';
import { useLogin } from '../../context/LoginProvider';

const MedicationReminder = () => {
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [medicineType, setMedicineType] = useState('');
  const [medicineName, setMedicineName] = useState('');
  const [dosageUnit, setDosageUnit] = useState('');
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [isFromDatePickerOpen, setIsFromDatePickerOpen] = useState(false);
  const [isToDatePickerOpen, setIsToDatePickerOpen] = useState(false);

  const {user} = useLogin();

  const meals = [
    { name: 'Breakfast', icon: require('../../assets/breakfast.png'), highlightedIcon: require('../../assets/breakfastActive.png') },
    { name: 'Lunch', icon: require('../../assets/Lunch.png'), highlightedIcon: require('../../assets/lunchAcctive.png') },
    { name: 'Snacks', icon: require('../../assets/snack.png'), highlightedIcon: require('../../assets/snackActive.png') },
    { name: 'Dinner', icon: require('../../assets/dinner.png'), highlightedIcon: require('../../assets/dinnerActive.png') },
  ];

  const handleMealSelection = (mealName) => {
    setSelectedMeals((prev) =>
      prev.includes(mealName)
        ? prev.filter((meal) => meal !== mealName)
        : [...prev, mealName]
    );
  };

  const handleMedicineTypeChange = (type) => {
    setMedicineType(type);
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString(undefined, options);
  };
  const handleSubmit = async()=>{
    try {
      const code = user?.id;
      const res1 = await firestore().collection('Medications').add({code,medicineName,medicineType,dosageUnit,fromDate,toDate});
    } catch (error) {
      console.log("Error : ",error); 
    }
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container}>
          {/* Header Section */}
          <View style={styles.header}>
            <Image
              source={require('../../assets/medBg.png')}
              style={styles.headerImage}
            />
          </View>

          {/* Meal Selection Section */}
          <View style={styles.mealSelection}>
            {meals.map((meal, index) => (
              <TouchableOpacity
                key={index}
                style={styles.mealButton}
                onPress={() => handleMealSelection(meal.name)}
              >
                <Image
                  source={selectedMeals.includes(meal.name) ? meal.highlightedIcon : meal.icon}
                  style={styles.mealImage}
                />
                <Text
                  style={[styles.mealText, selectedMeals.includes(meal.name) && styles.selectedMealText]}
                >
                  {meal.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Form Section */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <TextInput
                placeholder="Medicine Name"
                style={styles.input}
                value={medicineName}
                onChangeText={setMedicineName}
                placeholderTextColor="#888"
              />
            </View>
            <View style={styles.row}>
              {/* Medicine Type */}
              <TextInput
                placeholder="Type (e.g., Pills, Syrup, etc.)"
                value={medicineType}
                onChangeText={(text) => handleMedicineTypeChange(text)}
                style={styles.dropdown}
                placeholderTextColor="#888"
              />
              {/* Dosage Input */}
              <TextInput
                placeholder={`Dosage (${dosageUnit || 'unit'})`}
                style={styles.dropdownleft}
                value={dosageUnit}
                onChangeText={setDosageUnit}
                placeholderTextColor="#888"
              />
            </View>
            <View style={styles.row}>
              {/* From Date */}
              <TouchableOpacity
                onPress={() => setIsFromDatePickerOpen(true)}
                style={[styles.input, styles.dateInput]}
              >
                <Text style={{ color: fromDate ? '#000' : '#888' }}>
                  {formatDate(fromDate)}
                </Text>
              </TouchableOpacity>

              {/* To Date */}
              <TouchableOpacity
                onPress={() => setIsToDatePickerOpen(true)}
                style={[styles.input, styles.dateInput]}
              >
                <Text style={{ color: toDate ? '#000' : '#888' }}>
                  {formatDate(toDate)}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Set Reminder Button */}
          <TouchableOpacity style={styles.reminderButton} onPress={handleSubmit}>
            <Text style={styles.reminderButtonText}>Set Reminder</Text>
          </TouchableOpacity>

          {/* From Date Picker */}
          <DatePicker
            modal
            open={isFromDatePickerOpen}
            date={fromDate}
            mode="date"
            onConfirm={(date) => {
              setIsFromDatePickerOpen(false);
              setFromDate(date);
            }}
            onCancel={() => setIsFromDatePickerOpen(false)}
          />

          {/* To Date Picker */}
          <DatePicker
            modal
            open={isToDatePickerOpen}
            date={toDate}
            mode="date"
            onConfirm={(date) => {
              setIsToDatePickerOpen(false);
              setToDate(date);
            }}
            onCancel={() => setIsToDatePickerOpen(false)}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};



const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    width: '100%',
  },
  header: {
    height: '35%',
    width: '100%',
    backgroundColor: '#FF8577',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  mealSelection: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: '6%',
    marginBottom: '-6%',
  },
  mealButton: {
    alignItems: 'center',
    width: '20%',
  },
  mealImage: {
    width: '100%',
    height: '23%',
    resizeMode: 'contain',
  },
  mealText: {
    fontSize: 13,
    color: '#888',
    fontWeight: 'bold',
    marginTop: 5,
  },
  selectedMealText: {
    color: '#FF8577',
  },
  form: {
    marginTop: '-21%',
    width: '100%',
    paddingHorizontal: '7%',
  },
  inputGroup: {
    marginBottom: '7%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '7%',
  },
  input: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingVertical: '4%',
    paddingHorizontal: '4%',
    borderRadius: 10,
    fontSize: 14,
    color: '#000',
  },
  dropdown: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingVertical: '4%',
    paddingHorizontal: '4%',
    borderRadius: 10,
    fontSize: 14,
    color: '#000',
  },
  dropdownleft: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingVertical: '4%',
    paddingHorizontal: '4%',
    borderRadius: 10,
    fontSize: 14,
    color: '#000',
    marginLeft: '3%',
  },
  dateInput: {
    flex: 0.48,
    backgroundColor: '#F5F5F5',
    paddingVertical: '6%',
    paddingHorizontal: '4%',
    borderRadius: 10,
    fontSize: 14,
    color: '#000',
  },
  reminderButton: {
    width: '90%',
    backgroundColor: '#FF8577',
    paddingVertical: '4.5%',
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: '-3%',
  },
  reminderButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MedicationReminder;
