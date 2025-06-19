import { EllipsisVertical, HandCoins } from "lucide-react";
import useFetch from "../../hooks/useFetch";
import type {
  IAccountResponse,
  Iaccounts,
} from "../../component/Dashboard/AccountSummary";
import { format } from "date-fns";
import Modal from "../../component/common/Modal";
import { useState } from "react";
import { AccountAdd } from "../../component/account/AccountAdd";

const Accounts = () => {
  const [isRefresh, setIsRefresh] = useState(false);
  const { data } = useFetch<IAccountResponse>("/account/get", isRefresh);
  const accounts: Iaccounts[] = data?.accounts || [];
  const [open, setOpen] = useState<boolean>(false);

  console.log("accounts", accounts);
  return (
    <div className="container mx-auto p-4 ">
      <div className="text-start flex justify-between">
        <h1 className="font-semibold text-3xl">Account Information</h1>
                <button className="button text-sm" onClick={() => setOpen(true)}>
          + Add{" "}
        </button>
        {/* <p className="text-gray">Manage your financial activity</p> */}
      </div>
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
          {accounts.map((account: Iaccounts) => {
            return (
              <div className="bg-blue-50 p-4 rounded shadow flex gap-3 justify-between">
                <div className="text-start flex gap-4">
                  <div className="rounded-full size-10 bg-blue-200 p-2">
                    <HandCoins className="h-6 w-6 text-blue-800" />
                  </div>
                  <div>
                    <h2 className="font-medium text-lg">
                      {account.account_name}
                    </h2>
                    <p className=" text-sm">{account.account_number}</p>
                    <p className="text-sm text-gray">
                      {format(new Date(account.updatedat), "EEE, MMM dd, yyyy")}
                    </p>
                    <p className="text-sm text-gray">CAD ${account.account_balance}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between ">
                  <EllipsisVertical className="size-5  cursor-pointer" />
                  <p className="link cursor-pointer ">Add Money</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Modal
        open={open}
        setOpen={setOpen}
        title="Add Account"
        // confirmText="Deactivate"
        // onConfirm={() => alert("Account deactivated")}
      >
        <AccountAdd setOpen={setOpen} setIsRefresh={setIsRefresh}/>
      </Modal>
    </div>
  );
};

export default Accounts;
