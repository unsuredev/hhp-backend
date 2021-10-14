
import * as swaggerJsdoc from "swagger-jsdoc";
import * as path from "path";
const swaggerDefinition = {
    "openapi": "3.0.0",
    "info": {
        "title": "Smitch Security App-Server Dev",
        "description": "ss-cam-app-server REST API documentation for Android & iOS clients ",
        "version": "1.0.0",

    },
    "servers" : [ ],

};
const options = {
    swaggerDefinition,
    // Path to the API docs
    // apis: [path.resolve(__dirname, 'app.js')],
    apis: [path.resolve(__dirname, 'app.js'), path.resolve(__dirname, './controllers/*.js'),path.resolve(__dirname, './models/*.js')],
}



const swaggerDefinitionExample = {
    "openapi": "3.0.0",
    "info": {
        "title": "Smitch Security App-Server",
        "description": "ss-cam-app-server REST API documentation for Android & iOS clients ",
        "version": "1.0.0",

    },
    "servers" : [  ],
    "components" : {
        "parameters": {
            "ContentType": {
                "in": "header",
                "name": "Content-Type",
                "description": "The content type of the request headers",
                "schema": {
                    "type": "string"
                }
            },
            "ApiKey": {
                "in": "header",
                "name": "apiKey",
                "description": "The API key to authenticate the request",
                "required": true,
                "schema": {
                    "type": "string"
                }
            },
            "SecurityToken": {
                "in": "header",
                "name": "Security-Token",
                "description": "The security token to authenticate the request",
                "required": true,
                "schema": {
                    "type": "string"
                }
            }
        },
        "requestBodies": {
            "Url": {
                "description": "Data sent to the API to get the classification for an url",
                "required": true,
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": '#/components/schemas/Url'
                        }
                    }
                }
            }
        },
        "schemas" : {
            "InventoryItem" : {
                "required" : [ "id", "manufacturer", "name", "releaseDate" ],
                "type" : "object",
                "properties" : {
                    "id" : {
                        "type" : "string",
                        "format" : "uuid",
                        "example" : "d290f1ee-6c54-4b01-90e6-d701748f0851"
                    },
                    "name" : {
                        "type" : "string",
                        "example" : "Widget Adapter"
                    },
                    "releaseDate" : {
                        "type" : "string",
                        "format" : "int32",
                        "example" : "2016-08-29T09:12:33.001Z"
                    },
                    "manufacturer" : {
                        "$ref" : "#/components/schemas/Manufacturer"
                    }
                }
            },
            "Manufacturer" : {
                "required" : [ "name" ],
                "type" : "object",
                "properties" : {
                    "name" : {
                        "type" : "string",
                        "example" : "ACME Corporation"
                    },
                    "homePage" : {
                        "type" : "string",
                        "format" : "url",
                        "example" : "https://www.acme-corp.com"
                    },
                    "phone" : {
                        "type" : "string",
                        "example" : "408-867-5309"
                    }
                }
            },
            "Url": {
                "required" : [ "url" ],
                "type" : "object",
                "properties" : {
                    "url": {
                        "type": "string",
                        "example": "https://myapp.com"
                    },
                    "nodeId": {
                        "type": "string",
                        "example": "c104cf0f-f819-4b90-b24f-905554c8d885"
                    }
                }
            },
            "UrlClassification": {
                "required" : [ "URLs", "Folders", "Domains" ],
                "type": "object",
                "properties": {
                    "URLs": {
                        "type": "array",
                        "items": {
                            "example": {
                            }
                        }
                    },
                    "Folders": {
                        "type": "array",
                        "items": {
                            "example": {
                            }
                        }
                    },
                    "Domains": {
                        "type": "array",
                        "items": {
                            "example": {
                                "domain": "https://myapp.com",
                                "type": "sometype"
                            }
                        }
                    }
                }
            }
        },
        "examples": {
            "UrlClassification": {
                "summary": "Classification for an url",
                "description": "",
                "value": ""
            }
        }
    },
    "paths": {
    }
};