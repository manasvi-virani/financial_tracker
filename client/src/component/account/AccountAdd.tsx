import { zodResolver } from "@hookform/resolvers/zod";
import {
  accountAddSchema,
  type AccountAddFormValues,
} from "../../schemas/accountAdd";
import InputField from "../form/InputField";
import SelectField from "../form/SelectField";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { createAccount } from "../../reducer/accountSlice";
import { useState } from "react";

export const AccountAdd = ({
  setOpen,
}: {
  setOpen: (open: boolean) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<AccountAddFormValues>({
    resolver: zodResolver(accountAddSchema),
  });
const dispatch = useAppDispatch();
const {creating} = useAppSelector((state) => state.account);
const [error, seterror] = useState<string>("")

  const accounts = [
    {
      account_number: "1000000",
      account_name: "PayPal",
      account_balance: 1500.0,
    },
    {
      account_number: "10000006",
      account_name: "Debit Card",
      account_balance: 1500.0,
    },
    {
      account_number: "10000003",
      account_name: "Cash",
      account_balance: 1500.0,
    },
  ];
  const values = watch();
  const onSubmit: SubmitHandler<AccountAddFormValues> = async (formData) => {
    const selectedAccount = JSON.parse(formData.account);
    const payload = {
      account_number: selectedAccount.account_number,
      account_name: selectedAccount.account_name,
      account_balance: formData.account_balance,
    };
    try {
    await dispatch(createAccount(payload)).unwrap(); // use .unwrap to throw errors if any
      setTimeout(() => {
        setOpen(false); 
      }, 1000);

      
    } catch (err:string) {
      seterror(err)
  
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <SelectField
          name="account"
          label="Select Account"
          options={accounts}
          register={register}
          error={errors.account}
          required
          getLabel={(acc) => acc.account_name}
        />
        {values.account && (
          <>
            <div className="flex flex-col">
              {<label className="mb-1 font-medium flex"> Account Number</label>}
              <input
                type="text"
                disabled
                placeholder={"Account Number"}
                value={JSON.parse(values.account).account_number}
                className={`border p-2 rounded `}
              />
            </div>
            <InputField
              name="account_balance"
              label="Amount"
              placeholder="100.00"
              register={register}
              error={errors.account_balance}
              required={true}
              type="number"
            />
          </>
        )}
        <div className="w-full flex justify-end">
          <button type="submit" className="button ">
            {creating ? (
              <Loader2 className="animate-spin h-4 w-4 text-white" />
            ) : (
              "Create Account"
            )}
          </button>
        </div>
        {
          error && 
          ( <p className="text-red-500 text-sm mt-1">{error}</p>)
        }
       
      </form>
    </div>
  );
};
