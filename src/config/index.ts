export default () => ({
  port: process.env.PORT,
  db_host: process.env.DB_HOST,
  db_port: process.env.DB_PORT,
  db_user: process.env.DB_USER,
  db_pass: process.env.DB_PASS,
  db_name: process.env.DB_NAME,
  secret_jwt: process.env.SECRET,
  expire_jwt: process.env.EXPIRE_JWT,
});
