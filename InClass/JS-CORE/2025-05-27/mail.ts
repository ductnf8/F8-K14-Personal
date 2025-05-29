enum SendType {
    SMS, MAIL
}

interface MsgService {
    send: () => void
}

class SmsService implements MsgService {
    send() {
        console.log('send sms')
    }
}

class MailService implements MsgService {
    send() {
        console.log('send sms')
    }
}

// dependency inversion
// const onSend = () => {
//     const msgService: SmsService = new SmsService()
//     msgService.send()
// }

const onSend = (msgService: MsgService) => {
    msgService.send()
}

onSend(new SmsService())