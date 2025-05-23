import { questions, money } from "./questions.js"

// Lấy các tham chiếu DOM cần thiết cho giao diện
const questionRef = document.querySelector('.question')
const btnCheck = document.querySelector('.check-btn')
const overlay = document.querySelector('.overlay')
const menuBtn = document.querySelector('.mdi-menu')
const mark = document.querySelector('.mark')
const losePopup = document.getElementById('losePopup')
const safeMoneyRef = document.getElementById('safe-money')
const helpButtons = document.querySelectorAll('#help-5050, #help-call, #help-audience') // Sử dụng id để lấy nút trợ giúp
const numberQuesRef = document.querySelector('.numberQues')
const timeRef = document.getElementById('time')
const btnOk = document.querySelector('.btnOk')

// Khởi tạo biến trạng thái cho trò chơi
let curQuestion = null
let curIndex = -1
let usedHelps = {
    fifty: false,
    call: false,
    audience: false
}
let currentTimer = null // Biến để theo dõi interval đếm ngược hiện tại

// Hiển thị bảng mốc tiền thưởng ở bên phải
money.slice().reverse().forEach(m => {
    const moneyMark = document.createElement('p')
    moneyMark.className = 'money-mark'
    moneyMark.innerText = m.value
    mark.appendChild(moneyMark)
})

// Xác định mốc an toàn (câu 5, 10, 15) và trả về số tiền an toàn
const safeLevels = [4, 9, 14]
const getSafeMoney = (index) => {
    for (let i = safeLevels.length - 1; i >= 0; i--) {
        if (index >= safeLevels[i]) return money[safeLevels[i]].value
    }
    return 0
}

// Đánh dấu mức tiền hiện tại bằng màu nền
const highlightMoneyLevel = (index) => {
    const allMarks = document.querySelectorAll('.money-mark')
    const markIndex = money.length - 1 - index
    allMarks.forEach((mark, i) => {
        mark.style.backgroundColor = (i === markIndex) ? 'lightblue' : 'white'
    })
}

// Đặt lại giao diện các lựa chọn về trạng thái mặc định, giữ nguyên các đáp án đã xóa
const resetBackground = () => {
    questionRef.querySelectorAll('.question-option').forEach(ref => {
        ref.style.backgroundColor = '#fff'
        // Chỉ khôi phục innerText cho các đáp án chưa bị xóa (vẫn có nội dung)
        if (ref.innerText) {
            ref.innerText = ref.dataset.originalText || ''
        }
    })
}

// Hiển thị câu hỏi và các lựa chọn lên giao diện
const onShowQuestion = (question) => {
    const titleRef = questionRef.querySelector('.question-title')
    titleRef.innerText = question.question
    for (const key of ['a', 'b', 'c', 'd']) {
        const option = questionRef.querySelector(`.question-option[value="${key}"]`)
        const text = `${key.toUpperCase()}: ${question[key]}`
        option.innerText = text
        option.dataset.originalText = text // Lưu nội dung ban đầu để khôi phục
        option.style.backgroundColor = '#fff'
    }
    numberQuesRef.innerText = `Câu hỏi ${curIndex + 1}`
}

// Gắn sự kiện click cho các lựa chọn đáp án
const addAnswerEvents = () => {
    for (const key of ['a', 'b', 'c', 'd']) {
        const answerRef = questionRef.querySelector(`.question-option[value="${key}"]`)
        answerRef.addEventListener('click', () => {
            if (!curQuestion || curQuestion.status === false) return
            curQuestion.userAns = key
            curQuestion.isCorrect = key === curQuestion.correctAns
            resetBackground()
            answerRef.style.backgroundColor = 'yellow'
        })
    }
}

// Kiểm tra đáp án người chơi chọn có đúng không
const checkAnswer = () => {
    if (!curQuestion || curQuestion.userAns == null) {
        alert("Vui lòng chọn đáp án trước!")
        return
    }

    // Hủy đếm ngược khi chọn đáp án
    if (currentTimer) {
        clearInterval(currentTimer)
        currentTimer = null
        timeRef.innerText = '30'
    }

    const selectedRef = questionRef.querySelector(`.question-option[value="${curQuestion.userAns}"]`)

    if (curQuestion.isCorrect) {
        selectedRef.classList.add('flash-green')
        curQuestion.status = false
        curQuestion.level += 1

        setTimeout(() => {
            selectedRef.classList.remove('flash-green')
            selectedRef.style.backgroundColor = 'green'
            showNextQuestion()
        }, 600)
    } else {
        selectedRef.style.backgroundColor = 'red'
        curQuestion.status = false
        const prize = getSafeMoney(curIndex)
        safeMoneyRef.innerText = prize
        losePopup.style.display = 'block'
        btnCheck.style.display = 'none'
    }
}

// Lấy câu hỏi tiếp theo chưa được trả lời
const getNextQuestion = () => {
    return questions.find(q => q.status === true)
}

// Hiển thị câu hỏi tiếp theo, cập nhật giao diện và bắt đầu đếm ngược 30 giây
const showNextQuestion = () => {
    // Hủy đếm ngược hiện tại nếu có
    if (currentTimer) {
        clearInterval(currentTimer)
        currentTimer = null
    }

    curQuestion = getNextQuestion()
    if (!curQuestion) {
        alert("🎉 Bạn đã hoàn thành trò chơi!")
        questionRef.innerHTML = "<h2>🎉 Chúc mừng bạn đã chiến thắng!</h2>"
        btnCheck.style.display = 'none'
        return
    }

    curIndex++
    onShowQuestion(curQuestion)
    resetBackground()
    highlightMoneyLevel(curIndex)

    // Bắt đầu đếm ngược 30 giây cho câu hỏi
    let timeLeft = 30
    timeRef.innerText = timeLeft
    currentTimer = setInterval(() => {
        timeLeft--
        timeRef.innerText = timeLeft
        if (timeLeft === 0) {
            clearInterval(currentTimer)
            currentTimer = null
            timeRef.innerText = '30'
            curQuestion.status = false
            const prize = getSafeMoney(curIndex)
            safeMoneyRef.innerText = prize
            losePopup.style.display = 'block'
            btnCheck.style.display = 'none'
            alert('⏱️ Hết giờ! Bạn đã thua!')
        }
    }, 1000)
}

// Xử lý các trợ giúp (50:50, gọi điện, hỏi khán giả)
helpButtons.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
        console.log(`Nút trợ giúp ${btn.id} được nhấn`) // Debug để kiểm tra sự kiện
        if (!curQuestion || curQuestion.status === false) {
            console.log('Câu hỏi không hợp lệ hoặc đã trả lời')
            return
        }

        // Trợ giúp 50:50: ẩn nội dung 2 đáp án sai
        if (idx === 0) {
            if (usedHelps.fifty) return alert("Bạn đã dùng quyền trợ giúp 50:50 rồi.")
            usedHelps.fifty = true
            btn.style.display = 'none' // Ẩn nút sau khi sử dụng

            // Hủy đếm ngược câu hỏi khi sử dụng trợ giúp
            if (currentTimer) {
                clearInterval(currentTimer)
                currentTimer = null
                timeRef.innerText = '30'
            }

            const wrongOptions = ['a', 'b', 'c', 'd'].filter(k => k !== curQuestion.correctAns)
            shuffle(wrongOptions)
            const toClear = wrongOptions.slice(0, 2)

            toClear.forEach(k => {
                const ref = questionRef.querySelector(`.question-option[value="${k}"]`)
                if (ref) ref.innerText = '' // Xóa nội dung của 2 đáp án sai
            })

            // Bắt đầu lại đếm ngược 30 giây sau khi dùng 50:50
            let timeLeft = 30
            timeRef.innerText = timeLeft
            currentTimer = setInterval(() => {
                timeLeft--
                timeRef.innerText = timeLeft
                if (timeLeft === 0) {
                    clearInterval(currentTimer)
                    currentTimer = null
                    timeRef.innerText = '30'
                    curQuestion.status = false
                    const prize = getSafeMoney(curIndex)
                    safeMoneyRef.innerText = prize
                    losePopup.style.display = 'block'
                    btnCheck.style.display = 'none'
                    alert('⏱️ Hết giờ! Bạn đã thua!')
                }
            }, 1000)
        }

        // Trợ giúp gọi điện thoại: đếm ngược 30 giây
        if (idx === 1) {
            if (usedHelps.call) return alert("Bạn đã dùng quyền gọi điện.")
            usedHelps.call = true
            btn.style.display = 'none' // Ẩn nút sau khi sử dụng

            // Hủy đếm ngược câu hỏi khi sử dụng trợ giúp
            if (currentTimer) {
                clearInterval(currentTimer)
                currentTimer = null
            }

            let timeLeft = 30
            timeRef.innerText = timeLeft
            currentTimer = setInterval(() => {
                timeLeft--
                timeRef.innerText = timeLeft
                if (timeLeft === 0) {
                    clearInterval(currentTimer)
                    currentTimer = null
                    timeRef.innerText = '30'
                    alert(`⏱️ Hết giờ! Người thân nghĩ là: ${curQuestion.correctAns.toUpperCase()}`)

                    // Bắt đầu lại đếm ngược 30 giây cho câu hỏi
                    timeLeft = 30
                    timeRef.innerText = timeLeft
                    currentTimer = setInterval(() => {
                        timeLeft--
                        timeRef.innerText = timeLeft
                        if (timeLeft === 0) {
                            clearInterval(currentTimer)
                            currentTimer = null
                            timeRef.innerText = '30'
                            curQuestion.status = false
                            const prize = getSafeMoney(curIndex)
                            safeMoneyRef.innerText = prize
                            losePopup.style.display = 'block'
                            btnCheck.style.display = 'none'
                            alert('⏱️ Hết giờ! Bạn đã thua!')
                        }
                    }, 1000)
                }
            }, 1000)
        }

        // Trợ giúp hỏi ý kiến khán giả: dùng 4 tham số cố định
        if (idx === 2) {
            if (usedHelps.audience) return alert("Bạn đã dùng quyền hỏi khán giả.")
            usedHelps.audience = true
            btn.style.display = 'none' // Ẩn nút sau khi sử dụng

            // Hủy đếm ngược câu hỏi khi sử dụng trợ giúp
            if (currentTimer) {
                clearInterval(currentTimer)
                currentTimer = null
                timeRef.innerText = '30'
            }

            const result = getCustomAudienceVote(40, 30, 20, 10)
            alert(`📊 Khán giả bình chọn:\nA: ${result.a}%\nB: ${result.b}%\nC: ${result.c}%\nD: ${result.d}%`)

            // Bắt đầu lại đếm ngược 30 giây sau khi dùng trợ giúp
            let timeLeft = 30
            timeRef.innerText = timeLeft
            currentTimer = setInterval(() => {
                timeLeft--
                timeRef.innerText = timeLeft
                if (timeLeft === 0) {
                    clearInterval(currentTimer)
                    currentTimer = null
                    timeRef.innerText = '30'
                    curQuestion.status = false
                    const prize = getSafeMoney(curIndex)
                    safeMoneyRef.innerText = prize
                    losePopup.style.display = 'block'
                    btnCheck.style.display = 'none'
                    alert('⏱️ Hết giờ! Bạn đã thua!')
                }
            }, 1000)
        }
    })
})

// Trả về đối tượng chứa 4 giá trị phần trăm cho trợ giúp hỏi khán giả
function getCustomAudienceVote(a, b, c, d) {
    return { a, b, c, d }
}

// Trộn mảng ngẫu nhiên cho trợ giúp 50:50
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
}

// đóng losePopup
btnOk.addEventListener('click', (e) => {
    losePopup.style.display = 'none'
})
// Hiển thị/ẩn bảng mốc tiền khi nhấn nút menu
menuBtn.addEventListener('click', () => {
    overlay.style.display = 'flex'
})

overlay.addEventListener('click', (e) => {
    if (!e.target.closest('.mark')) {
        overlay.style.display = 'none'
    }
})

// Bắt đầu trò chơi
btnCheck.addEventListener('click', checkAnswer)
addAnswerEvents()
showNextQuestion()