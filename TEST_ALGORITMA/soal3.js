INPUT = ['xc', 'dz', 'bbb', 'dz']  
QUERY = ['bbb', 'ac', 'dz']  

function cekQuery(input, query){
    const total = {};

    for(const item of input){
        if(total[item]){
            total[item]++;
        } else {
            total[item] = 1;
        }
    }

    return query.map(item =>total[item] || 0);
}

console.log(cekQuery(INPUT, QUERY));