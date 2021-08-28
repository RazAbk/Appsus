export function LongTxt ({text}) {

    let maxSize = window.innerWidth;
    window.onresize = () => {
        maxSize = window.innerWidth;
    }

    let returnTxt;
    if(text.length > maxSize/50){
        returnTxt = text.substring(0, maxSize/50) + '...'; 
    } else{
        returnTxt = text;
    }

    return <p>{returnTxt}</p>
}