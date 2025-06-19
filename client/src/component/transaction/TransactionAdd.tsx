import SelectField from "../form/SelectField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  transactionAddSchema,
  type TransactionAddFormValues,
} from "../../schemas/transactionAddSchema";
import type { IAccountResponse, Iaccounts } from "../Dashboard/AccountSummary";
import useFetch from "../../hooks/useFetch";
import { joinStrings } from "../../utils/stringFuction";
import InputField from "../form/InputField";
import { postHttpsWithAuth } from "../../utils/api";
import { useState } from "react";
import { Loader2 } from "lucide-react";
const TransactionAdd = ({
  setIsRefresh,
  setOpen,
}: {
  setIsRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  setOpen: (open: boolean) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<TransactionAddFormValues>({
    resolver: zodResolver(transactionAddSchema),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data } = useFetch<IAccountResponse>("/account/get");
  const accounts: Iaccounts[] = data?.accounts || [];
  const values = watch();
  const onSubmit: SubmitHandler<TransactionAddFormValues> = async (
    formData
  ) => {
    const selectedAccount = JSON.parse(formData.account);
    const payload = {
      account_id: selectedAccount.id,
      description: formData.description,
      amount: formData.amount,
      source: selectedAccount.account_name,
      type: "income", // or "expense" based on your logic
    };
    try {
      setIsLoading(true);
      const response: unknown = await postHttpsWithAuth(
        `/transaction/add`,
        payload
      );
      console.log("response", response);
      setTimeout(() => {
        setIsLoading(false);
        setOpen(false);
      }, 1000);
      setIsRefresh((prev) => !prev);
    } catch (err) {
      console.log("err", err);
    }
    console.log("Selected Account Object:", selectedAccount);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <SelectField
          name="account"
          label="Select Account"
          options={accounts} // Array of objects
          register={register}
          error={errors.account}
          required
          getLabel={(acc) =>
            joinStrings(acc.account_name, acc.account_balance, "")
          }
        />
        {values.account && (
          <>
            <InputField
              name="description"
              label="Description"
              placeholder="Description"
              register={register}
              error={errors.description}
              required={true}
            />
            <InputField
              name="amount"
              label="Amount"
              placeholder="Amount"
              register={register}
              error={errors.amount}
              required={true}
              type="number"
            />
          </>
        )}
        <div className="w-full flex justify-end">
          <button type="submit" className="button ">
            {isLoading ? (
              <Loader2 className="animate-spin h-4 w-4 text-white" />
            ) : (
              "Add Transaction"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
export default TransactionAdd;
