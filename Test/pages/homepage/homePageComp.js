const homePageComp = div([
    //staticParallaxBackground('content/forest.jpg',null,tripleColumnComp('a','b','c'))
    //tripleColumnComp('a','b','c'),
    backgroundImage('content/forest.jpg',
        tripleColumnComp('a','b','c'),
        {blur:'4px'}
    )
])