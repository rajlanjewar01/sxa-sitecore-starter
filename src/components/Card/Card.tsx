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
