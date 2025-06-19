import { useEffect, useState } from "react";
import type {
  ITransaction,
  ITransactionResponse,
} from "../../component/Dashboard/TransactionSummary";
import CommonTable from "../../component/common/Table";
import { postHttpsWithAuth } from "../../utils/api";
import DateRangePicker from "../../component/form/DateRangePicker";
import type { Range } from "react-date-range";
import Modal from "../../component/common/Modal";
import TransactionAdd from "../../component/transaction/TransactionAdd";

const Transaction = () => {
  const columns = [
    { key: "createdat", label: "Date", type: "date" },
    { key: "description", label: "Description" },
    { key: "status", label: "Status" },
    { key: "source", label: "Source" },
    { key: "ammount", label: "Amount" },
  ];
  const [trasactionData, setTrasactionData] = useState<ITransaction[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [range, setRange] = useState<Range>({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    endDate: new Date(),
    key: "selection",
  });
  const [isRefresh, setIsRefresh] = useState(false);
  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const response: ITransactionResponse = await postHttpsWithAuth(
          `/transaction/get?`,
          range
        );
        setTrasactionData(response.data || []);
      } catch (err) {
        console.log("err", err);
      }
    };

    fetchTransactionData();
  }, [range, isRefresh]);
  return (
    <div className="text-end px-8">
      <h1 className="text-start text-lg font-bold">Transaction Activity</h1>
      <div className="flex justify-end gap-6">
        <DateRangePicker setRange={setRange} range={range} />
        <div className="max-w-md ">
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full px-4 py-2  ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search Transaction"
              required
            />
          </div>
        </div>
        <button onClick={() => setOpen(true)} className="button text-sm">
          + Pay{" "}
        </button>
      </div>

      <CommonTable<ITransaction>
        data={trasactionData}
        columns={columns}
        pageSize={6}
      />

      <Modal
        open={open}
        setOpen={setOpen}
        title="Add Transaction"
        confirmText="Deactivate"
        // onConfirm={() => alert("Account deactivated")}
      >
        <TransactionAdd setIsRefresh={setIsRefresh}    setOpen={setOpen}/>
      </Modal>
    </div>
  );
};
export default Transaction;
