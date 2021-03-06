const express = require("express")
const bodyparser = require("body-parser")
const hbs = require("hbs")
const session = require("express-session")
const cookieparser = require("cookie-parser")
const mongoose = require("mongoose")
const app = express()
const Content = require('./models/content')//TOUCHED


const {
	User
} = require("./user.js")

mongoose.Promise = global.Promise

///////////TOUCHED
mongoose.connect("mongodb://localhost:27017/users", {
	useNewUrlParser: true
})

mongoose.connection.once('open', ()=>{
	console.log("Connection to CheckNotes database has been successful ")
}).on('error', (error)=>{
	console.log('Connection error: ', error);
})
/////////////////
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

	/*let fontsize = 12

	if (request.cookies.cookiefontsize) {
		fontsize = request.cookies.cookiefontsize
	}*/

	if (!request.session.username) {
		response.sendFile(__dirname + "/public/login.html");
	} else {
		response.render("home.hbs", {
			username: request.session.username,
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

/*app.post("/add", urlencoder, (req, res) => {
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
})*/

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
				username: doc.username,
				title: "Note Title",
				content: "Note Content"
			})
		}, (err) => {
			// if nag fail
			res.send(err)
		})
	}else{
		res.redirect("/signup")
	}
})

/////////////////TOUCHED
app.post("/create_note", urlencoder, (req,res) =>{
	let title = req.body.note_title;
	let content = req.body.note_content;
})

app.post("/create_checklist", urlencoder, (req,res) =>{
	let title = req.body.cltitle;

	let content = new Content({
		title, note
	})
	
	content.save().then((doc) => {
		/// if all goes well
		console.log(doc)
		res.render("home.hbs", {
			username: doc.username
		})
	}, (err) => {
		// if nag fail
		res.send(err)
	})


})

app.get("/view_note", urlencoder, (req,res)=>{
	let id = req.body.noteid;
	Content.findById(id).then((result)=>{
		//TODO: Render note
	})
})

app.get("/view_checklist",urlencoder, (req,res)=>{
	let id = req.body.noteid;
	Content.findById(id).then((result)=>{
		//TODO: Render checklist
	})
})

app.post("/edit_note", urlencoder, (req, res)=>{
	let title = req.body.note_title;
	let content = req.body.note_content;
	let id = req.body.noteid;
	Content.findByIdAndUpdate(id, {title, content}).then((result)=>{
		res.render("home.hbs", {
			username: doc.username
		})
	})
})

app.post("/edit_checklist", urlencoder, (req, res)=>{
	let title = req.body.note_title;
	let content = req.body.note_content;
	let id = req.body.noteid;
	Content.findByIdAndUpdate(id, {title, content}).then((result)=>{
		res.render("home.hbs", {
			username: doc.username
		})
	})
})

app.post("/add_tag", urlencoder, (req, res)=>{
	let id = req.body.note;
	let tags = req.body.tags;


	Content.findByIdAndUpdate(id, {tags}).then((result)=>{
			res.render("home.hbs", {
				username: doc.username,
				//TODO: INSERT HOW TO ADD TAGS AT THE SIDE
				tags:result
			})
	})
})

app.post("/remove_tag", urlencoder, (req,res)=>{
	let id = req.body.note;
	let tags = req.body.tags;

	Content.findByIdAndUpdate(id, {tags}).then((result)=>{
		res.render("home.hbs", {
			username: doc.username,
			tags:result
		})
	})
})

app.post("/edit_tag", urlencoder, (req,res)=>{
	let id = req.body.tag;

	Content.findByIdAndUpdate(id, {tags}).then((result)=>{
		res.render("home.hbs", {
			username: doc.username,
			tags:result
		})
	})
})

app.post("/delete_note", urlencoder, (req,res)=>{
	let id = req.body.noteid;

	Content.findByIdAndDelete(id).then((result)=>{
		res.render("home.hbs", {
			username: doc.username,
			//INSERT HOW TO ADD TAGS AT THE SIDE
			notes:result
		})
	})
})


app.get("/home", urlencoder, (req,res)=>{
	res.render("home.hbs");
})

app.get("/notes", urlencoder, (req,res)=>{

	//TODO: get all notes
	res.render("notes.hbs");
})

app.get("/checklists", urlencoder, (req,res)=>{

	//TODO: get all checklists
	res.render("checklists.hbs");
})

app.get("/search", urlencoder, (req, res)=>{
	let search_query = req.body.search_input;

	//TODO: return search results
	res.render("home.hbs")
})

app.post("/uploadimage", urlencoder, (req, res)=>{
	//let image = req.body.image;

	//TODO add image to note

	res.render("home.hbs")
})

app.get("/tag/",urlencoder,(req,res)=>{
	let tag = req.body.tag;
	Content.findById()
	Content.findById(id, {tag}).then((result)=>{
		res.render("home.hbs", {
			username: doc.username,
			posts: result
		})
	})
})

app.listen(3000, function () {
	console.log("port is live");
});
