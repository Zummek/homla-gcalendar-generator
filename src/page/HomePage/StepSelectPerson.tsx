import { Autocomplete, Box, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as xlsxReader from 'xlsx';
import { RootState } from '../../store/rootReducer';
import { setFirstPersonKey, setSelectedPerson } from './creatorSlice';
import { StepContainer } from './styled';

interface StepSelectPersonProps {
  allowNextStep: () => void;
}

const StepSelectPerson = ({ allowNextStep }: StepSelectPersonProps) => {
  const [persons, setPersons] = useState<string[]>([]);
  const [selectedPersonValue, setSelectedPersonValue] = useState<string | null>(null);
  const { file, selectedPerson } = useSelector((state: RootState) => state.creatorSlice);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    readPersonsFromFile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  useEffect(() => {
    if (selectedPerson && persons.length) {
      if (persons.includes(selectedPerson)) setSelectedPersonValue(selectedPerson);
      else setSelectedPersonValue(null);
    }
  }, [selectedPerson, persons]);

  const onSelect = (selected: string | null) => {
    dispatch(setSelectedPerson(selected));
    setSelectedPersonValue(selected);

    if (selected) allowNextStep();
  };

  const nextNCharacter = (char: string, n: number) => {
    return String.fromCharCode(char.charCodeAt(0) + n);
  };

  const readPersonsFromFile = async () => {
    if (!file) return [];

    const wordKey = 'DNI';
    const firstPersonColumn = 'C';
    const personsSeparatedByColumnAmount = 4;
    const data = await file.arrayBuffer();
    const workbook = xlsxReader.read(data);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    let personRowNo = 0;
    const foundPersons = [];

    // find rowNo by wordKey in first column
    for (let rowNo = 1; rowNo < 100; rowNo++) {
      if (sheet['A' + rowNo] && sheet['A' + rowNo].v === wordKey) {
        personRowNo = rowNo;
        break;
      }
    }

    dispatch(setFirstPersonKey(firstPersonColumn + personRowNo));

    // find all persons in next columns
    let personColumn = firstPersonColumn;
    while (true) {
      const person = sheet[personColumn + personRowNo]?.v;
      if (person) foundPersons.push(person);
      else break;
      personColumn = nextNCharacter(personColumn, personsSeparatedByColumnAmount);
    }

    setPersons(foundPersons);
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
          renderInput={(params) => <TextField {...params} label={t('home.step2.myNameIs')} />}
          onChange={(event, value) => onSelect(value)}
          value={selectedPersonValue}
        />
      </Box>
    </StepContainer>
  );
};

export default StepSelectPerson;
