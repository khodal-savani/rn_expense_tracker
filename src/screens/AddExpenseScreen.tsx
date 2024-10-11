import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useExpensesContext } from '../hooks/useExpensesContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { users } from '../data/expenses';

const AddExpenseScreen = ({ navigation }: any) => {
    const { addExpense, number } = useExpensesContext();
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(new Date());

    const handleAddExpense = () => {
        const newExpense = {
            id: JSON.stringify(number),
            description,
            amount: parseFloat(amount),
            user: users[Math.floor(Math.random() * users.length)],
            date: date.toISOString().split('T')[0]
        };
        addExpense(newExpense);
        navigation.goBack();
    };

    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
    };

    return (
        <View style={styles.container}>
            <Text>Description</Text>
            <TextInput
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                style={styles.input}
            />
            <Text>Amount</Text>
            <TextInput
                placeholder="Amount"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                style={styles.input}
            />
            <View>
                <Text>Date</Text>
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    display="inline"
                    onChange={onChange}
                />
            </View>
            <Button title="Add Expense" onPress={handleAddExpense} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 5 },
});

export default AddExpenseScreen;
