//https://www.youtube.com/watch?v=L72fhGm1tfE
const express = require('express');
const app = express();
const path = require('path');
var exphbs = require('express-handlebars');
const {
    loadMembers,
    saveMembers
} = require('./loading-saving.js');
//const methodOverride = require('method-override');

// var cors = require('cors');

// app.use(cors());

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//app.use(methodOverride('_method'));

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

//Members API routes
app.use('/api/members', require('./membersController'));

const membersArray = loadMembers();
app.use('/edit/:id', (req, res) => {
    console.log(req.query);
    const id = req.params.id;
    const name = req.query.name;
    const email = req.query.email;
    res.render('edit', {
        layout: 'main',
        id: id,
        name: name,
        email: email
    });
});
app.use('/', (req, res) => {
    res.render('index', {
        layout: 'main',
        members: loadMembers()
    });
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server listening at port: ${port}`);
});

//console.log(members);