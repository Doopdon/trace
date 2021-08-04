function displayBox(atrInput,inner){
    inner = inner ?? atrInput;
    atrInput = atrInput || {class:''};
    atrInput.class = 'info-card ' + atrInput.class;
    return div(atrInput,div({class:'info-card-inner'},[inner]))
}