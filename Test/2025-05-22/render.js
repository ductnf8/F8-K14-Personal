import { questions, money } from "./questions.js"
import { questionRef, btnCheck, losePopup, safeMoneyRef, numberQuesRef, timeRef, curQuestion, curIndex, usedHelps, currentTimer, addAnswerEvents } from "./references.js"

// Xác định mốc an toàn (câu 5, 10, 15) và trả về số tiền an toàn
const safeLevels = [4, 9, 14]
const getSafeMoney = (index) => {
    for (let i = safeLevels.length - 1; i >= 0; i--) {
        if (index >= safeLevels[i]) return money[safeLevels[i]].value
    }
    return 0
}

// Trả về số tiền tương ứng với câu hỏi đã trả lời đúng gần nhất
const getPrizeMoney = (index) => {
    if (index > 0) {
        return money[index - 1].value // Tiền của câu trước đó
    }
    return 0 // Chưa trả lời đúng câu nào
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
        // Chỉ khôi phục innerText cho các đáp án chưa bị xóa
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
    numberQuesRef.innerText = `Câu hỏi ${curIndex.value + 1}`
}

// Kiểm tra đáp án người chơi chọn có đúng không
const checkAnswer = () => {
    if (!curQuestion.value || curQuestion.value.userAns == null) {
        alert("Vui lòng chọn đáp án trước!")
        return
    }

    // Hủy đếm ngược khi chọn đáp án
    if (currentTimer.value) {
        clearInterval(currentTimer.value)
        currentTimer.value = null
        timeRef.innerText = '30'
    }

    const selectedRef = questionRef.querySelector(`.question-option[value="${curQuestion.value.userAns}"]`)

    if (curQuestion.value.isCorrect) {
        selectedRef.classList.add('flash-green')
        curQuestion.value.status = false
        curQuestion.value.level += 1

        setTimeout(() => {
            selectedRef.classList.remove('flash-green')
            selectedRef.style.backgroundColor = 'green'
            showNextQuestion()
        }, 600)
    } else {
        selectedRef.style.backgroundColor = 'red'
        curQuestion.value.status = false
        const prize = getSafeMoney(curIndex.value)
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
    if (currentTimer.value) {
        clearInterval(currentTimer.value)
        currentTimer.value = null
    }

    curQuestion.value = getNextQuestion()
    if (!curQuestion.value) {
        alert("🎉 Bạn đã hoàn thành trò chơi!")
        questionRef.innerHTML = "<h2>🎉 Chúc mừng bạn đã chiến thắng!</h2>"
        btnCheck.style.display = 'none'
        return
    }

    curIndex.value++
    onShowQuestion(curQuestion.value)
    resetBackground()
    highlightMoneyLevel(curIndex.value)

    // Bắt đầu đếm ngược 30 giây cho câu hỏi
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

// Trả về đối tượng chứa 4 giá trị phần trăm cho trợ giúp hỏi khán giả
const getCustomAudienceVote = (a, b, c, d) => {
    return { a, b, c, d }
}

// Trộn mảng ngẫu nhiên cho trợ giúp 50:50
const shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
}

export { getSafeMoney, getPrizeMoney, highlightMoneyLevel, resetBackground, onShowQuestion, checkAnswer, getNextQuestion, showNextQuestion, getCustomAudienceVote, shuffle }