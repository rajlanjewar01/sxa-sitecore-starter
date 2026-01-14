import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './index';
import { Product } from './ProductCard';

const mockProducts: Product[] = [
	{
		category: 'Laptops',
		tag: 'New M4',
		title: 'MacBook Pro 14" and 16"',
		chips: 'M4, M4 Pro, or M4 Max chip',
		description: 'The most advanced Mac laptops for demanding workflows.',
		price: '$1,599',
		monthlyPrice: '$133.25/mo.',
		image: 'https://www.apple.com/assets-www/en_WW/mac/01_product_tile/large/mba_13_15_75c30cc7c.jpg'
	},
	{
		category: 'Desktops',
		title: 'iMac',
		chips: 'M4 chip',
		description: 'A stunning all-in-one desktop for creativity and productivity.',
		price: '$1,299',
		monthlyPrice: '$108.25/mo.',
		image: 'https://www.apple.com/assets-www/en_WW/mac/01_product_tile/large/mbp_14_16_fe31fb260.jpg'
	},
	{
		category: 'Desktops',
		title: 'Mac mini',
		chips: 'M4 or M4 Pro chip',
		description: 'The mini-est, most affordable Mac with mighty performance.',
		price: '$599',
		monthlyPrice: '$49.91/mo.',
		image: 'https://www.apple.com/assets-www/en_WW/mac/01_product_tile/large/mac_mini_1ca190fdc.jpg'
	},
	{
		category: 'Displays',
		title: 'Studio Display',
		chips: 'Retina 5K',
		description: 'A massive 27-inch 5K Retina display with 12MP Ultra Wide camera.',
		price: '$1,599',
		monthlyPrice: '$133.25/mo.',
		image: 'https://www.apple.com/assets-www/en_WW/mac/01_product_tile/large/studio_display_3706c16ad.jpg'
	}
];

const meta: Meta<typeof Tabs> = {
	title: 'Components/Tabs',
	component: Tabs,
	tags: ['autodocs'],
	parameters: {
			layout: 'fullscreen',
	},
	argTypes: {
    	backgroundColor: { control: 'color' },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const baseFields = {
	categoryTitle: { value: 'Which Mac is right for you?' },
	tabs: ['All products', 'Laptops', 'Desktops', 'Displays'],
	products: mockProducts,
	defaultTab: 'All products',
};

export const Default: Story = {
  args: {
	fields: {
		...baseFields,
		params: { Variant: 'default' }
	}
  },
};

export const Featured: Story = {
  args: {
	fields: {
		...baseFields,
		categoryTitle: { value: 'Featured Products' },
		params: { Variant: 'featured' }
	}
  },
};

export const DarkMode: Story = {
  args: {
	fields: {
		...baseFields,
		categoryTitle: { value: 'Dark Mode' },
		params: { Variant: 'darkmode' },
		defaultTab: 'Laptops',
	}
  },
};
