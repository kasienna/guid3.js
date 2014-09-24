/*globals slider: true, button: true */

JS.Test.describe('Button', function(){ with(this){

  before(function(){ with(this){

    window.button_obser1 = { v: true }

    this.svg = d3.select('div#test').append('svg')
      .attr('width', 512)
      .attr('height', 512)

    g_button1 = this.svg.append('g')
     .attr('transform', 'translate(120,300)')

    // pass in a callback
    button = new GUId3.button(function(d){console.log('from callback button 1',d)})

    button.cssClass('green_button')
    button.width(150).height(50).connect(window.button_obser1,'v')
    button.type('toggle')
    button.labelOn('state on')
    button.labelOff('=)')
    button.roundedPercent(10)

    // button1.callback(function(d){console.log(d,'zomg')})

    // create the element on the d3 selection
    button.create(g_button1) // you can also chain the create function at the end

  }})

  after(function(){ with(this){

    this.svg.remove()
    button = null

  }})

  describe('internals', function(){ with(this){

    it('self is reference to this', function() { with(this) {
      console.log('in the test')
      assertEqual( button.self, button.this )
    }})

  }})

  describe('default properties', function(){ with(this){

    it('has the property _cssClass', function() { with(this) {
      console.log('in the test')
      assertNot( undefined, button._cssClass )
    }})

    it('has the property _cssId', function() { with(this) {
      assertNot( undefined, button._cssId  )
    }})

    it('has the property _type', function() { with(this) {
      assert( 'toggle', button._type )
    }})

  }})

  describe('node creation', function(){ with(this){

    it('has a parent group element node', function() { with(this) {
      assertNotEqual( null, button.g_root.node() )
    }})
    //
    it('has a child rect element with class guid3-button', function() { with(this) {
      var selection = d3.select(button.g_root.node())
                        .select('rect.guid3-button')
      assertNotEqual( null, selection.node() )
    }})

    it('has a child text element with class guid3-button-text', function() { with(this) {
      var selection = d3.select(button.g_root.node())
                        .select('text.guid3-button-text')
      assertNotEqual( null, selection.node() )
    }})

  }})

  describe('Object.observe functionality', function(){ with(this){

    it('calling setValue changes the target object', function() { with(this) {

      button.setValue(false)
      assertEqual( false, window.button_obser1.v)
      button.setValue(true)
      assertEqual( true, window.button_obser1.v)

    }})

  }})

  describe('custom functionality', function(){ with(this){

    it('calling toggle() changes the target object', function() { with(this) {

      button.toggle()
      assertEqual( false, window.button_obser1.v)
      button.toggle()
      assertEqual( true, window.button_obser1.v)

    }})

  }})


}})



JS.Test.describe('Slider', function(){ with(this){

    // setup
    before(function(){ with(this){
      console.log('here before')

      window.callback_target = 32
      window.target_object = { value: 0.1 }

      this.svg = d3.select('div#test').append('svg')
        .attr('width', 512)
        .attr('height', 512)

      function constructorCallback(v){
        console.log('testing constructor callback', v)
        window.callback_target = v
      }

      slider = new GUId3.slider(constructorCallback)

      slider.scale(d3.scale.linear().domain([0,1]).range([0,100]))
      slider.width(200)
      slider.height(20)

      slider.connect(window.target_object, 'value')
      slider.create(this.svg)

    }})

    // destroy
    after(function(){ with(this){
      console.log('after')

      this.svg.remove()
      slider = null

    }})

    describe('internals', function(){ with(this){

      it('self is reference to this', function() { with(this) {
        console.log('in the test')
        assertEqual( slider.self, slider.this)
      }})

    }})

    describe('default properties', function(){ with(this){

      it('has the property _cssClass', function() { with(this) {
        console.log('in the test')
        assertNot( undefined, slider._cssClass )
      }})

      it('has the property _cssId', function() { with(this) {
        assertNot( undefined, slider._cssId )
      }})

      it('has the property _type', function() { with(this) {
        assert( 'horizontal', slider._type )
      }})

    }})

    describe('node creation', function(){ with(this){

      it('has a parent group element node', function() { with(this) {
        assertNotEqual( slider.g_root.node(), null )
      }})

      it('has a child rect element with class guid3-slider', function() { with(this) {
        var selection = d3.select(slider.g_root.node())
                          .select('rect.guid3-slider')
        assertNotEqual( selection.node(), null )
      }})

      it('has a child rect element with class guid3-slider-indicator', function() { with(this) {
        var selection = d3.select(slider.g_root.node())
                          .select('rect.guid3-slider-indicator')
        assertNotEqual( selection.node(), null )
      }})

      it('has a child text element with class guid3-slider-textlabel', function() { with(this) {
        var selection = d3.select(slider.g_root.node())
                          .select('text.guid3-slider-textlabel')
        assertNotEqual( selection.node(), null )
      }})

      it('has a child text element with class guid3-slider-textvalue', function() { with(this) {
        var selection = d3.select(slider.g_root.node())
                          .select('text.guid3-slider-textvalue')
        assertNotEqual( selection.node(), null )
      }})


    }})

    describe('visual accuracy', function(){ with(this){

      it('slider visual width is correct', function() { with(this) {
        var slider_width = parseInt(d3.select(slider.g_root.node())
          .select('rect.guid3-slider').attr('width'))

        assertEqual( slider_width, 200 )
      }})

      it('slider visual height is correct', function() { with(this) {
        var slider_height = parseInt(d3.select(slider.g_root.node())
          .select('rect.guid3-slider').attr('height'))

        assertEqual( slider_height, 20 )
      }})

    }})

    describe('Object.observe functionality', function(){ with(this){

      it('calling setValue changes the target object', function() { with(this) {

        slider.setValue(101.1)
        assertEqual( window.target_object.value, 101.1)

      }})

    }})

}})

console.info('tests done being loaded')