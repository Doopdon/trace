function navBar(state){
    trace(this);
    return div({class:'navbar'},[
        a({href:'#home'},'Home'),
        a({href:'#news'},'news'),
        a({href:'#contact'},'contact'),
    ])
}