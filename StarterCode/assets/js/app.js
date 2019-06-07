// @TODO: YOUR CODE HERE!
d3.csv('data.csv', function (data) {
    var body = d3.select('body')
    var margin = {
        top: 20,
        right: 40,
        bottom: 100,
        left: 100
    };

    var svgHeight = window.innerHeight;
    var svgWidth = window.innerWidth;
    var w = svgWidth - margin.left - margin.right;
    var h = svgHeight - margin.top - margin.bottom;

    //var colorScale = d3.scale.category20()
    //var colorScale = d3.scaleLinear()
    //.domain([-1, 0, 1])
    //.range(["red", "white", "green"]);
    var xScale = d3.scaleLinear()
        .domain([
            (d3.min(data, function (d) { return d.poverty })),
            (d3.max(data, function (d) { return d.poverty }))
        ])
        .range([0, w])
    var yScale = d3.scaleLinear()
        .domain([
            d3.min([0, d3.min(data, function (d) { return d.obesity })]),
            d3.max([0, d3.max(data, function (d) { return d.obesity })])
        ])
        .range([h, 0])
    var svg = d3
        .select("body")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);
    var xAxis = d3.axisBottom()
        .scale(xScale)
        .ticks(10)
    // Y-axis
    var yAxis = d3.axisLeft()
        .scale(yScale)
        .ticks(5)
    var circles = svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', function (d) { return xScale(d.poverty) })
        .attr('cy', function (d) { return yScale(d.obesity) })
        .attr('r', '10')
        .attr('stroke', 'black')
        .attr('stroke-width', 1)
    //.attr('fill', function (d, i) { return colorScale(i) })
    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(0,' + h + ')')
        .call(xAxis)
        .append('text') // X-axis Label
        .attr('class', 'label')
        .attr('y', -10)
        .attr('x', w)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .text('Poverty Rate')
    // Y-axis
    svg.append('g')
        .attr('class', 'axis')
        .call(yAxis)
        .append('text') // y-axis Label
        .attr('class', 'label')
        .attr('transform', 'rotate(-90)')
        .attr('x', 0)
        .attr('y', 5)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .text('Obesity Rate')
})

