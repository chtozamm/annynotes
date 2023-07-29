migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("j65m4bof828lqyv")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hcsjov38",
    "name": "message",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("j65m4bof828lqyv")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hcsjov38",
    "name": "message",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
