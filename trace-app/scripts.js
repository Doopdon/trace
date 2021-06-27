//handles urls so the page can be navigated like a traditional website
function pageRouter(){
    var me =  this;
    me.pageController = new RenderProp(homePageComp)
    me.pageController.onChange(change)
    let isNavigating = false;//handles back and forward button events.
    let url = window.location.href;
    let [baseUrl,pageName] = url.split('?');
    if(pageName && window[pageName]) 
        me.pageController.val = window[pageName];
    window.onpopstate = backForward;

    function change(funct){
        if(funct.name == me.pageController.val.name) return;
        if(isNavigating) return (isNavigating = false)//if isNavigating is true do not push, then set isNavigating to false; 
        window.scrollTo(0,0);
        let newUrl = [baseUrl, funct.name].join('?');
        window.history.pushState(funct.name,funct.name+' function',newUrl)
    }

    function backForward(e){
        isNavigating = true;//stops the page from pushing back onto history
        if(e.state && window[e.state]) 
            me.pageController.val = window[e.state]
    }    
}

function keyVal(x){ return Object.keys(x).map(k=>{return {key:k,val:x[k]}})}