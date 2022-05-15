import { Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import Separator from '../../component/Separator';
import { InfoPaper, StepContainer, UploaderContainer } from './styled';

const StepUpadloadFile = () => {
  const { t } = useTranslation();
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject, acceptedFiles } = useDropzone();

  useEffect(() => {
    console.log(acceptedFiles);
  }, [acceptedFiles]);

  // const files = acceptedFiles.map((file) => (
  //   <li key={file.}>
  //     {file.path} - {file.size} bytes
  //   </li>
  // ));

  return (
    <StepContainer>
      <InfoPaper elevation={3}>
        <Typography variant="h5" component="h3" align="center" paddingBottom={2}>
          {t('home.step1.howItWorks')}
        </Typography>
        <Typography component="p">{t('home.step1.howItWorksInfo')}</Typography>
      </InfoPaper>

      <Separator />

      <UploaderContainer {...getRootProps({ isFocused, isDragAccept, isDragReject })}>
        <input {...getInputProps()} />
        <p>{t('home.step1.dragAndDropInfo')}</p>
      </UploaderContainer>
      {/* <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside> */}
    </StepContainer>
  );
};

export default StepUpadloadFile;
