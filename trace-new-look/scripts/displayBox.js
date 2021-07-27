function displayBox(atrInput,inner){
    inner = inner ?? atrInput;
    let atr = {class:'info-card'}
    atr ?? Object.assign(atrInput,atr);
    return div(atr,div({class:'info-card-inner'},[inner]))
}