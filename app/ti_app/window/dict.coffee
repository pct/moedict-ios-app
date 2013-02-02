class Tiapp.Window.Dict

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
            fontSize: 80
        backgroundColor: '#333'
        borderRadius: 5

    # 部首
    @radical = $.Label
        text: "【部首】#{@item.radical}"
        top: -90
        left: 100
        color: '#444'

    # 總筆畫
    @stroke_count = $.Label
        text: "【總筆畫】#{@item.stroke_count}"
        top: 5
        left: 100
        color: '#444'

    # 外筆畫
    @non_radical_stroke_count = $.Label
        text: "【部首外筆畫】#{@item.non_radical_stroke_count}"
        top: 5
        left: 100
        color: '#444'

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
      @view.add @radical
      @view.add @stroke_count
      @view.add @non_radical_stroke_count
      @view.add @heteronyms_view

      @window.add @view
      @window

  destroy: ->
      @title = null
      @radical = null
      @stroke_count = null
      @non_radical_stroke_count = null
      @heteronyms_view = null

      @window.close()
