function homePage(){
    trace(this);
    return div([
        h1('this is the home page'),
        p('I am showing off what my view engine can do'),
    ])
}