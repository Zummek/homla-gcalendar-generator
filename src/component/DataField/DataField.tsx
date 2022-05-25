import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../styles/theme/slice/selectors';
import { capitalizeOnlyFirstLetter } from '../../utils/text';
import { DataFieldContainer } from './styled';

interface DataFieldProps {
  label: string;
  value: string | number | null;
  capitalize?: boolean;
  flex?: boolean;
}

const DataField = ({ label, value, capitalize, flex }: DataFieldProps) => {
  const themeColors = useSelector(selectTheme);

  return (
    <DataFieldContainer flex={flex}>
      <Typography variant="caption" color={themeColors.text.low} noWrap>
        {label}
      </Typography>
      <Typography variant="body1" color={themeColors.text.primary}>
        {capitalize ? capitalizeOnlyFirstLetter(value) : value}
      </Typography>
    </DataFieldContainer>
  );
};

export default DataField;
