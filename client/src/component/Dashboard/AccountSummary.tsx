import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import { Banknote } from "lucide-react";
export interface Iaccounts {
  id: number;
  account_number: string;
  account_name: string;
  account_balance: string;
  createdat: string;
  updatedat: string;
}

export interface IAccountResponse {
  userId: number;
  accounts: Iaccounts[];
}

export const AccountSummary = () => {
  const { data } = useFetch<IAccountResponse>("/account/get");
  const accounts: Iaccounts[] = data?.accounts.slice(0, 3) || [];
  // const 
  console.log("accounts", accounts);

  return (
    <div className=" px-3">
      <h1 className="text-lg font-bold text-start">Accounts</h1>
      <div className="text-end">
        <Link className="link" to={"/accounts"}>
          View all your accounts
        </Link>
      </div>

      <div className="mt-4">
        {accounts.map((account: Iaccounts) => (
          <div className="grid grid-cols-2  mb-3" key={account.id}>
            <div className="col-span-1 text-start">
              <div className="flex items-center gap-4">
                <div className="rounded-full size-10 bg-blue-100 p-2 flex items-center justify-center ">
                  <Banknote className="size-5 text-blue-800" />
                </div>
                <div>
                  <p>{account.account_name}</p>
                  <p className="text-gray text-sm">{account.account_number}</p>
                </div>
              </div>
            </div>
            <div className="col-span-1 text-end">
              <p> ${account.account_balance}</p>
              <p className="text-gray text-sm">Account Balance</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
