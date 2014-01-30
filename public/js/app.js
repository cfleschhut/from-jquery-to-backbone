var events = _.clone(Backbone.Events);

var Statuses = function() {};

Statuses.prototype.add = function(text) {
  $.ajax({
    url: '/status',
    type: 'POST',
    dataType: 'json',
    data: { text: text },
    success: function(data) {
      events.trigger('status:add', data.text);
    }
  });
};

var NewStatusView = function(options) {
  this.statuses = options.statuses;

  events.on('status:add', this.clearInput, this);

  $('#new-status form').on('submit', $.proxy(this.addStatus, this));
};

NewStatusView.prototype.addStatus = function(e) {
  e.preventDefault();

  this.statuses.add($('#new-status textarea').val());
};
NewStatusView.prototype.clearInput = function() {
  $('#new-status textarea').val('');
};

var StatusesView = function() {
  events.on('status:add', this.appendStatus, this);
};

StatusesView.prototype.appendStatus = function(text) {
  $('#statuses ul').append('<li>' + text + '</li>');
};


$(document).ready(function() {
  var statuses = new Statuses();
  new NewStatusView({ statuses: statuses });
  new StatusesView();
});
