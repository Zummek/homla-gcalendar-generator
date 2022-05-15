import { Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Separator from '../../component/Separator';
import { selectTheme } from '../../styles/theme/slice/selectors';
import { InfoPaper, StepContainer, UploaderContainer, UploaderWrapper } from './styled';

interface StepUploadFileProps {
  allowNextStep: () => void;
}

const StepUpadloadFile = ({ allowNextStep }: StepUploadFileProps) => {
  const themeColors = useSelector(selectTheme);
  const { t } = useTranslation();
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject, acceptedFiles } = useDropzone({
    maxFiles: 1,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    }
  });

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      allowNextStep();
    }
  }, [acceptedFiles, allowNextStep]);

  return (
    <StepContainer>
      <InfoPaper elevation={3}>
        <Typography variant="h5" component="h3" align="center" paddingBottom={2}>
          {t('home.step1.howItWorks')}
        </Typography>
        <Typography component="p">{t('home.step1.howItWorksInfo')}</Typography>
      </InfoPaper>

      <Separator />

      <UploaderWrapper>
        <Typography variant="h6" component="h5" align="center" paddingBottom={2}>
          {t('home.step1.uploadYourWorkSchedule')}
        </Typography>
        <UploaderContainer {...getRootProps({ isFocused, isDragAccept, isDragReject })}>
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
      {/* <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside> */}
    </StepContainer>
  );
};

export default StepUpadloadFile;
