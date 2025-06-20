import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import useFetch from '../../hooks/useFetch';

interface ItrasactionActivity {
    data:{
     "month": string,
            "income": number,
            "expense": number
    }[];
       
}
const LineChart : React.FC = () => {
    const { data } = useFetch<ItrasactionActivity>('/transaction/trasaction_activity');
    const transactionData = data?.data ?? [];
      const categories = transactionData.map(item => item.month);
  const incomeData = transactionData.map(item => item.income);
  const expenseData = transactionData.map(item => item.expense);
  // Define the chart options
  const options = {
    type: 'line',
    chart: { type: 'line' },
    title: {
      text: 'Monthly Income and Expense' 
    },
    xAxis: {
      categories,
      title: {
        text: 'Month' // Title for the X-axis   
    }},
    yAxis: {
      title: {
        text: "Amount ($)"
      }
    },
     tooltip: {
      shared: true,
      valuePrefix: "$",
    },
 series: [
      {
        name: "Income",
        data: incomeData,
        type: "line",
      },
      {
        name: "Expense",
        data: expenseData,
        type: "line",
      },
    ],
  };

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </div>
  );
};

export default LineChart;