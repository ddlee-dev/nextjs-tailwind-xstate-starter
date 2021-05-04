import { render, screen } from '@testing-library/react';
import { ImageComponent } from './Image.stories';
import { ImageProps } from './Image';

it('renders the Image component with alt text', () => {
  const { ...props } = ImageComponent.args as ImageProps;

  render(<ImageComponent {...props} />);
  expect(screen.getByAltText(props.alt)).toHaveProperty('alt', props.alt);
});
