import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { createUploadLink } from 'apollo-upload-client'
import { ApolloLink } from 'apollo-link'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { API_URL, AUTH_TOKEN } from './constants'

const httpLink = new HttpLink({
  uri: `${API_URL}/graphql`
})

const uploadLink = createUploadLink({
  uri: `${API_URL}/graphql`
})

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = window.localStorage.getItem(AUTH_TOKEN) || null
  operation.setContext(() => ({
    headers: {
      authorization: `Bearer ${token}`
    }
  }))
  return forward(operation)
})

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([authMiddleware, uploadLink, httpLink]),
  connectToDevTools: true,
  cache: new InMemoryCache({
    dataIdFromObject: o => o['_id']
  }),
  defaultOptions: {
    query: {
      fetchPolicy: 'network-only'
    }
  }
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

Vue.use(VueApollo)

export default apolloProvider
