import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

type Props = {
    label:string;
    value: number;
    onChange: (value: number) => void;
};

const QuantitySelect = ({ label, value, onChange }: Props) => {
  const options = Array.from({ length: 20 }, (_, i) => (i + 1) * 0.1);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={value}
          onValueChange={(itemValue) => onChange(Number(itemValue))}
          style={styles.picker}
        >
          {options.map((option) => (
            <Picker.Item key={option} label={option.toFixed(1)} value={option} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default QuantitySelect;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    overflow: 'hidden',
        width:120
  },
  picker: {
    height: 50,
    marginHorizontal: 8,
  },
});
