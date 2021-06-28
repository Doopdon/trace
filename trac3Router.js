

function routerInit(__scope){
    class Trac3Router extends __scope.RenderProp{
        constructor(defaultComp,compsObj){
            super(defaultComp);
            let me = this;
            let lastFunct;
            let isNavigating
            me.onChange(change);
            let [baseUrl,pageName] = window.location.href.split('?');
            if(pageName && compsObj[pageName]) 
                me.val = compsObj[pageName];
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
                    me.val = window[e.state]
            } 
        }
    }

    __scope.Trac3Router = Trac3Router
}
