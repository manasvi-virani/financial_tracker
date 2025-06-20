import { zodResolver } from "@hookform/resolvers/zod";
import {
  addMoneySchema,
  type AddMoneyFormValues,
} from "../../schemas/accountAdd";
import InputField from "../form/InputField";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { updateAccount, type Iaccounts } from "../../reducer/accountSlice";
// import { useState } from "react";

export const AddMoney = ({
  setOpen,
  selectedAccount
}: {
  setOpen: (open: boolean) => void;
  selectedAccount : Iaccounts
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddMoneyFormValues>({
    resolver: zodResolver(addMoneySchema),
  });
const dispatch = useAppDispatch();
const {updating} = useAppSelector((state) => state.account);

  const onSubmit: SubmitHandler<AddMoneyFormValues> = async (formData) => {
    const payload = {
        id: selectedAccount.id,
        amount: formData.account_balance
    };
    try {
    await dispatch(updateAccount(payload)).unwrap(); 
      setTimeout(() => {
        setOpen(false); 
      }, 10);
    } catch (err) {
      console.log('Error creating account:', err);
    //   setError(err)
  
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <InputField
              name="account_balance"
              label="Amount"
              placeholder="100.00"
              register={register}
              error={errors.account_balance}
              required={true}
              type="number"
            />
        
    
        <div className="w-full flex justify-end">
          <button type="submit" className="button ">
            {updating ? (
              <Loader2 className="animate-spin h-4 w-4 text-white" />
            ) : (
              "Add Money"
            )}
          </button>
        </div>
        {/* {
          error && 
          ( <p className="text-red-500 text-sm mt-1">{error}</p>)
        } */}
       
      </form>
    </div>
  );
};
