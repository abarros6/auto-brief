import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();
const openai = new OpenAI();

export async function generateSummary(decision) {
    let summary = await GPT(decision)
    //summary = reformatSummary(summary)
    console.log(summary)
    console.log(typeof(summary))
    return summary
}
//Turns plaintext of a judicial decision into a case brief with citations
async function GPT(plaintext){
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

    summary = summary.trim()

    summary = JSON.parse(summary)

    return summary
}


function reformatSummary(GPTSummary) {
    console.log(GPTSummary)
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
            if(GPTSummary[i+1] === "#" && GPTSummary[i+2] !== "#"){
                if(o === 0 && i >= 6)
                    o++;
            }
        }    
    }
    console.log(result);
    return result;
  }

function decidePrompt(){
    /*let prompt = `You will write a case brief for me.
    The case brief will be a summary of a case that 
    will be provided to you. The brief will be formatted 
    into sections as follows: 
    `;*/
    let prompt = `When given a written judicial decision, 
    write a case brief. Return it as a JSON object which
    is in the following format: {
        "brief": {
            "facts": "Facts of the case",
            "issues": "Legal issues at stake in the decision",
            "held": "The court's decision",
            "ratio": "The ratio of the decision",
            "reasoning": "The legal reasoning behind the decision",
            "policy": "Any rationale of public policy used 
            in the decision's legal reasoning"
        },
        "citations": {
            "facts": [fact1, fact2, ...],
            "issues": [issue1, issue2, ...],
            "held": [held1, held2, ...],
            "ratio": [ratio1, ratio2, ...],
            "reasoning": [reasoning1, reasoning2, ...],
            "policy": [policy1, policy2, ...]
        }
    } 
    For each array in citations, you will need to 
    fill it with strings that are exact quotations 
    from the provided decision. Each quotation should 
    relate to the corresponding section in the brief.
    Do at least one citation per array in citations. 
    Don't provide too many citations.
    You are writing this to be helpful to a practicing lawyer.
    `.trim();
    /*const promptList = [];
    promptList.push("1. Facts of the case");
    promptList.push("2. Legal issues at stake in the decision");
    promptList.push("3. The court's decision");
    promptList.push("4. The ratio of the decision");
    promptList.push("5. The legal reasoning behind the decision");
    promptList.push(`6. Any rationale of public policy used 
    in the decision's legal reasoning`);
    promptList.push("7. STYLE_OF_CAUSE | JUDGE | YEAR | COURT LEVEL")
    let finalPrompt = (`The second child should have a 
    `)
    
    let finalPrompt = (`Each section will conclude with a single #. 
    A # will only be used to denotate the END of a section.
    Only use more than one # when you have been explicitly instructed to. 
    When all seven sections have been completed, write a ##.
    You will then begin doing something else: you will
    write citations for each of the above generated sections.
    You will format the citations thusly: 
    "the number of the section that the citation correspond to" 
    : the exact quoted text without quotation marks. 
    And then a #
    Don't give too many citations
    `);*/

    /*for (let i = 0; i < promptList.length; i++) {
        prompt += promptList[i];
    }
    prompt += finalPrompt;*/

    return prompt
}