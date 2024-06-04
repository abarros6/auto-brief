# To Do 

- allow user to upload a pdf to backend 
- get pdf on backend and convert to plaintext to submit to gpt api 
- get back gpt response in this format: 

brief = {
    facts: string,
    issues: string,
    held: string,
    ratio: string,
    reasoning: string,
    policy: string
}

//figuring it out 
citations = [[facts], [issues], [held], [ratio], [reasoning], [policy]]
- pasrse and display citation object in UI 