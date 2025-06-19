import { questions, money } from "./questions.js"
import { resetBackground, onShowQuestion, checkAnswer, getNextQuestion, showNextQuestion, getCustomAudienceVote, shuffle, getSafeMoney, getPrizeMoney } from "./render.js"

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
const stopBtn = document.querySelector('.stop') // Nút dừng cuộc chơi

// Khởi tạo biến trạng thái cho trò chơi
const curQuestion = { value: null }
const curIndex = { value: -1 }
const usedHelps = { value: { fifty: false, call: false, audience: false } }
const currentTimer = { value: null }

// Hiển thị bảng mốc tiền thưởng ở bên phải
money.slice().reverse().forEach(m => {
    const moneyMark = document.createElement('p')
    moneyMark.className = 'money-mark'
    moneyMark.innerText = m.value
    mark.appendChild(moneyMark)
})

// Gắn sự kiện click cho các lựa chọn đáp án
const addAnswerEvents = () => {
    for (const key of ['a', 'b', 'c', 'd']) {
        const answerRef = questionRef.querySelector(`.question-option[value="${key}"]`)
        answerRef.addEventListener('click', () => {
            if (!curQuestion.value || curQuestion.value.status === false) return
            curQuestion.value.userAns = key
            curQuestion.value.isCorrect = key === curQuestion.value.correctAns
            resetBackground()
            answerRef.style.backgroundColor = 'yellow'
        })
    }
}

// Xử lý các trợ giúp (50:50, gọi điện, hỏi khán giả)
helpButtons.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
        console.log(`Nút trợ giúp ${btn.id} được nhấn`) // Debug để kiểm tra sự kiện
        if (!curQuestion.value || curQuestion.value.status === false) {
            console.log('Câu hỏi không hợp lệ hoặc đã trả lời')
            return
        }

        // Kiểm tra nếu chưa đến câu 6
        if (curIndex.value < 5) {
            alert("Bạn chỉ có thể sử dụng quyền trợ giúp từ câu hỏi thứ 6 trở đi!")
            return
        }

        // Trợ giúp 50:50: ẩn nội dung 2 đáp án sai
        if (idx === 0) {
            if (usedHelps.value.fifty) return alert("Bạn đã dùng quyền trợ giúp 50:50 rồi.")
            usedHelps.value.fifty = true
            btn.style.display = 'none' // Ẩn nút sau khi sử dụng

            // Hủy đếm ngược câu hỏi
            if (currentTimer.value) {
                clearInterval(currentTimer.value)
                currentTimer.value = null
                timeRef.innerText = '30'
            }

            const wrongOptions = ['a', 'b', 'c', 'd'].filter(k => k !== curQuestion.value.correctAns)
            shuffle(wrongOptions)
            const toClear = wrongOptions.slice(0, 2)

            toClear.forEach(k => {
                const ref = questionRef.querySelector(`.question-option[value="${k}"]`)
                if (ref) ref.innerText = '' // Xóa nội dung của 2 đáp án sai
            })

            // Bắt đầu lại đếm ngược 30 giây
            let timeLeft = 30
            timeRef.innerText = timeLeft
            currentTimer.value = setInterval(() => {
                timeLeft--
                timeRef.innerText = timeLeft
                if (timeLeft === 0) {
                    clearInterval(currentTimer.value)
                    currentTimer.value = null
                    timeRef.innerText = '30'
                    curQuestion.value.status = false
                    const prize = getSafeMoney(curIndex.value)
                    safeMoneyRef.innerText = prize
                    losePopup.style.display = 'block'
                    btnCheck.style.display = 'none'
                    alert('⏱️ Hết giờ! Bạn đã thua!')
                }
            }, 1000)
        }

        // Trợ giúp gọi điện thoại: đếm ngược 30 giây
        if (idx === 1) {
            if (usedHelps.value.call) return alert("Bạn đã dùng quyền gọi điện.")
            usedHelps.value.call = true
            btn.style.display = 'none' // Ẩn nút sau khi sử dụng

            // Hủy đếm ngược câu hỏi
            if (currentTimer.value) {
                clearInterval(currentTimer.value)
                currentTimer.value = null
            }

            let timeLeft = 30
            timeRef.innerText = timeLeft
            currentTimer.value = setInterval(() => {
                timeLeft--
                timeRef.innerText = timeLeft
                if (timeLeft === 0) {
                    clearInterval(currentTimer.value)
                    currentTimer.value = null
                    timeRef.innerText = '30'
                    alert(`⏱️ Hết giờ! Người thân nghĩ là: ${curQuestion.value.correctAns.toUpperCase()}`)

                    // Bắt đầu lại đếm ngược 30 giây cho câu hỏi
                    timeLeft = 30
                    timeRef.innerText = timeLeft
                    currentTimer.value = setInterval(() => {
                        timeLeft--
                        timeRef.innerText = timeLeft
                        if (timeLeft === 0) {
                            clearInterval(currentTimer.value)
                            currentTimer.value = null
                            timeRef.innerText = '30'
                            curQuestion.value.status = false
                            const prize = getSafeMoney(curIndex.value)
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
            if (usedHelps.value.audience) return alert("Bạn đã dùng quyền hỏi khán giả.")
            usedHelps.value.audience = true
            btn.style.display = 'none' // Ẩn nút sau khi sử dụng

            // Hủy đếm ngược câu hỏi
            if (currentTimer.value) {
                clearInterval(currentTimer.value)
                currentTimer.value = null
                timeRef.innerText = '30'
            }

            const result = getCustomAudienceVote(40, 30, 20, 10)
            alert(`📊 Khán giả bình chọn:\nA: ${result.a}%\nB: ${result.b}%\nC: ${result.c}%\nD: ${result.d}%`)

            // Bắt đầu lại đếm ngược 30 giây
            let timeLeft = 30
            timeRef.innerText = timeLeft
            currentTimer.value = setInterval(() => {
                timeLeft--
                timeRef.innerText = timeLeft
                if (timeLeft === 0) {
                    clearInterval(currentTimer.value)
                    currentTimer.value = null
                    timeRef.innerText = '30'
                    curQuestion.value.status = false
                    const prize = getSafeMoney(curIndex.value)
                    safeMoneyRef.innerText = prize
                    losePopup.style.display = 'block'
                    btnCheck.style.display = 'none'
                    alert('⏱️ Hết giờ! Bạn đã thua!')
                }
            }, 1000)
        }
    })
})

// Đóng losePopup
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

// Dừng cuộc chơi và hiển thị losePopup với số tiền của câu đã trả lời đúng gần nhất
stopBtn.addEventListener('click', () => {
    if (currentTimer.value) {
        clearInterval(currentTimer.value)
        currentTimer.value = null
        timeRef.innerText = '30'
    }
    if (curQuestion.value) {
        curQuestion.value.status = false
    }
    const prize = getPrizeMoney(curIndex.value)
    safeMoneyRef.innerText = prize
    losePopup.style.display = 'block'
    btnCheck.style.display = 'none'
})

// Bắt đầu trò chơi
btnCheck.addEventListener('click', checkAnswer)
addAnswerEvents()
showNextQuestion()

export { questionRef, btnCheck, overlay, menuBtn, mark, losePopup, safeMoneyRef, helpButtons, numberQuesRef, timeRef, btnOk, stopBtn, curQuestion, curIndex, usedHelps, currentTimer, addAnswerEvents }