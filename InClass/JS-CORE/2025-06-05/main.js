function getData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {

            let success = true;

            if (success) {
                resolve("Dữ liệu từ server");
            } else {
                reject("Không thể lấy dữ liệu từ server!");
            }
        }, 1000);
    });
}

getData()
    .then((data) => {
        console.log("Nhận được:", data);
    })
    .catch((error) => {
        console.error("Lỗi:", error);
    });


function five(num) {
    return `${num}+5`
}

function six(callback) {
    return callback(6)
}

const result = six(five)
console.log(result)