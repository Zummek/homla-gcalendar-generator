import { Button, TextField, Typography } from '@mui/material';
import moment from 'moment';
import 'moment/locale/pl';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import * as xlsxReader from 'xlsx';
import DataField from '../../component/DataField';
import { Column, Row } from '../../component/Flex';
import Separator from '../../component/Separator';
import { RootState } from '../../store/rootReducer';
import { generateICS } from '../../utils/ics';
import { capitalizeOnlyFirstLetter } from '../../utils/text';
import { nextNColumn } from '../../utils/xlsx';
import {
  AppleCalendarNotice,
  CustomA,
  GenerateButtonContainer,
  InputsContainer,
  ScrollableBox,
  StepContainer,
  StepPaper,
  WorkingDayContainer
} from './styled';

export interface WorkingDay {
  dayNo: number;
  dayOfWeek: string;
  start: string;
  end: string;
  numberOfHours: number;
}

const StepSummary = () => {
  const [year, setYear] = useState(moment().year());
  const [month, setMonth] = useState<number | null>(null);
  const [error, setError] = useState({
    year: false,
    month: false
  });
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

  const formatedMonth = month ? moment(month, 'MM').format('MMMM') : '';

  const readMonthFromFile = async () => {
    const data = await file?.arrayBuffer();
    const workbook = xlsxReader.read(data);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const monthColumn = 'A';
    if (firstPerson?.row) {
      const monthRowNo = firstPerson?.row - 2;
      const monthValue = sheet[`${monthColumn}${monthRowNo}`]?.v;

      moment.locale('pl');
      const month = moment(capitalizeOnlyFirstLetter(monthValue), 'MMMM').format('M');

      if (monthValue && month) setMonth(+month);
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

  const generateCalendar = () => {
    if (!year || isNaN(year) || !month || isNaN(month)) {
      setError({
        year: !year || isNaN(year),
        month: !month || isNaN(month)
      });
    } else {
      setError({
        year: false,
        month: false
      });
      if (selectedPerson) {
        const icsCalendarString = generateICS(workingDays, month, year);
        const blob = new Blob([icsCalendarString], { type: 'text/calendar;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Homla ${capitalizeOnlyFirstLetter(selectedPerson.name)} ${capitalizeOnlyFirstLetter(
          formatedMonth
        )}.ics`;
        document.body.appendChild(link);
        link.click();
      }
    }
  };

  const renderWorkingDay = (workingDay: WorkingDay, separator: boolean) => (
    <>
      {separator && <Separator dense />}
      <WorkingDayContainer key={workingDay.dayNo}>
        <Column alignItems="center">
          <Typography variant="caption">
            {workingDay.dayNo} {formatedMonth}
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
      <Row wrap justifyContent="center">
        <Column>
          <StepPaper>
            <Typography variant="h5">{t('home.summary')}</Typography>
            <Row>
              <DataField flex label={t('home.myNameIs')} value={selectedPerson?.name || ''} />
              <DataField flex capitalize label={t('home.step3.month')} value={formatedMonth} />
            </Row>
            <Row>
              <DataField flex capitalize label={t('home.step3.totalWorkingDays')} value={totalWorkingDays} />
              <DataField flex capitalize label={t('home.step3.totalWorkingHours')} value={totalWorkingHours} />
            </Row>
            <InputsContainer>
              <TextField
                label={t('home.step3.generateForYear')}
                value={!year || isNaN(year) ? '' : String(year)}
                onChange={(e) => setYear(+e.target.value)}
                variant="standard"
                inputMode="decimal"
                error={error.year}
              />
              <TextField
                label={t('home.step3.generateForMonth')}
                value={!month || isNaN(month) ? '' : String(month)}
                onChange={(e) => setMonth(+e.target.value)}
                variant="standard"
                inputMode="decimal"
                error={error.month}
              />
            </InputsContainer>
          </StepPaper>
          <StepPaper>
            <Typography variant="h5" marginBottom={2}>
              {t('home.step3.generateCalendar')}
            </Typography>
            <Typography variant="body2" align="center">
              {t('home.step3.info')}
            </Typography>
            <GenerateButtonContainer>
              <Button variant="contained" style={{ textTransform: 'none' }} onClick={generateCalendar}>
                {t('home.step3.justDoIt')}
              </Button>
            </GenerateButtonContainer>
            <Typography variant="subtitle1" align="left">
              {t('home.step3.importToCalendar')}
            </Typography>
            <Typography variant="body2" align="left">
              {t('home.step3.importToCalendarStep1')}{' '}
              <CustomA
                href="https://calendar.google.com/calendar/u/0/r/settings/export"
                target="_blank"
                rel="noreferrer"
              >
                Google Calendar settings / import
              </CustomA>
              . <br />
              {t('home.step3.importToCalendarStep2')} <br />
              {t('home.step3.importToCalendarStep3')}
            </Typography>
            <AppleCalendarNotice>{t('home.step3.appleInfo')}</AppleCalendarNotice>
          </StepPaper>
        </Column>
        <Column>
          <StepPaper>
            <Typography variant="h5" marginBottom={2}>
              {t('home.step3.listOfWorkingDays')}
            </Typography>
            <ScrollableBox>
              {workingDays.map((workingDay, index) => renderWorkingDay(workingDay, index !== 0))}
            </ScrollableBox>
          </StepPaper>
        </Column>
      </Row>
    </StepContainer>
  );
};

export default StepSummary;
