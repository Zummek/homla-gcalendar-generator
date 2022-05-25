import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CreatorState {
  file: File | null;
  selectedPerson: XlsPerson | null;
  firstPerson: XlsCordinates | null;
}

export interface XlsCordinates {
  row: number;
  column: string;
}

export interface XlsPerson extends XlsCordinates {
  name: string;
}

const initialState: CreatorState = {
  file: null,
  selectedPerson: null,
  firstPerson: null
};

const creatorSlice = createSlice({
  name: 'creator',
  initialState,
  reducers: {
    setFile: (state, action: PayloadAction<File | null>) => {
      state.file = action.payload;
    },
    setSelectedPerson: (state, action: PayloadAction<XlsPerson | null>) => {
      state.selectedPerson = action.payload;
    },
    setFirstPerson: (state, action: PayloadAction<XlsCordinates | null>) => {
      state.firstPerson = action.payload;
    }
  }
});

export const { setFile, setSelectedPerson, setFirstPerson } = creatorSlice.actions;
export default creatorSlice.reducer;
