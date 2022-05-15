import styled from 'styled-components/macro';

const Separator = styled.div`
  height: 5px;
  background-color: ${({ theme }) => theme.border.main};
  margin: 20px 0;
`;

export default Separator;
