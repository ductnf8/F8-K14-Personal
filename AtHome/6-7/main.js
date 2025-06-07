function sendRequest(method, url, callback) {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url, true)
    xhr.send()
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr < 400) {
            if (typeof callback === 'function') {
                callback(xhr.responseText)
            }
        }
    }
}

sendRequest('GET', './partials/header.html', (responseText) => {
    console.log(responseText)
})