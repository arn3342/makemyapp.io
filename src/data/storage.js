export const StorageInitial = 'makeMyApp_'

export const StorageHelper = {
  SaveItem: (data, uKey = '', extendData = false) => {
    if (extendData) {
      const currentData = JSON.parse(
        localStorage.getItem(`${StorageInitial}${uKey}`)
      )
      localStorage.setItem(
        `${StorageInitial}${uKey}`,
        JSON.stringify({ ...currentData, ...data })
      )
      return
    }
    localStorage.setItem(`${StorageInitial}${uKey}`, JSON.stringify(data))
  },

  GetItem: (uKey = '') =>
    JSON.parse(localStorage.getItem(`${StorageInitial}${uKey}`))
}
