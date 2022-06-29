import { Autocomplete, Box, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as xlsxReader from 'xlsx';
import { RootState } from '../../store/rootReducer';
import { nextNColumn } from '../../utils/xlsx';
import { setFirstPerson, setSelectedPerson, XlsPerson } from './creatorSlice';
import { StepContainer } from './styled';

interface StepSelectPersonProps {
  allowNextStep: () => void;
}

const StepSelectPerson = ({ allowNextStep }: StepSelectPersonProps) => {
  const [persons, setPersons] = useState<XlsPerson[]>([]);
  const [selectedPersonValue, setSelectedPersonValue] = useState<XlsPerson | null>(null);
  const { file, selectedPerson } = useSelector((state: RootState) => state.creator);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    readPersonsFromFile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  useEffect(() => {
    if (selectedPerson && persons.length) {
      if (persons.find((person) => person.name === selectedPerson.name)) {
        setSelectedPersonValue(selectedPerson);
        allowNextStep();
      } else setSelectedPersonValue(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPerson, persons]);

  const onSelect = (selected: XlsPerson | null) => {
    dispatch(setSelectedPerson(selected));
    setSelectedPersonValue(selected);

    if (selected) allowNextStep();
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
    const foundPersons: XlsPerson[] = [];

    // find rowNo by wordKey in first column
    for (let rowNo = 1; rowNo < 100; rowNo++) {
      if (sheet['A' + rowNo] && sheet['A' + rowNo].w === wordKey) {
        personRowNo = rowNo;
        break;
      }
    }

    dispatch(
      setFirstPerson({
        row: personRowNo,
        column: firstPersonColumn
      })
    );

    // find all persons in next columns
    let personColumn = firstPersonColumn;
    while (true) {
      const person = {
        name: sheet[personColumn + personRowNo]?.w,
        row: personRowNo,
        column: personColumn
      };

      if (person.name) foundPersons.push(person);
      else break;
      personColumn = nextNColumn(personColumn, personsSeparatedByColumnAmount);
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
          options={persons}
          renderInput={(params) => <TextField {...params} label={t('home.myNameIs')} />}
          onChange={(event, value) => onSelect(value)}
          value={selectedPersonValue}
          getOptionLabel={(option) => option.name}
        />
      </Box>
    </StepContainer>
  );
};

export default StepSelectPerson;
