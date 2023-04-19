export async function toDoFetch(url, options) {
  const response = await fetch(url, options)
  let responseBody
  try {
    responseBody = await response.json()

    if (responseBody.errorMessage) {
      console.error(responseBody.errorMessage)
      return
    }
  } catch (e) {
    //console.error(e)
  }

  return responseBody
}
