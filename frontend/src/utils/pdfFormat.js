const spotPara = (text) => {
    // Define the regular expression to find square brackets containing numbers
    const regex = /\[(\d+)\]/g;
  
    // Use the replace method to inject line breaks and wrap the matched content in <h3> tags
    const transformedString = text.replace(regex, match => {
        return `<br><h3>${match}</h3>`;
    });
  
    return transformedString;
}

function removeConsecutiveSpaces(inputString) {
    return inputString.replace(/\s{2,}/g, ' ');
}

const funcs = {
    spotPara,
    removeConsecutiveSpaces
}

export default funcs