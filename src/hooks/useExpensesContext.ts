import { useContext } from 'react';
import { ExpensesContext, ExpensesContextProps } from '../contexts/ExpensesContext';

export const useExpensesContext = (): ExpensesContextProps => {
    const context = useContext(ExpensesContext);
    if (!context) {
        throw new Error('useExpensesContext must be used within an ExpensesProvider');
    }
    return context;
};
