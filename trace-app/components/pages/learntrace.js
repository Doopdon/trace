function learnTrace(){
    return div({class:'learning-trace'},[
        spacer(),
        displayBox([
            h2('Getting Started'),
            p(['First you need to ',innerLinkComp(installingTrace,'"install"'),' Trac³.']),
            p('The first thing you need to do is open the "app.html" file in a browser'),
            p('You should see "hello world" on the screen'),
            p('Lets take a look at the app.js file...'),
            p('Open the app.js file, and you should see traceInit(window) and div("hello world")'),
        ]),
        spacer(),
        displayBox([
            h2('traceInit(window):'),
            p('traceInit is a function that comes with trace, when you add the trace script to your html file, "traceInit" is the only function you can use'),
            p(['This is done to avoid ',
             a({href:'https://stackoverflow.com/questions/8862665/what-does-it-mean-global-namespace-would-be-polluted/13352212'},
             'polluting the global scope.'),
              ' So nothing will change in your app accept that "traceInit" is now a function'
            ]),
            p('when you call "traceInit" it will return an object with all the functionality of trace.'),
            p('However if you use var x = traceInit() you will have to use x.div ... x.RenderProp .... ect which can be annoying'),
            p('What I suggest especially if you are starting new is to use "traceInit(window)" the parameter traceInit takes is the object that will have all the functionality attached to it.'),
            p('When you pass in "window" all the functionality is added to the global scope. This CAN cause problems as it pollutes the global scope with functions like a,u,li and div so be aware'),
        ]),
        spacer(),
        displayBox([
            h2('div("hello world").render("root")'),
            p('Let\'s start with the "div("hello world")" part.'),
            p('This is simply a function called "div" that returns a "trace element" called an "element wrapper".'),
            p(['This element wrapper is what tells the ',
             a({href:'https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction'},'DOM'),
             ' how to build an element. In this case: build a Div with the content of "hello world",'
            ]),
            p('Now look at the ".render("root")" part. This adds the element to an element already on the dom. The "root" string is the id of the element in-which you want to insert the new div into.'),
            p('You can also replace "root" with Document.getElementById("root") or $(".complicated .jquery > selector")[0], or any other function that returns a DOM element'),
            p('The render function just takes an element, or a string representing an Id.'),
        ]),
        spacer(),
        displayBox([
            'Now that we have an understanding of a how a trace application is added to the page let\'s start looking at some more complicated', innerLinkComp(elementWrappers,'HTML Generation')
        ]),
        spacer(),

    ])
}