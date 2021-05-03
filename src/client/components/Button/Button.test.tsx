import { render, screen } from '@testing-library/react';
import { DefaultButton } from './Button.stories';
import { ButtonProps } from './Button';

it('renders the button in the default state', () => {
  const { args } = DefaultButton;
  const { children, ...props } = args as ButtonProps;

  render(
    <DefaultButton role="button" {...props}>
      {children}
    </DefaultButton>
  );
  expect(screen.getByRole('button')).toHaveTextContent('Default Button');
});
