function generateCss(cssObj,parentSelector){
    let output = '';
    Object.keys(cssObj).forEach((key)=>{
        if(typeof cssObj[key] == 'object'){
            `${parentSelector + ' ' + key}:{
                ${generateCss(cssObj[key],key)}
            }`
        }

    })
}
var x = {
    '.thing':{
        display:'none',

        '.stuff':{
            display:'some',
        }
    }
}