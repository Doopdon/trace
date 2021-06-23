function homePageComp(){
    return div([
        spacer(),
        displayBox({},
            [h3('What is Trac³'),
             p('Trac³ is a View Engine made by someone who is tired of huge bloat, learning curves that resemble a vertical line. Also "transpiling" which seems to take so long I can go on reddit, make a post and get 3 down votes before it finishes. I just want to generate html with javascript without a doctorate degree in computer engineering from Vaser.'),
             p('Sorry about the rant. All trace is is an ultra low weight javascript tool that looks similar to html, but never stops being pure, un transpiled javascript, it can be copy-pasted into any html file and it will start running and with no fuss.'),
             buttonComp('Javascript that looks like HTML',function(){__pageController.val = whatIsTrace})]
        ),
        spacer(),
        displayBox({class:'right'},
            [h3('Why Trac³?'),
             p('Trac³ is crazy easy to get going working. If you can edit a javascript file you can get Trac³ running in under 5 minutes, not exaggerating'),
             p('Trac³ is FLEXIBLE if you are trying to do something weird or hacky and you just need it to work, Trac³ will let you do it. It will not hold your hand, you can base jump off of any programming cliff you want and it won\'t even pop up a warning message, get weird with it, it ain\'t you\'re mom'),
            p('I would recommend using trace if:'),
            ul([
                li('Your application is small but requires a lot of front end dom manipulation'),
                li('Your application is old but needs front-end dom manipulation and cannot support something like react'),
                li('You don\'t like React, Angular and vue')
            ]),
            buttonComp('"Installing" Trac³', ()=>__pageController.val = installingTrace)

        ]
        ),
        spacer(),
        displayBox({},
            [h3('What Can Trac³ do?'),
             p('Trac³ is designed similarly to React, but with much greater simplicity and flexibility. Trace has X main features that allow you to make preferment reusable components just like react but without the engineering degree.'),
             p('Completely Vanilla javascript that generates html elements, but syntax reminiscent of HTML. Because it is written in javascript there is no "special syntax" like ng-if or v-if that you get in Angular or vue. It also does not necessitate breaking your components into smaller components to fullfil "if conditions" like you get with react.'),
             buttonComp('See what it looks like',()=>__pageController.val = whatIsTrace),
             p('Because Trac³ is made of javascript it can also turn its html elements into functions that can be used and take parameters just like react\'s components. Only these components have no set structure or class inheritance. There are no rules with Trac³. Just do what you need to do to get your code written. It is not your mom, it doesn\'t care if you aren\'t doing it "it\'s way". You are a developer trust your own judgment'),
             p('But Trac³ isn\'t simply an html generator that makes you do all the work. It gives you the same power that React\'s "state" gives you: the ability to change multiple elements in response to a singular javascript object changing. This "State" is called a "RenderProp". All a renderprop does is keep a track of an object that holds data (say a user with a name and email) with get and set functions, and a list of "display functions" that point to elements that use this data, (Like login info and greetings). There are also a "RenderList" that can hold an array as "state" and individually add, move, remove, insert items while making minimal changes to the dom. These Render props are far more flexible than React\'s "state" and can be used and referenced just like normal javascript variables. and can even recursively contain additional renderers inside them so even more control can be given to you, the developer.'),
             buttonComp('Render Props',()=>__pageController.val = renderProps),
             p('Stop letting some framework tell you how to code be free to make your own professional decisions. You know no code base is perfect, and sometimes you need to do "dirty" things to get the job done, and you know sometimes the framework you are using just ins\'t built with your vision in mind and the hoops you have to jump through to make it come to life can be frustrating. So I implore you to stop grasping at some perfect framework to solve all your problems and embrace the chaos that is web development with the flexibility and freedom that is javscript with a tool called Trac³'),
             buttonComp('Look at what a 300 line long tool can do',()=>__pageController.val = whatTraceCanDo),
            ]
        ),
        spacer(),
        displayBox({},[
            h3('Learn Trac³'),
            p('Trac³ is designed to be easy to learn but it still needs some explanation, tricks and tips, as well as full blown documentation'),
            buttonComp('Learn Trac³',()=>__pageController.val = learnTrace)
        ]),
    ])
}
