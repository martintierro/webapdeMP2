const express = require("express")
const bodyparser = require("body-parser")
const hbs = require("hbs")
const session = require("express-session")
const cookieparser = require("cookie-parser")
const mongoose = require("mongoose")
const app = express()


const {
	User
} = require("./user.js")

mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost:27017/users", {
	useNewUrlParser: true
})

const urlencoder = bodyparser.urlencoded({
	extended: false
});

app.use(express.static(__dirname + "/public"))
app.use(
	session({
		secret: "secretname",
		name: "cookiename",
		resave: true,
		saveUninitialized: true,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 * 365 * 2
		}
	})
);
app.use(cookieparser())


app.get("/", function (request, response) {

	let fontsize = 12

	if (request.cookies.cookiefontsize) {
		fontsize = request.cookies.cookiefontsize
	}

	if (!request.session.username) {
		response.sendFile(__dirname + "/public/login.html");
	} else {
		response.render("home.hbs", {
			username: request.session.username,
			fontsize: fontsize
		});
	}
});


app.get("/signuppage", (req, res) => {
	res.sendFile(__dirname + "/public/signup.html")
})

app.post("/login", urlencoder, (req, res) => {
	let username = req.body.user;
	let password = req.body.pass;

	User.findOne({
		username,
		password
	}, (err, doc) => {
		if (err) {
			res.send(err)
		} else if (doc) {
			console.log(doc);
			req.session.username = username;
			res.redirect("/");
		} else {
			res.redirect("/")

		}
	})
});

app.post("/add", urlencoder, (req, res) => {
	let username = req.body.user
	let password = req.body.pass

	let user = new User({
		username,
		password
	})

	user.save().then((doc) => {
		req.session.msg = "Successfully added " + doc.username
		res.redirect("/users")
	}, (err) => {
		res.send(err)
	})
})

app.post("/delete", urlencoder, (req, res) => {
	User.deleteOne({
		_id: req.body.id
	}, (err, doc) => {
		if (err) {
			res.send(err)
		} else {
			//res.redirect("/users");
			console.log(doc);
			res.send(doc);
		}
	})
})

app.post("/logout",urlencoder,(req,res)=>{
	req.session.username = null;
	res.redirect("/");
})

app.post("/signup", urlencoder, (req, res) => {
	var username = req.body.user
	var password = req.body.pass
	var confirm_pw = req.body.confirm_pw;

	if(password === confirm_pw) {
		let user = new User({
			username,
			password
		})

		user.save().then((doc) => {
			/// if all goes well
			console.log(doc)
			res.render("home.hbs", {
				username: doc.username
			})
		}, (err) => {
			// if nag fail
			res.send(err)
		})
	}else{
		res.redirect("/signup")
	}
})

app.post("/create_note", urlencoder, (req,res) =>{
	let title = req.body.note_title;
	let content = req.body.note_content;
})

app.post("/create_checklist", urlencoder, (req,res) =>{
	let title = req.body.cltitle;
})

app.get("/view_note", urlencoder, (req,res)=>{
	let id = req.body.noteid;
})

app.get("/view_checklist",urlencoder, (req,res)=>{

})

app.get("/home", urlencoder, (req,res)=>{
	res.render("home.hbs");
})

app.get("/notes", urlencoder, (req,res)=>{
	res.render("notes.hbs");
})

app.get("/checklists", urlencoder, (req,res)=>{
	res.render("checklists.hbs");
})

app.get("/search", urlencoder, (req, res)=>{
	let search_query = req.body.search_input;
})

app.listen(3000, function () {
	console.log("port is live");
});
