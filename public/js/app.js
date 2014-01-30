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
  this.el = options.el;

  events.on('status:add', this.clearInput, this);

  this.el.find('form').on('submit', $.proxy(this.addStatus, this));
};

NewStatusView.prototype.addStatus = function(e) {
  e.preventDefault();

  this.statuses.add(this.el.find('textarea').val());
};
NewStatusView.prototype.clearInput = function() {
  this.el.find('textarea').val('');
};

var StatusesView = function(options) {
  this.el = options.el;

  events.on('status:add', this.appendStatus, this);
};

StatusesView.prototype.appendStatus = function(text) {
  this.el.find('ul').append('<li>' + text + '</li>');
};


$(document).ready(function() {
  var statuses = new Statuses();
  new NewStatusView({ el: $('#new-status'), statuses: statuses });
  new StatusesView({ el: $('#statuses') });
});
