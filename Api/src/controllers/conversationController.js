const Conversation = require('../models/Conversation');

const getConversations = async (req, res) => {
    try {
        const conversations = await Conversation.findAll();
        res.json(conversations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createConversation = async (req, res) => {
    try {
        const { userId, message } = req.body;
        const newConversation = await Conversation.create({ userId, message }); // Verifica que el mensaje se esté guardando correctamente

        // Simulación de la respuesta del bot de chat
        const botMessage = `Hola, soy un bot. ¡Gracias por tu mensaje: "${message}"!`;
        const botResponse = await Conversation.create({ userId: 2, message: botMessage }); // Verifica que el mensaje del bot se esté guardando correctamente

        // Enviar una respuesta al cliente con el nuevo mensaje de usuario y el mensaje de bot
        res.json({ userMessage: newConversation, botMessage: botResponse });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getConversations,
    createConversation,
};