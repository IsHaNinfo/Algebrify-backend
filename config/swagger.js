import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Algebrify API Documentation',
            version: '1.0.0',
            description: 'API documentation for Algebrify application',
            contact: {
                name: 'API Support',
                email: 'support@algebrify.com'
            }
        },
        servers: [
            {
                url: 'http://localhost:8000',
                description: 'Development server'
            }
        ],
        components: {
            schemas: {
                User: {
                    type: 'object',
                    required: ['firstName', 'lastName', 'email', 'phoneNumber', 'password'],
                    properties: {
                        id: {
                            type: 'string',
                            format: 'uuid',
                            example: '123e4567-e89b-12d3-a456-426614174000'
                        },
                        firstName: {
                            type: 'string',
                            example: 'John'
                        },
                        lastName: {
                            type: 'string',
                            example: 'Doe'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            example: 'john.doe@example.com'
                        },
                        phoneNumber: {
                            type: 'string',
                            example: '+94771234567'
                        },
                        password: {
                            type: 'string',
                            format: 'password',
                            example: 'Password@123'
                        }
                    }
                },
                Error: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: false
                        },
                        statusCode: {
                            type: 'integer',
                            example: 400
                        },
                        message: {
                            type: 'string',
                            example: 'Error message'
                        }
                    }
                }
            },
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'JWT token for authentication'
                }
            },
            responses: {
                UnauthorizedError: {
                    description: 'Access token is missing or invalid',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: {
                                        type: 'number',
                                        example: 401
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Not authenticated or invalid token'
                                    }
                                }
                            }
                        }
                    }
                },
                ForbiddenError: {
                    description: 'Not authorized to access this resource',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: {
                                        type: 'number',
                                        example: 403
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Not authorized to access this resource'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: ['./routes/*.js'], // Path to the API routes
};

export const specs = swaggerJsdoc(options); 