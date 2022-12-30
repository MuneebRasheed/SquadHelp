const { google } = require('googleapis');
require('dotenv').config();

// Provide the required configuration
// const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
const calendarId = process.env.CALENDAR_ID;

// Google calendar API settings
const SCOPES = 'https://www.googleapis.com/auth/calendar';
const calendar = google.calendar({ version: "v3" });

const auth = new google.auth.JWT(
    "google-calender-test@calenderproject-370814.iam.gserviceaccount.com",
    null,
    "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCWlDUk0Pq7bCgU\nzVjRidvDwLRQAQn3q2WL9/pKnYrMmNsXxI6B7g6f4VhfDvge3sxrEsWfUunWAcmi\nFT5DatFfMnYPONyvREWXkRdRgtKtSIJwUYBEK/VONNWt2lT7Ad3kVbgWlzsVlFNR\nTgpASQ1mvxbWSIAzFzz+DHyk9LfX8aFtONlMio5Bk0cL3VjI7MKX9u5NvHLWrZWb\no1jLj8KWyv63WBIGPRI7jrUdWAtNt5QbqB1AO0Wf/D/V5+ITD8l4ZWuXjXaNibmA\n3QPd50D1pmVEHTHbyVyt+E9dTxAKTquhiUTZ1Be3FYJt7vOFRvt2PmEEsMQVmgdO\nprbvo+UZAgMBAAECggEAJVId+t5F6rqTk5ZSt3qK6tFiD3s2cHl9bWvcj+5MpsmS\n8ejgZkEtxEAqskLISgRwF3C7ZPH8rXNbeY341OZOduEPpFW0Usdh1T9bj3MUiujQ\nFY0JtLvNbKEJPfIBgoXzrGJ3gjfg58gPv3TPcx/4D5l4jEtDZQZTMmc/ZHYX89AY\n8hmqBN/SCuVBDSFIuN3NBsM+P4Nv2Ow2Vx4OSkMxmKniED1lo2qhOtWry2QZ2M2b\nW1ZHvE/yIzeUdY49MBf/N/fdPmuaAdV8X64h/De4q+LIOYOY6uUg5kBKPNk+BMaH\njNi8tBySNVjjmAWnoa9ovKac0b/i9O8li4wTT5XZ9QKBgQDQaJqp208PZWogEFV2\nwraBRtsmgpWDAwsx80LRZtkjK5/BPg4QxOR0bkFsxFDJnGh7ED7gtY7NDmNpdJdv\nA2f7uQb60SLcEmH49FZMgLQAbcVgpvBGOApqFwbXe/MdKBOsODV2X3Xq1ljpqT4z\n9X7ZjtFkbgnfY4p4E10ikxue9QKBgQC49u2js8Jx+faB0MF4QwPh9yfgWiKl87q8\nJap7ZxHep8+wOSgfOgFmaJ9DH0mw2COt6wp/53LG4y9lyik82htMf0Idom8WonQ0\n26a0DIH3FOth90rRqqf125y6kHUbvwZhZE2bpS47KHf2DzalauzqG3oPdbSdCzMu\nqB9zRyGPFQKBgQCxeGI8QoUQl0vIAiDFAQppC+2S3aBz8COYZY6AwxQk3wErjaxs\nmz3v5/POq14gURCnuy3QLMtt0tLU+nP6FOx3bxiCfZUx0nWbinXyr6aYtuFdbMsv\nAIndzb4FwYdFTNtzzGm6Y5AGaoFMeNJ/bI6YtQWagBnoINvJZLPqvVrIAQKBgQCO\nEv4OlHFzYvF6XYN+gNtmopY6uoGKv2BcTQJar50GThg14HF1KvUQWKScxlewQxWE\n7dmuzXVYWAF8SoDKgS4e4FFEuhRian6ga2ftPP5HcAYtxenuiwtgykPk+jk6Cs03\n2ffS6lpMjpU2qBDtluhMGrbzURJe3s99sx4VSjn40QKBgHFHBMj63GLb3KgtHfR/\nv4rKaAcBLgOeGTCLbqSsr/rCyi5/TK8l8Hb97kL3HYEkiNiHVicDJGsgZoS0uOy3\n105LqTLMyvkGc5Ch1OAGUSSDQAJexMtyfsDXnBQ9mlP09Rl9p6m/60KQkFUpLzmC\n24LQV5ekOl1Jj1U+m5aZfAA7\n-----END PRIVATE KEY-----\n",
    SCOPES
);

let token;
// auth.authorize(function (err, tokens) {
//     if (err) {
//         console.log(err);
//         return;
//     } else {
//         token = tokens;
//         console.log("Successfully connected!", tokens);
//         let tok = new google.auth.OAuth2(
//             "291742874982-e0p9c4jb6okot9jfp4jgjhlrm6bdbsai.apps.googleusercontent.com",
//             "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",
//             "http://localhost:3000"
//         )

//         tok.getToken(token).then(res => {
//             console.log("res", res);
//         }).catch(err => {
//             console.log("err", err);
//         })
//     }
// });



// Your TIMEOFFSET Offset
const TIMEOFFSET = '+05:30';

// Get date-time string for calender
const dateTimeForCalander = () => {

    let date = new Date();

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`;
    }
    let day = date.getDate();
    if (day < 10) {
        day = `0${day}`;
    }
    let hour = date.getHours();
    if (hour < 10) {
        hour = `0${hour}`;
    }
    let minute = date.getMinutes();
    if (minute < 10) {
        minute = `0${minute}`;
    }

    let newDateTime = `${year}-${month}-${day}T${hour}:${minute}:00.000${TIMEOFFSET}`;

    let event = new Date(Date.parse(newDateTime));

    let startDate = event;
    // Delay in end time is 1
    let endDate = new Date(new Date(startDate).setHours(startDate.getHours() + 1));

    return {
        'start': startDate,
        'end': endDate
    }
};

// Insert new event to Google Calendar
const insertEvent = async (event) => {


    try {
        let response = await calendar.events.insert({
            auth: auth,
            calendarId: calendarId,
            resource: event
        });

        if (response['status'] == 200 && response['statusText'] === 'OK') {
            return 1;
        } else {
            return 0;
        }
    } catch (error) {
        console.log(`Error at insertEvent --> ${error}`);
        return 0;
    }
};
// console.log(dateTimeForCalander());

let dateTime = dateTimeForCalander();

// Event for Google Calendar
let event = {
    'summary': `This is the  NEW summary .`,
    'description': `This is the description.`,
    'start': {
        'dateTime': dateTime['start'],
        'timeZone': 'Asia/Kolkata'
    },
    'end': {
        'dateTime': dateTime['end'],
        'timeZone': 'Asia/Kolkata'
    }
    , 'colorId': 7
};

// insertEvent(event)
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

// Get all the events between two dates
const getEvents = async (dateTimeStart, dateTimeEnd) => {

    try {
        let response = await calendar.events.list({
            auth: auth,
            calendarId: calendarId,
            timeMin: dateTimeStart,
            timeMax: dateTimeEnd,
            timeZone: 'Asia/Kolkata'
        });

        let items = response['data']['items'];
        return items;
    } catch (error) {
        console.log(`Error at getEvents --> ${error}`);
        return 0;
    }
};

let start = '2022-12-25T00:00:00.000Z';
let end = '2022-12-27T00:00:00.000Z';

getEvents(start, end)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });

// Delete an event from eventID
const deleteEvent = async (eventId) => {

    try {
        let response = await calendar.events.delete({
            auth: auth,
            calendarId: calendarId,
            eventId: eventId
        });

        if (response.data === '') {
            return 1;
        } else {
            return 0;
        }
    } catch (error) {
        console.log(`Error at deleteEvent --> ${error}`);
        return 0;
    }
};

// let eventId = '63s0nb31kb794f62ih1pglgkoo';

// deleteEvent(eventId)
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     });