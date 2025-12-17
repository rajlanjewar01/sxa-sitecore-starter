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



