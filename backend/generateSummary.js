import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();
const openai = new OpenAI();

export async function generateSummary(decision) {
    let summary = await GPT(decision)
    summary = reformatSummary(summary)
    return summary
}
//Turns plaintext of a judicial decision into a case brief with citations
async function GPT(plaintext){
    //TO-DO: FIGURE OUT THE SYSTEM PROMPT
    let summary
    const prompt = decidePrompt();
    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                "role": "system",
                "content": prompt
            },
            {   "role": "user", 
                "content": plaintext
            }
        ],
        max_tokens: 2000,
        temperature: 0.7,
    })
    summary = response.choices[0].message.content

    return summary
}


function reformatSummary(GPTSummary) {
    let result = [[],[]];
    let currentPart = "";
    let char = "";
    let o = 0;

    for (let i = 0; i < GPTSummary.length; i++) {
        char = GPTSummary[i];
        if (char !== "#"){
            currentPart += char;
        }
        else if (char === "#") {
            //console.log(currentPart);
            if(currentPart !== ""){
                result[o].push(currentPart);
            }
            currentPart = "";
            if(GPTSummary[i+1] === "#"){
                if(o === 0)
                    o++;
            }
        }    
    }
    //console.log(result);
    return result;
  }

function decidePrompt(){
    let prompt = `You will write a case brief for me.
    The case brief will be a summary of a case that 
    will be provided to you. The brief will be formatted 
    into sections as follows:\n
    `;
    const promptList = [];
    promptList.push("1. Facts of the case\n");
    promptList.push("2. Legal issues at stake in the decision\n");
    promptList.push("3. The court's decision\n");
    promptList.push("4. The ratio of the decision\n");
    promptList.push("5. The legal reasoning behind the decision\n");
    promptList.push(`6. Any rationale of public policy used 
    in the decision's legal reasoning\n`);
    let finalPrompt = (`Each section will conclude with a #. 
    When all six sections have been completed, write a ##\n
    You will then begin doing something else: you will
    write citations for each of the above generated sections.
    You will format the citations thusly:\n
    "the number of the section that the citation correspond to" 
    : the exact quoted text without quotation marks\n
    And then a #\n
    Don't give too many citations
    `);

    for (let i = 0; i < promptList.length; i++) {
        prompt += promptList[i];
        prompt += finalPrompt;
    }
    return prompt
}