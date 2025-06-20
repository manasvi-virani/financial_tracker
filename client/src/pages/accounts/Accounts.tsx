import { EllipsisVertical, HandCoins } from "lucide-react";

import { format } from "date-fns";
import Modal from "../../component/common/Modal";
import { useEffect, useState } from "react";
import { AccountAdd } from "../../component/account/AccountAdd";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchAccount, type Iaccounts } from "../../reducer/accountSlice";
import { AddMoney } from "../../component/account/AddMoney";
import { number } from "zod";
import { Popover, PopoverButton } from "@headlessui/react";
import { TransferMoney } from "../../component/account/TransferMoney";

const Accounts = () => {
  const dispatch = useAppDispatch();
  const { data,  } = useAppSelector((state) => state.account);

  useEffect(() => {
    dispatch(fetchAccount());
  }, [dispatch,]);
  const accounts: Iaccounts[] = data?.accounts || [];
  const [open, setOpen] = useState<boolean>(false);
  const [isAddMoneyOpen, setIsAddMoneyOpen] = useState<boolean>(false);
  const [isTransferMoneyOpen, setIsTransferMoneyOpen] = useState<boolean>(false)
  const [selectedAccount, setSelectedAccount] = useState<Iaccounts>({
    id: number,
    "account_number": "",
    "account_name": "",
    "account_balance": "",
    "createdat": "",
    "updatedat": ""
});
  const handleAddMoney =(account:Iaccounts)=>{
    setIsAddMoneyOpen(true)
  setSelectedAccount(() => {
    return account;
  });

  }
    const handleTransferMoney =(account:Iaccounts)=>{
    setIsTransferMoneyOpen(true)
  setSelectedAccount(() => {
    return account;
  });

  }
  return (
    <div className="container mx-auto p-4 ">
      <div className="text-start flex justify-between">
        <h1 className="font-semibold text-3xl">Account Information</h1>
                <button className="button text-sm" onClick={() => setOpen(true)}>
          + Add{" "}
        </button>

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
                <div className="flex flex-col items-end justify-between">
                   <Popover className="relative">
                        {({ open }) => (
                          <>
                            <PopoverButton as="div" className="appearance-none">
                               <EllipsisVertical className="size-5  cursor-pointer" />
                            </PopoverButton>
                  
                            {open && (
                              <Popover.Panel className="absolute z-10 mt-2 bg-white shadow-md p-4 rounded min-w-max">
                                <div className="text-start text-sm flex flex-col gap-1 text-gray">
                                  <p onClick={()=>handleTransferMoney(account)}  className=" cursor-pointer hover:underline">Transfer Money</p>
                                  <p onClick={()=>handleAddMoney(account)} className=" cursor-pointer  hover:underline" >Add Money</p>
                                </div>
                              </Popover.Panel>
                            )}
                          </>
                        )}
                      </Popover>
                 
                  <p onClick={()=>handleAddMoney(account)} className="link cursor-pointer" >Add Money</p>
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
      >
        <AccountAdd setOpen={setOpen}  />
      </Modal>
        <Modal
        open={isAddMoneyOpen}
        setOpen={setIsAddMoneyOpen}
        title="Add Money"
      >
        <AddMoney setOpen={setIsAddMoneyOpen} selectedAccount={selectedAccount} />
      </Modal>
              <Modal
        open={isTransferMoneyOpen}
        setOpen={setIsTransferMoneyOpen}
        title="Add Money"
      >
        <TransferMoney setOpen={setIsTransferMoneyOpen} selectedAccount={selectedAccount} />
      </Modal>
    </div>
  );
};

export default Accounts;
