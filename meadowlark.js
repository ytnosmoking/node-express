let express = require('express');
let app = express();
let handlebars = require('express3-handlebars').create({ defaultLayout: "main" })

let fortune = require(__dirname + '/lib/fortune.js');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars')

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'))




app.get('/', (req, res) => {
    // res.type('text/plain')
    // res.send('Meadowlark Travel')
    res.render('home')
})

app.get('/about', (req, res) => {
    // res.type('text/plain')
    // res.send('About Meadowlark Travel')

    res.render('about', { fortune: fortune.getFortune() })
})



// 404 
app.use((req, res) => {
    // res.type('text/plain');
    // res.status(404);
    // res.send('404 - Not Found')
    res.status(404)
    res.render('404')
})

// 500
app.use((err, req, res, next) => {
    console.error(err.stack)
        // res.type('text/plain')
        // res.status(500)
        // res.send('500 - Server Error')

    res.status(500)
    res.render('500')
})

app.listen(app.get('port'), () => {
    console.log('Express has started')
})