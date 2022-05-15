import styled from '@emotion/styled';
import { Paper } from '@mui/material';

interface UploaderContainerProps {
  isDragAccept: boolean;
  isDragReject: boolean;
  isFocused: boolean;
}

const getColor = (props: UploaderContainerProps) => {
  if (props.isDragAccept) {
    return '#00e676';
  }
  if (props.isDragReject) {
    return '#ff1744';
  }
  if (props.isFocused) {
    return '#2196f3';
  }
  return '#eeeeee';
};

export const UploaderContainer = styled.div<UploaderContainerProps>`
  flex: 1;
  max-width: 450px;
  display: flex;
  align-self: center;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
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
`;
