var Status = Backbone.Model.extend({
  url: '/status'
});

var Statuses = Backbone.Collection.extend({
  add: function(text) {
    var that = this;
    var status = new Status();
    status.save({ text: text }, {
      success: function(model, data) {
        that.trigger('add', data.text);
      }
    });
  }
});

var NewStatusView = Backbone.View.extend({
  initialize: function(options) {
    this.statuses = options.statuses;

    this.statuses.on('add', this.clearInput, this);

    this.$('form').on('submit', $.proxy(this.addStatus, this));
  },
  addStatus: function(e) {
    e.preventDefault();

    this.statuses.add(this.$('textarea').val());
  },
  clearInput: function() {
    this.$('textarea').val('');
  }
});

var StatusesView = Backbone.View.extend({
  initialize: function(options) {
    this.statuses = options.statuses;

    this.statuses.on('add', this.appendStatus, this);
  },
  appendStatus: function(text) {
    this.$('ul').append('<li>' + text + '</li>');
  }
});


$(document).ready(function() {
  var statuses = new Statuses();
  new NewStatusView({ el: $('#new-status'), statuses: statuses });
  new StatusesView({ el: $('#statuses'), statuses: statuses });
});
