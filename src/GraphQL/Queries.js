import { gql } from "@apollo/client";

export const LOAD_PRODUCTS = gql`
  {
    product(id: "huarache-x-stussy-le") {
      name
      description
      gallery
      prices {
        amount
        currency {
          # symbol
          label
        }
      }
    }
  }
`;
