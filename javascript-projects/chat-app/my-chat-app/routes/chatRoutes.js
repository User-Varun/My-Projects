const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/:roomId", authMiddleware, chatController.chatPage);
router.post("/send", authMiddleware, chatController.sendMessage);
router.get("/messages/:roomId", authMiddleware, chatController.getMessages);

module.exports = router;
