const Message = require("../models/Message");

exports.chatPage = async (req, res) => {
  const messages = await Message.find({ room: req.params.roomId }).populate(
    "sender"
  );
  res.json({ user: req.user, messages });
};

exports.sendMessage = async (req, res) => {
  const newMessage = new Message({
    content: req.body.content,
    sender: req.user._id,
    room: req.body.room,
  });
  await newMessage.save();
  const populatedMessage = await newMessage.populate("sender").execPopulate();
  res.status(201).json(populatedMessage);
};

exports.getMessages = async (req, res) => {
  const messages = await Message.find({ room: req.params.roomId }).populate(
    "sender"
  );
  res.json(messages);
};
