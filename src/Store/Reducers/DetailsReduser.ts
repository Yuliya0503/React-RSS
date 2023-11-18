import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IDetailsState {
  mode: boolean;
}

const initialState: IDetailsState = {
  mode: false,
};

const DetailSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    setView: (state: IDetailsState, action: PayloadAction<boolean>) => {
      state.mode = action.payload;
    },
  },
});

export const { setView } = DetailSlice.actions;
export default DetailSlice.reducer;
