import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
    try {

        const { message } = req.body;
        const recieverId = req.params.id;
        const senderId = req.user._id


        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, recieverId] },
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, recieverId]
            })
        }

        const newMessage = new Message({
            senderId,
            recieverId,
            message,
        })


        if (newMessage) {
            conversation.messages.push(newMessage._id)
        }


        // this will run in parallel
        await Promise.all([conversation.save(), newMessage.save()]);



        // SOCKET IO FUNCTIONALITY WILL GO HERE 





        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessage controller", error.message)
        res.status(500).json({ error: "Internal server errro" })
    }
};




export const getMessages = async (req, res) => {
    try {

        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },

        }).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

        if (!conversation) return res.status(200).json([]);

        const messages = conversation.messages;

        res.status(200).json(messages);




    } catch (error) {
        console.log("Error in getMessages controller: ", error.message)
        res.status(500).json({ error: "Internal server errro" })
    }
}

