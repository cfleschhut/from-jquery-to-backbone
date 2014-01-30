var events = _.clone(Backbone.Events);

var Statuses = function() {};

Statuses.prototype.add = function(options) {
  $.ajax({
    url: '/status',
    type: 'POST',
    dataType: 'json',
    data: { text: options.text },
    success: options.success
  });
};

var NewStatusView = function(options) {
  this.statuses = options.statuses;

  events.on('status:add', this.appendStatus, this);
  events.on('status:add', this.clearInput, this);

  $('#new-status form').on('submit', $.proxy(this.addStatus, this));
};

NewStatusView.prototype.addStatus = function(e) {
  e.preventDefault();

  this.statuses.add({
    text: $('#new-status textarea').val(),
    success: function(data) {
      events.trigger('status:add', data.text);
    }
  });
};
NewStatusView.prototype.appendStatus = function(text) {
  $('#statuses ul').append('<li>' + text + '</li>');
};
NewStatusView.prototype.clearInput = function() {
  $('#new-status textarea').val('');
};


$(document).ready(function() {
  var statuses = new Statuses();
  new NewStatusView({
    statuses: statuses
  });
});
