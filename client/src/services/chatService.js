import axios from 'axios';

const API_URL = 'http://localhost:3001/conversations';

async function sendMessage(message) {
  try {
    const response = await axios.post(API_URL, { userId: 1, message }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Error sending message');
  }
}

const chatService = { sendMessage };
export default chatService;
