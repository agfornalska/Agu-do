export async function toDoFetch(url, options) {
  const response = await fetch(url, options)

  const responseBody = await response.json()

  if (responseBody.errorMessage) {
    console.error(responseBody.errorMessage)
    return
  }

  return responseBody
}
