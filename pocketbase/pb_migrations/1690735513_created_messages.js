migrate((db) => {
  const collection = new Collection({
    "id": "7s2bsvpv8ttey9l",
    "created": "2023-07-30 16:45:13.378Z",
    "updated": "2023-07-30 16:45:13.378Z",
    "name": "messages",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "pjyjxwez",
        "name": "message",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("7s2bsvpv8ttey9l");

  return dao.deleteCollection(collection);
})
