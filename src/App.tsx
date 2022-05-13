import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './page/HomePage';

const App = () => {
  const { i18n } = useTranslation();

  return (
    <BrowserRouter>
      <Helmet
        // titleTemplate="%s - React Boilerplate"
        // defaultTitle="React Boilerplate"
        htmlAttributes={{ lang: i18n.language }}
      >
        {/* <meta name="description" content="A React Boilerplate application" /> */}
      </Helmet>

      <Routes>
        <Route path={`${process.env.PUBLIC_URL}/`} element={<HomePage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
