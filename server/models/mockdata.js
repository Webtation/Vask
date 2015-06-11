


exports.mockContents = [

  {
    url: 'https://www.youtube.com/watch?v=lZ3bPUKo5zc',
    shortUrl: 'lZ3bPUKo5zc',
    imgUrl : 'http://img.youtube.com/vi/lZ3bPUKo5zc/mqdefault.jpg',
    title : '1. Introduction to Superposition',
    subtitle : '',
    description : 'In this lecture, Prof. Adams discusses a series of thought experiments involving "box apparatus" to illustrate the concepts of uncertainty and superposition, which are central to quantum mechanics. The first ten minutes are devoted to course information.',
    course : 'Quantum Physics',
    courseNum : '1',
    author : 'Adams',
    questionCount : '12',
    userCount : '35'
  },
  {
    url: 'https://www.youtube.com/watch?v=TkJ_WgruM2g',
    shortUrl: 'TkJ_WgruM2g',
    imgUrl : 'http://img.youtube.com/vi/TkJ_WgruM2g/mqdefault.jpg',
    title : '2. Experimental Facts of Life',
    subtitle : '',
    description : 'In this lecture, Prof. Adams gives a panoramic view on various experimental evidence that indicates the inadequacy of pre-quantum physics. He concludes the lecture with a short discussion on Bells inequality.',
    course : 'Quantum Physics',
    courseNum : '2',
    author : 'Adams',
    questionCount : '16',
    userCount : '32'
  },
  {
    url: 'https://www.youtube.com/watch?v=Ei8CFin00PY',
    shortUrl: 'Ei8CFin00PY',
    imgUrl : 'http://img.youtube.com/vi/Ei8CFin00PY/mqdefault.jpg',
    title : '3. The Wave Function',
    subtitle : '',
    description : 'In this lecture, Prof. Adams introduces wavefunctions as the fundamental quantity in describing quantum systems. Basic properties of wavefunctions are covered. Uncertainty and superposition are reiterated in the language of wavefunctions.',
    course : 'Quantum Physics',
    courseNum : '3',
    author : 'Adams',
    questionCount : '43',
    userCount : '57'
  },
  {
    url: 'https://www.youtube.com/watch?v=NN2txluv1PY',
    shortUrl: 'NN2txluv1PY',
    imgUrl : 'http://img.youtube.com/vi/NN2txluv1PY/mqdefault.jpg',
    title : '4. Expectations, Momentum, and Uncertainty',
    subtitle : '',
    description : 'In this lecture, Prof. Adams begins with a round of multiple choice questions. He then moves on to introduce the concept of expectation values and motivates the fact that momentum is given by a differential operator with Noethers theorem.',
    course : 'Quantum Physics',
    courseNum : '4',
    author : 'Adams',
    questionCount : '6',
    userCount : '12'
  },
  {
    url: 'https://www.youtube.com/watch?v=lMFgfqRZYoc',
    shortUrl: 'lMFgfqRZYoc',
    imgUrl : 'http://img.youtube.com/vi/lMFgfqRZYoc/mqdefault.jpg',
    title : '5. Operators and the Schroedinger Equation',
    subtitle : '',
    description : 'In this lecture, Prof. Zweibach gives a mathematical preliminary on operators. He then introduces postulates of quantum mechanics concerning observables and measurement. The last part of the lecture is devoted to the origins of the Schrödinger equation.',
    course : 'Quantum Physics',
    courseNum : '5',
    author : 'Adams',
    questionCount : '14',
    userCount : '17'
  }

];

exports.mockQuestions = [
  {
    video: 'lMFgfqRZYoc',
    username: 'Steve',
    time: 40,
    title : 'Is eigenvector similar to eigenfunction?',
    text: 'I got what eigenfunction is, but what is exactly eigenvector?',
    votes: 12,
    createdAt : 1433997590628,
    answers : []

  },
  {
    video: 'lMFgfqRZYoc',
    username: 'John',
    time: 50,
    title : 'Why is the Schroedinger Wave Equation deterministic?',
    text: 'He stated that Schroedinger Wave Equation is deterministic.  I am cautious about accepting that but I would like to hear more about how it is deterministic.',
    votes: 7,
    createdAt : 1433997590628,
    answers : []

  }

]


exports.mockAnswers = [ 
  {
  	    video: 'lMFgfqRZYoc',
    	text: 'An eigenvector (objects) from what I understand in the lecture is a linear solution to that matrix (aka eigenfunction/operator). Additionally, any eigenvalues generated from applying these operators are the constants of proportionality for these eigenvectors.',
    	votes: 21,
    	createdAt : 1433997590628, 
    	userName : 'Thomas'

   },
   {
   	    video: 'lMFgfqRZYoc',
    	text: "The wave equation has no physical meaning. It's only when you calculate the probability function that you get real world implications. The wave equation will give you this probability function exactly. But, yeah, the probability function will never give you an exact answer as to the properties of a particle at a certain time",
    	votes: 18,
    	createdAt : 1433997590628, 
    	userName : 'Alice'

    },
    {
    	video: 'lMFgfqRZYoc',
    	text: "More often than not, you'll get a range of answers but only that range of answers. It's deterministic in that sense.",
    	votes: 6,
    	createdAt : 1433997590628, 
    	userName : 'Bob'

    }

]