import styled from 'styled-components';

interface FlexProps {
  flex?: number;
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
}

export const Row = styled.div<FlexProps>`
  display: flex;
  flex-direction: row;
  ${({ flex }) => flex && `flex: ${flex};`}
  ${({ justifyContent }) => justifyContent && `justify-content: ${justifyContent};`}
  ${({ alignItems }) => alignItems && `align-items: ${alignItems};`}
`;

export const Column = styled.div<FlexProps>`
  display: flex;
  flex-direction: column;
  ${({ flex }) => flex && `flex: ${flex};`}
  ${({ justifyContent }) => justifyContent && `justify-content: ${justifyContent};`}
  ${({ alignItems }) => alignItems && `align-items: ${alignItems};`}
`;
