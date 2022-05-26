export function filterData (source = [], query = '', ingoreProps = []) {
  let filteredList = []

  if (query.length > 0) {
    source.forEach(data => {
      Object.keys(data).map(prop => {
        if (!ingoreProps.includes(prop) && !Array.isArray(prop)) {
          const hasInitialMatch = String(data[prop])
            .toLowerCase()
            .includes(String(query).toLowerCase())
          hasInitialMatch && !filteredList.some(x => x === data) && filteredList.push(data)

          const hasSubProps =
            typeof data[prop] === 'object' && Array.isArray(Object.keys(data[prop]))
          hasSubProps &&
            Object.keys(data[prop]).map(key => {
              const hasMatch = String(data[prop][key])
                .toLowerCase()
                .includes(String(query).toLowerCase())
              hasMatch && !filteredList.some(x => x === data) && filteredList.push(data)
            })
        }
      })
    })
  }
  return query.length > 0 ? filteredList : []
}
