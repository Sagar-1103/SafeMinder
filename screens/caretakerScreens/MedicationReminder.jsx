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
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';

const MedicineReminder = () => {
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [medicineType, setMedicineType] = useState('');
  const [dosageUnit, setDosageUnit] = useState('');
  const [fromDate, setFromDate] = useState('From'); // Initial "From" placeholder
  const [toDate, setToDate] = useState('To'); // Initial "To" placeholder
  const [isFromPickerOpen, setIsFromPickerOpen] = useState(false);
  const [isToPickerOpen, setIsToPickerOpen] = useState(false);

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
    setDosageUnit(type === 'Pills' ? 'nos' : type === 'Syrup' ? 'ml' : '');
  };

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
                placeholderTextColor="#888"
              />
            </View>
            <View style={styles.row}>
              {/* Dropdown for Medicine Type */}
              <View style={styles.dropdown}>
                <Picker
                  selectedValue={medicineType}
                  onValueChange={(itemValue) => handleMedicineTypeChange(itemValue)}
                  style={{ height: '16%', width: '100%', color: '#888' }}
                >
                  <Picker.Item label="Type" value="" />
                  <Picker.Item label="Pills" value="Pills" />
                  <Picker.Item label="Syrup" value="Syrup" />
                  <Picker.Item label="Others" value="Others" />
                </Picker>
              </View>
              {/* Dosage Input */}
              <TextInput
                placeholder={`Dosage (${dosageUnit || 'unit'})`}
                style={[styles.dropdownleft]}
                placeholderTextColor="#888"
              />
            </View>
            <View style={styles.row}>
              {/* From Date */}
              <TouchableOpacity
                style={[styles.input, styles.dateInput]}
                onPress={() => setIsFromPickerOpen(true)}
              >
                <Text style={{ color: '#888' }}>{fromDate}</Text>
              </TouchableOpacity>
              <DatePicker
                modal
                mode="date"
                open={isFromPickerOpen}
                date={new Date()}
                onConfirm={(date) => {
                  setIsFromPickerOpen(false);
                  setFromDate(date.toDateString());
                }}
                onCancel={() => setIsFromPickerOpen(false)}
              />

              {/* To Date */}
              <TouchableOpacity
                style={[styles.input, styles.dateInput]}
                onPress={() => setIsToPickerOpen(true)}
              >
                <Text style={{ color: '#888' }}>{toDate}</Text>
              </TouchableOpacity>
              <DatePicker
                modal
                mode="date"
                open={isToPickerOpen}
                date={new Date()}
                onConfirm={(date) => {
                  setIsToPickerOpen(false);
                  setToDate(date.toDateString());
                }}
                onCancel={() => setIsToPickerOpen(false)}
              />
            </View>
          </View>

          {/* Set Reminder Button */}
          <TouchableOpacity style={styles.reminderButton}>
            <Text style={styles.reminderButtonText}>Set Reminder</Text>
          </TouchableOpacity>
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
    paddingVertical: '2%',
    paddingRight: '8%',
    borderRadius: 10,
    fontSize: 14,
    color: '#000',
    // marginLeft: '3%',
  },
  dropdownleft: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingVertical: '2%',
    paddingHorizontal: '5%',
    borderRadius: 10,
    fontSize: 14,
    color: '#000',
    marginLeft: '3%',
  },
  smallInput: {
    flex: 0.48,
    backgroundColor: '#F5F5F5',
    paddingVertical: '4%',
    paddingHorizontal: '4%',
    borderRadius: 10,
    fontSize: 14,
    color: '#000',
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
    marginTop: '-23%',
  },
  reminderButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MedicineReminder;
