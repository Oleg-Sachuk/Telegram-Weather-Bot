const { Router } = require('express');
const config = require('config');
const { google } = require('googleapis');
const router = Router();

router.post('/getsheet', async (req, res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets'
    })

    const client = await auth.getClient();

    const googleSheets = google.sheets({ version: "v4", auth: client });

    const sheetkey = '1z2vQWtrA33j1nPqshefrjzas4yjgYYtC_oIIqtG00Nk';
    const metadata = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId: sheetkey
    })

    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId: sheetkey,
        range: "!A:B",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [
                [`${req.body.id}`,`${req.body.place}`]
            ]
        }
    })

    res.send(metadata.data)
})

module.exports = router;