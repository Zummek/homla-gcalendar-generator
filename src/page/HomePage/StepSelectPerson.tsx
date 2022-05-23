import { Autocomplete, Box, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { dispatch } from '../../store/configureStore';
import { RootState } from '../../store/rootReducer';
import { setSelectedPerson } from './creatorSlice';
import { StepContainer } from './styled';

interface StepSelectPersonProps {
  allowNextStep: () => void;
}

const StepSelectPerson = ({ allowNextStep }: StepSelectPersonProps) => {
  const [persons, setPersons] = useState<string[]>([]);
  const { file } = useSelector((state: RootState) => state.creatorSlice);
  const { t } = useTranslation();

  useEffect(() => {
    readPersonsFromFile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const onSelect = (selected: string | null) => {
    dispatch(setSelectedPerson(selected));

    if (selected) allowNextStep();
  };

  const readPersonsFromFile = () => {
    if (!file) return [];

    setPersons(['John Doe', 'Jane Doe', 'John Smith', 'Jane Smith']);
  };

  return (
    <StepContainer>
      <Box width={350} alignSelf="center">
        <Typography variant="h6" marginBottom={2}>
          {t('home.step2.selectYourself')}
        </Typography>
        <Autocomplete
          autoComplete
          autoHighlight
          autoSelect
          options={persons}
          renderInput={(params) => <TextField {...params} label="Movie" />}
          onChange={(event, value) => onSelect(value)}
        />
      </Box>
    </StepContainer>
  );
};

export default StepSelectPerson;
