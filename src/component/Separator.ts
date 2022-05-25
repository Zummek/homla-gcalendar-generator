import { Divider } from '@mui/material';
import styled from 'styled-components/macro';

const Separator = styled(Divider)<{
  dense?: boolean;
}>`
  margin: ${({ dense }) => (dense ? '5px' : '20px')} 0;
`;

export default Separator;
