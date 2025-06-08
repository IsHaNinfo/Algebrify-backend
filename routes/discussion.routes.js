import express from "express";
import * as DiscussionController from "../controllers/discussion.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Discussion:
 *       type: object
 *       required:
 *         - title
 *         - lesson
 *         - description
 *         - userId
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Discussion's unique identifier
 *         title:
 *           type: string
 *           description: Discussion title
 *         lesson:
 *           type: string
 *           description: Related lesson
 *         description:
 *           type: string
 *           description: Discussion content
 *         userId:
 *           type: string
 *           format: uuid
 *           description: ID of the user who created the discussion
 *         status:
 *           type: string
 *           enum: [open, closed]
 *           description: Discussion status
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 *     Reply:
 *       type: object
 *       required:
 *         - content
 *         - discussionId
 *         - userId
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Reply's unique identifier
 *         content:
 *           type: string
 *           description: Reply content
 *         discussionId:
 *           type: string
 *           format: uuid
 *           description: ID of the discussion this reply belongs to
 *         userId:
 *           type: string
 *           format: uuid
 *           description: ID of the user who created the reply
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 */

/**
 * @swagger
 * /api/discussions:
 *   post:
 *     summary: Create a new discussion
 *     tags: [Discussions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - lesson
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Help with Algebra Problem"
 *               lesson:
 *                 type: string
 *                 example: "Quadratic Equations"
 *               description:
 *                 type: string
 *                 example: "I'm having trouble understanding how to solve quadratic equations..."
 *     responses:
 *       201:
 *         description: Discussion created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Discussion'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.post("/", authenticate, DiscussionController.createDiscussion);

/**
 * @swagger
 * /api/discussions:
 *   get:
 *     summary: Get all discussions
 *     tags: [Discussions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all discussions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Discussion'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get("/", authenticate, DiscussionController.getAllDiscussions);

/**
 * @swagger
 * /api/discussions/search:
 *   get:
 *     summary: Search discussions
 *     tags: [Discussions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: searchTerm
 *         schema:
 *           type: string
 *         required: true
 *         description: Search term to find discussions
 *     responses:
 *       200:
 *         description: Search results
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Discussion'
 *       400:
 *         description: Search term is required
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get("/search", authenticate, DiscussionController.searchDiscussions);

/**
 * @swagger
 * /api/discussions/my:
 *   get:
 *     summary: Get current user's discussions
 *     tags: [Discussions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's discussions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Discussion'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get("/my", authenticate, DiscussionController.getMyDiscussions);

/**
 * @swagger
 * /api/discussions/{id}:
 *   get:
 *     summary: Get discussion by ID
 *     tags: [Discussions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: Discussion ID
 *     responses:
 *       200:
 *         description: Discussion details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Discussion'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: Discussion not found
 */
router.get("/:id", authenticate, DiscussionController.getDiscussionById);

/**
 * @swagger
 * /api/discussions/{id}:
 *   put:
 *     summary: Update discussion
 *     tags: [Discussions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: Discussion ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               lesson:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [open, closed]
 *     responses:
 *       200:
 *         description: Discussion updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Discussion'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: Discussion not found
 */
router.put("/:id", authenticate, DiscussionController.updateDiscussion);

/**
 * @swagger
 * /api/discussions/{id}:
 *   delete:
 *     summary: Delete discussion
 *     tags: [Discussions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: Discussion ID
 *     responses:
 *       200:
 *         description: Discussion deleted successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: Discussion not found
 */
router.delete("/:id", authenticate, DiscussionController.deleteDiscussion);

/**
 * @swagger
 * /api/discussions/{discussionId}/replies:
 *   post:
 *     summary: Add reply to discussion
 *     tags: [Replies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: discussionId
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: Discussion ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 example: "Here's how you can solve this problem..."
 *     responses:
 *       201:
 *         description: Reply added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reply'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: Discussion not found
 */
router.post("/:discussionId/replies", authenticate, DiscussionController.addReply);

/**
 * @swagger
 * /api/discussions/{discussionId}/replies:
 *   get:
 *     summary: Get all replies for a discussion
 *     tags: [Replies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: discussionId
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: Discussion ID
 *     responses:
 *       200:
 *         description: List of replies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reply'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: Discussion not found
 */
router.get("/:discussionId/replies", authenticate, DiscussionController.getRepliesByDiscussionId);

/**
 * @swagger
 * /api/discussions/replies/{id}:
 *   put:
 *     summary: Update reply
 *     tags: [Replies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: Reply ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 example: "Updated reply content..."
 *     responses:
 *       200:
 *         description: Reply updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reply'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: Reply not found
 */
router.put("/replies/:id", authenticate, DiscussionController.updateReply);

/**
 * @swagger
 * /api/discussions/replies/{id}:
 *   delete:
 *     summary: Delete reply
 *     tags: [Replies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: Reply ID
 *     responses:
 *       200:
 *         description: Reply deleted successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: Reply not found
 */
router.delete("/replies/:id", authenticate, DiscussionController.deleteReply);

/**
 * @swagger
 * /api/discussions/replies/my:
 *   get:
 *     summary: Get current user's replies
 *     tags: [Replies]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's replies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reply'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get("/replies/my", authenticate, DiscussionController.getMyReplies);

export default router;
