export async function generateSummary(decision) {
    summary = await GPT(await convertToPlaintext(decision))
    return summary
}
//Turns plaintext of a judicial decision into a case brief with citations
async function GPT(plaintext){
    //TO-DO: FIGURE OUT THE SYSTEM PROMPT
    const prompt = "Summarize the following:\n"
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
    await reformatSummary(summary);
    return summary
}

//Converts pdf into plaintext
async function convertToPlaintext(decision) {
    return plaintext
}

async function reformatSummary(summary){
    
    return summary
}

function splitText(text) {
    const result = [];
    let currentPart = "";
    let inDoubleHash = false;
  
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
  
      if (char === "#" && !inDoubleHash) {
        if (currentPart) {
          result.push(currentPart);
          currentPart = "";
        }
      } else if (char === "#" && inDoubleHash) {
        inDoubleHash = false;
      } else if (char === "#" && !currentPart) {
        inDoubleHash = true;
      } else {
        currentPart += char;
      }
    }
  
    if (currentPart) {
      result.push(currentPart);
    }
  
    return result;
  }