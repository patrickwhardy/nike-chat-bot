<template>
  <div style="z-index: 100; position: fixed;">
    <beautiful-chat
      :participants="participants"
      :onMessageWasSent="onMessageWasSent"
      :messageList="messageList"
      :newMessagesCount="newMessagesCount"
      :isOpen="isChatOpen"
      :close="closeChat"
      :open="openChat"
      :showTypingIndicator="showTypingIndicator"
      :showLauncher="true"
      :showCloseButton="true"
      :colors="colors"
      :alwaysScrollToBottom="alwaysScrollToBottom" />
  </div>
</template>

<script>
import { BASE_URL, LIVE_AGENT_URL, DIALOGUE, CHAT_COLORS, BOT } from '../constants';

export default {
  name: 'ChatBot',
  data() {
    return {
      participants: [ BOT ],
      messageList: [],
      newMessagesCount: 0,
      isChatOpen: false,
      showTypingIndicator: '',
      colors: CHAT_COLORS,
      alwaysScrollToBottom: false,
      answerCount: 0,
      confirming: false,
      askingForAgent: false,
    }
  },
  methods: {
    sendMessage (text) {
      if (text.length > 0) {
        this.newMessagesCount = this.isChatOpen ? this.newMessagesCount : this.newMessagesCount + 1
        this.onMessageWasSent({ author: BOT.id, type: 'text', data: { text } })
      }
    },
    onMessageWasSent (message) {
      this.messageList = [ ...this.messageList, message ]
      if (message.author === 'me') {
          this.botRespond(message.data.text)
      }
    },
    botRespond (questionText) {
        this.showTypingIndicator = BOT.id;
        if (this.askingForAgent) {
            this.handleAgentRequest(questionText);
        } else if (this.confirming) {
            this.handleConfirmation(questionText);
        } else {
            const requestUrl = `${BASE_URL}/intent?phrase=${encodeURIComponent(questionText)}`;

            fetch(requestUrl)
            .then(response => response.json())
            .then(json => {
                const answerText = this.getAnswerText(json.probabilities);
                this.showTypingIndicator = '';
                this.sendMessage(answerText);
                this.answerCount += 1;
                this.confirming = true;
                this.sendMessageDelayed(DIALOGUE.confirm);
            })
            .catch(() => {
                this.showTypingIndicator = '';
                this.askingForAgent = true;
                this.confirming = false;
                this.sendMessage(DIALOGUE.nosolution);
            })
        }
    },
    handleConfirmation (questionText) {
        let responseText;

        if (questionText.toLowerCase().includes('no') && this.answerCount < 2) {
            responseText = DIALOGUE.rephrase;
        } else if (questionText.includes('yes')) {
            responseText = DIALOGUE.resolve;
            this.answerCount = 0;
        } else {
            this.askingForAgent = true;
            responseText = DIALOGUE.nosolution;
        }

        this.confirming = false;
        this.sendMessageDelayed(responseText);
    },
    // pointing at anonympous function to expose window
    handleAgentRequest: function (questionText) {
        this.askingForAgent = false;
        if (questionText.includes('yes')) {
            window.open(LIVE_AGENT_URL, `_blank`);
            this.sendMessageDelayed(DIALOGUE.resolve);
        } else {
            this.sendMessageDelayed(DIALOGUE.rephrase);
        }
    },
    getAnswerText (probabilities) {
        const intent = probabilities[0] ? probabilities[0].label : 'rephrase';
        const responseKey = intent.toLowerCase().replace(/\s/g, '');
        return DIALOGUE[responseKey];
    },
    openChat () {
        this.isChatOpen = true;
        this.newMessagesCount = 0;
        if (!this.messageList.length) {
            this.sendMessageDelayed(DIALOGUE.intro)
        }
    },
    sendMessageDelayed(text) {
        this.showTypingIndicator = BOT.id;
        setTimeout(() => {
            this.showTypingIndicator = '';
            this.sendMessage(text);
        }, 2000);
    },
    closeChat () {
      this.isChatOpen = false
    },
  }
}
</script>
