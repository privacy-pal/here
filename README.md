# Here

## Privacy Requests with Privacy Pal

### Access

<details>
<summary>Here is an example of the privacy report for access request constructed using Privacy Pal.</summary>

```json
{
    "courses": {
        "SJvci9dYKlq65Z0kvPVe": {
            "assignments": [
                {
                    "dueDate": "2023-12-02T04:59:51.872Z",
                    "grade": null,
                    "maxScore": 5,
                    "name": "Assignment 1",
                    "optional": false,
                    "releaseDate": "2023-11-25T01:51:51.871Z"
                },
                {
                    "dueDate": "2023-12-02T04:59:51.872Z",
                    "grade": null,
                    "maxScore": 10,
                    "name": "Assignment 2",
                    "optional": true,
                    "releaseDate": "2023-11-25T01:51:51.871Z"
                },
                {
                    "dueDate": "2023-12-16T04:59:51.138Z",
                    "grade": null,
                    "maxScore": 10,
                    "name": "Assignment 3",
                    "optional": false,
                    "releaseDate": "2023-12-09T02:18:51.138Z"
                }
            ],
            "surveys": [
                {
                    "description": "Please select all the times that you will be available.",
                    "endTime": "2023-11-19T04:59:34.870Z",
                    "name": "Section Availability Survey",
                    "options": [
                        {
                            "capacity": 10,
                            "option": "Tuesday 12:00pm — 2:00pm"
                        },
                        {
                            "capacity": 2,
                            "option": "Friday 3:00pm — 5:00pm"
                        },
                        {
                            "capacity": 10,
                            "option": "Sunday 4:00pm — 6:00pm"
                        }
                    ],
                    "responses": null
                },
                {
                    "description": "Please select all the times that you will be available.",
                    "endTime": "2023-12-02T04:59:12.897Z",
                    "name": "Testing Data Access",
                    "options": [
                        {
                            "capacity": 15,
                            "option": "Tuesday 12:00pm — 2:00pm"
                        },
                        {
                            "capacity": 5,
                            "option": "Friday 3:00pm — 5:00pm"
                        },
                        {
                            "capacity": 15,
                            "option": "Sunday 4:00pm — 6:00pm"
                        }
                    ],
                    "responses": [
                        "Tuesday 12:00pm — 2:00pm",
                        "Sunday 4:00pm — 6:00pm"
                    ]
                }
            ],
            "swaps": [
                {
                    "assignmentID": "",
                    "handledBy": "",
                    "handledTime": "2023-11-25T03:08:35.482165Z",
                    "newSectionID": "sGUN7F3nUdRplIayYjRP",
                    "oldSectionID": "8UT5u1K9WEeYB5Liyoab",
                    "reason": "Testing",
                    "requestTime": "2023-11-25T03:08:35.482162Z",
                    "status": "approved"
                }
            ],
            "title": "Full Stack at Brown"
        }
    },
    "defaultSections": [
        {
            "endTime": "2001-01-01T19:00:00.000Z",
            "location": "CIT 400",
            "startTime": "2001-01-01T17:00:00.000Z"
        }
    ],
    "email": "tianren_dong@brown.edu",
    "isAdmin": true,
    "name": "Tianren Dong",
    "notifications": [
        {
            "ID": "0c989779-65cb-4892-afd1-0b7d2ee13908",
            "body": "Your have been assigned to a new section! Please check your schedule.",
            "timestamp": "2023-11-15T06:45:07.652971Z",
            "title": "cs0000: New Section Assignment",
            "type": "New Section Assignment"
        }
    ],
    "photoUrl": "https://lh3.googleusercontent.com/a/AAcHTteNTZOkniLFWHvPd_kAu-91FHfvWDIjgu7M4DNvTccU0W0=s96-c"
}
```

</details>


### Deletion

<details>
<summary>Here is an example of the data updated and deleted by fulfilling a deletion request using Privacy Pal.</summary>

```json
{
    "documentsToUpdate": [
        {
            "Locator": {
                "LocatorType": "document",
                "DataType": "survey",
                "CollectionPath": [
                    "courses",
                    "surveys"
                ],
                "DocIDs": [
                    "SJvci9dYKlq65Z0kvPVe",
                    "Hjesw0E3MNKTMQHd1r97"
                ],
                "Filters": null,
                "Collection": "",
                "Filter": null
            },
            "FieldsToUpdate": {
                "FirestoreUpdates": [
                    {
                        "Path": "responses.taN65OyOdmTm1KyIho1XsWDLKo32",
                        "FieldPath": null,
                        "Value": 0
                    }
                ],
                "MongoUpdates": null
            }
        },
        {
            "Locator": {
                "LocatorType": "document",
                "DataType": "survey",
                "CollectionPath": [
                    "courses",
                    "surveys"
                ],
                "DocIDs": [
                    "SJvci9dYKlq65Z0kvPVe",
                    "gqdBjSG7EBlZGdYJWRh0"
                ],
                "Filters": null,
                "Collection": "",
                "Filter": null
            },
            "FieldsToUpdate": {
                "FirestoreUpdates": [
                    {
                        "Path": "responses.taN65OyOdmTm1KyIho1XsWDLKo32",
                        "FieldPath": null,
                        "Value": 0
                    }
                ],
                "MongoUpdates": null
            }
        },
        {
            "Locator": {
                "LocatorType": "document",
                "DataType": "course",
                "CollectionPath": [
                    "courses"
                ],
                "DocIDs": [
                    "SJvci9dYKlq65Z0kvPVe"
                ],
                "Filters": null,
                "Collection": "",
                "Filter": null
            },
            "FieldsToUpdate": {
                "FirestoreUpdates": [
                    {
                        "Path": "students.taN65OyOdmTm1KyIho1XsWDLKo32",
                        "FieldPath": null,
                        "Value": 0
                    },
                    {
                        "Path": "permissions.taN65OyOdmTm1KyIho1XsWDLKo32",
                        "FieldPath": null,
                        "Value": 0
                    }
                ],
                "MongoUpdates": null
            }
        },
        {
            "Locator": {
                "LocatorType": "document",
                "DataType": "section",
                "CollectionPath": [
                    "courses",
                    "sections"
                ],
                "DocIDs": [
                    "SJvci9dYKlq65Z0kvPVe",
                    "sGUN7F3nUdRplIayYjRP"
                ],
                "Filters": null,
                "Collection": "",
                "Filter": null
            },
            "FieldsToUpdate": {
                "FirestoreUpdates": [
                    {
                        "Path": "numEnrolled",
                        "FieldPath": null,
                        "Value": {}
                    }
                ],
                "MongoUpdates": null
            }
        }
    ],
    "nodesToDelete": [
        {
            "LocatorType": "document",
            "DataType": "swap",
            "CollectionPath": [
                "courses",
                "swaps"
            ],
            "DocIDs": [
                "SJvci9dYKlq65Z0kvPVe",
                "1CPtuiEinRLbry5bYRQT"
            ],
            "Filters": null,
            "Collection": "",
            "Filter": null
        },
        {
            "LocatorType": "document",
            "DataType": "user",
            "CollectionPath": [
                "user_profiles"
            ],
            "DocIDs": [
                "taN65OyOdmTm1KyIho1XsWDLKo32"
            ],
            "Filters": null,
            "Collection": "",
            "Filter": null
        }
    ],
    "writeToDatabase": false
}
```

</details>

## Codebase

The frontend is a React (Next.js) app written in Typescript, while the backend is a REST API written in Go. We also use Firebase Authentication and Firestore.

## Set up

### Local development

1. Make sure you have Go and npm/yarn installed on your device
2. Make sure you have two secret files: `.env` and `.env.local` (see below for examples)
3. To download dependencies and start the backend service, run `make backend` from the repository root.
4. To download dependencies and launch the frontend dashboard, run `make frontend` from the repository root.

#### Secret file examples

You will can find the secrets [here](https://drive.google.com/drive/folders/1tOnm-TKXMWO8eJRhpFyfpbDcGy1ZM5r3?usp=share_link). Please contact Jenny or Tianren for access.

In the `backend/` folder, there should be a `.env` secret file with contents similar to:

```bash
# Allowed origins of requests
ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
# Allowed email domains for user accounts
ALLOWED_EMAIL_DOMAINS=brown.edu,gmail.com
# Whether cross-site cookies are allowed
IS_COOKIE_CROSS_SITE=false
# The port the backend is listening from
SERVER_PORT=8080
# The Firebase config JSON string
FIREBASE_CONFIG=[REDACTED]
```

In the `frontend/` folder, there should be a `.env.local` secret file with contents similar to:

```bash
# Firebase config
NEXT_PUBLIC_API_KEY=[REDACTED]
NEXT_PUBLIC_AUTH_DOMAIN=[REDACTED]
NEXT_PUBLIC_PROJECT_ID=[REDACTED]
NEXT_PUBLIC_STORAGE_BUCKET=[REDACTED]
NEXT_PUBLIC_MESSAGING_SENDER_ID=[REDACTED]
NEXT_PUBLIC_APP_ID=[REDACTED]
NEXT_PUBLIC_MEASUREMENT_ID=[REDACTED]

# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### Codespace

You will need to install the GitHub Codespaces VSCode extension (Extension ID: GitHub.codespaces).

A newly created codespace works out-of-the-box. It will contain all the secrets and environment variables needed for local development. The backend is configured to listen on localhost port 8000 and the frontend will start on localhost port 3000.

### Devcontainer

1. Obtain the secret files needed for local development.
2. Make sure the docker daemon is running.
3. In VSCode, install the Dev Containers extension (Extension ID: ms-vscode-remote.remote-containers).
4. Open the repository, and execute the command "Dev Containers: Reopen in Container". Tip: you can use the CMD+Shift+P shortcut to open the command palette to quickly execute the command.

## API

For a full list of the backend APIs, visit [API documentation](./API.md).