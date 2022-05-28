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
  color: ${({ theme }) => theme.text.low};
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.text.primary};
  }
`;
