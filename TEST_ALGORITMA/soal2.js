const sentence = "Saya sangat senang mengerjakan soal algoritma"

function longest(data){
    let text_longest = '';
    const text = data.split(" ");
    text.forEach(text => {
        if(text.length > text_longest.length){
            text_longest = text
        }
    })
    return text_longest;
}

console.log(longest(sentence));