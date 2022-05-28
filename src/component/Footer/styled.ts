import styled from 'styled-components/macro';

export const FooterWrapper = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 35px;
  background-color: ${({ theme }) => theme.background.darker};
  border-top: 2px solid ${({ theme }) => theme.border.light};
  padding: 0 20px;
`;

export const Credit = styled.a`
  text-align: right;
  color: ${({ theme }) => theme.text.low};
  line-height: 1;
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.text.primary};
  }
`;
