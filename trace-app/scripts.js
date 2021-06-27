//handles urls so the page can be navigated like a traditional website
function pageRouter(){
    let me =  this;
    let lastFunct;
    me.pageController = new RenderProp(homePageComp)
    me.pageController.onChange(change)
    let isNavigating = false;//handles back and forward button events.
    let url = window.location.href;
    let [baseUrl,pageName] = url.split('?');
    if(pageName && window[pageName]) 
        me.pageController.val = window[pageName];
    window.onpopstate = backForward;

    function change(funct){
        if(lastFunct == funct) return;//if the new funct is the same as the last, do nothing
        if(isNavigating) return (isNavigating = false)//if isNavigating is true do not push, then set isNavigating to false; 
        window.scrollTo(0,0);
        let newUrl = [baseUrl, funct.name].join('?');
        window.history.pushState(funct.name,funct.name+' function',newUrl)
        lastFunct = funct;
    }

    function backForward(e){
        isNavigating = true;//stops the page from pushing back onto history
        if(e.state && window[e.state]) 
            me.pageController.val = window[e.state]
    }    
}

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