import express from 'express'
import { getAllContact , getMessageByUserId,sendMessage,getChatPartner} from '../controllers/message.controller.js'
import { protectRoute } from '../middleware/auth.middleware.js'
import {arcjectProtection} from '../middleware/arcjet.middleware.js'
const router = express.Router()

router.use(protectRoute , arcjectProtection)

router.get('/contacts',getAllContact)
router.get('/chats',getChatPartner)
router.get('/:id',getMessageByUserId)
router.post('/send/:id',sendMessage)

export default router