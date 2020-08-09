export const BASE_URL = 'https://nike-chat-bot.herokuapp.com';
export const LIVE_AGENT_URL = 'https://www.nike.com/LiveChat?bu=Commerce%20-%20Nike.com&country=US&language=en&referenceUrl=https://www.nike.com/us/help/#contact';
export const DIALOGUE = {
    intro: `Hey there! I'm Mateo, your virtual assistant. Anything I can help you with?`,
    nosolution: `I'm not sure I can help you. Would you like me connect you to a live agent?`,
    confirm: `Does that resolve your question?`,
    resolve: `Great! Let me know if there is anything else I can help you with.`,
    rephrase: `I’m having trouble here. Could you rephrase the question?`,
    orderchange: `Do you need help with your order? See if your question is answered on our order page here: https://www.nike.com/help/a/change-cancel-order`,
    salesopportunity: `Do you need help picking a shoe? See if our shoe finder can help you find the right one: https://www.nike.com/running/shoe-finder`,
    billing: `Do you need help with billing? See if your question is answered on our refunds page here: https://www.nike.com/help/a/refund-info`,
    shippinginfo: `Do you need help with shipping? See if your question is answered on our shipping page here: https://www.nike.com/help/a/order-delivery-restrictions`,
    passwordhelp: `Do you need help with your password? See if your question is answered on our password page here: https://www.nike.com/help/a/forgot-password`,
};
export const CHAT_COLORS = {
    header: {
        bg: '#4e8cff',
        text: '#ffffff'
    },
    launcher: {
        bg: '#4e8cff'
    },
    messageList: {
        bg: '#ffffff'
    },
    sentMessage: {
        bg: '#4e8cff',
        text: '#ffffff'
    },
    receivedMessage: {
        bg: '#eaeaea',
        text: '#222222'
    },
    userInput: {
        bg: '#e4ebf0',
        text: '#565867'
    }
};
export const BOT = {
    id: 'bot',
    name: 'Mateo',
    imageUrl: 'https://avatars3.githubusercontent.com/u/1915989?s=230&v=4'
};
