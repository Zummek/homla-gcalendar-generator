import styled from 'styled-components/macro';

export const DataFieldContainer = styled.div<{ flex?: boolean }>`
  display: flex;
  margin: 15px;
  flex-direction: column;
  ${({ flex }) => flex && 'flex: 1;'}
`;
