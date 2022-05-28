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

const getColor = (props: UploaderContainerThemedProps, hover: boolean) => {
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
  return hover ? props.theme.text.low : props.theme.text.placeholder;
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
  border-color: ${(props) => getColor(props, false)};
  border-opacity: 0.5;
  border-style: dashed;
  background-color: ${({ theme }) => theme.background.darker};
  color: ${({ theme }) => theme.text.low};
  outline: none;
  transition: border 0.24s ease-in-out;
  &:hover {
    border-color: ${(props) => getColor(props, true)};
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
  align-items: center;
  padding: 25px;
`;

export const InfoPaper = styled(Paper)`
  padding: 15px;
  max-width: 450px;
  margin: 0 auto;
`;

export const StepPaper = styled(Paper)`
  width: fit-content;
  padding: 15px;
  width: 350px;
  margin: 25px;
`;

export const ScrollableBox = styled(Box)`
  overflow-y: auto;
  max-height: 620px;
`;

export const CustomA = styled.a`
  color: ${({ theme }) => theme.text.primary};
  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.primary.main};
  }
`;

export const WorkingDayContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const GenerateButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 20px 10px;
`;

export const AppleCalendarNotice = styled.div`
  margin: 20px;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.text.low};
  text-align: center;
`;

export const InputsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 15px;
  gap: 25px;
`;
