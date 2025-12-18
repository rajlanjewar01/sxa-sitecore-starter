import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Navbar from './index'; // Adjust path based on your folder structure

const meta: Meta<typeof Navbar> = {
  title: 'Components/Navigation/AppleNavbar',
  component: Navbar,
  parameters: {
	layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Navbar>;

// Mock data following Sitecore JSS field structure
const mockFields = {
  navItems: [
	{
	  id: 'apple-logo',
	  fields: {
		label: { value: 'Apple' },
		icon: {
		  value: {
			src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/250px-Apple_logo_black.svg.png',
			alt: 'Apple Logo',
		  },
		},
		columns: [],
	  },
	},
	{
	  id: 'store-menu',
	  fields: {
		label: { value: 'Store' },
		icon: { value: {} },
		columns: [
		  {
			fields: {
			  columnHeader: { value: 'Shop' },
			  links: [
				{ fields: { link: { value: { href: '#', text: 'Shop the Latest' } } } },
				{ fields: { link: { value: { href: '#', text: 'Mac' } } } },
				{ fields: { link: { value: { href: '#', text: 'iPad' } } } },
				{ fields: { link: { value: { href: '#', text: 'iPhone' } } } },
			  ],
			},
		  },
		  {
			fields: {
			  columnHeader: { value: 'Quick Links' },
			  links: [
				{ fields: { link: { value: { href: '#', text: 'Find a Store' } } } },
				{ fields: { link: { value: { href: '#', text: 'Order Status' } } } },
			  ],
			},
		  },
		],
	  },
	},
	{
	  id: 'mac-menu',
	  fields: {
		label: { value: 'Mac' },
		icon: { value: {} },
		columns: [
		  {
			fields: {
			  columnHeader: { value: 'Explore Mac' },
			  links: [
				{ fields: { link: { value: { href: '#', text: 'Explore All Mac' } } } },
				{ fields: { link: { value: { href: '#', text: 'MacBook Air' } } } },
				{ fields: { link: { value: { href: '#', text: 'MacBook Pro' } } } },
			  ],
			},
		  },
		],
	  },
	},
	{
	  id: 'support-link',
	  fields: {
		label: { value: 'Support' },
		icon: { value: {} },
		columns: [],
	  },
	},
  ],
};

export const Default: Story = {
  args: {
	rendering: { componentName: 'AppleNavbar' },
	params: {},
	fields: mockFields,
  },
  render: (args) => (
	<div style={{ height: '500px', background: '#fff' }}>
	  <Navbar {...args} />
	  <div style={{ padding: '100px', textAlign: 'center' }}>
		<h2>Scrollable Content Area</h2>
		<p>Hover over "Store" or "Mac" to test the Mega Menu.</p>
	  </div>
	</div>
  ),
};
