var slider = new GUId3.Slider()

slider.cssClass('example4')

slider.width(30).height(250).label('vertical!')
slider.type('vertical')

// set up the scale using a d3 scale!
var my_scale = d3.scale.linear().domain([1,100]).range([303,909])
slider.scale(my_scale)

// create the container, or select one
var container = d3.select('div#example4')
  .append('svg').attr('width', 500).attr('height', 300)



// create the slider
slider.create(container.append('g').attr('transform','translate(100,0)'))

// set the value of the slider
slider.setValue(808.1)