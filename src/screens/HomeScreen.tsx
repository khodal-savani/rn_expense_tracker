import React, { useLayoutEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useExpensesContext } from '../hooks/useExpensesContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const HomeScreen = ({ navigation }: any) => {
  const { expenseList, deleteExpense } = useExpensesContext();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Expense Tracker',
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('AddExpense')}>
          <Icon name="add" size={30} color="#000" style={{ marginRight: 10 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const getWeeklyData = () => {
    const result: { [key: string]: number } = {};
    const today = new Date();
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);

    expenseList.forEach(expense => {
      const date = new Date(expense.date).toLocaleDateString();
      if (new Date(expense.date) >= lastWeek && new Date(expense.date) <= today) {
        if (!result[date]) {
          result[date] = 0;
        }
        result[date] += expense.amount;
      }
    });

    const labels = Object.keys(result);
    const data = Object.values(result).map(amount => amount as number);

    return {
      labels,
      datasets: [{ data }]
    };
  };

  const chartData: any = getWeeklyData();

  return (
    <View style={styles.container}>
      {chartData?.labels?.length > 0 && (
        <BarChart
          data={{
            labels: chartData.labels,
            datasets: chartData.datasets
          }}
          width={screenWidth - 30}
          height={220}
          yAxisLabel="₹"
          yAxisSuffix=""
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 100, 0, ${opacity})`,
            style: {
              borderRadius: 16
            }
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
      )}
      {expenseList?.length > 0 ? (
        <View>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Description</Text>
            <Text style={styles.tableHeaderText}>Amount</Text>
            <Text style={styles.tableHeaderText}>Date</Text>
            <Text style={styles.tableHeaderText}>Delete</Text>
          </View>
          <FlatList
            data={expenseList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>{item.description}</Text>
                <Text style={styles.tableCell}>{item.amount}</Text>
                <Text style={styles.tableCell}>{item.date}</Text>
                <Text style={styles.tableCell}>
                  <TouchableOpacity onPress={() => deleteExpense(item.id)}>
                    <Icon name="trash" size={25} color="#d9534f" />
                  </TouchableOpacity>
                </Text>
              </View>
            )}
          />
        </View>
      ) : (
        <View>
          <Text style={{ fontSize: 16, marginTop: 40, textAlign: 'center' }}>No Expense Found</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  tableHeader: { flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, paddingBottom: 10, marginBottom: 10 },
  tableHeaderText: { fontSize: 14, fontWeight: 'bold', flex: 1 },
  tableRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  tableCell: { flex: 1 },
});

export default HomeScreen;
