import { Meta, StoryObj } from '@storybook/react';
import { Field, ImageField, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import { Default, Horizontal } from './index';

type Props = {
	heading: Field<string>;
	image: ImageField;
	description: Field<string>;
	ctaLink: LinkField;
};

export default {
	title: 'Components/Card',
	component: Default,
	subcomponents: {Horizontal},
	tags: ['autodocs']
} as Meta;

const common = {
	heading: { value: 'Card Title' } as Field<string>,
	image: { value: { src: 'https://picsum.photos/400/200', alt: 'Image' } } as ImageField,
	description: { value: 'Card content here.' } as Field<string>,
	ctaLink: { value: { href: '#', text: 'Click Me' } } as LinkField,
};

export const DefaultVariant: StoryObj<Props> = {
    render: (args: any) => (
	<Default
		rendering={{ componentName: 'Card', dataSource: 'test-card' }}
		params={{}}
		fields={args}
	/>
	),
	args: common
};

export const HorizontalVariant: StoryObj<Props> = {
 render: (args: any) => (
	<Horizontal
		rendering={{
			componentName: 'Card',
			dataSource: 'mock',
			params: { variantName: 'Horizontal' },
		}}
		params={{ variantName: 'Horizontal' }}
 		fields={args}
 	/>
 ),
 args: common
};
