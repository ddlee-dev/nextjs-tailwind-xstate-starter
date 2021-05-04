import { Story, Meta } from '@storybook/react';
import Image, { ImageProps } from './Image';

export default {
  component: Image,
  title: 'Design System / Data Display / Image'
} as Meta;

const Template: Story<ImageProps> = (props) => <Image {...props} />;

export const ImageComponent = Template.bind({});
ImageComponent.args = {
  src: 'assets/icons/logo192.png',
  alt: 'Image Description'
};
ImageComponent.parameters = {
  docs: {
    description: {
      story: 'Image Component description here.'
    }
  }
};
