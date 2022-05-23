import { Typography } from '@mui/material';
import { Column, Row } from '../Flex';
import { Credit, FooterWrapper } from './styled';

interface FooterProps {
  credit: {
    text: string;
    href: string;
    title: string;
  };
}

const Footer = ({ credit }: FooterProps) => {
  const year = new Date().getFullYear();

  return (
    <FooterWrapper>
      <Row justifyContent="space-between">
        <Column justifyContent="center">
          <Typography variant="caption">Copyright © {year} Adam Jędryka.</Typography>
        </Column>
        <Column justifyContent="center">
          <Credit href={credit.href} title={credit.title}>
            <Typography variant="caption">{credit.text}</Typography>
          </Credit>
        </Column>
      </Row>
    </FooterWrapper>
  );
};

export default Footer;
