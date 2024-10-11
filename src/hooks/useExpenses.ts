import { useState } from 'react';
import { Expense, expenses } from '../data/expenses';

export const useExpenses = () => {
    const [expenseList, setExpenseList] = useState<Expense[]>(expenses);

    const addExpense = (expense: Expense) => {
        console.log('expense', expense);

        setExpenseList([...expenseList, expense]);
    };

    const deleteExpense = (id: string) => {
        setExpenseList(expenseList.filter(expense => JSON.stringify(expense.id) !== JSON.stringify(id)));
    };

    return {
        expenseList,
        addExpense,
        deleteExpense
    };
};
