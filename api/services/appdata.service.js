import pool from '../db/connection.js'
import { ApiError } from '../utils/index.js'
import gplay from "google-play-scraper";
import { appData } from '../queries/queries.js';
import openai from '../db/Openai.js';

class appdataService {

    appdataservice = async (body, user) => {
        try {
            const mail_id = user.mail_id;
            console.log(user, "---------------->gmail")
            const resp = await pool.query(appData.getapp_id, [mail_id])
            if (resp?.rows?.length) {
                console.log(resp.rows[0].app_id, "-------------------->appid")

                const result = await gplay.app({
                    appId: resp?.rows[0]?.app_id
                });

                const description = result?.description
                const title = result?.title
                const developer_mail = result?.developerEmail
                const checkprompt = await pool.query(appData.checkprompt, [mail_id])
                if (checkprompt?.rows[0]?.prompt === null) {
                    const chatCompletion = await openai.chat.completions.create({
                        messages: [{ role: 'user', content: `please summarize the company description in 60 words: ${description}` }],
                        model: 'gpt-3.5-turbo',
                    });

                    const chat_resp = chatCompletion?.choices[0]?.message?.content
                    const prompt = `As the online reputation manager for '${title}', your role involves crafting engaging responses to Play Store reviews. ${chat_resp} Your responses should be concise, personalized, and reflect the brand's tone. Keep each response under 350 characters. After each reply, I'll offer feedback, and occasionally, a Username for added context. Remember to include '${developer_mail}' in case of any concerns. Now, let's craft genuine responses to user reviews, ensuring they are both meaningful and reflective of the app's ethos.`
                    const insert_data = await pool.query(appData.insert_prompt, [prompt, mail_id])
                }

                const result1 = await gplay.reviews({
                    appId: resp?.rows[0]?.app_id,
                    sort: gplay.sort.HELPFULNESS,
                    lang: "en",
                    country: "us",
                    paginate: true,
                    num: 5,
                    nextPaginationToken: null // you can omit this parameter
                })
                return { appData: result, reviews: result1 }
            }

        } catch (error) {
            console.error('error @ appdata service', error);
            throw new ApiError(500, error)
        }
    }

    replyservice = async (body, user) => {
        try {

            const mail_id = user.mail_id;
            const prom = await pool.query(appData.getPrompt, [mail_id])
            console.log(body);
            if (prom?.rows[0]?.prompt !== null) {
                const chatCompletion = await openai.chat.completions.create({
                    messages: [{ role: 'user', content: `${prom} username: ${body?.userName} review: ${body?.review}` }],
                    model: 'gpt-3.5-turbo',
                });

                const reply = chatCompletion?.choices[0]?.message?.content
                return reply
            }
            else {
                throw new ApiError(400, 'Prompt Not Exist')
            }

        } catch (error) {
            console.error('error @ reply service', error);
            throw new ApiError(500, error)
        }
    }

    integrationservice = async (body, user) => {
        console.log(body);
        try {
            const mail_id = user.mail_id;
            const result = await pool.query(appData.insertjson, [body, mail_id]);
            console.log("Query result:", result);
            return 1;
        } catch (error) {
            console.error('Error @ IntegrationService', error);
            throw error; // Rethrow the error to propagate it further
        }
    }

}

export default new appdataService()
