const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUlNNFIwcEdoNjNwbnJFNVdTazBPeDI5UmhYZ051STBVTXFTODcvZGpubz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUkRVL2ZGSjJ0SUQvNStDSVhWZkZpVFRLdTlSZUpvSTV0UjJ5aW1GMit5OD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpQUw5WEt5enFVQmFMN0kyNGVsZ21LNWlreVdaTTZXSCtGRlduZGp0VWs0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ4S01KTjc5SkNHUEZPMFNjMjRDYUswQjYrVjF4UElTUDliTytGVjRva21VPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndBMXhmcXN4QlNNRmZOU1ZqUkh5N294VFRoM0xOWVJObzNqM3V3VTJkbGs9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNaQ1c3eVBGYnN6aWNqTFhobUkvSmhEK3JPV3YyQWhib2FRTjQ3dmVKbnM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0NQNkNlTTU2ZHBOcmxIRGdaVkNRVkVyanArMVdYS3RNa1lnNFF0MXAxZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmJtNlMycmhtZ0YrK3pWejlUMFYxQndQcFN3QndJYXdvVXd6dzRqc3B4OD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ilc0SFE0elJ3aU1lQmp0VUdnNzI3a1lZYk50NFRPRW1EcTN6cjRoNlhXdzgxcEdhRWN5Mk5IVGdrYzkwOFZGRlYwWDBCc0VNLzBzL1E2YzE0dVNGRER3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTYyLCJhZHZTZWNyZXRLZXkiOiJzYjBQK01FN3BlTXlBVFJrYmxQcXNuWE96c3hVTlRaVEtwRVF1N3V2Z3BjPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1Njc0MjczOTkyM0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI1ODlENjBGRkEyMTVBMUE0NjZEOURFMjE4QkU5QjE2OCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ3ODMyNDUxfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTY3NDI3Mzk5MjNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMjI4N0E3OTFCNzVGQUI4Njg3NjZDOEM0Q0NBMzdFOTQifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0NzgzMjQ1MX0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjU2NzQyNzM5OTIzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6Ijg3RjMwMzVDNEM3NTU1MTIwOEVDMDQ3QzI2NzNEQjM0In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDc4MzI0NjN9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IlZYRVhWRkhKIiwibWUiOnsiaWQiOiIyNTY3NDI3Mzk5MjM6N0BzLndoYXRzYXBwLm5ldCIsImxpZCI6Ijk1MzEwMDg5MDgwODQ4OjdAbGlkIiwibmFtZSI6IlVyYmFuIEthbHoifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0tmTzJQWUJFUENjdDhFR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImpOemxZOVZyR21OU1pPZmFwTWVweHBGVlBwYWtWNUZmNTg4TktHZGlsQ1E9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjJ5SHBiV3ptd1lMQXBFNWtONkQzMWd3anZod2NDUk44dEdoTktYSEZkTm1JSVF2RjN1T3QvS3dwODEzN2pidGgwSUJNSWtEelJFTnM1dTdaT3RHcUJBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiI3V3hlSGk2Yk9YdzF5a0hSSnY3dmtLbXNvSXUyVERNL0hnR3hVbVpOVy84VWJBQzBEbXduVVdralk2NEJLd3NGM0JtVzZYMmV1RXZ0bzZPTmVWNXRBdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1Njc0MjczOTkyMzo3QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQll6YzVXUFZheHBqVW1UbjJxVEhxY2FSVlQ2V3BGZVJYK2ZQRFNobllwUWsifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBZ0lCUT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0NzgzMjQ0NiwibGFzdFByb3BIYXNoIjoiMkc0QW11IiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFGTnkifQ==',
    PREFIXE: process.env.PREFIX || "*",
    OWNER_NAME: process.env.OWNER_NAME || "URBAN-KALZ",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 𝙱.𝙼.𝙱-𝚇𝙼𝙳 ke",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'B.M.B-TECH',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/hvi870.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',              
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

