const http = require('http')
const url = require('url')
const querystring = require('querystring')

http.createServer((req, res) =>
{
    let data = ''

    req.on('data', chunk =>
    {
        data += chunk
    })

    req.on('end', () =>
    {
        console.log(data)
        let jsonObject = JSON.parse(data)

        let x = Number(jsonObject.x)
        let y = Number(jsonObject.y)

        let concatenation = `${jsonObject.s}: ${jsonObject.o.surname}, ${jsonObject.o.name}`

        let responseObject = {
            '__comment': 'Ответ.Лабораторная работа 8/10',
            'x_plus_y': x + y,
            'concatenation_s_o': concatenation,
            'length_m': jsonObject.m.length
        }

        res.end(JSON.stringify(responseObject, null, '\t'))
    })
}).listen(3000)