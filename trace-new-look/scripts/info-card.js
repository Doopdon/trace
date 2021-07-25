function infoCardComp(atrInput,inner){
    inner = inner ?? atrInput;
    let atr = {class:'info-card'}
    atr ?? Object.assign(atrInput,atr);
    return div(atr,[
        // div({class:'ic-blur'},[]),
        inner
    ])
}