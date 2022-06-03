// basic utilities

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

// generate alerts

export function generateAlerts(alertArr, setAlert) {
  alertArr.forEach((error) => setAlert(error.msg, 'error'))
}

export function isAuthLoading(auth) {
  if (auth) {
    if (auth.loading) return true
    else return false
  } else return true
}
