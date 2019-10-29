import fetch from 'node-fetch'
import fs from 'fs'

fetch(`${'https://testing.dev.tinyrobot.com'}/graphql`, {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    variables: {},
    operationName: '',
    query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `,
  }),
})
  .then(result => result.json())
  .then(result => {
    // here we're filtering out any type information unrelated to unions or interfaces
    const filteredData = result.data.__schema.types.filter(type => type.possibleTypes !== null)
    result.data.__schema.types = filteredData
    const stringified = JSON.stringify(result.data, null, 2)
    console.log(stringified)
    fs.writeFile(
      './third-party/wocky-client/src/transport/fragmentTypes.json',
      stringified,
      err => {
        if (err) {
          console.error('Error writing fragmentTypes file', err)
        } else {
          console.log('Fragment types successfully extracted!')
        }
      }
    )
  })
