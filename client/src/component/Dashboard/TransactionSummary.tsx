import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import CommonTable from "../common/Table";
interface ITransaction {
  id: number;
  user_id: number;
  description: string;
  status: string;
  source: string;
  ammount: string;
  type: "income" | "expense";
  createdat: string;
  updatedat: string;
  account_id: number;
  [key: string]: unknown;
}

interface ITransactionResponse {
  data: ITransaction[];
}

const TransactionSummary = () => {
    const columns = [
    { key: "createdat", label: "Date", type: "date" },
    { key: "description", label: "Description" },
    { key: "status", label: "Status" },
    { key: "source", label: "Source" },
    { key: "ammount", label: "Amount" },
    { key: "type", label: "Type" },
    ]
  const { data } = useFetch<ITransactionResponse>("/transaction/get");
  const trasactionData: ITransaction[] = data?.data.slice(0,5) || [];
  return (
    <div className="text-end">
      <h1 className="text-start text-lg font-bold"> Latest Transaction </h1>
      <Link className="link mr-10" to={'/transaction'}>View all</Link>
      <CommonTable<ITransaction> data={trasactionData} columns={columns} />
    </div>
  );
};

export default TransactionSummary;
