import { Box, Button, Container, Step, StepLabel, Stepper, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Footer from '../../component/Footer';
import StepSelectPerson from './StepSelectPerson';
import StepSummary from './StepSummary';
import StepUploadFile from './StepUploadFile';
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isSmallScreen = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));

  return (
    <>
      {/* <Helmet>
        <title>Home Page</title>
        <meta name="description" content="A React Boilerplate application homepage" />
      </Helmet> */}
      <Container maxWidth="md" style={{ minHeight: 'calc(100vh - 35px)' }}>
        <StepperContainer>
          <Stepper activeStep={activeStep} alternativeLabel={isSmallScreen}>
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

        {activeStep === 0 && <StepUploadFile allowNextStep={() => allowNextStep(1)} />}
        {activeStep === 1 && <StepSelectPerson allowNextStep={() => allowNextStep(2)} />}
        {activeStep === 2 && <StepSummary />}

        <Box textAlign="center" marginBottom={5}>
          {isPreviousStepAvailable() && (
            <Button variant="contained" style={{ marginRight: 25 }} onClick={previousStep}>
              {t('common.back')}
            </Button>
          )}
          {activeStep !== 2 && (
            <Button variant="contained" disabled={!isNextStepAvailable()} onClick={nextStep}>
              {t('common.next')}
            </Button>
          )}
        </Box>
      </Container>
      <Footer
        credit={
          activeStep === 0
            ? {
                href: 'https://www.flaticon.com/free-icons/beer',
                title: 'beer icons',
                text: 'Beer icons created by Freepik - Flaticon'
              }
            : undefined
        }
      />
    </>
  );
};

export default HomePage;
