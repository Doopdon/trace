const layoutBase = (params,layoutComp)=>{
    let atr = {};
    if(params){
        if(params.imgUrl) atr.style = "background-image: url('"+params.imgUrl+"');"
    }
    return div(atr,layoutComp)
}