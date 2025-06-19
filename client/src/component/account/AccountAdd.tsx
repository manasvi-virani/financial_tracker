import { zodResolver } from "@hookform/resolvers/zod";
import {
  accountAddSchema,
  type AccountAddFormValues,
} from "../../schemas/accountAdd";
import InputField from "../form/InputField";
import SelectField from "../form/SelectField";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { postHttpsWithAuth } from "../../utils/api";
import { Loader2 } from "lucide-react";

export const AccountAdd = ({
  setIsRefresh,
  setOpen,
}: {
  setIsRefresh: React.Dispatch<React.SetStateAction<boolean>>
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
  console.log("errors", errors);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const accounts = [
    {
      account_number: "100000016",
      account_name: "PayPal",
      account_balance: 1500.0,
    },
    {
      account_number: "10000002",
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
  console.log("values", values);
  // clo

  const onSubmit: SubmitHandler<AccountAddFormValues> = async (formData) => {
    const selectedAccount = JSON.parse(formData.account);
    console.log("selectedAccount", selectedAccount);
    const payload = {
      account_number: selectedAccount.account_number,
      account_name: selectedAccount.account_name,
      account_balance: formData.account_balance,
    };
    try {
      setIsLoading(true);
      const response: unknown = await postHttpsWithAuth(
        `/account/create`,
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
            {isLoading ? (
              <Loader2 className="animate-spin h-4 w-4 text-white" />
            ) : (
              "Create Account"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
