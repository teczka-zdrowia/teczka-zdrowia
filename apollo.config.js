module.exports = {
  client: {
    service: {
      name: 'tz-api',
      // URL to the GraphQL API
      url: 'http://192.168.0.227:8000/graphql'
    },
    // Files processed by the extension
    includes: ['src/**/*.vue', 'src/**/*.js', 'src/**/*.gql']
  }
}
