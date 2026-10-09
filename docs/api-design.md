QuickNotes REST API Design Specification

Base URL
`https://api.quicknotes.com/v1`

1. Endpoints

| Method | Path                    | Description                                                    | Success Status   |
| :----- | :---------------------- | :------------------------------------------------------------- | :--------------- |
| GET    | `/notes`                | Retrieve a paginated list of notes for the authenticated user. | `200 OK`         |
| GET    | `/notes/{id}`           | Retrieve a specific note by its unique ID.                     | `200 OK`         |
| POST   | `/notes`                | Create a new note.                                             | `201 Created`    |
| PUT    | `/notes/{id}`           | Fully update an existing note.                                 | `200 OK`         |
| DELETE | `/notes/{id}`           | Delete a note by its ID.                                       | `204 No Content` |
| GET    | `/notes?tag={tag_name}` | Filter and list notes associated with a specific tag.          | `200 OK`         |

2. Request & Response Examples

Creating a Note (`POST /notes`)
Request Header:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Content-Type: application/json
```
