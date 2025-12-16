import { Meta, StoryObj } from '@storybook/react';
import { Field, ImageField, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import Card from './Card';

type StoryProps = {
	heading: Field<string>;
	image: ImageField;
	description: Field<string>;
	ctaLink: LinkField;
};

 export default {
	title: 'Components/Card',
	component: Card,
	tags: ['autodocs'],

	args: {
		heading: { value: 'Welcome to Storybook' } as Field<string>,
		image: { src: 'https://picsum.photos/400/200', alt: 'Sample Image' },
		description: { value: 'This is a simple description.' } as Field<string>,
		ctaLink: {
			href: 'https://example.com',
			text: 'Learn More',
			value: { href: 'https://example.com', text: 'Learn More' },
		},
	}
} as Meta<StoryProps>;

export const Default: StoryObj<StoryProps> = {
    args: {
        ctaLink: {
            "href": "https://example.com",
            "text": "Learn More"
        }
    },

    render: ({ heading, image, description, ctaLink }) => (
	<Card
		rendering={{ componentName: 'Card', dataSource: 'test-card' }}
		params={{}}
		fields={{ heading, image, description, ctaLink }}
	/>
	)
};
