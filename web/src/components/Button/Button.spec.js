import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'

import { renderWithTheme } from '../../utils/tests/helpers';

import theme from '../../assets/styles/themes/default';

import Button from '.';

describe('<Button />', () => {
  it('should render the button', () => {
    renderWithTheme(<Button>Create new user</Button>);

    expect(screen.getByRole('button', { name: /Create new user/i }));
  });

  it('should render button with correct styles', () => {
    renderWithTheme(<Button>Create new user</Button>);

    expect(screen.getByRole('button', { name: /Create new user/i })).toHaveStyle({
      background: theme.colors.primary.main,
      color: '#fff',
    })
  });
});
