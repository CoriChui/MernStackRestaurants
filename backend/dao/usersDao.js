import mongodb from 'mongodb'
const ObjectId = mongodb.ObjectID

let users
export default class UsersDao {
  static async injectDB(conn) {
    if (users) {
      return
    }
    try {
      const db = conn.db()
      users = await db.collection("users")
      users.createIndex({ "email": 1 }, { unique: true })
      db.command({
        collMod: "users",
        validator: {
          $jsonSchema: {
            bsonType: "object",
            required: ["name", "email", "password", "enabled"],
            properties: {
              name: {
                bsonType: "string",
                description: "must be a string and is required"
              },
              email: {
                bsonType: "string",
                description: "must be a string and is required"
              },
              password: {
                bsonType: "string",
                description: "must be a string and is required"
              },
              enabled: {
                bsonType: "bool",
                description: "must be a boolean and is required"
              },
              confirmEmailToken: {
                bsonType: "string",
                description: "must be a string if the field exists"
              },
              confirmEmailExpire: {
                description: "must be a long if the field exists"
              }
            }
          },
          $and: [
            {
              "email": { $type: "string", $regex: /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/ }
            }
          ]
        }
      })
    } catch (e) {
      console.error(`Unable to establish collection handles in userDao: ${e}`)
    }
  }

  static async insert(name, email, password, token, expiresIn) {
    return await users.insertOne({
      name: name,
      email: email,
      password: password,
      enabled: false,
      confirmEmailToken: token,
      confirmEmailExpire: expiresIn
    })
  }

  static async delete(email) {
    return await users.deleteOne(
      { email: email }
    )
  }

  static async login(email) {
    return await users.findOne(
      { email: email },
      { projection: { email: true, password: true, name: true } }
    )
  }

  static async confirm(token) {
    return await users.findOneAndUpdate(
      {
        $and: [
          { confirmEmailToken: token },
          { confirmEmailExpire: { $gt: Date.now() } }
        ]
      },
      { $set: { "enabled": true } },
      { returnOriginal: false }
    )
  }
}