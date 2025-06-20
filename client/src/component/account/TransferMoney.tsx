import { zodResolver } from "@hookform/resolvers/zod";
import {
  transferMoneySchema,
  type TransferMoneyFormValues,
} from "../../schemas/accountAdd";
import InputField from "../form/InputField";
import SelectField from "../form/SelectField";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  createAccount,
  updateAccount,
  type Iaccounts,
} from "../../reducer/accountSlice";

export const TransferMoney = ({
  setOpen,
  selectedAccount,
}: {
  setOpen: (open: boolean) => void;
  selectedAccount: Iaccounts;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TransferMoneyFormValues>({
    resolver: zodResolver(transferMoneySchema),
  });
  const dispatch = useAppDispatch();
  const { creating, data } = useAppSelector((state) => state.account);

  //   const { ,  } = useAppSelector((state) => state.account);
  const accounts = data?.accounts.filter(
    (account) => account.account_number !== selectedAccount.account_number
  );
  const onSubmit: SubmitHandler<TransferMoneyFormValues> = async (formData) => {
    const receiverAccount = JSON.parse(formData.account);
    const payload = {
      id: selectedAccount.id,
      receiver_id: receiverAccount.id,
      amount: formData.amount,
    };
    try {
      await dispatch(updateAccount(payload)).unwrap();
      setTimeout(() => {
        setOpen(false);
      }, 1000);
    } catch (err) {
      console.log(err);
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
        <div className="flex flex-col">
          {<label className="mb-1 font-medium flex"> From Account</label>}
          <input
            type="text"
            disabled
            placeholder={"Account Number"}
            value={`${selectedAccount.account_name}-${selectedAccount.account_number}`}
            className={`border p-2 rounded `}
          />
        </div>
        <InputField
          name="amount"
          label="Amount"
          placeholder="100.00"
          register={register}
          error={errors.amount}
          required={true}
          type="number"
        />

        <div className="w-full flex justify-end">
          <button type="submit" className="button ">
            {creating ? (
              <Loader2 className="animate-spin h-4 w-4 text-white" />
            ) : (
              "Transfer Money"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
