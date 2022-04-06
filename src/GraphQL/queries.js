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
            brand
            inStock
            gallery
            prices{
              currency{
                symbol
                label
              }
              amount
            }
            attributes{
              name
              type
              items{
                value
              }
            }
          }
        }
      }
`;
};

export const GET_PRODUCT = (id) => {
  return gql`
      {
        product(id:"${id}") {
          name
          brand
          category
          gallery
          prices{
            currency{
              symbol
              label
            }
            amount
          }
          attributes{
            name
            type
            items{
              displayValue
              value
            }
          }
          inStock
          description
      }
    }
`;
};
