import { Message } from "../types";
import { groupBy, toArray } from 'lodash'
import { formatDate } from "./dateFormat";

export function groupMessages(messagesList: Message[]) {
    let newMessageList: any[] = []
    messagesList.forEach((message, index) => {
        let newMessage = { ...message, nextSenderId: undefined, dateGroupId: undefined, preSenderId: undefined }
        if (index !== messagesList.length - 1) {
            newMessage.nextSenderId = messagesList[index + 1].senderId
        }

        if (index !== 0) {
            newMessage.preSenderId = messagesList[index - 1].senderId
        }

        newMessage.dateGroupId = formatDate(message.date)

        newMessageList.push(newMessage)
    })
    return toArray(groupBy(newMessageList, 'dateGroupId'))
}