import { Box, Container, Step, StepLabel, Stepper } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import StepUpadloadFile from './StepUploadFile';

const HomePage = () => {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    setActiveStep(1);
  }, []);

  return (
    <>
      {/* <Helmet>
        <title>Home Page</title>
        <meta name="description" content="A React Boilerplate application homepage" />
      </Helmet> */}
      <Container>
        <Box style={{ backgroundColor: 'blue' }}>
          <Stepper activeStep={activeStep}>
            <Step key="upload-file">
              <StepLabel>{t('home.uploadWorkSchedule')}</StepLabel>
            </Step>
            <Step key="choose-yourself">
              <StepLabel>{t('home.chooseYourself')}</StepLabel>
            </Step>
            <Step key="summary">
              <StepLabel>{t('home.summary')}</StepLabel>
            </Step>
          </Stepper>
        </Box>

        {activeStep === 0 && <StepUpadloadFile />}
        {activeStep === 1 && <StepUpadloadFile />}
        {activeStep === 2 && <StepUpadloadFile />}
      </Container>
    </>
  );
};

export default HomePage;
