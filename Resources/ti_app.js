(function() {
  var SEARCH_SERVER, Tiapp, root;

  root = this;

  Tiapp = root.Tiapp = {
    App: {},
    Model: {},
    View: {},
    Window: {}
  };

  SEARCH_SERVER = 'http://moedict-api.4point-inc.com';

  Tiapp.App = (function() {

    function App() {}

    App.prototype.run = function() {
      var main;
      main = new Tiapp.Window.Main().render();
      return main.open();
    };

    return App;

  })();

  Ti.UI.createActivityIndicator;

  Ti.UI.createButton;

  Ti.UI.createEmailDialog;

  Ti.UI.createImageView;

  Ti.UI.createLabel;

  Ti.UI.createOptionDialog;

  Ti.UI.createPicker;

  Ti.UI.createProgressBar;

  Ti.UI.createScrollView;

  Ti.UI.createTab;

  Ti.UI.createTabGroup;

  Ti.UI.createTableView;

  Ti.UI.createTableViewRow;

  Ti.UI.createToolbar;

  Ti.UI.createView;

  Ti.UI.createWebView;

  Ti.UI.createWindow;

  Tiapp.View.Definition = (function() {

    function Definition(item) {
      this.item = item;
      this.view = $.View({
        top: 10,
        left: 0,
        layout: 'horizontal',
        width: 300,
        height: Ti.UI.SIZE
      });
      this.type = $.Label({
        text: this.item.type,
        top: 5,
        left: 5,
        height: Ti.UI.SIZE,
        backgroundColor: '#333',
        color: '#fff',
        borderRadius: 2
      });
      this.def = $.Label({
        text: this.item.def,
        top: 5,
        left: 5,
        height: Ti.UI.SIZE
      });
    }

    Definition.prototype.render = function() {
      this.view.add(this.type);
      this.view.add(this.def);
      return this.view;
    };

    Definition.prototype.destroy = function() {};

    return Definition;

  })();

  Tiapp.View.Heteronym = (function() {

    function Heteronym(item) {
      this.item = item;
      this.view = $.View({
        top: 20,
        left: 10,
        bottom: 30,
        layout: 'vertical',
        height: Ti.UI.SIZE
      });
      this.bopomofo = $.Label({
        text: "[注音一式]" + this.item.bopomofo,
        top: 5,
        left: 5,
        color: '#333',
        height: Ti.UI.SIZE
      });
      this.bopomofo2 = $.Label({
        text: "[注音二式]" + this.item.bopomofo2,
        top: 5,
        left: 5,
        color: '#333',
        height: Ti.UI.SIZE
      });
      this.pinyin = $.Label({
        text: "[漢語拼音]" + this.item.pinyin,
        top: 5,
        left: 5,
        color: '#333',
        height: Ti.UI.SIZE
      });
    }

    Heteronym.prototype.render = function() {
      var _this = this;
      this.view.add(this.bopomofo);
      this.view.add(this.bopomofo2);
      if (this.item.pinyin) {
        this.view.add(this.pinyin);
      }
      if (this.item.definitions && this.item.definitions.length > 0) {
        _.each(this.item.definitions, function(definition, num) {
          var definition_view;
          definition_view = new Tiapp.View.Definition(definition).render();
          return _this.view.add(definition_view);
        });
      }
      return this.view;
    };

    return Heteronym;

  })();

  Tiapp.Window.Dict = (function() {

    function Dict(item) {
      this.item = item;
      this.window = $.Window({
        title: this.item.title,
        backButtonTitle: '返回',
        layout: 'vertical',
        backgroundColor: '#eee',
        width: 320,
        height: Ti.UI.SIZE
      });
      this.view = $.ScrollView({
        top: 0,
        left: 0,
        bottom: 10,
        layout: 'vertical'
      });
      this.title = $.Label({
        left: 10,
        top: 10,
        text: this.item.title,
        color: '#fff',
        font: {
          fontSize: 80
        },
        backgroundColor: '#333',
        borderRadius: 5
      });
      this.radical = $.Label({
        text: "【部首】" + this.item.radical,
        top: -90,
        left: 100,
        color: '#444'
      });
      this.stroke_count = $.Label({
        text: "【總筆畫】" + this.item.stroke_count,
        top: 5,
        left: 100,
        color: '#444'
      });
      this.non_radical_stroke_count = $.Label({
        text: "【部首外筆畫】" + this.item.non_radical_stroke_count,
        top: 5,
        left: 100,
        color: '#444'
      });
      this.heteronyms_view = $.View({
        layout: 'vertical',
        height: Ti.UI.SIZE
      });
      this.render_heteronyms();
      this.bind();
    }

    Dict.prototype.bind = function() {
      var _this = this;
      return this.window.addEventListener('close', function(e) {
        return _this.destroy();
      });
    };

    Dict.prototype.render_heteronyms = function() {
      var _this = this;
      if (this.item.heteronyms && this.item.heteronyms.length > 0) {
        return _.each(this.item.heteronyms, function(heteronym, num) {
          var heteronym_view;
          heteronym_view = new Tiapp.View.Heteronym(heteronym).render();
          return _this.heteronyms_view.add(heteronym_view);
        });
      }
    };

    Dict.prototype.render = function() {
      this.view.add(this.title);
      this.view.add(this.radical);
      this.view.add(this.stroke_count);
      this.view.add(this.non_radical_stroke_count);
      this.view.add(this.heteronyms_view);
      this.window.add(this.view);
      return this.window;
    };

    Dict.prototype.destroy = function() {
      this.title = null;
      this.radical = null;
      this.stroke_count = null;
      this.non_radical_stroke_count = null;
      this.heteronyms_view = null;
      return this.window.close();
    };

    return Dict;

  })();

  Tiapp.Window.Idiom = (function() {

    function Idiom(item) {
      this.item = item;
      this.window = $.Window({
        title: this.item.title,
        backButtonTitle: '返回',
        layout: 'vertical',
        backgroundColor: '#eee',
        width: 320,
        height: Ti.UI.SIZE
      });
      this.view = $.ScrollView({
        top: 0,
        left: 0,
        bottom: 10,
        layout: 'vertical'
      });
      this.title = $.Label({
        left: 10,
        top: 10,
        text: this.item.title,
        color: '#fff',
        font: {
          fontSize: 60
        },
        backgroundColor: '#333',
        borderRadius: 5
      });
      this.heteronyms_view = $.View({
        layout: 'vertical',
        height: Ti.UI.SIZE
      });
      this.render_heteronyms();
      this.bind();
    }

    Idiom.prototype.bind = function() {
      var _this = this;
      return this.window.addEventListener('close', function(e) {
        return _this.destroy();
      });
    };

    Idiom.prototype.render_heteronyms = function() {
      var _this = this;
      if (this.item.heteronyms && this.item.heteronyms.length > 0) {
        return _.each(this.item.heteronyms, function(heteronym, num) {
          var heteronym_view;
          heteronym_view = new Tiapp.View.Heteronym(heteronym).render();
          return _this.heteronyms_view.add(heteronym_view);
        });
      }
    };

    Idiom.prototype.render = function() {
      this.view.add(this.title);
      this.view.add(this.heteronyms_view);
      this.window.add(this.view);
      return this.window;
    };

    Idiom.prototype.destroy = function() {
      this.title = null;
      this.heteronyms_view = null;
      return this.window.close();
    };

    return Idiom;

  })();

  Tiapp.Window.Main = (function() {

    function Main() {
      this.main_window = $.Window({
        backgroundColor: '#fff'
      });
      this.content_window = $.Window({
        navBarHidden: false,
        title: '萌 Point',
        layout: 'vertical'
      });
      this.nav_group = Ti.UI.iPhone.createNavigationGroup({
        window: this.content_window
      });
      this.search = $.SearchBar({
        showCancel: false,
        height: 43,
        top: 0,
        hintText: '請輸入字詞搜尋，如：萌'
      });
      this.tableview = $.TableView({
        top: 0
      });
      this.bind();
    }

    Main.prototype.bind = function() {
      var _this = this;
      $(this.search)["return"](function(e) {
        var q;
        q = e.value;
        _this.search.blur();
        _this.tableview.scrollToTop();
        return $.http({
          url: "" + SEARCH_SERVER + "/s/" + q,
          dataType: 'JSON',
          onLoad: function(data, http, event) {
            if (data.length > 0) {
              return _this.render_rows(data);
            } else {
              return alert('查無資料');
            }
          },
          onError: function(http, event) {
            return alert('網路不佳，請重試！');
          }
        });
      });
      return this.main_window.addEventListener('close', function(e) {
        return _this.destroy();
      });
    };

    Main.prototype.render_rows = function(data) {
      var _data,
        _this = this;
      _data = [];
      _.each(data, function(item, num) {
        var row;
        row = $.TableViewRow({
          title: item.title
        });
        $(row).click(function() {
          var window;
          if (item.title.length === 1) {
            window = new Tiapp.Window.Dict(item).render();
          } else {
            window = new Tiapp.Window.Idiom(item).render();
          }
          return _this.nav_group.open(window);
        });
        return _data.push(row);
      });
      return this.tableview.setData(_data);
    };

    Main.prototype.render = function() {
      this.content_window.add(this.search);
      this.content_window.add(this.tableview);
      this.main_window.add(this.nav_group);
      return this.main_window;
    };

    Main.prototype.destroy = function() {
      this.nav_group = null;
      return this.main_window.close();
    };

    return Main;

  })();

  new Tiapp.App().run();

}).call(this);
