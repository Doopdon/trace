

function keyVal(x){ return Object.keys(x).map(k=>{return {key:k,val:x[k]}})}

function genLoop(x,funct){ 
    let arr = []
    for(let i = 0; i < x; i++) arr.push(funct(i))
    return arr;
}

function randomBetween(a,b){
    var dif = Math.abs(b-a);
    var min = Math.min(a,b);
    return Math.round(Math.random()*dif)+min;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}