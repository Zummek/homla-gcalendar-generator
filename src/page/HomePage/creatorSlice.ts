import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CreatorState {
  file: File | null;
  selectedPerson: string | null;
}

const initialState: CreatorState = {
  file: null,
  selectedPerson: null
};

const creatorSlice = createSlice({
  name: 'creator',
  initialState,
  reducers: {
    setFile: (state, action: PayloadAction<File | null>) => {
      state.file = action.payload;
    },
    setSelectedPerson: (state, action: PayloadAction<string | null>) => {
      state.selectedPerson = action.payload;
    }
  }
});

export const { setFile, setSelectedPerson } = creatorSlice.actions;
export default creatorSlice.reducer;
