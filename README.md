# Expense Tracker

This is a simple Expense Tracker app built with React Native, TypeScript, and Expo. The app allows users to add, view, and delete expenses. It also provides a weekly summary of expenses with a bar chart representation.

## Technologies Used

- React Native
- TypeScript
- Expo
- react-native-svg-charts for the bar chart
- react-native-vector-icons for icons
- @react-native-async-storage/async-storage for data persistence

## Features

- Add and delete expenses
- View a list of all recorded expenses
- Assign expenses to predefined users
- Weekly summary of expenses displayed with a bar chart
- Responsive and clean user interface

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/khodal-savani/rn_expense_tracker.git
   cd expense-tracker

   ```

2. **Install dependencies:**
   npm install

3. **Start the development server:**
   npx expo start

## Usage

1. **Add Expense:**

   - Navigate to the home screen.
   - Click on the "+" icon in the top right corner to add a new expense.
   - Fill in the details (description, amount, date) and save.

2. **Delete Expense:**

   - On the home screen, click on left icon on any expense item to delete it.

3. **View Weekly Summary:**
   - The home screen displays a bar chart showing the total expenses for each day of the past week.
