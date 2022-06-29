import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { t } from 'i18next';

interface CreatorState {
  file: File | null;
  selectedPerson: XlsPerson | null;
  firstPerson: XlsCordinates | null;
  eventTitle: string;
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
  firstPerson: null,
  eventTitle: t('home.step3.work') as string
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
    },
    setEventTitle: (state, action: PayloadAction<string>) => {
      state.eventTitle = action.payload;
    }
  }
});

export const { setFile, setSelectedPerson, setFirstPerson, setEventTitle } = creatorSlice.actions;
export default creatorSlice.reducer;
