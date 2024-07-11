function randomInt(min, max){
    const data = [];
    for(let i = 0; i < max; i++){
        data.push(Math.floor(Math.random() * (max-min+1) + min))
    }

    return data;
}

export default randomInt