import { Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Row } from '../../component/Flex';
import Separator from '../../component/Separator';
import { selectTheme } from '../../styles/theme/slice/selectors';
import { setFile } from './creatorSlice';
import { InfoPaper, StepContainer, UploaderContainer, UploaderWrapper } from './styled';

interface StepUploadFileProps {
  allowNextStep: () => void;
}

const StepUploadFile = ({ allowNextStep }: StepUploadFileProps) => {
  const themeColors = useSelector(selectTheme);
  const { t } = useTranslation();
  const dispath = useDispatch();

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject, acceptedFiles } = useDropzone({
    maxFiles: 1,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    },
    onDropAccepted(files, event) {
      if (files.length > 0) {
        dispath(setFile(files[0]));
        allowNextStep();
      }
    }
  });

  return (
    <StepContainer>
      <InfoPaper elevation={3}>
        <Typography variant="h5" component="h3" align="center" paddingBottom={2}>
          {t('home.step1.howItWorks')}
        </Typography>
        <Typography component="p" marginBottom={2}>
          {t('home.step1.howItWorksInfo')}
        </Typography>
        <Row alignItems="center" justifyContent="space-around">
          <Typography component="p" variant="caption" textAlign="center" marginRight={2}>
            {t('home.step1.beerLicenseInfo')}
          </Typography>
          <img src={require('../../assets/beer.png')} height={50} alt="Beer License" />
        </Row>
      </InfoPaper>

      <Separator />

      <UploaderWrapper>
        <Typography variant="h6" component="h5" align="center" paddingBottom={2} paddingTop={2}>
          {t('home.step1.uploadYourWorkSchedule')}
        </Typography>
        <UploaderContainer
          acceptedFiles={!!acceptedFiles.length}
          {...getRootProps({ isFocused, isDragAccept, isDragReject })}
        >
          <input {...getInputProps()} />
          {acceptedFiles.length === 0 ? (
            <Typography variant="body1" align="center">
              {t('home.step1.dragAndDropInfo')}
            </Typography>
          ) : (
            <>
              <Typography variant="body1" align="center" paddingBottom={2}>
                {t('home.step1.dragAndDropChangeInfo')}
              </Typography>
              <Typography variant="body1" align="center" color={themeColors.text.primary}>
                {t('home.step1.selectedfile', { name: acceptedFiles[0].name })}
              </Typography>
            </>
          )}
        </UploaderContainer>
      </UploaderWrapper>
    </StepContainer>
  );
};

export default StepUploadFile;
