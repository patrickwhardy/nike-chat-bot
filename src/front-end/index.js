import Vue from 'vue';
import ChatBot from './components/chat-bot.vue';

Vue.component('chat-bot', ChatBot);
new Vue({
    el: `#chat-bot`
})
