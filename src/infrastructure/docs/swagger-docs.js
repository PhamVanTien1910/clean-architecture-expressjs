/**
 * @openapi
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The user ID
 *         name:
 *           type: string
 *           description: The user's name
 *         email:
 *           type: string
 *           format: email
 *           description: The user's email address
 *       required:
 *         - id
 *         - name
 *         - email
 *     AuthResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: The authentication token
 * /api/v1/register:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's name
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address
 *               password:
 *                 type: string
 *                 description: The user's password
 *               sex:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *             required:
 *               - username
 *               - email
 *               - password
 *               - sex
 *               - address
 *               - phone
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input
 * /api/v1/login:
 *   post:
 *     summary: Login a user
 *     description: Authenticate a user and return a token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *                 description: The user's password
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Login successful, returns authentication token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       401:
 *         description: Invalid credentials
 * /api/v1/refresh-token:
 *   post:
 *     summary: Refresh authentication token
 *     description: Refresh the user's authentication token.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: The refresh token
 *             required:
 *               - refreshToken
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Invalid refresh token
 *       401:
 *         description: Authentication required
 * /api/v1/update-user/{id}:
 *   put:
 *     summary: Update a user
 *     description: Update user details by ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object 
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's name
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address
 *               sex:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *             required:
 *               - username
 *               - email
 *               - sex
 *               - address
 *               - phone
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *                type: object 
 *                properties:
 *                  username:
 *                    type: string
 *                    description: The user's name
 *                  email:
 *                    type: string
 *                    format: email
 *                    description: The user's email address
 *                  sex:
 *                    type: string
 *                  address:
 *                    type: string
 *                  phone:
 *                    type: string
 *       400:
 *         description: Invalid input
 *       404:
 *         description: User not found
 * /api/v1/page:
 *   get:
 *     summary: Retrieve a list of users
 *     description: Get a paginated list of users.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number to retrieve
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of users per page
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 * /api/v1/delete/{id}:
 *   security:
 *       - BearerAuth: []
 *   delete:
 *     summary: Delete a user
 *     description: Delete a user by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
