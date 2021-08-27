export function LongTxt ({text, maxSize}) {

    let returnTxt;
    if(text.length > maxSize){
        returnTxt = text.substring(0, maxSize) + '...'; 
    } else{
        returnTxt = text;
    }

    return <p>{returnTxt}</p>
}