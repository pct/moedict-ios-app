class Tiapp.Window.Main

  constructor: ->
    @main_window = $.Window
        backgroundColor: '#fff'

    @content_window = $.Window
        navBarHidden: off
        title: '萌 Point'
        layout: 'vertical'

    @nav_group = Ti.UI.iPhone.createNavigationGroup
        window: @content_window

    @search = $.SearchBar
        showCancel: off
        height: 43
        top: 0
        hintText: '請輸入字詞搜尋，如：萌'

    @tableview = $.TableView
        top: 0

    @bind()

  bind: ->
      $(@search).return (e) =>
          q = e.value
          @search.blur()
          @tableview.scrollToTop()

          $.http
              url: "#{SEARCH_SERVER}/s/#{q}"
              dataType: 'JSON'
              onLoad: (data, http, event) =>
                  if data.length > 0
                      @render_rows data
                  else
                      alert '查無資料'
              onError: (http, event) =>
                  alert '網路不佳，請重試！'

      @main_window.addEventListener 'close', (e) =>
          @destroy()

  render_rows: (data) ->
      _data = []
      _.each data, (item, num) =>
          row = $.TableViewRow
              title: item.title

          $(row).click =>
              if item.title.length is 1
                  window = new Tiapp.Window.Dict(item).render()
              else
                  window = new Tiapp.Window.Idiom(item).render()

              @nav_group.open window

          _data.push row

      @tableview.setData _data



  render: ->
      @content_window.add @search
      @content_window.add @tableview

      @main_window.add @nav_group

      @main_window

  destroy: ->
      @nav_group = null

      @main_window.close()
