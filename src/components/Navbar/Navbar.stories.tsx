import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Navbar from './index';

const meta: Meta<typeof Navbar> = {
  title: 'Components/Navigation/AppleNavbar',
  component: Navbar,
  parameters: {
	layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Navbar>;

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
		  {
			fields: {
			  columnHeader: { value: 'Shop Mac' },
			  links: [
				{ fields: { link: { value: { href: '#', text: 'Help me choose' } } } },
			  	],
				},
			},
		],
	  },
	},
	{
	  id: 'ipad-menu',
	  fields: {
		label: { value: 'iPad' },
		icon: { value: {} },
		columns: [
		  {
			fields: {
			  columnHeader: { value: 'Shop' },
			  links: [
				{ fields: { link: { value: { href: '#', text: 'Explore all iPads' } } } },
				{ fields: { link: { value: { href: '#', text: 'iPad Pro' } } } },
				{ fields: { link: { value: { href: '#', text: 'iPad Air' } } } }
			  ],
			},
		  },
		  {
			fields: {
			  columnHeader: { value: 'Shop iPad' },
			  links: [
				{ fields: { link: { value: { href: '#', text: 'shop iPads' } } } },
				{ fields: { link: { value: { href: '#', text: 'iPad Accessories' } } } },
			  ],
			},
		  },
		],
	  },
	},
	{
	  id: 'watch-link',
	  fields: {
		label: { value: 'Watch' },
		icon: { value: {} },
		columns: [
		  {
			fields: {
			  columnHeader: { value: 'Watch' },
			  links: [
				{ fields: { link: { value: { href: '#', text: 'Explore All Apple Watch' } } } },
				{ fields: { link: { value: { href: '#', text: 'Apple Watch Series 11' } } } },
				{ fields: { link: { value: { href: '#', text: 'Apple Watch SE3' } } } }
			  ],
			},
		  },
		  {
			fields: {
			  columnHeader: { value: 'Shop Watch' },
			  links: [
				{ fields: { link: { value: { href: '#', text: 'Shop Apple Watch' } } } },
				{ fields: { link: { value: { href: '#', text: 'Apple Watch Brand' } } } },
			  ],
			},
		  },
		],
	  },
	},
	{
	  id: 'vision-link',
	  fields: {
		label: { value: 'Vision' },
		icon: { value: {} },
		columns: [
		  {
			fields: {
			  columnHeader: { value: 'Explore Vision' },
			  links: [
				{ fields: { link: { value: { href: '#', text: 'Explore Apple Vision Pro' } } } }
			  ],
			},
		  },
		  {
			fields: {
			  columnHeader: { value: 'Shop Vision' },
			  links: [
				{ fields: { link: { value: { href: '#', text: 'Shop Apple Vision Pro' } } } }
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
	{
	  id: 'search-link',
	  fields: {
		label: { value: 'Search' },
		icon: {
		  value: {
			src: 'https://cdn.iconscout.com/icon/free/png-512/free-search-icon-svg-download-png-527970.png?f=webp&w=600',
			alt: 'Apple Logo',
		  },
		},
		columns: [],
	  },
	},
	{
	  id: 'shop-link',
	  fields: {
		label: { value: 'Shop' },
		icon: {
		  value: {
			src: 'https://cdn.iconscout.com/icon/free/png-512/free-shop-icon-svg-download-png-32433.png?f=webp&w=256',
			alt: 'Apple Logo',
		  },
		},
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
