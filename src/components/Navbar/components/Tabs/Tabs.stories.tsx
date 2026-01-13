import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './index';
import { Product } from './ProductCard';

const mockProducts: Product[] = [
{
	category: 'Laptops',
	tag: 'New M4 with M3',
	title: 'MacBook Pro 14" and 16"',
	chips: 'M3, M4 Pro, or M4 Max chip',
	description: 'The most advanced Mac laptops for demanding workflows.',
	price: '$1,599',
	monthlyPrice: '$133.25/mo.',
	image: 'https://www.apple.com/assets-www/en_WW/mac/01_product_tile/large/mba_13_15_75c30cc7c.jpg',
	colors: ['#313132', '#e3e4e5']
},
{
	category: 'Desktops',
	title: 'iMac',
	chips: 'M4 chip',
	description: 'A stunning all-in-one desktop for creativity and productivity.',
	price: '$1,299',
	monthlyPrice: '$108.25/mo.',
	image: 'https://www.apple.com/assets-www/en_WW/mac/01_product_tile/large/mbp_14_16_fe31fb260.jpg',
	colors: ['#007aff', '#ff3b30', '#ff9500', '#4cd964', '#5856d6', '#ffcc00', '#8e8e93']
},
{
	category: 'Desktops',
	title: 'Mac mini',
	chips: 'M4 or M4 Pro chip',
	description: 'The mini-est, most affordable Mac with mighty performance.',
	price: '$599',
	monthlyPrice: '$49.91/mo.',
	image: 'https://www.apple.com/assets-www/en_WW/mac/01_product_tile/large/mac_mini_1ca190fdc.jpg',
	colors: ['#e3e4e5']
},
{
	category: 'Displays',
	title: 'Studio Display',
	chips: 'Retina 5K',
	description: 'A massive 27-inch 5K Retina display with 12MP Ultra Wide camera.',
	price: '$1,599',
	monthlyPrice: '$133.25/mo.',
	image: 'https://www.apple.com/assets-www/en_WW/mac/01_product_tile/large/studio_display_3706c16ad.jpg',
	colors: ['#e3e4e5']
}
];

const meta: Meta<typeof Tabs> = {
	title: 'Components/Tabs',
	component: Tabs,
	parameters: {
			layout: 'fullscreen',
	},
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
		args: {
				categoryTitle: 'Mac',
				tabs: ['All products', 'Laptops', 'Desktops', 'Displays'],
				products: mockProducts,
				defaultTab: 'All products'
		},
		render: (args) => (
				<div>
						<Tabs {...args} />
				</div>
		)
};
