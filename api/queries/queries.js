import tables from "../db/pg_tables.js";
export const registration = {
    signupcheck: `SELECT mail_id,password,name,registration_done from ${tables.registrations} where mail_id = $1`,
    signup: `INSERT INTO ${tables.registrations} (mail_id,password) VALUES ($1,$2)`,
    checkconfirmation: `SELECT mail_confirmation,expiry from ${tables.registrations} where mail_id = $1`,
    upd_mail_conformation: `update ${tables.registrations} set mail_confirmation=$1 where mail_id=$2`,
    verifymail: `SELECT mail_id,token from ${tables.registrations} where mail_id=$1 and token=$2`,
    signin: `SELECT mail_id,password,registration_done,expiry from ${tables.registrations} where mail_id = $1 and password = $2`,
    register: `update ${tables.registrations} set name=$1,company_name=$2,job_function=$3,country=$4,app_name=$5,app_id=$6,registration_done=$7 where mail_id=$8`,
    checkreg: `SELECT registration_done from ${tables.registrations} where mail_id = $1`,
    resendmail: `UPDATE ${tables.registrations} set token=$1,expiry=$2 where mail_id=$3`,
    insertmail: `INSERT INTO ${tables.registrations} (mail_id,name) VALUES ($1,$2)`
};

export const appData = {
    getapp_id: `SELECT app_id from ${tables.registrations} where mail_id = $1`,
    checkprompt: `SELECT prompt from ${tables.registrations} where mail_id = $1 `,
    insert_prompt: `update ${tables.registrations} set prompt = $1 where mail_id = $2`,
    getPrompt: `SELECT prompt from ${tables.registrations} where mail_id=$1`,
    insertjson: `update ${tables.registrations} set app_credentials = $1::jsonb where mail_id = $2`
}