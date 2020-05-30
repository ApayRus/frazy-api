import admin from 'firebase-admin'
import firebaseConfig from './firebaseConfig'
import serviceAccount from './firebaseAdminKey.json'
// both of files: firebaseConfig and serviceAccount
// you can get from Google Firebase console
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: firebaseConfig.databaseURL,
        storageBucket: firebaseConfig.storageBucket
    })
}

/**
 * checks firebase auth token and returns true or false
 * if true - also rewrites req with user { userId, userName }
 */
export default async function checkAuth(req, res) {
    const {
        headers: { authtoken = '' }
    } = req
    if (!authtoken) {
        res.status(401).json({ success: false, message: 'not authenticated' })
    } else {
        const authObject = await admin.auth().verifyIdToken(authtoken)
        const { uid: userId, name: userName } = authObject
        req.user = { userId, userName }
    }
}

/**
 @example of admin.auth().verifyIdToken(authtoken) 
  {
        "name": "John Doe",
        "picture": "https://lh3.googleusercontent.com/a-/AAuE7mC20K5IOWkTRlJFxMhxn6sCQBlkw0ybGvVA_xxxxx",
        "iss": "https://securetoken.google.com/frazy-xxxxx",
        "aud": "frazy-xxxxx",
        "auth_time": 1589279511,
        "user_id": "jEMGyz4ZL9ZVnJTcdccpvokxxxxx",
        "sub": "jEMGyz4ZL9ZVnJTcdccpvokxxxxx",
        "iat": 1589386092,
        "exp": 1589389692,
        "email": "xxxxx@gmail.com",
        "email_verified": true,
        "firebase": {
                "identities": {
                        "google.com": [
                                "1178230472962768xxxxx"
                        ],
                        "email": [
                                "xxxxx@gmail.com"
                        ]
                },
                "sign_in_provider": "google.com"
        },
        "uid": "jEMGyz4ZL9ZVnJTcdccpvokxxxxx"
}
 */