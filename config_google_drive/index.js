
const fs = require('fs');
const async = require('async');
const readline = require('readline');
const { google } = require('googleapis');
const streamifier = require('streamifier');
// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive'];///-----
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.

const targetFolderId = "137Hu3iqZDSNBgItr56n4vLDLWzATlklr";


exports.authorize = (req, res, credentials, callback) => new Promise ((resolve, reject) => {
    const { client_secret, client_id, redirect_uris } = credentials.web;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile('./token.json', async (err, token) => {
        if (err) return getAccessToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        const location = await callback(req, res, oAuth2Client);
        resolve(location);
    })
})
    
   

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error retrieving access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}
/////
// Target forlder for the Uploaded file.

exports.uploadFile = (req, res, auth) => new Promise ((resolve, reject) => {
    

        const drive = google.drive({ version: 'v3', auth });

    //upload one file

    var fileMetadata = {
        'name': req.file.filename,
        parents: [targetFolderId]
    };
    var media = {
        mimeType: req.file.minetype,
        body: streamifier.createReadStream(req.file.buffer)
    };
    drive.files.create({

        resource: fileMetadata,
        media: media,
        fields: 'id'
    }, function (err, file) {
        if (err) {
            // Handle error
            console.error(err);
        } else {
            var permissions = [
                {
                    'type': 'anyone',
                    'role': 'reader'
                }]
            async.eachSeries(permissions, function (permission, permissionCallback) {
                drive.permissions.create({
                    resource: permission,
                    fileId: file.data.id,
                    fields: 'id',
                }, function (err, res) {
                    if (err) {
                        // Handle error...
                        console.error(err);
                        permissionCallback(err);
                        //reject(err);
                    } else {

                        permissionCallback();
                    }
                });
            }, function (err) {
                if (err) {
                    // Handle error
                    console.error(err);
                } else {
                    // All permissions inserted
                    //console.log(`\n${file.data.id}`);
                    resolve ('https://drive.google.com/uc?export=view&' + `id=${file.data.id}`);
                }
            });

        }
    });

    
    
})