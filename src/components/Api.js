import axios from 'axios';
import React, { useEffect, useState } from 'react'

const BASE_API = process.env.REACT_APP_API_BASE;

const Api = () => {

  const [data, setData] = useState([]);

  const [columns, setColumns] = useState([
    { Alias: 'ID', IsActive: true },
    { Alias: 'Description', IsActive: true },
    { Alias: 'Designation', IsActive: true },
    { Alias: 'ShortName', IsActive: true },
  ])

  const token = localStorage.setItem('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOjEwMywiVXNlcm5hbWUiOiJ2aWpheTIwMjAiLCJQYXNzd29yZCI6IlUyRnNkR1ZrWDE5RTZVZnRkcmN0ZWh1RWVjKzdVeVFpeVZhVFVDUWZ4OEQvUlNlWjUxbzJadGFOYmlKdjZaakpZc3lCbzNzRVZQcUFqeVBYSldwRHhnPT0iLCJGaXJzdE5hbWUiOiJWaWpheSIsIkxhc3ROYW1lIjoiUGF0ZWwiLCJNb2JpbGVOdW1iZXIxIjoiNzMwNDkxMzQ5NiIsIk1vYmlsZU51bWJlcjIiOiI3MzA0OTEzNDk2IiwiRW1haWxJRCI6IlUyRnNkR1ZrWDE4S2U3d0txZklnQVZjK3JiVjY2ZTZkcW8rcEZoNE95aXBGWXF5cVh4TXM5VVVHWUtqQlhTUVlzb21HR2duSkVHMEVYOTJiV3dLWHhVRDQ4d0N4cFpxMUhtVjRUcXFKbm5vN3MrVVdwWk1kamEvcWtKSFhiRDJkIiwiSG9tZUFkZHJlc3MiOiJzZHNkc2QiLCJEZXNpZ25hdGlvbklEIjozMiwiRGVwYXJ0bWVudElEIjoyLCJJc1RMIjp0cnVlLCJSZW1hcmtzIjoiLiIsIkdlbmRlciI6MSwiQWRkZWRPbiI6IjIwMjQtMDItMTZUMDg6MTE6NTEuMDAwWiIsIkFkZGVkQnkiOiJ0ZXN0ZjciLCJMYXN0TW9kaWZpZWRPbiI6IjIwMjQtMDItMTZUMDg6MTE6NTEuMDAwWiIsIkxhc3RNb2RpZmllZEJ5IjoidGVzdGY3IiwiSXNEZWxldGUiOjAsImlhdCI6MTcxNTgzMzgyMSwiZXhwIjoxNzE4NDI1ODIxfQ.oqOsdtRkq0AQSwtYB42OLPGv6EQA04a6R0jYq-QjqMA")

  const [selectedColumn, setSelectedColumn] = useState(columns)

  const fetchData = async () => {
    try {
      let response = await axios.get(`${BASE_API}Designation/GetDesignationDropdown`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      })
      setData(response.data.DropdownData);
      console.log(response.data.DropdownData);
    } catch (error) {
      console.log(error);
    }
  }

  const handleColumnToggale = (columnAlias) => {
    const updatedColumns = selectedColumn.includes(columnAlias)
      ? selectedColumn.filter(col => col !== columnAlias)
      : [...selectedColumn, columnAlias];
    setSelectedColumn(updatedColumns);
  }


  useEffect(() => {
    fetchData();
  }, [])

  return (
    <>
      <div>
        {columns.map((columns, index) => (
          <label key={`${index}-${columns.Alias}`} style={{ margin: '0 10px' }}>
            <input
              type="checkbox"
              checked={selectedColumn.includes(columns.Alias)}
              onChange={() => handleColumnToggale(columns.Alias)}
            />
            {columns.Alias}
          </label>
        ))}
      </div>
      <div>
        <table border={1}>
          <thead>
            <tr>
              {
                selectedColumn.map((v, index) => {
                  return (
                    <th key={`${index}-${v.Alias}`}
                    >
                      {v.Alias}
                    </th>
                  )

                })
              }
            </tr>
          </thead>
          <tbody>
            {data.map((v, index) => {
              return (
                <tr key={index}>
                  {selectedColumn.map((col, colindex) => {
                    <td key={colindex}>
                      {v[col]}
                    </td>
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Api
