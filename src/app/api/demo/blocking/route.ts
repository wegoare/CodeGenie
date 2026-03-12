
import {generateText} from "ai";
import {google} from '@ai-sdk/google'



export async function POST() {
    const respose =await generateText({
        model:google('gemini-2.5-flash'),

        prompt:"write a vegetarian lasagna recipe for 4 people"
    });
    return Response.json({respose});
};