define({ "api": [
  {
    "group": "Item",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/lists/:userId/:listId/:itemId/edit",
    "title": "api to get the single list item .",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "owner",
            "description": "<p>user id of the list owner. (request params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>of the particular list. (request params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemId",
            "description": "<p>of the item to be fetched (request params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>of the user (query param)(required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n            \"error\": false,\n            \"message\": \"item fetched\",\n            \"status\": 200,\n            \"data\": {\n                \"fileName\": \"\",\n                \"fileLocation\": \"D:/Bhaskar/dummy\",\n                \"isOpen\": false,\n                \"isDone\": false,\n                \"subitemsList\": [],\n                \"itemId\": \"MpZ4V28Yw\",\n                \"title\": \"new item edited\",\n                \"description\": \"item title has been modified\",\n                \"dueDate\": \"2019-06-13T15:20:00.000Z\"\n            }\n        }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     \"error\": true,\n     \"message\": \"Route not found in the application || Internal serever error\",\n     \"status\": \"500 || 404\",\n     \"data\" : \"null\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/todoList.js",
    "groupTitle": "Item",
    "name": "GetApiV1ListsUseridListidItemidEdit"
  },
  {
    "group": "Item",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/lists/:userId/:listId/add",
    "title": "api to add the new list item .",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "owner",
            "description": "<p>user id of the list owner. (request params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>of the particular list in which item to be added. (request params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>of the item to be added (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>of the user (query param)(required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"added item to list new list sucessfully\",\n           \"status\": 200,\n           \"data\": {\n               \"title\": \"new list\",\n               \"item\": {\n                   \"fileName\": \"\",\n                   \"fileLocation\": \"\",\n                   \"isOpen\": false,\n                   \"isDone\": false,\n                   \"itemId\": \"MpZ4V28Yw\",\n                   \"title\": \"new item\",\n                   \"subitemsList\": []\n               }\n           }\n       }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     \"error\": true,\n     \"message\": \"Route not found in the application || Internal serever error\",\n     \"status\": \"500 || 404\",\n     \"data\" : \"null\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/todoList.js",
    "groupTitle": "Item",
    "name": "PostApiV1ListsUseridListidAdd"
  },
  {
    "group": "Item",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/lists/:userId/:listId/:itemId/delete",
    "title": "api to delete the list item .",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "owner",
            "description": "<p>user id of the list owner. (request params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>of the particular list. (request params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemId",
            "description": "<p>of the item to be deleted (request params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>of the user (query param)(required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n            \"error\": false,\n            \"message\": \"deleted item from the list new list sucessfully\",\n            \"status\": 200,\n            \"data\": {\n                \"title\": \"new list\",\n                \"owner\": \"sXYShmutU\",\n                \"itemsList\": [],\n            }\n        }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     \"error\": true,\n     \"message\": \"Route not found in the application || Internal serever error\",\n     \"status\": \"500 || 404\",\n     \"data\" : \"null\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/todoList.js",
    "groupTitle": "Item",
    "name": "PostApiV1ListsUseridListidItemidDelete"
  },
  {
    "group": "Item",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/lists/:userId/:listId/:itemId/markclose",
    "title": "api to mark the list item close.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "owner",
            "description": "<p>user id of the list owner. (request params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>of the particular list. (request params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemId",
            "description": "<p>of the item to be marked close (request params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>of the user (query param)(required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n            \"error\": false,\n            \"message\": \"item marked closed successfully\",\n            \"status\": 200,\n            \"data\": {\n                \"fileName\": \"\",\n                \"fileLocation\": \"\",\n                \"isOpen\": false,\n                \"isDone\": false,\n                \"subitemsList\": [],\n                \"itemId\": \"3pFDhjMAo\",\n                \"title\": \"new item\",\n                \"startDate\": null,\n                \"endDate\": null\n            }\n        }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     \"error\": true,\n     \"message\": \"Route not found in the application || Internal serever error\",\n     \"status\": \"500 || 404\",\n     \"data\" : \"null\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/todoList.js",
    "groupTitle": "Item",
    "name": "PostApiV1ListsUseridListidItemidMarkclose"
  },
  {
    "group": "Item",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/lists/:userId/:listId/:itemId/markdone",
    "title": "api to mark the list item done.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "owner",
            "description": "<p>user id of the list owner. (request params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>of the particular list. (request params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemId",
            "description": "<p>of the item to be marked done (request params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>of the user (query param)(required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n            \"error\": false,\n            \"message\": \"item marked done successfully\",\n            \"status\": 200,\n            \"data\": {\n                \"fileName\": \"\",\n                \"fileLocation\": \"\",\n                \"isOpen\": false,\n                \"isDone\": true,\n                \"subitemsList\": [],\n                \"itemId\": \"3pFDhjMAo\",\n                \"title\": \"new item\",\n                \"startDate\": null,\n                \"endDate\": \"2019-06-13T15:34:51.000Z\"\n            }\n        }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     \"error\": true,\n     \"message\": \"Route not found in the application || Internal serever error\",\n     \"status\": \"500 || 404\",\n     \"data\" : \"null\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/todoList.js",
    "groupTitle": "Item",
    "name": "PostApiV1ListsUseridListidItemidMarkdone"
  },
  {
    "group": "Item",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/lists/:userId/:listId/:itemId/markopen",
    "title": "api to mark the list item open.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "owner",
            "description": "<p>user id of the list owner. (request params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>of the particular list. (request params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemId",
            "description": "<p>of the item to be marked open (request params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>of the user (query param)(required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n            \"error\": false,\n            \"message\": \"item marked open successfully\",\n            \"status\": 200,\n            \"data\": {\n                \"fileName\": \"\",\n                \"fileLocation\": \"\",\n                \"isOpen\": true,\n                \"isDone\": false,\n                \"subitemsList\": [],\n                \"itemId\": \"3pFDhjMAo\",\n                \"title\": \"new item\",\n                \"startDate\": \"2019-06-13T15:31:48.000Z\"\n            }\n        }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     \"error\": true,\n     \"message\": \"Route not found in the application || Internal serever error\",\n     \"status\": \"500 || 404\",\n     \"data\" : \"null\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/todoList.js",
    "groupTitle": "Item",
    "name": "PostApiV1ListsUseridListidItemidMarkopen"
  },
  {
    "group": "Item",
    "version": "1.0.0",
    "type": "put",
    "url": "/api/v1/lists/:userId/:listId/:itemId/edit",
    "title": "api to edit the existing item .",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "owner",
            "description": "<p>user id of the list owner. (request params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>of the particular list in which item to be added. (request params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemId",
            "description": "<p>of the item to be edited (request params)(required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>of the item to be edited (body params) (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "description",
            "description": "<p>of the item to be edited (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "date",
            "optional": false,
            "field": "due",
            "description": "<p>date of the item to be edited (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "file",
            "description": "<p>name for of the item to be edited  (body params) (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>of the user (query param)(required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n            \"error\": false,\n            \"message\": \"item edited successfully \",\n            \"status\": 200,\n            \"data\": {\n                \"fileLocation\": \"D:/Bhaskar/dummy\",\n                \"isOpen\": false,\n                \"isDone\": false,\n                \"subitemsList\": [],\n                \"itemId\": \"MpZ4V28Yw\",\n                \"title\": \"new item edited\",\n                \"description\": \"item title has been modified\",\n                \"dueDate\": \"2019-06-13T15:20:00.000Z\"\n            }\n        }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     \"error\": true,\n     \"message\": \"Route not found in the application || Internal serever error\",\n     \"status\": \"500 || 404\",\n     \"data\" : \"null\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/todoList.js",
    "groupTitle": "Item",
    "name": "PutApiV1ListsUseridListidItemidEdit"
  },
  {
    "group": "List",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/lists/:userId/all",
    "title": "api to get all the list of the user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "owner",
            "description": "<p>user id of the list owner. (request params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>of the user (query param)(required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n        \"error\": false,\n        \"message\": \"lists fetched successfully\",\n        \"status\": 200,\n        \"data\": [\n            {\n                \"title\": \"wewe\",\n                \"id\": \"j2xLOYKJF\",\n                \"owner\": \"sXYShmutU\",\n                \"createdOn\": \"2019-06-13T03:26:27.000Z\",\n                \"itemsList\": []\n            },\n            {\n                \"title\": \"new list\",\n                \"id\": \"ZTZRRd4Tn\",\n                \"owner\": \"sXYShmutU\",\n                \"createdOn\": \"2019-06-13T14:47:56.000Z\",\n                \"itemsList\": []\n            }\n        ]\n        }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     \"error\": true,\n     \"message\": \"Route not found in the application || Internal serever error\",\n     \"status\": \"500 || 404\",\n     \"data\" : \"null\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/todoList.js",
    "groupTitle": "List",
    "name": "GetApiV1ListsUseridAll"
  },
  {
    "group": "List",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/lists/:userId/:listId/delete",
    "title": "api to delete the list.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "owner",
            "description": "<p>user id of the list owner. (request params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>of the particular list to be deleted. (request params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>of the user (query param)(required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n            \"error\": false,\n            \"message\": \"deleted list wewe sucessfully\",\n            \"status\": 200,\n            \"data\": {\n                \"title\": \"wewe\",\n                \"id\": \"j2xLOYKJF\",\n                \"owner\": \"sXYShmutU\",\n                \"createdOn\": \"2019-06-13T03:26:27.000Z\",\n                \"itemsList\": []\n            }\n        }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     \"error\": true,\n     \"message\": \"Route not found in the application || Internal serever error\",\n     \"status\": \"500 || 404\",\n     \"data\" : \"null\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/todoList.js",
    "groupTitle": "List",
    "name": "GetApiV1ListsUseridListidDelete"
  },
  {
    "group": "List",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/lists/:userId/:listId/edit",
    "title": "api to get the list information.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "owner",
            "description": "<p>user id of the list owner. (request params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>of the particular list to be fetched. (request params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>of the user (query param)(required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n            \"error\": false,\n            \"message\": \"list found\",\n            \"status\": 200,\n            \"data\": {\n                \"title\": \"wewe\",\n                \"id\": \"j2xLOYKJF\",\n                \"owner\": \"sXYShmutU\",\n                \"itemsList\": []\n            }\n        }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     \"error\": true,\n     \"message\": \"Route not found in the application || Internal serever error\",\n     \"status\": \"500 || 404\",\n     \"data\" : \"null\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/todoList.js",
    "groupTitle": "List",
    "name": "GetApiV1ListsUseridListidEdit"
  },
  {
    "group": "List",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/lists/create",
    "title": "api to create a new list.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>for the list. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "owner",
            "description": "<p>user id of the list owner. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>of the user (query param)(required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n            \"error\": false,\n            \"message\": \"new list created successfully !\",\n            \"status\": 200,\n            \"data\": {\n                \"title\": \"new list\",\n                \"id\": \"ZTZRRd4Tn\",\n                \"owner\": \"sXYShmutU\",\n                \"createdOn\": \"2019-06-13T14:47:56.000Z\",\n                \"itemsList\": []\n            }\n        }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     \"error\": true,\n     \"message\": \"Route not found in the application || Internal serever error\",\n     \"status\": \"500 || 404\",\n     \"data\" : \"null\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/todoList.js",
    "groupTitle": "List",
    "name": "PostApiV1ListsCreate"
  },
  {
    "group": "SubItem",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/lists/:userId/:listId/:itemId/add",
    "title": "api to add new sub item to item.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "owner",
            "description": "<p>user id of the list owner. (request params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>of the particular list. (request params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemId",
            "description": "<p>of the particular item (request params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>of the sub item to be added (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>of the user (query param)(required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n            \"error\": false,\n            \"message\": \"added sub item to items list new item sucessfully\",\n            \"status\": 200,\n            \"data\": {\n                \"title\": \"new item\",\n                \"subItem\": {\n                    \"subItemId\": \"x6jCU5SgP\",\n                    \"title\": \"new sub item\"\n                }\n            }\n        }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     \"error\": true,\n     \"message\": \"Route not found in the application || Internal serever error\",\n     \"status\": \"500 || 404\",\n     \"data\" : \"null\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/todoList.js",
    "groupTitle": "SubItem",
    "name": "PostApiV1ListsUseridListidItemidAdd"
  },
  {
    "group": "SubItem",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/lists/:userId/:listId/:itemId/:subItemId/delete",
    "title": "api to delete existing sub item from item.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "owner",
            "description": "<p>user id of the list owner. (request params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>of the particular list. (request params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemId",
            "description": "<p>of the particular item (request params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "subItemId",
            "description": "<p>of the sub item to be deleted (request params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>of the user (query param)(required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n            \"error\": false,\n            \"message\": \"deleted sub item from the items list new item sucessfully\",\n            \"status\": 200,\n            \"data\": {\n                \"title\": \"new item\",\n                \"details\": {\n                    \"title\": \"new list\",\n                    \"owner\": \"sXYShmutU\",\n                    \"itemsList\": [\n                        {\n                            \"fileName\": \"\",\n                            \"fileLocation\": \"\",\n                            \"isOpen\": false,\n                            \"isDone\": true,\n                            \"subitemsList\": [\n                                {\n                                    \"isDone\": false,\n                                    \"subItemId\": \"x6jCU5SgP\",\n                                    \"title\": \"new sub item\"\n                                },\n                                {\n                                    \"isDone\": false,\n                                    \"subItemId\": \"anvggPl8q\",\n                                    \"title\": \"new sub item2\"\n                                },\n                                {\n                                    \"isDone\": false,\n                                    \"subItemId\": \"VZV36iwm1\",\n                                    \"title\": \"new sub item ffgg\"\n                                }\n                            ],\n                            \"itemId\": \"3pFDhjMAo\",\n                            \"title\": \"new item\",\n                            \"startDate\": null,\n                            \"endDate\": \"2019-06-13T15:34:51.000Z\"\n                        }\n                    ],\n                }\n            }\n        }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     \"error\": true,\n     \"message\": \"Route not found in the application || Internal serever error\",\n     \"status\": \"500 || 404\",\n     \"data\" : \"null\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/todoList.js",
    "groupTitle": "SubItem",
    "name": "PostApiV1ListsUseridListidItemidSubitemidDelete"
  },
  {
    "group": "SubItem",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/lists/:userId/:listId/:itemId/:subItemId/markclose",
    "title": "api to mark sub item close to item.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "owner",
            "description": "<p>user id of the list owner. (request params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>of the particular list. (request params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemId",
            "description": "<p>of the particular item (request params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "subItemId",
            "description": "<p>of the sub item to be marked close (request params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>of the user (query param)(required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n            \"error\": false,\n            \"message\": \"Mark sub item close successful\",\n            \"status\": 200,\n            \"data\": {\n                \"isDone\": false,\n                \"subItemId\": \"x6jCU5SgP\",\n                \"title\": \"new sub item\"\n            }\n        }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     \"error\": true,\n     \"message\": \"Route not found in the application || Internal serever error\",\n     \"status\": \"500 || 404\",\n     \"data\" : \"null\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/todoList.js",
    "groupTitle": "SubItem",
    "name": "PostApiV1ListsUseridListidItemidSubitemidMarkclose"
  },
  {
    "group": "SubItem",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/lists/:userId/:listId/:itemId/:subItemId/markdone",
    "title": "api to mark sub item done to item.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "owner",
            "description": "<p>user id of the list owner. (request params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>of the particular list. (request params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemId",
            "description": "<p>of the particular item (request params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "subItemId",
            "description": "<p>of the sub item to be marked done (request params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "isDone",
            "description": "<p>selected sub item (body params)(required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>of the user (query param)(required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n            \"error\": false,\n            \"message\": \"Mark sub item done successful\",\n            \"status\": 200,\n            \"data\": {\n                \"isDone\": true,\n                \"subItemId\": \"x6jCU5SgP\",\n                \"title\": \"new sub item\"\n            }\n        }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     \"error\": true,\n     \"message\": \"Route not found in the application || Internal serever error\",\n     \"status\": \"500 || 404\",\n     \"data\" : \"null\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/todoList.js",
    "groupTitle": "SubItem",
    "name": "PostApiV1ListsUseridListidItemidSubitemidMarkdone"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/:userId/activities",
    "title": "api for user to get activities.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>of the user. (request params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>of the user (query param)(required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n        \"error\": false,\n        \"message\": \"activities fetched\",\n        \"status\": 200,\n        \"data\": [\n            {\n                \"activityId\": \"JjOb6ZA9W\",\n                \"userId\": \"sXYShmutU\",\n                \"userName\": \"avi pawar\",\n                \"message\": \"has created new list <b>wewe</b>\",\n                \"activityType\": \"createlist\",\n                \"undoActivity\": \"deletelist\",\n                \"listData\": {\n                    \"title\": \"wewe\",\n                    \"id\": \"j2xLOYKJF\",\n                    \"owner\": \"sXYShmutU\",\n                    \"createdOn\": \"2019-06-13T03:26:27.000Z\",\n                    \"itemsList\": [],\n                },\n                \"itemData\": null,\n                \"subItemData\": null,\n                \"updatedOn\": \"2019-06-13T03:26:28.000Z\",\n            }\n        }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     \"error\": true,\n     \"message\": \"Route not found in the application || Internal serever error\",\n     \"status\": \"500 || 404\",\n     \"data\" : \"null\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "GetApiV1UsersUseridActivities"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/:userId/friends",
    "title": "api for user to get friends.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>of the user. (request params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>of the user (query param)(required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n            \"error\": false,\n            \"message\": \"friends fetched\",\n            \"status\": 200,\n            \"data\": [\n                {\n                    \"userId\": \"Vtj4t4Xy5\",\n                    \"userName\": \"bhasu pawar\",\n                    \"countryName\": \"Wallis and Futuna\",\n                    \"createdOn\": \"2019-06-13T03:23:20.000Z\"\n                }\n            ]\n        }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     \"error\": true,\n     \"message\": \"Route not found in the application || Internal serever error\",\n     \"status\": \"500 || 404\",\n     \"data\" : \"null\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "GetApiV1UsersUseridFriends"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/:userId/notfriends",
    "title": "api for user to find friends in the system.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>of the user. (request params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>of the user (query param)(required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n          \"error\": false,\n          \"message\": \"users fetched\",\n          \"status\": 200,\n          \"data\": [\n              {\n                  \"userId\": \"Vtj4t4Xy5\",\n                  \"fullName\": \"bhasu pawar\",\n                  \"mobileNumber\": 4564564564,\n                  \"countryName\": \"Wallis and Futuna\",\n                  \"email\": \"bhasu@123.com\",\n                  \"friends\": [\n                      {\n                          \"userId\": \"sXYShmutU\",\n                          \"userName\": \"avi pawar\",\n                          \"countryName\": \"Bermuda\",\n                          \"createdOn\": \"2019-06-13T03:23:20.000Z\"\n                      }\n                  ],\n                  \"requests\": []\n              }\n          ]\n      }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     \"error\": true,\n     \"message\": \"Route not found in the application || Internal serever error\",\n     \"status\": \"500 || 404\",\n     \"data\" : \"null\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "GetApiV1UsersUseridNotfriends"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/:userId/profile",
    "title": "api for user to get profile.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>of the user. (request params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>of the user (query param)(required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"user fetched\",\n           \"status\": 200,\n           \"data\": {\n               \"userId\": \"sXYShmutU\",\n               \"fullName\": \"avi pawar\",\n               \"mobileNumber\": 3456345656,\n               \"countryName\": \"Bermuda\",\n               \"countryPhoneCode\": \"+1-441\",\n               \"email\": \"avi@123.com\"\n           }\n       }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     \"error\": true,\n     \"message\": \"Route not found in the application || Internal serever error\",\n     \"status\": \"500 || 404\",\n     \"data\" : \"null\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "GetApiV1UsersUseridProfile"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/:userId/requests",
    "title": "api for user to get requests.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>of the user. (request params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>of the user (query param)(required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n            \"error\": false,\n            \"message\": \"requests fetched\",\n            \"status\": 200,\n            \"data\": [\n                {\n                    \"userId\": \"Vtj4t4Xy5\",\n                    \"userName\": \"bhaskar pawar\",\n                    \"countryName\": \"India\",\n                    \"createdOn\": \"2019-06-13T13:58:10.000Z\"\n                }\n            ]\n        }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     \"error\": true,\n     \"message\": \"Route not found in the application || Internal serever error\",\n     \"status\": \"500 || 404\",\n     \"data\" : \"null\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "GetApiV1UsersUseridRequests"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/login",
    "title": "api for user login.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n            \"error\": false,\n            \"message\": \"login successful\",\n            \"status\": 200,\n            \"data\": {\n                \"authToken\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6ImRsTTBhV3BaSyIsImlhdCI6MTU1OTE3MjUyNjU5MCwiZXhwIjoxNTU5MjU4OTI2LCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJpc3N1ZVRyYWNraW5nVG9vbCIsImRhdGEiOnsidXNlcklkIjoiY1FnS3J6eDhVIiwiZmlyc3ROYW1lIjoiYmhhc2thciIsImxhc3ROYW1lIjoicGF3YXIiLCJjb3VudHJ5TmFtZSI6IkJhbmdsYWRlc2giLCJjb3VudHJ5Q29kZSI6IkJEIiwiY291bnRyeVBob25lQ29kZSI6Ijg4MCIsImVtYWlsIjoiYmhhc2thckBleGFtcGxlLmNvbSIsInNlY3JldEtleSI6IlRoaXNpc215YXBwbGljYXRpb25zZWNyZXRrZXlzdG9yZWRpbkRCc290aGF0bm9ib2R5Q2FuR3Vlc3MifX0.mTHPf_-zohaLEY0Hcuc9vwZqFLuvDEifANEnsKNUPQo\",\n                \"userDetails\": {\n                    \"userId\": \"cQgKrzx8U\",\n                    \"firstName\": \"bhaskar\",\n                    \"lastName\": \"pawar\",\n                    \"countryName\": \"Bangladesh\",\n                    \"countryCode\": \"BD\",\n                    \"countryPhoneCode\": \"880\",\n                    \"email\": \"bhaskar@example.com\"\n                }\n            }\n        }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     \"error\": true,\n     \"message\": \"Route not found in the application || Internal serever error\",\n     \"status\": \"500 || 404\",\n     \"data\" : \"null\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersLogin"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/logout",
    "title": "api for user to log out of the application.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n        \"error\": false,\n        \"message\": \"Logged Out Successfully\",\n        \"status\": 200,\n        \"data\": null\n    }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     \"error\": true,\n     \"message\": \"Route not found in the application || Internal serever error\",\n     \"status\": \"500 || 404\",\n     \"data\" : \"null\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersLogout"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/requests/accept",
    "title": "api for user to accept request of the user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "senderId",
            "description": "<p>of the sender. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "senderName",
            "description": "<p>of the sender. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "senderCountry",
            "description": "<p>of the sender. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "receiverId",
            "description": "<p>of the sender. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "receiverName",
            "description": "<p>of the sender. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "receiverCountry",
            "description": "<p>of the sender. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>of the user (query param)(required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n            \"error\": false,\n            \"message\": \"request has been accepted\",\n            \"status\": 200,\n            \"data\": {\n                \"sender\": {\n                    \"userId\": \"Vtj4t4Xy5\",\n                    \"userName\": \"bhasu Pawar\",\n                    \"countryName\": \"India\",\n                    \"createdOn\": \"2019-06-13T14:23:05Z\"\n                },\n                \"receiver\": {\n                    \"userId\": \"sXYShmutU\",\n                    \"userName\": \"avi pawar\",\n                    \"countryName\": \"India\",\n                    \"createdOn\": \"2019-06-13T14:23:05Z\"\n                }\n            }\n        }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     \"error\": true,\n     \"message\": \"Route not found in the application || Internal serever error\",\n     \"status\": \"500 || 404\",\n     \"data\" : \"null\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersRequestsAccept"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/reset",
    "title": "api for user to send email for reset password.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>new password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n          \"error\": false,\n          \"message\": \"password reset successful !\",\n          \"status\": 200,\n          \"data\": {\n              \"userId\": \"JKSgbe9-f\",\n              \"email\": \"bhaskar26.pawar@gmail.com\"\n          }\n      }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     \"error\": true,\n     \"message\": \"Route not found in the application || Internal serever error\",\n     \"status\": \"500 || 404\",\n     \"data\" : \"null\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersReset"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/sendemail",
    "title": "api for user to send email for reset password.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "ClientUrl",
            "description": "<p>. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n            \"error\": false,\n            \"message\": \"reset password link sent successfully ! check your inbox\",\n            \"status\": 200,\n            \"data\": {\n                \"accepted\": [\n                    \"bhaskar26.pawar@gmail.com\"\n                ],\n                \"rejected\": [],\n                \"envelopeTime\": 1039,\n                \"messageTime\": 1017,\n                \"messageSize\": 389,\n                \"response\": \"250 2.0.0 OK  1559344676 x18sm8075150pfo.8 - gsmtp\",\n                \"envelope\": {\n                    \"from\": \"bhaskar90.pawar@gmail.com\",\n                    \"to\": [\n                        \"bhaskar26.pawar@gmail.com\"\n                    ]\n                },\n                \"messageId\": \"<0114b13d-0f87-af2c-cc5c-32aabe6bf476@gmail.com>\"\n            }\n        }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     \"error\": true,\n     \"message\": \"Route not found in the application || Internal serever error\",\n     \"status\": \"500 || 404\",\n     \"data\" : \"null\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersSendemail"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/signup",
    "title": "api for user signup.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "firstName",
            "description": "<p>of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "lastName",
            "description": "<p>of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "countryName",
            "description": "<p>countryName of the user (body Param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "countryCode",
            "description": "<p>countryCode of the user (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "countryPhoneCode",
            "description": "<p>of the user (body param) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Signed up successfully !\",\n    \"status\": 200,\n    \"data\": {\n        \"userId\": \"cQgKrzx8U\",\n        \"firstName\": \"bhaskar\",\n        \"lastName\": \"pawar\",\n        \"countryName\": \"Bangladesh\",\n        \"countryCode\": \"BD\",\n        \"countryPhoneCode\": \"880\",\n        \"email\": \"bhaskar@example.com\",\n        \"createdOn\": \"2019-05-29T17:16:41.000Z\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     \"error\": true,\n     \"message\": \"Route not found in the application || Internal serever error\",\n     \"status\": \"500 || 404\",\n     \"data\" : \"null\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersSignup"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/:userId/activities/:activityId/delete",
    "title": "api for user to delete activity.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>of the user. (request params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "activityId",
            "description": "<p>of the user. (request params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>of the user (query param)(required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n            \"error\": false,\n            \"message\": \"deleted activity successfully\",\n            \"status\": 200,\n            \"data\": {\n                \"activityId\": \"JjOb6ZA9W\",\n                \"userId\": \"sXYShmutU\",\n                \"userName\": \"avi pawar\",\n                \"message\": \"has created new list <b>wewe</b>\",\n                \"activityType\": \"createlist\",\n                \"undoActivity\": \"deletelist\",\n                \"listData\": {\n                    \"title\": \"wewe\",\n                    \"id\": \"j2xLOYKJF\",\n                    \"owner\": \"sXYShmutU\",\n                    \"createdOn\": \"2019-06-13T03:26:27.000Z\",\n                    \"itemsList\": [],\n                },\n                \"itemData\": null,\n                \"subItemData\": null,\n                \"updatedOn\": \"2019-06-13T03:26:28.000Z\",\n            }\n        }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     \"error\": true,\n     \"message\": \"Route not found in the application || Internal serever error\",\n     \"status\": \"500 || 404\",\n     \"data\" : \"null\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersUseridActivitiesActivityidDelete"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/:userId/requests/delete",
    "title": "api for user to cancel request of the user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>of the user. (request params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>of the user (query param)(required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n      \"error\": false,\n      \"message\": \"request cancelled successfully\",\n      \"status\": 200,\n      \"data\": {\n          \"requests\": []\n      }\n  }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersUseridRequestsDelete"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/:userId/sendrequest",
    "title": "api for user to send request to another user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>of the user whom you sent the request. (request param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "countryName",
            "description": "<p>country of the user who sent the request (body param)(required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userName",
            "description": "<p>of the user who sent the request (body param)(rquired)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>of the user (query param)(required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n        \"error\": false,\n        \"message\": \"request has been sent successfully\",\n        \"status\": 200,\n        \"data\": {\n            \"userId\": \"Vtj4t4Xy5\",\n            \"userName\": \"bhaskar pawar\",\n            \"countryName\": \"India\",\n            \"createdOn\": \"2019-06-13T13:58:10Z\"\n        }\n    }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     \"error\": true,\n     \"message\": \"Route not found in the application || Internal serever error\",\n     \"status\": \"500 || 404\",\n     \"data\" : \"null\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersUseridSendrequest"
  }
] });
