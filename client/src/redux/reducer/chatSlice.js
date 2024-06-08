
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import chatService from '../../services/chatService';

const initialState = {
  messages: [],
  isLoading: false,
  error: null,
};

export const getMessages = createAsyncThunk('chat/getMessages', async () => {
  try {
    const messages = await chatService.getMessages();
    return messages;
  } catch (error) {
    throw new Error('Error fetching messages');
  }
});

export const sendMessage = createAsyncThunk('chat/sendMessage', async (message) => {
  try {
    const response = await chatService.sendMessage(message);
    // response should contain both userMessage and botMessage
    return response;
  } catch (error) {
    throw new Error('Error sending message');
  }
});

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMessages.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages = action.payload;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(sendMessage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        // Assuming action.payload contains { userMessage, botMessage }
        state.messages.push(action.payload.userMessage);
        state.messages.push(action.payload.botMessage);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default chatSlice.reducer;
