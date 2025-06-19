import { Link } from "react-router-dom";
import CommonTable from "../common/Table";
import { useEffect, useState } from "react";
import { postHttpsWithAuth } from "../../utils/api";
export interface ITransaction {
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

export interface ITransactionResponse {
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
  // const { data } = useFetch<ITransactionResponse>("/transaction/get");
  const [transactionData, setTrasactionData] = useState<ITransaction[]>([]);
      useEffect(() => {
      const fetchTransactionData = async () => {
      try {
        const response: ITransactionResponse = await postHttpsWithAuth(`/transaction/get?`, {});
          const transactionData: ITransaction[] = response?.data.slice(0,5) || [];
        setTrasactionData(transactionData);
        // setData(response);
      } catch (err) {
        console.log('err', err)
      } 
    };

    fetchTransactionData();       
    }, []);

  return (
    <div className="text-end">
      <h1 className="text-start text-lg font-bold"> Latest Transaction </h1>
      <Link className="link mr-10" to={'/transaction'}>View all</Link>
      <CommonTable<ITransaction> data={transactionData} columns={columns} />
    </div>
  );
};

export default TransactionSummary;
