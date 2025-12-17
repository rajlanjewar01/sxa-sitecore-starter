# SCSS Setup:

## Install packages:

```
npm install sass
npm install -D sass-embedded
```

## Notes:
* variables: `$<variable_name>`
```
$card-bg: #fff;
$card-bg-alt: #c0c0c0;
```

* mixin `@mixin <mixin_name>`
```
@mixin card-base {
	background-color: $card-bg;
	border-radius: $card-radius;
	box-shadow: $card-shadow;
	overflow: hidden;
	max-width: 400px;
	margin: $spacing auto;
}
```

* nested block + BEM elements
```
.card {
	@include card-base;

	&__image {
		width: 100%;
		height: 200px;
		object-fit: cover;
	}

	// example modifier
	&--highlighted {
 		border: 2px solid $card-bg-alt;
	}
```

### BEM - How and Why

Before we continue, letʼs learn a little about BEM if you arenʼt familar with it. BEM (Block-Element-Modifier) gives you a predictable, hierarchical naming convention.

```
1 .block → .card
2 .block__element → .card__image, .card__body, .card__heading
3 .block--modifier → .card--highlighted (if you later need variations)
```

1) Block is the component root `( .card )`

2) Element is a child part `( .card__image , .card__body , .card__heading )`

3) Modifier flags a variant or state `( .card--disabled , .card--selected , etc.)`


This approach prevents name collisions and clearly communicates which styles belong to which part of your component.

### SCSS Selector Basics
* Nesting: You can “nest” child selectors inside their parent block to reduce repetition:
```
.card {
 	// parent styles…

 &__image {
 	// image styles…
	}

 &__body {
	// body styles…
 	}
 }
```

* Parent selector ( & ): The ampersand represents the current selector. Use it for elements ( &__heading ) and modifiers ( &--selected ).
  
* Variables & Mixins: Store common values (colors, spacing) in variables, and reuse patterns with mixins:
```
$card-bg: #fff;
$card-radius: 8px;
$card-shadow: 0 4px 8px rgba(0,0,0,0.1);

@mixin card-shape {
	background: $card-bg;
	border-radius: $card-radius;
	box-shadow: $card-shadow;
}

```

## Examples:

- Create `Cards.module.scss` file

 <img width="222" height="147" alt="image" src="https://github.com/user-attachments/assets/dd19bcc6-3167-4e91-b11b-3d60a2cbfcaf" />


- Card.tsx

```
import { 
        Text,
        Field,
        withDatasourceCheck,
        LinkField,
        ImageField,
        RichText,
        RichTextField,
        Image as JssImage,
        Link
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import styles from './Card.module.scss';
import { JSX } from 'react';

type CardProps = ComponentProps & {
  fields: {
    heading: Field<string>;
    image: ImageField;
    description: RichTextField;
    ctaLink: LinkField;
  };
};

const Card = (props: CardProps): JSX.Element => (
  <div className={styles.card}>
    <JssImage className={styles.card__image} field={props.fields.image} />
    <div className={styles.card__body}>
      <Text  className={styles.card__heading} field={props.fields.heading} tag="h3" />
      <RichText field={props.fields.description} tag="p" />
      <Link field={props.fields.ctaLink} />
    </div>
  </div>
);

export default withDatasourceCheck()<CardProps>(Card);

```

- Card.module.scss

```
// variables
$card-bg: #fff;
$card-bg-alt: #c0c0c0;
$card-radius: 8px;
$card-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
$spacing: 16px;

// mixin
@mixin card-base {
	background-color: $card-bg;
	border-radius: $card-radius;
	box-shadow: $card-shadow;
	overflow: hidden;
	max-width: 400px;
	margin: $spacing auto;
}

// nested block + BEM elements
.card {
	@include card-base;

	&__image {
		width: 100%;
		height: 200px;
		object-fit: cover;
	}

	&__body {
		padding: 16px;
	}

	&__heading {
		margin: 0 0 $card-radius;
		font-size: 1.25rem;
		font-weight: 600;
		color: #333333; 
	}

	// example modifier
	&--highlighted {
 		border: 2px solid $card-bg-alt;
	}
}
```

# Variants

Sitecore renderings support variants—multiple presentations of the same component using the same data. Each rendering
requires at least a Default variant; additional variants (e.g. Horizontal, Compact) can offer different layouts or subsets of fields.

1.  Rename and Export the Default Variant
In `src/components/Card/index.tsx` , rename the internal component and export it as Default :

`components/Card/index.tsx`

```
const DefaultCard = (props: CardProps): JSX.Element => (
)
...
export const Default = DefaultCard;

export const Horizontal = (props: CardProps): JSX.Element => (
	<div className={styles.cardHorizontal}>
		<div className={styles.cardHorizontal__media}>
			<JssImage field={props.fields.image} className={styles.cardHorizontal__image} />
		</div>
		<div className={styles.cardHorizontal__content}>
			<Text field={props.fields.heading} tag="h3" className={styles.cardHorizontal__heading} />
			<Link field={props.fields.ctaLink} className={styles.cardHorizontal__cta} />
		</div>
	</div>
);
```

2. Refactor and Add a New Story to Storybook:

We can create a story specifically for our Horizontal Variant. Hereʼs what an updated Storybook will look like when it has both the
Default and Horizontal variants available as separate stories.

`Card.stories.tsx`

```
import { Meta, StoryObj } from '@storybook/react';
import { Field, ImageField, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import { Default, Horizontal } from './Card';

type Props = {
	heading: Field<string>;
	image: ImageField;
	description: Field<string>;
	ctaLink: LinkField;
};

export default {
	title: 'Components/Card',
	component: Default,
	subcomponents: { Horizontal },
	tags: ['autodocs'],
} as Meta;

const common = {
	heading: { value: 'Card Title' } as Field<string>,
	image: { value: { src: 'https://picsum.photos/400/200', alt: 'Image' } } as ImageField,
	description: { value: 'Card content here.' } as Field<string>,
	ctaLink: { value: { href: '#', text: 'Click Me' } } as LinkField,
};

export const DefaultVariant: StoryObj<Props> = {
	render: (args) => (
		<Default rendering={{ componentName: 'Card', dataSource: 'mock' }} params={{}} fields={args} />
	),
	args: common,
};

export const HorizontalVariant: StoryObj<Props> = {
	render: (args) => (
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
	args: common,
};
```
