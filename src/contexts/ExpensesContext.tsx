import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Expense } from '../data/expenses';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface ExpensesContextProps {
  expenseList: Expense[];
  addExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
  number: number;
}

export const ExpensesContext = createContext<ExpensesContextProps | undefined>(undefined);

const EXPENSES_STORAGE_KEY = '@expenseList';
const NUMBER_STORAGE_KEY = '@number';

export const ExpensesProvider = ({ children }: { children: ReactNode }) => {
  const [expenseList, setExpenseList] = useState<Expense[]>([]);
  const [number, setNumber] = useState(1);

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const storedExpenses = await AsyncStorage.getItem(EXPENSES_STORAGE_KEY);
        const storedNumber = await AsyncStorage.getItem(NUMBER_STORAGE_KEY);
        if (storedExpenses) setExpenseList(JSON.parse(storedExpenses));
        if (storedNumber) setNumber(parseInt(storedNumber));
      } catch (error) {
        console.error('Failed to load expenses from storage', error);
      }
    };

    loadExpenses();
  }, []);

  const saveExpenses = async (expenses: Expense[], newNumber: number) => {
    try {
      await AsyncStorage.setItem(EXPENSES_STORAGE_KEY, JSON.stringify(expenses));
      await AsyncStorage.setItem(NUMBER_STORAGE_KEY, newNumber.toString());
    } catch (error) {
      console.error('Failed to save expenses to storage', error);
    }
  };

  const addExpense = (expense: Expense) => {
    const updatedList = [...expenseList, expense];
    setExpenseList(updatedList);
    const newNumber = number + 1;
    setNumber(newNumber);
    saveExpenses(updatedList, newNumber);
  };

  const deleteExpense = (id: string) => {
    const updatedList = expenseList.filter(expense => expense.id !== id);
    setExpenseList(updatedList);
    saveExpenses(updatedList, number);
  };

  return (
    <ExpensesContext.Provider value={{ expenseList, addExpense, deleteExpense, number }}>
      {children}
    </ExpensesContext.Provider>
  );
};
