class Tiapp.Window.Idiom

  constructor: (item) ->
    @item = item

    @window = $.Window
        title: @item.title
        backButtonTitle: '返回'
        layout: 'vertical'
        backgroundColor: '#eee'
        width: 320
        height: Ti.UI.SIZE

    @view = $.ScrollView
        top: 0
        left: 0
        bottom: 10
        layout: 'vertical'

    @title = $.Label
        left: 10
        top: 10
        text: @item.title
        color: '#fff'
        font:
            fontSize: 60
        backgroundColor: '#333'
        borderRadius: 5

    @heteronyms_view = $.View
        layout: 'vertical'
        height: Ti.UI.SIZE

    @render_heteronyms()

    @bind()

  bind: ->
      @window.addEventListener 'close', (e) =>
          @destroy()

  render_heteronyms: ->
      if @item.heteronyms and @item.heteronyms.length > 0
          _.each @item.heteronyms, (heteronym, num) =>
              heteronym_view = new Tiapp.View.Heteronym(heteronym).render()
              @heteronyms_view.add heteronym_view

  render: ->
      @view.add @title
      @view.add @heteronyms_view

      @window.add @view
      @window

  destroy: ->
      @title = null
      @heteronyms_view = null

      @window.close()
