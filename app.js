/*
 Module Dependencies
 check
 */
var express = require('express'),
    http = require('http'),
    path = require('path'),
    mongoose = require('mongoose'),
    fs = require('fs'),
    hash = require('./pass').hash;

var app = express();

/*
 Database and Models
 */
mongoose.connect("mongodb://localhost/myapp");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    salt: String,
    hash: String
});

var User = mongoose.model('users', UserSchema);
/*
 Middlewares and configurations
 */
app.configure(function () {
    app.use(express.bodyParser());
    app.use(express.cookieParser('Authentication Tutorial '));
    app.use(express.session());
    app.use(express.static(path.join(__dirname, 'public')));
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
});

app.use(function (req, res, next) {
    var err = req.session.error,
        msg = req.session.success;
    delete req.session.error;
    delete req.session.success;
    res.locals.message = '';
    if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
    if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
    next();
});
/*
 Helper Functions
 */
function authenticate(name, pass, fn) {
    if (!module.parent) console.log('authenticating %s:%s', name, pass);

    User.findOne({
            username: name
        },

        function (err, user) {
            if (user) {
                if (err) return fn(new Error('cannot find user'));
                hash(pass, user.salt, function (err, hash) {
                    if (err) return fn(err);
                    if (hash == user.hash) return fn(null, user);
                    fn(new Error('invalid password'));
                });
            } else {
                return fn(new Error('cannot find user'));
            }
        });

}

function requiredAuthentication(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        req.session.error = 'Access denied!';
        res.redirect('/login');
    }
}

function userExist(req, res, next) {
    User.count({
        username: req.body.username
    }, function (err, count) {
        if (count === 0) {
            next();
        } else {
            req.session.error = "User Exist"
            res.redirect("/signup");
        }
    });
}

/*
 Routes
 */
//app.get("/", function (req, res) {
//      console.log(req);
//    if (req.session.user) {
//        res.send("Welcome " + req.session.user.username + "<br>" + "<a href='/logout'>logout</a>");
//    } else {
////        res.render("login");
//        fs.readFile(__dirname + '/login.html',
//            function (err, data) {
//                if (err) {
//                    res.writeHead(500);
//                    return res.end('Error loading index.html');
//                }
//
//                res.writeHead(200);
//                res.end(data);
//            });
//    }
//});

app.get("/signup", function (req, res) {
    console.log("sign up")  ;
    console.log(__dirname + '/public/start.html');
    fs.readFile(__dirname + '//public//start.html',
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }

            res.writeHead(200);
            res.end(data);
        });

});

app.post("/signup", userExist, function (req, res) {
    var password = req.body.password;
    var username = req.body.username;

    hash(password, function (err, salt, hash) {
        if (err) throw err;
        var user = new User({
            username: username,
            salt: salt,
            hash: hash
        }).save(function (err, newUser) {
                if (err) throw err;
                authenticate(newUser.username, password, function(err, user){
                    if(user){
                        req.session.regenerate(function(){
                            req.session.user = user;
                            req.session.success = 'Authenticated as ' + user.username + ' click to <a href="/logout">logout</a>. ' + ' You may now access <a href="/restricted">/restricted</a>.';
                            res.redirect('/signup');
                        });
                    }
                });
            });
    });
});

app.get("/login", function (req, res) {
    res.render("logins");
});

app.post("/login", function (req, res) {
    authenticate(req.body.username, req.body.password, function (err, user) {
        if (user) {

            req.session.regenerate(function () {

                req.session.user = user;
                req.session.success = 'Authenticated as ' + user.username + ' click to <a href="/logout">logout</a>. ' + ' You may now access <a href="/restricted">/restricted</a>.';
                res.redirect('/');
            });
        } else {
            req.session.error = 'Authentication failed, please check your ' + ' username and password.';
            res.redirect('/login');
        }
    });
});

app.get('/logout', function (req, res) {
    req.session.destroy(function () {
        res.redirect('/');
    });
});

app.get('/profile', requiredAuthentication, function (req, res) {
    res.send('Profile page of '+ req.session.user.username +'<br>'+' click to <a href="/logout">logout</a>');
});
var candidate    = {};
var interviewer = {};
var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('candidateList', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'interviewer' database");
        db.collection('interviewer', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'interviewer' collection doesn't exist. Creating it with sample data...");
                populateInterviewerDB();
            }
        });

        db.collection('candidate', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'candidate' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

var populateInterviewerDB = function() {

    var employee = [
        {
            name: "Mahesh",
            emailId: "abc@gmail.com",
            SkillSet: [{"JavaScript":2},{"Java" :3},{"PHP" :3}],
            totalYears :3


        },
        {
            name: "Kevin",
            emailId: "hhgh@gmail.com",
            totalYears :4,
            SkillSet: [{"JavaScript":2},{"Java" :3},{"PHP" :3}]

        }];

    db.collection('interviewer', function(err, collection) {
        collection.insert(interviewer, {safe:true}, function(err, result) {});
    });

};





interviewer.findById = function(req, res) {
    console.log("find by id")
    var id = req.params.id;
    console.log(req.params.id);
    console.log('Retrieving employee: ' + id);
    db.collection('interviewer', function(err, collection) {
        collection.find({"name":id}).toArray(function(err, items) {
            res.send(items);
        });
    });
};

interviewer.addCandidate = function(req, res) {
    var value = req.body;
    console.log('Adding interviewer: ' + JSON.stringify(value));
    db.collection('interviewer', function(err, collection) {
        collection.insert(value, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

interviewer.updateCandidate = function(req, res) {
    var id = req.params.id;
    var value = req.body;
    delete  value._id;
    console.log('Updating interviewer: ' + id);
    console.log(JSON.stringify(value));
    db.collection('interviewer', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, value, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating interviewer: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(value);
            }
        });
    });
}

interviewer.deleteCandidate = function(req, res) {
    var id = req.params.id;
    console.log('Deleting interviewer: ' + id);
    db.collection('interviewer', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

interviewer.findAll = function(req, res) {
    db.collection('interviewer', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};


candidate.findById = function(req, res) {
    console.log("find by id")
    var id = req.params.id;
    console.log(req.params.id);
    console.log('Retrieving wine: ' + id);
    db.collection('candidate', function(err, collection) {
        collection.find({"name":id}).toArray(function(err, items) {
            res.send(items);
        });
    });
};

candidate.addCandidate = function(req, res) {
    var value = req.body;
    console.log('Adding candidate: ' + JSON.stringify(value));
    db.collection('candidate', function(err, collection) {
        collection.insert(value, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

candidate.updateCandidate = function(req, res) {
    var id = req.params.id;
    var value = req.body;
     delete  value._id;
    console.log('Updating wine: ' + id);
    console.log(JSON.stringify(value));
    db.collection('candidate', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, value, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating wine: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(value);
            }
        });
    });
}

candidate.deleteCandidate = function(req, res) {
    var id = req.params.id;
    console.log('Deleting wine: ' + id);
    db.collection('candidate', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

candidate.findAll = function(req, res) {
    db.collection('candidate', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

var populateDB = function() {

    var candidate = [
        {
            name: "Bhaskar",
            emailId: "abc@gmail.com",
            SkillSet: [{"JavaScript":2},{"Java" :3},{"PHP" :3}],
            totalYears :3,
            result:"Selected"

        },
        {
            name: "priya",
            emailId: "hhgh@gmail.com",
            totalYears :4,
            SkillSet: [{"JavaScript":2},{"Java" :3},{"PHP" :3}],
            result:"Selected"

        }];

    db.collection('candidate', function(err, collection) {
        collection.insert(candidate, {safe:true}, function(err, result) {});
    });

};
app.get('/candidate', candidate.findAll);
app.get('/candidate/:id', candidate.findById);
app.post('/candidate', candidate.addCandidate);
app.put('/candidate/:id', candidate.updateCandidate);
app.delete('/candidate/:id', candidate.deleteCandidate);

// for employee

app.get('/interviewer', candidate.findAll);
app.get('/interviewer/:id', candidate.findById);
app.post('/interviewer', candidate.addCandidate);
app.put('/interviewer/:id', candidate.updateCandidate);
app.delete('/interviewer/:id', candidate.deleteCandidate);
http.createServer(app).listen(3000);


