var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = require('../models/Post.js');
var Comment = require('../models/Comment.js');
var passport = require('passport');
require('../config/passport')(passport);

/*
var cacheOpts = {
    max:50,
    maxAge:1000*60*1000
};

require('mongoose-cache').install(mongoose, cacheOpts)
*/

var redis = require('redis');
const client = redis.createClient()
client.on("error", function(err) {
  console.log("Error " + err);
})
client.on('connect', function() {
    console.log('Connected to Redis');
});



getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};
router.get('/', passport.authenticate('jwt', { session: false}), function(req, res) {
  let token = getToken(req.headers);
  if (token) {
 
	Post.find()
		.then(function(post) {
			res.json(post);
		})
		.catch(function(err) {
			return next(err);
		})

/*
client.multi()
    .keys('*', function (err, replies) {
        console.log("MULTI got " + replies.length + " replies");
		console.log(replies);
		console.log(replies.data);
		console.log('--------');
        replies.forEach(function (reply, index) {
            console.log("Reply " + index + ": " + reply.toString());
            client.get(reply, function(err, data){
					console.log('*************');
                    console.log(data);
					res.json(data);
					console.log('*************');
            });
        });

    })
    .exec(function (err, replies) {});
*/
	
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.get('/comment/:id', passport.authenticate('jwt', { session: false}), function(req, res) {
  let token = getToken(req.headers);
  if (token) {
    Comment.find({'post_id': req.params.id })
		.then(function(coment) {
			res.json(coment);
		})
		.catch(function(err) {
			return next(err);
		})	
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.get('/:id', passport.authenticate('jwt', { session: false}), function(req, res, next) {
  let token = getToken(req.headers);
  if (token) {

	client.get((req.params.id).toString(), function (err, reply) {
		if (reply){
			res.json(reply);
		}else{
			Post.findById(req.params.id)
			.then(function(post) {
				res.json(post);
			})
			.catch(function(err) {
				return next(err);
			})
		}	
	})		 
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.post('/', passport.authenticate('jwt', { session: false}), function(req, res, next) {
  let token = getToken(req.headers);
  if (token) {

    Post.create(req.body)
		.then(function(post) {
			//res.json(post);
		
			client.set((post._id).toString(), (post).toString(),function(err, response) {
				if (err) return err;
			   res.json(response);
			})
			
		})
		.catch(function(err) {
			return next(err);
		})
		
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.post('/comment/:id', passport.authenticate('jwt', { session: false}), function(req, res) {
  let token = getToken(req.headers);
  let comment_arr=[];
  if (token) {
	Comment.create(req.body)
		.then(function(coment) {
			Post.findById(req.params.id)
				.then(function(postBuffer) {
					comment_arr=postBuffer.comment;
					comment_arr.push(coment._id);
					Post.findByIdAndUpdate(req.params.id, {'comment': comment_arr}, {new: true})
						.then(function(post) {
							res.json(post);
						})
						.catch(function(err) {
							return next(err);
						})
				})
				.catch(function(err) {
					return next(err);
				})				
		})
		.catch(function(err) {
			return next(err);
		})		
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.put('/:id', passport.authenticate('jwt', { session: false}), function(req, res, next) {
    let token = getToken(req.headers);
  if (token) {
    Post.findByIdAndUpdate(req.params.id, req.body, {new: true})
		.then(function(post) {
			//res.json(post);
			
			/*----- REDIS Update   --------*/
			client.del((req.params.id).toString(), function(err, response) {
			   if (response == 1) {
				  console.log("Deleted Successfully!")
			   } else{
				console.log("Cannot delete")
			   }
			});
			
			client.set((post._id).toString(), (post).toString(),function(err, response) {
				if (err) return err;
			   res.json(response);
			})
			
			/*----- REDIS Update   --------*/

		})
		.catch(function(err) {
			return next(err);
		})	
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.delete('/:id', passport.authenticate('jwt', { session: false}), function(req, res, next) {
    let token = getToken(req.headers);
  if (token) {
    Post.findByIdAndRemove(req.params.id)
		.then(function(post) {
			res.json(post);
			 /*----- REDIS   --------*/
			client.del((req.params.id).toString(), function(err, response) {
			   if (response == 1) {
				  console.log("Deleted Successfully!")
			   } else{
				console.log("Cannot delete")
			   }
			})
			/*----- REDIS   --------*/
		})
		.catch(function(err) {
			return next(err);
		})	
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});
module.exports = router;