
window.onload = function() {
  // Build a system
  let url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  let options = {
  "swaggerDoc": {
    "openapi": "3.0.0",
    "paths": {
      "/user": {
        "get": {
          "operationId": "UserController_findAll",
          "parameters": [],
          "responses": {
            "200": {
              "description": "List of users."
            }
          },
          "summary": "Get all users",
          "tags": [
            "User"
          ]
        },
        "post": {
          "operationId": "UserController_create",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateUserDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "User created successfully."
            },
            "400": {
              "description": "Bad request."
            }
          },
          "summary": "Create a new user",
          "tags": [
            "User"
          ]
        }
      },
      "/user/{id}": {
        "get": {
          "operationId": "UserController_findOne",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "User found."
            },
            "404": {
              "description": "User not found."
            }
          },
          "summary": "Get user by id",
          "tags": [
            "User"
          ]
        },
        "patch": {
          "operationId": "UserController_update",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateUserDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "User updated successfully."
            },
            "400": {
              "description": "Don't has any information"
            },
            "404": {
              "description": "User not found."
            }
          },
          "summary": "Update user by id",
          "tags": [
            "User"
          ]
        },
        "delete": {
          "operationId": "UserController_remove",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "User deleted successfully."
            },
            "404": {
              "description": "User not found."
            }
          },
          "summary": "Delete user by id",
          "tags": [
            "User"
          ]
        }
      },
      "/user/semester/{semester}": {
        "get": {
          "operationId": "UserController_findBySemester",
          "parameters": [
            {
              "name": "semester",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Users found."
            },
            "404": {
              "description": "Users not found."
            }
          },
          "summary": "Get all users by semester",
          "tags": [
            "User"
          ]
        }
      },
      "/user/image/{id}": {
        "get": {
          "operationId": "UserController_getImage",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Image found."
            },
            "404": {
              "description": "User not found."
            }
          },
          "summary": "Get image by user id",
          "tags": [
            "User"
          ]
        }
      },
      "/user/self/{id}": {
        "patch": {
          "operationId": "UserController_updateSelf",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateUserSelfDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "User updated successfully."
            },
            "403": {
              "description": "Id provided isn't the one used in the token."
            },
            "404": {
              "description": "User not found."
            }
          },
          "summary": "Update self user with id",
          "tags": [
            "User"
          ]
        }
      },
      "/user/img/{id}": {
        "patch": {
          "operationId": "UserController_updateImage",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Image updated successfully."
            },
            "403": {
              "description": "Id provided isn't the one used in the token."
            },
            "404": {
              "description": "User not found."
            }
          },
          "summary": "Update image by user id",
          "tags": [
            "User"
          ]
        }
      },
      "/material": {
        "get": {
          "operationId": "MaterialController_getAll",
          "parameters": [],
          "responses": {
            "200": {
              "description": "List of materials."
            }
          },
          "summary": "Get all materials",
          "tags": [
            "Material"
          ]
        },
        "post": {
          "operationId": "MaterialController_create",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateMaterial"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Material created successfully."
            },
            "400": {
              "description": "Bad request."
            }
          },
          "summary": "Create a new material",
          "tags": [
            "Material"
          ]
        }
      },
      "/material/{id}": {
        "get": {
          "operationId": "MaterialController_getOne",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Material found."
            },
            "404": {
              "description": "Material not found."
            }
          },
          "summary": "Get material by id",
          "tags": [
            "Material"
          ]
        },
        "patch": {
          "operationId": "MaterialController_update",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateMaterial"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Material updated successfully."
            },
            "400": {
              "description": "Require at leats one information."
            },
            "403": {
              "description": "UserId in the material isn't the one used in the token."
            },
            "404": {
              "description": "Material not found."
            }
          },
          "summary": "Update material by id",
          "tags": [
            "Material"
          ]
        },
        "delete": {
          "operationId": "MaterialController_delete",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Material deleted successfully."
            },
            "404": {
              "description": "Material not found."
            }
          },
          "summary": "Delete material by id",
          "tags": [
            "Material"
          ]
        }
      },
      "/material/sprint/{id}": {
        "get": {
          "operationId": "MaterialController_getOneBySprint",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Sprint found."
            },
            "404": {
              "description": "Sprint not found."
            }
          },
          "summary": "Get all materials of the sprint by id",
          "tags": [
            "Material"
          ]
        }
      },
      "/repository": {
        "get": {
          "operationId": "RepositoryController_getAll",
          "parameters": [],
          "responses": {
            "200": {
              "description": "List of repositories."
            }
          },
          "summary": "Get all repositories",
          "tags": [
            "Repository"
          ]
        },
        "post": {
          "operationId": "RepositoryController_create",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateRepository"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Repository created successfully."
            },
            "400": {
              "description": "Bad request."
            }
          },
          "summary": "Create a new repository",
          "tags": [
            "Repository"
          ]
        }
      },
      "/repository/{id}": {
        "get": {
          "operationId": "RepositoryController_getOne",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Repository found."
            },
            "404": {
              "description": "Repository not found."
            }
          },
          "summary": "Get Repository by id",
          "tags": [
            "Repository"
          ]
        },
        "patch": {
          "operationId": "RepositoryController_update",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateRepository"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Repository updated successfully."
            },
            "403": {
              "description": "UserId in the repository isn't the one used in the token."
            },
            "404": {
              "description": "Repository not found."
            }
          },
          "summary": "Update Repository by id",
          "tags": [
            "Repository"
          ]
        },
        "delete": {
          "operationId": "RepositoryController_delete",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Repository deleted successfully."
            },
            "404": {
              "description": "Repository not found."
            }
          },
          "summary": "Delete Repository by id",
          "tags": [
            "Repository"
          ]
        }
      },
      "/repository/user/{id}": {
        "get": {
          "operationId": "RepositoryController_getAllByUser",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Repositories found."
            },
            "404": {
              "description": "Repositories not found."
            }
          },
          "summary": "Get all repository by user id",
          "tags": [
            "Repository"
          ]
        }
      },
      "/repository/sprint/{id}": {
        "get": {
          "operationId": "RepositoryController_getAllBySprint",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Repositories found."
            },
            "404": {
              "description": "Repositories not found."
            }
          },
          "summary": "Get all repository by sprint id",
          "tags": [
            "Repository"
          ]
        }
      },
      "/calendar": {
        "get": {
          "operationId": "CalendarController_getAll",
          "parameters": [],
          "responses": {
            "200": {
              "description": "List of calendar events."
            }
          },
          "summary": "Get all callendar events",
          "tags": [
            "Calendar"
          ]
        },
        "post": {
          "operationId": "CalendarController_create",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateCalendarEventDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Calendar event created successfully."
            },
            "400": {
              "description": "Bad request."
            }
          },
          "summary": "Create a new calendar event",
          "tags": [
            "Calendar"
          ]
        }
      },
      "/calendar/{id}": {
        "get": {
          "operationId": "CalendarController_getOne",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Calendar event found."
            },
            "404": {
              "description": "Calendar event not found."
            }
          },
          "summary": "Get calendar event by id",
          "tags": [
            "Calendar"
          ]
        },
        "patch": {
          "operationId": "CalendarController_update",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateCalendarEventDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Calendar event updated successfully."
            },
            "404": {
              "description": "Calendar event not found."
            }
          },
          "summary": "Update calendar event by id",
          "tags": [
            "Calendar"
          ]
        },
        "delete": {
          "operationId": "CalendarController_delete",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Calendar event deleted successfully."
            },
            "404": {
              "description": "Calendar event not found."
            }
          },
          "summary": "Delete calendar event by id",
          "tags": [
            "Calendar"
          ]
        }
      },
      "/sprint": {
        "get": {
          "operationId": "SprintController_findAll",
          "parameters": [],
          "responses": {
            "200": {
              "description": "List of the sprints"
            }
          },
          "summary": "Get all sprints",
          "tags": [
            "Sprint"
          ]
        },
        "post": {
          "operationId": "SprintController_create",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateSprintDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Sprint created successfully."
            },
            "400": {
              "description": "Bad request."
            }
          },
          "summary": "Create a new sprint",
          "tags": [
            "Sprint"
          ]
        }
      },
      "/sprint/{id}": {
        "get": {
          "operationId": "SprintController_findOne",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Sprint found"
            },
            "403": {
              "description": "Sprint not found"
            }
          },
          "summary": "Get sprint by id",
          "tags": [
            "Sprint"
          ]
        },
        "patch": {
          "operationId": "SprintController_update",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateSprintDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Sprint updated successfully."
            },
            "404": {
              "description": "Sprint not found."
            }
          },
          "summary": "Update sprint by id",
          "tags": [
            "Sprint"
          ]
        },
        "delete": {
          "operationId": "SprintController_remove",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Sprint deleted successfully."
            },
            "404": {
              "description": "Sprint not found."
            }
          },
          "summary": "Delete sprint by id",
          "tags": [
            "Sprint"
          ]
        }
      },
      "/sprint/readme/{id}": {
        "get": {
          "operationId": "SprintController_getFile",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Readme found"
            },
            "403": {
              "description": "Readme not found"
            }
          },
          "summary": "Get readme by sprint id",
          "tags": [
            "Sprint"
          ]
        },
        "post": {
          "operationId": "SprintController_uploadFile",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "201": {
              "description": "Readme created successfully."
            },
            "400": {
              "description": "Bad request."
            }
          },
          "summary": "Create a new readme by sprint id",
          "tags": [
            "Sprint"
          ]
        },
        "patch": {
          "operationId": "SprintController_uploadFileEdit",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateSprintDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Readme updated successfully."
            },
            "400": {
              "description": "Bad resquest."
            },
            "404": {
              "description": "Sprint not found."
            }
          },
          "summary": "Update readme by sprint id",
          "tags": [
            "Sprint"
          ]
        }
      },
      "/login": {
        "post": {
          "operationId": "AuthController_login",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/LoginDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Login credentials"
            },
            "403": {
              "description": "Invalid data"
            }
          },
          "summary": "Login",
          "tags": [
            "Auth"
          ]
        }
      },
      "/login/changePassword": {
        "post": {
          "operationId": "AuthController_changePassword",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ChangePasswordDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Login credentials"
            },
            "400": {
              "description": "User dosen't exists"
            },
            "403": {
              "description": "Invalid data"
            }
          },
          "summary": "Change password",
          "tags": [
            "Auth"
          ]
        }
      }
    },
    "info": {
      "title": "Moodle grupo de estudos",
      "description": "The API description",
      "version": "1.0",
      "contact": {}
    },
    "tags": [],
    "servers": [],
    "components": {
      "schemas": {
        "CreateUserDto": {
          "type": "object",
          "properties": {
            "email": {
              "type": "string",
              "description": "User email",
              "example": "user@email.com"
            },
            "username": {
              "type": "string",
              "description": "Username",
              "example": "Name Lastname"
            },
            "password": {
              "type": "string",
              "description": "Password",
              "example": "@Ages2025"
            },
            "role": {
              "type": "string",
              "description": "Role",
              "example": "admin"
            },
            "registration": {
              "type": "string",
              "description": "Registration",
              "example": "12345678"
            },
            "semester": {
              "type": "string",
              "description": "Semester",
              "example": "2025/1"
            },
            "githubLink": {
              "type": "string",
              "description": "Github link",
              "example": "https://github.com/Grupo-de-Estudos-AGES-Creatus"
            }
          },
          "required": [
            "email",
            "username",
            "password",
            "role",
            "registration",
            "semester",
            "githubLink"
          ]
        },
        "UpdateUserDto": {
          "type": "object",
          "properties": {
            "username": {
              "type": "string",
              "description": "Username",
              "example": "Name Lastname"
            },
            "email": {
              "type": "string",
              "description": "User email",
              "example": "user@email.com"
            },
            "password": {
              "type": "string",
              "description": "Password",
              "example": "@Ages2025"
            },
            "registration": {
              "type": "string",
              "description": "Registration",
              "example": "12345678"
            },
            "role": {
              "type": "string",
              "description": "Role",
              "example": "admin"
            },
            "semester": {
              "type": "string",
              "description": "Semester",
              "example": "2025/1"
            },
            "githubLink": {
              "type": "string",
              "description": "Github link",
              "example": "https://github.com/Grupo-de-Estudos-AGES-Creatus"
            }
          },
          "required": [
            "username",
            "email",
            "password",
            "registration",
            "role",
            "semester",
            "githubLink"
          ]
        },
        "UpdateUserSelfDto": {
          "type": "object",
          "properties": {
            "githubLink": {
              "type": "string",
              "description": "Github link",
              "example": "https://github.com/Grupo-de-Estudos-AGES-Creatus"
            }
          },
          "required": [
            "githubLink"
          ]
        },
        "CreateMaterial": {
          "type": "object",
          "properties": {
            "sprintId": {
              "type": "number",
              "description": "The ID of the sprint the material belongs to",
              "example": 2
            },
            "userId": {
              "type": "number",
              "description": "The ID of the user that posted the material",
              "example": 2
            },
            "title": {
              "type": "string",
              "description": "Material title",
              "example": "NestJs documentation"
            },
            "text": {
              "type": "string",
              "description": "Material description",
              "example": "https://docs.nestjs.com"
            }
          },
          "required": [
            "sprintId",
            "userId",
            "title",
            "text"
          ]
        },
        "UpdateMaterial": {
          "type": "object",
          "properties": {
            "title": {
              "type": "string",
              "description": "Update material title",
              "example": "NestJS documentation"
            },
            "text": {
              "type": "string",
              "description": "Update material description",
              "example": "https://docs.nestjs.com/"
            }
          }
        },
        "CreateRepository": {
          "type": "object",
          "properties": {
            "userId": {
              "type": "number",
              "description": "The ID of the user the repository belongs to",
              "example": 2
            },
            "sprintId": {
              "type": "number",
              "description": "The ID of the sprint the repository belongs to",
              "example": 2
            },
            "link": {
              "type": "string",
              "description": "Repository link",
              "example": "https://github.com/Grupo-de-Estudos-AGES-Creatus"
            }
          },
          "required": [
            "userId",
            "sprintId",
            "link"
          ]
        },
        "UpdateRepository": {
          "type": "object",
          "properties": {
            "link": {
              "type": "string",
              "description": "Repository link",
              "example": "https://github.com/Grupo-de-Estudos-AGES-Creatus"
            }
          }
        },
        "CreateCalendarEventDto": {
          "type": "object",
          "properties": {
            "title": {
              "type": "string",
              "description": "Calendar event title",
              "example": "Sprint 1 end date"
            },
            "description": {
              "type": "string",
              "description": "Calendar event description",
              "example": "End date to submit your project!"
            },
            "startDate": {
              "format": "date-time",
              "type": "string",
              "description": "Start date of the calendar event",
              "example": "2025-05-26T19:29:13.111Z"
            },
            "endDate": {
              "format": "date-time",
              "type": "string",
              "description": "End date of the calendar event",
              "example": "2025-05-26T19:29:13.111Z"
            }
          },
          "required": [
            "title",
            "description",
            "startDate",
            "endDate"
          ]
        },
        "UpdateCalendarEventDto": {
          "type": "object",
          "properties": {
            "title": {
              "type": "string",
              "description": "Calendar event title"
            },
            "description": {
              "type": "string",
              "description": "Calendar event description"
            },
            "startDate": {
              "format": "date-time",
              "type": "string",
              "description": "Start date of the calendar event"
            },
            "endDate": {
              "format": "date-time",
              "type": "string",
              "description": "End date of the calendar event"
            }
          }
        },
        "CreateSprintDto": {
          "type": "object",
          "properties": {
            "title": {
              "type": "string",
              "description": "Sprint title",
              "example": "Sprint 1 - Calculadora"
            },
            "isLocked": {
              "type": "boolean",
              "description": "Sprint is locked?",
              "example": "true"
            },
            "description": {
              "type": "string",
              "description": "Brief sprint description",
              "example": "In this sprint a calculator will be developed"
            },
            "semester": {
              "type": "string",
              "description": "Semester",
              "example": "2025/1"
            },
            "linkGithub": {
              "type": "string",
              "description": "Github link",
              "example": "https://github.com/Grupo-de-Estudos-AGES-Creatus/projeto-final-backend"
            }
          },
          "required": [
            "title",
            "isLocked",
            "description",
            "semester",
            "linkGithub"
          ]
        },
        "UpdateSprintDto": {
          "type": "object",
          "properties": {
            "title": {
              "type": "string",
              "description": "Sprint title",
              "example": "Sprint 1 - Calculadora"
            },
            "isLocked": {
              "type": "boolean",
              "description": "Sprint is locked?",
              "example": "false"
            },
            "description": {
              "type": "string",
              "description": "Brief sprint description",
              "example": "In this sprint a calculator will be developed"
            },
            "semester": {
              "type": "string",
              "description": "Semester",
              "example": "2025/1"
            },
            "linkGithub": {
              "type": "string",
              "description": "Github link",
              "example": "https://github.com/Grupo-de-Estudos-AGES-Creatus/projeto-final-backend"
            }
          },
          "required": [
            "title",
            "isLocked",
            "description",
            "semester",
            "linkGithub"
          ]
        },
        "LoginDto": {
          "type": "object",
          "properties": {
            "login": {
              "type": "string",
              "description": "Login, registration or email",
              "example": "ages@gmail.com ou 12345678"
            },
            "password": {
              "type": "string",
              "description": "Password",
              "example": "@Ages2025"
            }
          },
          "required": [
            "login",
            "password"
          ]
        },
        "ChangePasswordDto": {
          "type": "object",
          "properties": {
            "password": {
              "type": "string",
              "description": "New password",
              "example": "@Ages2025"
            }
          },
          "required": [
            "password"
          ]
        }
      }
    }
  },
  "customOptions": {}
};
  url = options.swaggerUrl || url
  let urls = options.swaggerUrls
  let customOptions = options.customOptions
  let spec1 = options.swaggerDoc
  let swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (let attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  let ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.initOAuth) {
    ui.initOAuth(customOptions.initOAuth)
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }
  
  window.ui = ui
}
