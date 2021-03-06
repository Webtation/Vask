var url = require('url');
var Content = require('../models/content');
var Question = require('../models/question');
var searchEng = require('../search');
var mockdata = require('../models/mockdata');

var fakeVideos = [
  {
  	_id: '1',
    url: "https://www.youtube.com/watch?v=Jh0er2pRcq8&list=PLUPi8Qj7uZ3QpsamMg8NvqI9QWv3bK974",
    shortUrl: "Jh0er2pRcq8",
    title: "Explore MEAN Stack at 2015",
    subtitle: "Added 1 year ago",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo kdjkwe qwkdkmkmqd kqwdjkqwdkq oqwdkqdwqm qodpqwkdokq oqwkdow owd wow ow owkdowklwdm wokw w lmwdlwm owoowldmo."
  },  
  {
  	_id: '2',
    url: "https://www.youtube.com/watch?v=1RMWS60gGUY&list=PLUPi8Qj7uZ3QpsamMg8NvqI9QWv3bK974&index=2",
    shortUrl: "1RMWS60gGUY",
    title: "Building high quality services at Uber with Node.js",
    subtitle: "Added 5 minutes ago",
    description: "ed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium"
  },
  {
  	_id: '3',
    url: "https://www.youtube.com/watch?v=WOVmr6CjgNw&index=3&list=PLUPi8Qj7uZ3QpsamMg8NvqI9QWv3bK974",
    shortUrl: "WOVmr6CjgNw",
    title: "Comparing Node.js Frameworks: Express, Hapi, LoopBack, Sailsjs and Meteor",
    subtitle: "Added 2 years ago",
    description: "xcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
  	_id: '4',
    url: "https://www.youtube.com/watch?v=FVdH9YcB3Dg&list=PLUPi8Qj7uZ3QpsamMg8NvqI9QWv3bK974&index=5",
    shortUrl: "FVdH9YcB3Dg",
    title: "Node.js Fundamentals",
    subtitle: "Added 3 weeks ago",
    description: " Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris"
  },
];

var filterContents = function(contents, search, size) {
  size = size || 30;
  // if no search, just return top result, reversing to get latest content first
  if (!search) return contents.reverse().filter(function(c,idx){ return idx < size});
  //console.log('searching ',search);
  contents.forEach(function(content) {
    var cArr = [];
    cArr.push({ weight : 1.4, words : content.course});
    cArr.push({ weight : 1.0, words : content.title});
    cArr.push({ weight : 0.6, words : content.description});
    content.rank = searchEng.search(search,cArr);
    //console.log(content.rank);
  });
  contents.sort(function(a,b){return b.rank-a.rank});
  //console.log(contents[0]);
  return contents.filter(function(c,idx){ return idx < size});
}

exports.getLectures = function (req, res) {
	//res.status(200).send({result : fakeVideos});
  var search = req.query.search;
  var size = req.query.size;
  Content.find({}, function(err, contents) {
    if (!err) {
      if (contents.length) res.status(200).send({
        result: filterContents(contents,search,size)
      });
      else res.status(200).send({result: fakeVideos}); 
    } else {
      console.log(err);
      res.status(500).send({msg: 'Error fetching content'});
    }
  })
}

var cleanCourse = function (content) {
  var line = content.course;
  content.courseNum = 0;
  if (line.indexOf('-')<0) return;
  var items = line.split('-');
  content.course = items[0].trim();
  content.courseNum = parseInt(items[1].trim());
}

exports.addLecture = function (req, res) {
  var info = req.body;
  var urlParse = url.parse(info.url);
  var qs = urlParse.query.split('&');
  qs.forEach(function(q){
    if (q.length>2 && q[0]==='v' && q[1]==='=') info.shortUrl = q.slice(2);
  });
  cleanCourse(info);
  info.questionCount = 0;
  info.userCount = 0;
  info.imgUrl = 'http://img.youtube.com/vi/'+info.shortUrl+'/mqdefault.jpg';
  console.log('addLecture ',info);
  var newLecture = new Content(info);
  newLecture.save(function (err) {
    if (err) {
      console.log('error in saving lecture ',err);
      res.status(500).send({msg :'error in saving lecture to the database'});

    } else {
      console.log('added lecture');
      res.status(201).send({msg : 'you posted a lecture to the db'});
    }
  })
}

exports.relatedLectures = function (req, res) {
  var videoUrl = req.query.video;
  var title = req.query.title;
  var id = req.query.id;
  var searchObj = {};
  if (videoUrl) searchObj.shortUrl = videoUrl;
  if (title) searchObj.title = title;
  if (id) searchObj._id = id;
  console.log('getRelated', searchObj);
  Content.findOne(searchObj, function(err, content){
    if (err  || !content || !content.course) {
      res.status(200).send({result : []});
      return; 
    }
    //console.log(content);
    var courseName = content.course;
    var courseNum = content.courseNum;
    var video = content.shortUrl;
    Content.find({course : courseName}, function (err, contents){
      if (err) {
        res.status(200).send({result : []});
        return;
      }
      contents.sort(function(a,b){return a.courseNum-b.courseNum});
      var watchPos = 0;
      contents = contents.map(function(c,idx) {
        var obj = { 
          watching : false, 
          watched : false,
          wstatus : 'notwatched',
          _id : c._id,
          title : c.title,
          course : c.course,
          courseNum : c.courseNum,
          description : c.description,
          url : c.url,
          shortUrl : c.shortUrl,
          questionCount : c.questionCount,
          userCount : c.userCount,
          imgUrl : c.imgUrl
        };
        if (obj.shortUrl===video) {
          obj.watching = true;
          obj.wstatus = 'watching',
          watchPos = idx + 1
        }
        if (obj.courseNum < courseNum) {
          obj.watched = true;
          obj.wstatus = 'watched'
        } 
        //console.log(obj);
        return obj;
        
      });
      var perc = Math.floor((watchPos * 100 / contents.length)+0.5);
      res.status(200).send({result : contents, progress : perc});
    })
  });

}

exports.getLectureInfo = function (req, res) {
  var videoUrl = req.query.video;
  var title = req.query.title;
  var id = req.query.id;
  var searchObj = {};
  if (videoUrl) searchObj.shortUrl = videoUrl;
  if (title) searchObj.title = title;
  if (id) searchObj._id = id;
  console.log('getLectureInfo', searchObj);
  Content.findOne(searchObj, function(err, content){
    if (err  || !content || !content.course) {
      res.status(200).send({result : []});
      return; 
    }
    res.status(200).send({result : content});
    //console.log(content);
    
  });
}

exports.addMockData = function (req, res) {
    mockdata.mockContents.forEach(function(mockC) {
      var newLecture = new Content(mockC);
      console.log('saving ', mockC.title);
      newLecture.save(function(err){
        if (err) console.log(err);
      });  
    })

    mockdata.mockQuestions.forEach(function(mockQ){
      var newQuestion = Question(mockQ);
      console.log('saving ', mockQ.title);
      newQuestion.save(function(err) {
        if (err) console.log(err);
      })
    })
    res.status(200).send({msg: 'mockdata added'});

}

exports.addMockAnswers = function (req, res) {
  mockdata.mockAnswers.forEach(function(mockA){
    var url = mockA.video;
    delete mockA.video;
    Question.update({video : url}, {'$push':{'answers': mockA}}, function (err, data){
      if (err) console.log(err);
    });  
  })
  res.status(200).send({msg: 'mockdata added'});
}
