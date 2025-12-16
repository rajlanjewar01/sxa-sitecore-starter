import { Text, Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { JSX } from 'react';

type CardProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const Card = (props: CardProps): JSX.Element => (
  <div>
    <p>Card Component</p>
    <Text field={props.fields.heading} />
  </div>
);

export default withDatasourceCheck()<CardProps>(Card);
