<template>
  <div class="chat-bot" style="z-index: 100; position: fixed;">
    <beautiful-chat
      :participants="participants"
      :onMessageWasSent="onMessageWasSent"
      :messageList="messageList"
      :newMessagesCount="newMessagesCount"
      :isOpen="isChatOpen"
      :close="closeChat"
      :open="openChat"
      :showEmoji="true"
      :showFile="true"
      :showEdition="true"
      :showDeletion="true"
      :showTypingIndicator="showTypingIndicator"
      :showLauncher="true"
      :showCloseButton="true"
      :colors="colors"
      :alwaysScrollToBottom="alwaysScrollToBottom"
      @onType="handleOnType"
      @edit="editMessage" />
  </div>
</template>

<script>
// TODO const file
const dialogue = {
    intro: `Hey there! I'm Mateo, your virtual assistant. Anything I can help you with?`,
    nosolution: `I'm not sure I can help you. Let me connect you to a live agent.`,
    confirm: `Does that resolve your question?`,
    resolve: `Great! Let me know if there is anything else I can help you with.`,
    rephrase: `I’m having trouble here. Could you rephrase the question?`,
    orderchange: `Do you need help with your order? See if your question is answered on our order page here: https://www.nike.com/help/a/change-cancel-order`,
    salesopportunity: `Do you need help picking a shoe? See if our shoe finder can help you find the right one: https://www.nike.com/running/shoe-finder`,
    billing: `Do you need help with a refund? See if your question is answered on our refunds page here: https://www.nike.com/help/a/refund-info`,
    shippinginfo: `Do you need help with shipping? See if your question is answered on our shipping page here: https://www.nike.com/help/a/order-delivery-restrictions`,
    passwordhelp: `Do you need help with your password? See if your question is answered on our password page here: https://www.nike.com/help/a/forgot-password`,
};

const chatColors = {
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

const bot = {
    id: 'bot',
    name: 'Mateo',
    imageUrl: 'https://avatars3.githubusercontent.com/u/1915989?s=230&v=4'
};

const baseUrl = '';

export default {
  name: 'ChatBot',
  data() {
    return {
      participants: [ bot ], // the list of all the participant of the conversation. `name` is the user name, `id` is used to establish the author of a message, `imageUrl` is supposed to be the user avatar.
    //   titleImageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAADwElEQVR4Xu2Xz09dRRTHz5zhPRZWTUlewr13iIghjQsXgtVQFxYK1IV/gSs37nHjplt3xgUUmzTBNiX+WBgXbdTYDfTHpmpIbNJG3bzAffcOvgSrtv4A5M1pTkMb8gLvzjweAe6bu71nzo/PfM+ZGQFt/ok2rx88AK+ANifgW6DNBeCHoG8B3wJtTsC3QJsLwJ8CvgV8C7Q5Ad8CbS4Afwr4FvAtkHMCg4ODhYWFhf93KrPZFpAAUDug7EQQBC9LKceI6Gki+lFrfbllAKIoGlpbW7uzsrLy4KAACMOwBwBGhRDjRPQGIl4DgMkkSb7PytFJAUEQPIeIE2mavpfleC//l0qlI8Vi8SQRjXPRAHAMAFYA4DwinqtUKto2vjUA7iWt9U1E/ChN0y9tA7TITiqlXiEilvUYAAwJIQqbvn8ioqlisfjF4uLiqms8awBRFH0AAGeklC/EcVx2DeRq393d3Sul5N0dN8aMIOLRLT54/lxGxMlKpXLD1fdWeysAQRAMIOIPACCllF1xHP+xm6Dbre3r63t2fX19hIhGjTFjiNhfb2eM+VNKOVOr1aaXl5eXWpGDDQCeqrcQ8VUOSEQvaq1/aUHwjjAMX0NEljXvNPvn02W7j+NNbWxszFar1X9aEPuJi0wASqm3ieizxyuI6H2t9YfNJKGU6t/cXS54mIieaeCHiOgqyzxJkqvMvpmYWWuyAIgoin7enLKPfBlj7hUKheM2c0Ap1UVEp3hwCSF4ePVmJQQAfwshLhljzmqtf7Ww35VJQwA9PT2njTHf1Ucgot8AYEJr/RUAbDz+zydFtVo9wZLePKIGAAAtM+TBOt3Z2XmhXC7/Zblm12YNAURRdBEA3tkpCg8lRLwNAPeJqCSEeAkAnnLJiojm+NKitf6aBeaythW2DQEopcpE9HwrAtX5+BcAPpVSTsVxfHcP/Fu7bASA+5/lbSthm6BLRPRxR0fHzF4cpTYJ1Ns0VEAQBGuIWGzGcd2a60KIqSRJ+FFyoB5RWQDmEHG4GQDGmP+klJ8T0dk0TXlOHMivIYAwDF8HgPkt926bIljm54QQn6Rp+rvNgv20yboHgFLqTSKaBYBSg0R5VnxLRDNa62/2Y5o3CzETADvme/rq6uq7Qoi3arVav5SS5wLfBfglNg8AV7TW/Bw9dJ8VgENXlUPCHoADrFyaegXkclsdivIKcICVS1OvgFxuq0NRXgEOsHJp6hWQy211KMorwAFWLk29AnK5rQ5FeQU4wMqlqVdALrfVoSivAAdYuTR9CEVZPFCKobsTAAAAAElFTkSuQmCC',
      messageList: [],
        //   { type: 'text', author: `bot`, data: { text: `Hey there! I'm Mateo, your virtual assistant. Anything I can help you with?` } },
    //   ], // the list of the messages to show, can be paginated and adjusted dynamically
      newMessagesCount: 0,
      isChatOpen: false, // to determine whether the chat window should be open or closed
      showTypingIndicator: '', // when set to a value matching the participant.id it shows the typing indicator for the specific user
      colors: chatColors, // specifies the color scheme for the component
      alwaysScrollToBottom: false, // when set to true always scrolls the chat to the bottom when new events are in (new message, user starts typing...)
    //   messageStyling: true, // enables *bold* /emph/ _underline_ and such (more info at github.com/mattezza/msgdown)
      answerCount: 0,
      confirming: false,
    }
  },
  methods: {
    sendMessage (text) {
        console.log('send message');
      if (text.length > 0) {
        this.newMessagesCount = this.isChatOpen ? this.newMessagesCount : this.newMessagesCount + 1
        this.onMessageWasSent({ author: bot.id, type: 'text', data: { text } })
      }
    },
    onMessageWasSent (message) {
        console.log('on send');
      // called when the user sends a message
      this.messageList = [ ...this.messageList, message ]
      if (message.author === 'me') {
          this.botRespond(message.data.text)
      }
    },
    botRespond (questionText) {
        this.showTypingIndicator = bot.id;
        if (this.confirming) {
            this.handleConfirmation(questionText);
        } else {
            // TODO: replace w prod url
            const requestUrl = `https://nike-chat-bot.herokuapp.com/intent?phrase=${encodeURIComponent(questionText)}`
            // const requestUrl = `http://localhost:3000/intent?phrase=${encodeURIComponent(questionText)}`;
            fetch(requestUrl)
            .then(response => response.json())
            .then(json => {
                const answerText = this.getAnswerText(json.probabilities);
                this.showTypingIndicator = '';
                this.sendMessage(answerText);
                this.answerCount += 1;
                this.confirming = true;
                this.sendMessageDelayed(dialogue.confirm);
            });
            // TODO: catch api error and redirect to agent
        }
    },
    handleConfirmation (questionText) {
        let responseText;

        if (questionText.toLowerCase().includes('no')) {
            responseText = this.answerCount > 1 ? dialogue.nosolution : dialogue.rephrase;
        } else if (questionText.includes('yes')) {
            responseText = dialogue.resolve;
            this.answerCount = 0;
        } else {
            responseText = dialogue.nosolution;
        }
        // TODO: redirect on connect to agent on no solution
        // https://www.nike.com/LiveChat?bu=Commerce%20-%20Nike.com&country=US&language=en&referenceUrl=https://www.nike.com/us/help/#contact
        this.confirming = false;
        this.sendMessageDelayed(responseText);
    },
    getAnswerText (probabilities) {
        const intent = probabilities[0] ? probabilities[0].label : 'rephrase';
        const responseKey = intent.toLowerCase().replace(/\s/g, '');
        return dialogue[responseKey];
    },
    openChat () {
        console.log('open chat');
        // called when the user clicks on the fab button to open the chat
        this.isChatOpen = true;
        this.newMessagesCount = 0;
        if (!this.messageList.length) {
            this.sendMessageDelayed(dialogue.intro)
        }
    },
    // TODO could allow for callback for redirect and updating state
    sendMessageDelayed(text) {
        this.showTypingIndicator = bot.id;
        setTimeout(() => {
            this.showTypingIndicator = '';
            this.sendMessage(text);
        }, 2000);
    },
    closeChat () {
        console.log('close chat');
      // called when the user clicks on the botton to close the chat
      this.isChatOpen = false
    },
    handleScrollToTop () {
      // called when the user scrolls message list to top
      // leverage pagination for loading another page of messages
    },
    handleOnType () {
      console.log('Emit typing event')
    },
    editMessage(message){
        console.log('edit message');
      const m = this.messageList.find(m=>m.id === message.id);
      m.isEdited = true;
      m.data.text = message.data.text;
    }
  }
}
</script>