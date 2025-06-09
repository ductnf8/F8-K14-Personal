const baseUrl = 'http://localhost:3000'

export const getMethod = async (endpoint) => {
    try {
        const response = await fetch(`${baseUrl}/${endpoint}`)
        return await response.json()
    } catch (e) {
        console.log(e)
    }
}

export const postMethod = async (endpoint, body) => {
    try {
        const response = await fetch(
            `${baseUrl}/${endpoint}`,
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
        return await response.json()
    } catch (e) {
        console.log(e)
    }
}