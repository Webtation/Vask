var React = require('react'),
    MaterialMixin = require('./../../../mixins/material-ui.js'),
    mui = require('material-ui'),
    TextField = mui.TextField,
    FlatButton = mui.FlatButton;

var AnswerForm = React.createClass({
  mixins: [MaterialMixin],
  submitAnswer: function(){
    var answerText = this.refs.answerText.getValue();
    var questionId = this.props.questionId;
    addAnswer(questionId, answerText);
  },
  render: function(){
    return (<div>
              <TextField
                hintText="Type your answer here..."
                ref="answerText"
                multiLine={true}
                style={{"width": "95%"}}/>
              <FlatButton
                label="Submit"
                style={{"float": "right"}}
                onClick={this.submitAnswer}/>
              <div
                style={{"clear": "both"}}>
              </div>
            </div>);
  }
});

module.exports = AnswerForm;