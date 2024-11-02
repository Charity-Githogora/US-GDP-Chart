d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json").then(function(dataset) {

    const h = 400;
    const w = 800;
    const padding = 50;
    const barWidth = w / dataset.data.length;
  
    var msDatesData = dataset.data.map(function(i) {
      return i[0];
    });
    var datesData = dataset.data.map(function(i) {
      return new Date(i[0]);
    });
    var numbersData = dataset.data.map(function(i) {
      return i[1];
    });
    var minDate = new Date(d3.min(datesData));
    var maxDate = new Date(d3.max(datesData));
    maxDate.setMonth(maxDate.getMonth() + 3);
  
    const xScale = d3.scaleTime().domain([minDate, maxDate])
                                   .range([padding, w - padding]);
    const yScale = d3.scaleLinear().domain([0, d3.max(numbersData)])
                                   .range([h - padding, padding]);
  
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
  
    // Append SVG to the #chart-container div
    const svg = d3.select("#chart-container")
                  .append("svg")
                  .attr("width", w).attr("height", h);
  
    svg.append("g").attr("transform", "translate(0, " + (h - padding) + ")")
                   .attr('id', 'x-axis')
                   .call(xAxis);
                   
    svg.append("g").attr("transform", 'translate(' + padding + ', 0)')
                   .attr('id', 'y-axis')
                   .call(yAxis);
                   
     // Add X-axis label
    svg.append("text")
       .attr("text-anchor", "end")
       .attr("x", w / 2)
       .attr("y", h - 10)
       .text("Year");
    
    // Set font size for x-axis labels
    svg.selectAll('.tick text')
       .style('font-size', '10px'); 
  
     // Add Y-axis label
    svg.append("text")
       .attr("text-anchor", "end")
       .attr("transform", "rotate(-90)")
       .attr("x", -h / 2 + padding)
       .attr("y", 12)
       .text("GDP in Billions");
  
    
    
    // Set font size for y-axis labels
    svg.selectAll('.tick text')
       .style('font-size', '10px');  
  
    // Tooltip div
    const tooltip = d3.select("body").append("div")
                      .attr("id", "tooltip");
  
    svg.selectAll('rect').data(dataset.data).enter().append('rect')
       .attr('class', 'bar')
       .attr('fill', '#483D8B')  // Change to your chosen dark color
       .attr('data-date', (d) => d[0])
       .attr('data-gdp', (d) => d[1])
       .attr('x', (d, i) => xScale(datesData[i]))
       .attr('y', (d, i) => yScale(d[1]))
       .attr('width', barWidth)
       .attr('height', (d) => (h - yScale(d[1]) - padding))
       .on("mouseover", function(event, d) {
          tooltip.style("visibility", "visible")
                 .attr('data-date', d[0])
                 .text('$' + d[1] + ' BILLION');
          d3.select(this).attr('fill', 'orange');
       })
       .on("mousemove", function(event) {
          tooltip.style("top", (event.pageY - 50) + "px")
                 .style("left", (event.pageX + 10) + "px");
       })
       .on("mouseout", function() {
          tooltip.style("visibility", "hidden");
          d3.select(this).attr('fill', '#483D8B');
       });
  });
  
  