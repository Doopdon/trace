function displayBox(atrInput,inner){
    if(!inner) [inner, atrInput] = [atrInput, {class:''}];
    atrInput.class = 'info-card ' + atrInput.class;
    return div(atrInput,div({class:'info-card-inner'},[inner]))
}