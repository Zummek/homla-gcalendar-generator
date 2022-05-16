import { Box, Button, Container, Step, StepLabel, Stepper } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import StepUpadloadFile from './StepUploadFile';
import { StepperContainer } from './styled';

const HomePage = () => {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);
  const [allowedStep, setAllowedStep] = useState(0);

  const isNextStepAvailable = () => {
    return activeStep < allowedStep;
  };

  const isPreviousStepAvailable = () => {
    return activeStep > 0;
  };

  const allowNextStep = (stepIndex: number) => {
    setAllowedStep(stepIndex);
  };

  const nextStep = () => {
    setActiveStep(activeStep + 1);
  };

  const previousStep = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <>
      {/* <Helmet>
        <title>Home Page</title>
        <meta name="description" content="A React Boilerplate application homepage" />
      </Helmet> */}
      <Container maxWidth="md">
        <StepperContainer>
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
        </StepperContainer>

        {activeStep === 0 && <StepUpadloadFile allowNextStep={() => allowNextStep(1)} />}

        <Box textAlign="center">
          {isPreviousStepAvailable() && (
            <Button variant="contained" style={{ marginRight: 25 }} onClick={previousStep}>
              {t('common.back')}
            </Button>
          )}
          <Button variant="contained" disabled={!isNextStepAvailable()} onClick={nextStep}>
            {t('common.next')}
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default HomePage;
