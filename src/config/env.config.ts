export const envConfig = {
  server: {
    enviroment: process.env.NODE_ENV,
    port: process.env.PORT,
  },
  database: {
    db_url: process.env.DB_URL,
  },
  mail_details: {
    email_id: process.env.EMAIL_ID,
    password: process.env.EMAIL_PASSWORD,
  },
};
