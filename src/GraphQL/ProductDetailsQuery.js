import { gql } from '@apollo/client';

export const PRODUCT_DATA_QUERY = gql`
  query ProductData($productId: String!) {
    product(id: $productId) {
      id
      name
      description
      brand
      inStock
      gallery
      attributes {
        items {
          value
        }
        id
      }
      prices {
        amount
        currency {
          symbol
          label
        }
      }
    }
  }
`;
