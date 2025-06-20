// features/account/accountSlice.ts
import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import {
  getHttpsWithAuth,
  patchHttpsWithAuth,
  postHttpsWithAuth,
} from "../utils/api";
import axios from "axios";
import type { AppDispatch } from "../store";
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

export interface IAccountPayload {
  account_number: string;
  account_name: string;
  account_balance: number;
  is_add?: boolean;
}

export interface IAccountUpdatePayload {
  id: number;
  amount: number;
  receiver_id?:number
}

interface AccountState {
  data: IAccountResponse | null;
  loading: boolean;
  creating: boolean;
  updating: boolean;
  error: string | null;
}

const initialState: AccountState = {
  data: null,
  loading: false,
  creating: false,
  updating: false,
  error: null,
};
export const fetchAccount = createAsyncThunk<IAccountResponse>(
  "account/fetchAccount",
  async (_, { rejectWithValue }) => {
    try {
      const response = (await getHttpsWithAuth(
        "/account/get"
      )) as IAccountResponse;
      return response;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);
export const createAccount = createAsyncThunk<
  void,
  IAccountPayload,
  { dispatch: AppDispatch; rejectValue: string }
>("account/createAccount", async (payload, { dispatch, rejectWithValue }) => {
  try {
    await postHttpsWithAuth("/account/create", payload);
    dispatch(fetchAccount());
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Now TypeScript knows error.response exists
      return rejectWithValue(
        error.response?.data?.error || "An error occurred"
      );
    }

    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }

    return rejectWithValue("An unknown error occurred");
  }
});
export const updateAccount = createAsyncThunk<
  void,
  IAccountUpdatePayload,
  { dispatch: AppDispatch; rejectValue: string }
>("account/updateAccount", async (payload, { dispatch, rejectWithValue }) => {
  try {
    await patchHttpsWithAuth("account/update", payload);
    dispatch(fetchAccount());
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Now TypeScript knows error.response exists
      return rejectWithValue(
        error.response?.data?.error || "An error occurred"
      );
    }

    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }

    return rejectWithValue("An unknown error occurred");
  }
});
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAccount.fulfilled,
        (state, action: PayloadAction<IAccountResponse>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // CREATE
      .addCase(createAccount.pending, (state) => {
        state.creating = true;
        state.error = null;
      })
      .addCase(createAccount.fulfilled, (state) => {
        state.creating = false;
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.creating = false;
        state.error = action.payload ?? "Failed to create account";
      })
      // update
      .addCase(updateAccount.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateAccount.fulfilled, (state) => {
        state.updating = false;
      })
      .addCase(updateAccount.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload ?? "Failed to create account";
      });
  },
});

export default accountSlice.reducer;
