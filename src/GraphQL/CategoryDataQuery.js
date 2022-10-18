import { gql } from "@apollo/client";

export const CATEGORY_DATA = gql`
  query CategoryData($categoryName: String!) {
    category(input: { title: $categoryName }) {
      products {
        id
        name
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
  }
`;
