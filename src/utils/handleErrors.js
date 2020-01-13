const handleErrors = (error) => {
  const isGraphQLError = error.graphQLErrors !== undefined

  if (isGraphQLError) {
    onGraphQLError(error)
  } else {
    onCustomError(error)
  }
}

const onGraphQLError = (error) => {
  const graphQLErrors = error.graphQLErrors

  const validation = graphQLErrors
    ? graphQLErrors[0].extensions.validation
    : null

  const errorMessage = validation
    ? validation[Object.keys(validation)[0]][0]
    : graphQLErrors[0].message

  errorMessage
    ? showErrorMessage(errorMessage, error)
    : onUnhandledError()
}

const onCustomError = (error) => {
  const errorMessage = error
    ? error.message || error.errors[0].message
    : null

  errorMessage
    ? showErrorMessage(errorMessage, error)
    : onUnhandledError()
}

const onUnhandledError = () => (
  showErrorMessage('Wystąpił nieznany błąd', null)
)

const showErrorMessage = (message, error) => {
  Vue.toasted.error(message)
  console.error(error)
}

export default handleErrors
