import Vue from 'vue';
import Chat from 'vue-beautiful-chat'
import ChatBot from './components/chat-bot.vue';

Vue.use(Chat);
Vue.component('chat-bot', ChatBot);
new Vue({ el: `#chat-bot` });
