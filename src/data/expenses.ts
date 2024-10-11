export type Expense = {
    id: string;
    amount: number;
    description: string;
    user: string;
    date: string; // Add date field
};
  
  
export const users = ["User1", "User2", "User3"];
  
export const expenses: Expense[] = [];
  