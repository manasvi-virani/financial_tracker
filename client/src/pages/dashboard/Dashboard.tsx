import { BanknoteArrowDown, BanknoteArrowUp, DollarSign } from "lucide-react";
import useFetch from "../../hooks/useFetch";
import PieChart from "../../component/Dashboard/PieChart";
import LineChart from "../../component/Dashboard/Linechart";
import TransactionSummary from "../../component/Dashboard/TransactionSummary";
import { AccountSummary } from "../../component/Dashboard/AccountSummary";
export interface IAccountSummary {
  total_income: number;
  total_expense: number;
  available_balance: number;
  message: string;
}
const Dashboard = () => {
  const { data } = useFetch<IAccountSummary>("/account/summary");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return (
    <div className="container mx-auto p-4 ">
      <div className="text-start">
        <h1 className="font-semibold text-3xl">Dashboard</h1>
        <p className="text-gray">Manage your financial activity</p>
      </div>
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
          <div className="bg-blue-50 p-4 rounded shadow flex gap-4 justify-center">
            <div className="rounded-full size-10 bg-blue-200 p-2">
              <DollarSign className="h-6 w-6 text-blue-800" />
            </div>
            <div className="">
              <h2 className="font-medium text-lg">Available Balance</h2>
              <p className="text-sm">{`${user.currency} $ ${data?.available_balance}`}</p>
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded shadow flex gap-4 justify-center">
            <div className="rounded-full size-10 bg-blue-200 p-2">
              <BanknoteArrowUp className="h-6 w-6 text-blue-800" />
            </div>
            <div className="">
              <h2 className="font-medium text-lg">Total Income</h2>
              <p className="text-sm">{`${user.currency} $ ${data?.total_income}`}</p>
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded shadow flex gap-4 justify-center">
            <div className="rounded-full size-10 bg-blue-200 p-2">
              <BanknoteArrowDown className="h-6 w-6 text-blue-800" />
            </div>
            <div className="">
              <h2 className="font-medium text-lg">Total Expense</h2>
              <p className="text-sm">{`${user.currency} $ ${data?.total_expense}`}</p>
            </div>
          </div>
        </div>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="md:col-span-4 ">
              <LineChart />
            </div>
            <div className="md:col-span-2 ">
              <PieChart summary={data} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="md:col-span-4" >
              <TransactionSummary />
            </div>
            <div className="md:col-span-2" >
            <AccountSummary/>
            </div>
          </div>
      </div>
    </div>
  );
};
export default Dashboard;
