import { Box, Paper } from '@mui/material';
import styled from 'styled-components';
import { Palette } from '../../styles/theme/customPalette';

interface UploaderContainerProps {
  isDragAccept: boolean;
  isDragReject: boolean;
  isFocused: boolean;
  acceptedFiles: boolean;
}

interface UploaderContainerThemedProps extends UploaderContainerProps {
  theme: Palette;
}

const getColor = (props: UploaderContainerThemedProps) => {
  if (props.isDragAccept) {
    return props.theme.actions.positive;
  }
  if (props.acceptedFiles) {
    return props.theme.actions.positive40;
  }
  if (props.isDragReject) {
    return props.theme.actions.negative;
  }
  if (props.isFocused) {
    return props.theme.actions.focused;
  }
  return props.theme.text.placeholder;
};

export const UploaderWrapper = styled.div`
  max-width: 450px;
  align-self: center;
`;

export const UploaderContainer = styled.div<UploaderContainerProps>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 5px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: ${({ theme }) => theme.background.darker};
  color: ${({ theme }) => theme.text.low};
  outline: none;
  transition: border 0.24s ease-in-out;
`;

export const StepperContainer = styled(Box)`
  padding: 20px;
  border-radius: 0 0 15px 15px;
  background-color: ${({ theme }) => theme.secondary.main};
  color: ${({ theme }) => theme.text.primary};
`;

export const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 25px;
`;

export const InfoPaper = styled(Paper)`
  padding: 15px;
  max-width: 450px;
  margin: 0 auto;
`;
