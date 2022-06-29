import { FormControlLabel, Switch, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { changeTheme } from '../../styles/theme/slice';
import { Column, Row } from '../Flex';
import { Credit, FooterWrapper } from './styled';

interface FooterProps {
  credit?: {
    text: string;
    href: string;
    title: string;
  };
}

const Footer = ({ credit }: FooterProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const year = new Date().getFullYear();
  const mode = useSelector((state: RootState) => state.theme.selected);

  const changeMode = () => {
    dispatch(changeTheme(mode === 'dark' ? 'light' : 'dark'));
  };

  return (
    <FooterWrapper>
      <Row justifyContent="space-between">
        <Column justifyContent="center">
          <Typography variant="caption" lineHeight={1.2}>
            Copyright © {year} Adam Jędryka.
          </Typography>
        </Column>
        <Column>
          <FormControlLabel
            control={<Switch checked={mode === 'dark'} onChange={changeMode} />}
            label={
              <Typography variant="caption" noWrap>
                {t('footer.darkMode')}
              </Typography>
            }
          />
        </Column>
        <Column justifyContent="center">
          {credit && (
            <Credit href={credit.href} title={credit.title}>
              <Typography variant="caption" lineHeight={1.2} align="right">
                {credit.text}
              </Typography>
            </Credit>
          )}
        </Column>
      </Row>
    </FooterWrapper>
  );
};

export default Footer;
