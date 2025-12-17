import { 
	Text,
	Field,
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

const DefaultCard = (props: CardProps): JSX.Element => (
	<div className={styles.card}>
		<JssImage className={styles.card__image} field={props.fields.image} />
		<div className={styles.card__body}>
			<Text  className={styles.card__heading} field={props.fields.heading} tag="h3" />
			<RichText field={props.fields.description} tag="p" />
			<Link field={props.fields.ctaLink} />
		</div>
	</div>
);

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

export const Default = DefaultCard;
