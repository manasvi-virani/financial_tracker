// DonutChart.tsx
import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import type { IAccountSummary } from "../../pages/dashboard/Dashboard";

interface PieChartProps {
  summary: IAccountSummary | null;
}

const PieChart: React.FC<PieChartProps> = ({ summary }) => {
  const options: Highcharts.Options = {
    chart: {
      type: "pie",
    },
    title: {
      text: "summary"
    },
    plotOptions: {
      pie: {
        innerSize: "60%", 
        dataLabels: {
          enabled: true,
          format: "{point.name}: {point.percentage:.1f}%",
        },
      },
    },
    series: [
      {
        name: "Share",
        type: "pie",
        data: [
          { name: "Available Balance", y: summary?.available_balance || 0 },
          { name: "Expense", y: summary?.total_expense || 0 },
        ],
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default PieChart;
