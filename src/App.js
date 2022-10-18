import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import HomeScreen from "./Router/RouterComponent";
import ShopContextProvider from "./Contexts/ShopContextProvider";

const errorLink = onError(({ graphqlErrors }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message }) => {
      alert(`Graphql error ${message}`);
    });
  }
});

const link = from([errorLink, new HttpLink({ uri: "http://localhost:4000/" })]);

const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      AttributeSet: {
        keyFields: false,
      },
    },
  }),
  link: link,
});

class App extends React.Component {
  render() {
    return (
      <ShopContextProvider>
        <ApolloProvider client={client}>
          <HomeScreen />
        </ApolloProvider>
      </ShopContextProvider>
    );
  }
}

export default App;
