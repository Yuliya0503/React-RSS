import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../RootReduser';

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
export const selectDetails = (state: RootState) => state.detailsSlice.mode;
export default DetailSlice.reducer;
