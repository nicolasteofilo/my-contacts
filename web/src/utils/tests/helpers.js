import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';

import defaultTheme from '../../assets/styles/themes/default';

export const renderWithTheme = (children) =>
  render(<ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>);
