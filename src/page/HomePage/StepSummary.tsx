import { Button, Typography } from '@mui/material';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import * as xlsxReader from 'xlsx';
import DataField from '../../component/DataField';
import { Column, Row } from '../../component/Flex';
import Separator from '../../component/Separator';
import { RootState } from '../../store/rootReducer';
import { capitalizeOnlyFirstLetter } from '../../utils/text';
import { nextNColumn } from '../../utils/xlsx';
import { GenerateButtonContainer, StepContainer, StepPaper, WorkingDayContainer } from './styled';

interface WorkingDay {
  dayNo: number;
  dayOfWeek: string;
  start: string;
  end: string;
  numberOfHours: number;
}

const StepSummary = () => {
  const [month, setMonth] = useState<string | null>(null);
  const [totalWorkingDays, setTotalWorkingDays] = useState<number | null>(null);
  const [totalWorkingHours, setTotalWorkingHours] = useState<number | null>(null);
  const [workingDays, setWorkingDays] = useState<WorkingDay[]>([]);
  const { file, selectedPerson, firstPerson } = useSelector((state: RootState) => state.creatorSlice);
  const { t } = useTranslation();

  useEffect(() => {
    if (file) {
      readMonthFromFile();
      readWorkingDaysFromFile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const readMonthFromFile = async () => {
    const data = await file?.arrayBuffer();
    const workbook = xlsxReader.read(data);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const monthColumn = 'A';
    if (firstPerson?.row) {
      const monthRowNo = firstPerson?.row - 2;
      const monthValue = sheet[`${monthColumn}${monthRowNo}`]?.v;

      if (monthValue) setMonth(monthValue);
    }
  };

  const readWorkingDaysFromFile = async () => {
    const data = await file?.arrayBuffer();
    const workbook = xlsxReader.read(data);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const dayNoColumn = 'A';
    const dayOfWeekColumn = 'B';
    const tempWorkingDays: WorkingDay[] = [];

    if (selectedPerson) {
      let attemptsNumber = 0;
      let row = selectedPerson?.row + 2;

      do {
        const dayOfWeek = sheet[`${dayOfWeekColumn}${row}`]?.v;
        const dayNo = +sheet[`${dayNoColumn}${row}`]?.v;
        const start = moment
          .utc(moment.duration(+sheet[`${selectedPerson.column}${row}`]?.v, 'hours').asMilliseconds())
          .format('HH:mm');
        const end = moment
          .utc(moment.duration(+sheet[`${nextNColumn(selectedPerson.column, 1)}${row}`]?.v, 'hours').asMilliseconds())
          .format('HH:mm');
        const numberOfHours = +sheet[`${nextNColumn(selectedPerson.column, 2)}${row}`]?.v;

        if (dayOfWeek && dayNo && start && end && numberOfHours && numberOfHours !== 0) {
          tempWorkingDays.push({ dayNo, dayOfWeek, start, end, numberOfHours });
        }

        row++;
        attemptsNumber++;
      } while (attemptsNumber < 35 && (tempWorkingDays.length === 0 || !isNaN(sheet[`${dayNoColumn}${row}`]?.v)));
    }

    setWorkingDays(tempWorkingDays);
    setTotalWorkingDays(tempWorkingDays.length);
    setTotalWorkingHours(tempWorkingDays.reduce((acc, curr) => acc + curr.numberOfHours, 0));
  };

  const generateCalendar = () => {};

  const capitalizedMonth = capitalizeOnlyFirstLetter(month);

  const renderWorkingDay = (workingDay: WorkingDay, separator: boolean) => (
    <>
      {separator && <Separator dense />}
      <WorkingDayContainer key={workingDay.dayNo}>
        <Column alignItems="center">
          <Typography variant="caption">
            {workingDay.dayNo} {capitalizedMonth}
          </Typography>
          <Typography variant="caption">{capitalizeOnlyFirstLetter(workingDay.dayOfWeek)}</Typography>
        </Column>
        <Typography variant="body1" marginLeft={3}>
          {workingDay.start} - {workingDay.end}
        </Typography>
      </WorkingDayContainer>
    </>
  );

  return (
    <StepContainer>
      <Row wrap>
        <Column>
          <StepPaper>
            <Typography variant="h5">{t('home.summary')}</Typography>
            <Row>
              <DataField flex label={t('home.myNameIs')} value={selectedPerson?.name || ''} />
              <DataField flex capitalize label={t('home.step3.month')} value={month} />
            </Row>
            <Row>
              <DataField flex capitalize label={t('home.step3.totalWorkingDays')} value={totalWorkingDays} />
              <DataField flex capitalize label={t('home.step3.totalWorkingHours')} value={totalWorkingHours} />
            </Row>
          </StepPaper>
          <StepPaper>
            <Typography variant="h5" marginBottom={2}>
              {t('home.step3.goCallendar')}
            </Typography>
            <Typography variant="body2" align="center">
              {t('home.step3.info')}
            </Typography>
            <GenerateButtonContainer>
              <Button variant="contained" style={{ textTransform: 'none' }} onClick={generateCalendar}>
                {t('home.step3.justDoIt')}
              </Button>
            </GenerateButtonContainer>
          </StepPaper>
        </Column>
        <Column>
          <StepPaper>
            <Typography variant="h5" marginBottom={2}>
              {t('home.step3.listOfWorkingDays')}
            </Typography>
            {workingDays.map((workingDay, index) => renderWorkingDay(workingDay, index !== 0))}
          </StepPaper>
        </Column>
      </Row>
    </StepContainer>
  );
};

export default StepSummary;
