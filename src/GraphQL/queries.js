import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
  {
    categories {
      name
    }
  }
`;

export const GET_CURRENCIES = gql`
  {
    currencies {
      label
      symbol
    }
  }
`;

export const GET_PRODUCTS = (category) => {
  return gql`
      {
        category(input: {title:"${category}"}) {
          products{
            id
            name
            inStock
            gallery
            prices{
              currency{
                symbol
                label
              }
              amount
            }
          }
        }
      }
`;
};
