/**
 * @swagger
 * tags:
 *   name: Sales
 *   description: APIs for managing sales
 */

import { Router } from 'express';
import { getSales, getSaleById, createSale, updateSale, deleteSale } from '../controllers/saleController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

/**
 * @swagger
 * /api/sales:
 *   get:
 *     summary: Get all sales
 *     tags: [Sales]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successfully retrieved sales
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sale'
 *       '500':
 *         description: Server error
 */
router.get('/', authMiddleware, getSales);

/**
 * @swagger
 * /api/sales/{id}:
 *   get:
 *     summary: Get sale by ID
 *     tags: [Sales]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Sale ID
 *     responses:
 *       '200':
 *         description: Successfully retrieved sale
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sale'
 *       '404':
 *         description: Sale not found
 *       '500':
 *         description: Server error
 */
router.get('/:id', authMiddleware, getSaleById);

/**
 * @swagger
 * /api/sales:
 *   post:
 *     summary: Create a new sale
 *     tags: [Sales]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Sale'
 *     responses:
 *       '201':
 *         description: Sale created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sale'
 *       '404':
 *         description: Product or Customer not found
 *       '500':
 *         description: Server error
 */
router.post('/', authMiddleware, createSale);

/**
 * @swagger
 * /api/sales/{id}:
 *   put:
 *     summary: Update sale by ID
 *     tags: [Sales]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Sale ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Sale'
 *     responses:
 *       '200':
 *         description: Successfully updated sale
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sale'
 *       '404':
 *         description: Sale not found
 *       '500':
 *         description: Server error
 */
router.put('/:id', authMiddleware, updateSale);

/**
 * @swagger
 * /api/sales/{id}:
 *   delete:
 *     summary: Delete sale by ID
 *     tags: [Sales]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Sale ID
 *     responses:
 *       '200':
 *         description: Sale deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sale'
 *       '404':
 *         description: Sale not found
 *       '500':
 *         description: Server error
 */
router.delete('/:id', authMiddleware, deleteSale);

export default router;
