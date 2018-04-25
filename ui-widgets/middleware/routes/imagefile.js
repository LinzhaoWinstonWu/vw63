var express = require('express');
var router = express.Router();
var multer = require('multer');
var mongoose = require('mongoose');
var path = require('path');
const fs = require('fs-extra');
const uuidv4 = require('uuid/v4');
var Widget = require('../models/widget');

var imageSchema = mongoose.Schema({
	path: {
		type: String,
		required: true,
		trim: true
	},
	originalname: {
		type: String,
		required: true
	}
});

var Image = module.exports = mongoose.model('files', imageSchema);

router.getImages = function(callback, limit) {
	console.log(callback, limit);
}

router.addImages = function(images, callback) {
	Image.create(images, callback);
}


var storage = multer.diskStorage({
	destination: function(req, file, cb) {
		fs.ensureDirSync('src/uploads/');
		cb(null, 'src/uploads/')
	},
	filename: function(req, file, cb) {
		if(file.mimetype == 'image/png')
			cb(null, uuidv4() + '.png')
		else
			cb(null, file.originalname)
	}
});

var upload = multer({
	storage: storage,
});

/*
fileFilter: function(req, file, cb) {
		var filetypes = /png/;
		var mimetype = filetypes.test(file.mimetype);
    	var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	
    	if (mimetype && extname) 
	    	cb(null, true);
	    else
	    	cb(null, false);
	    //req.fileValidationError = "Error: File upload only supports the following filetypes - " + filetypes;

	}*/

router.get('/', function(req, res, next) {
	console.log('Rendering...');

	res.sendFile(path.resolve('C:\\Users\\user\\widget_space_frontend', 'index.html'));
});

router.get('/:widget/:page/:color?', function(req, res, next) {
	console.log(req.params)
	if(req.params.widget == 'all')
	{
		/*Widget.fetchAll({
			columns: ['filepath']
		})
		.then(function(widgets) {
			res.json(widgets);
		})*/
		if(req.params.color)
		{
			console.log('all&&color')
			Widget.
			where({
				'color': req.params.color,
			})
			.fetchPage({
				pageSize: 15,
				page: req.params.page,
			})
			.then(function(results) {
				/*r = results.toJSON();
				r.push({
					pagination: results.pagination
				});*/
				res.json({
					results: results.toJSON(),
					pagination: results.pagination
				})
			})
		}
		else
		{	
			console.log('all')
			Widget.fetchPage({
				pageSize: 15,
				page: req.params.page,
			})
			.then(function(results) {
				/*r = results.toJSON();
				r.push({
					pagination: results.pagination
				});*/
				res.json({
					results: results.toJSON(),
					pagination: results.pagination
				})
			})
		}

	}
	else
	{
		if(req.params.color)
		{
			Widget.
			where({
				'widget_class': req.params.widget.charAt(0).toUpperCase() + req.params.widget.slice(1),
				'color': req.params.color,
			})
			.fetchPage({
				pageSize: 15,
				page: req.params.page,
			})
			.then(function(results) {
				res.json({
					results: results.toJSON(),
					pagination: results.pagination
				})
			})
		}
		else
		{
			Widget.
			where({
				'widget_class': req.params.widget.charAt(0).toUpperCase() + req.params.widget.slice(1),
			})
			.fetchPage({
				pageSize: 15,
				page: req.params.page,
			})
			.then(function(results) {
				res.json({
					results: results.toJSON(),
					pagination: results.pagination
				})
			})
		}
	
	}
	
});

router.post('/', upload.any(), function(req, res, next) {
	
	//var images = [];

	/*{ fieldname: 'images',
		  originalname: '20170102_113631.jpg',
		  encoding: '7bit',
		  mimetype: 'image/jpeg',
		  destination: 'src/uploads/',
		  filename: '20170102_113631.jpg',
		  path: 'src\\uploads\\20170102_113631.jpg',
		  size: 1452129 }*/
	var obj;
	for(var f of req.files)
	{
		if(f.originalname == 'meta_dump.txt')
		{
			obj = JSON.parse(fs.readFileSync(f.path));
			break;
		}
	}

	for(var file of req.files)
	{
		if(file.originalname != 'meta_dump.txt' && file.originalname != 'statistics.txt' )
		{
			var entry = file.originalname.replace('.png', '');
			new Widget({
				widget_class: obj[entry]["widget_class"],
				text: obj[entry]["text"],
				color: obj[entry]["color"],
				content_desc: obj[entry]["content-desc"],
				width: obj[entry]["dimensions"]["width"],
				height: obj[entry]["dimensions"]["height"],
				filepath: file.path
			})
			.save()
			.then(function(saved) {
				res.sendStatus(200);
			})
			.catch(function(err) {
				res.status(500).send(err)
			})
		}
	}



	/* 
		MongoDB collection schema 

		{ _id: 59d52482f70ebb14a4fe76f6,
		  path: 'src\\uploads\\clipping-2.png',
		  originalname: 'clipping-2.png',
		  __v: 0 }
	

	/*router.addImages(images, function(err) {
		Image.find({}, function(err, results) {
			console.log(results.length);
		});
	});

	Image.remove({}, function(err, results) {
	});

	//List all documents in the collection
	Image.find({}, function(err, results) {
		for(var r of results)
		{
			console.log(r);
		}
	})*/

})

module.exports = router;