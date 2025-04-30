import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import {
  BarChart,
  TrendingUp,
  Map,
  DollarSign,
  Search,
  Home,
  Calendar,
  PieChart,
  ArrowRight,
  Download,
  ArrowUp,
  ArrowDown,
  ChevronDown,
} from "lucide-react";

const InsightsAnalytics = () => {
  const [timeRange, setTimeRange] = useState("month");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const marketTrendChartRef = useRef(null);
  const priceDistributionChartRef = useRef(null);
  const popularFeaturesChartRef = useRef(null);
  const searchTrendsChartRef = useRef(null);

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      const dummyData = {
        summary: {
          viewedProperties: 127,
          viewsChange: 8.2,
          favoritesAdded: 42,
          favoritesChange: 12.5,
          searchesMade: 215,
          searchesChange: -3.8,
          recommendationsViewed: 63,
          recommendationsChange: 21.4,
        },
        marketTrends: [
          { month: "Jan", price: 320 },
          { month: "Feb", price: 350 },
          { month: "Mar", price: 340 },
          { month: "Apr", price: 360 },
          { month: "May", price: 375 },
          { month: "Jun", price: 390 },
          { month: "Jul", price: 400 },
          { month: "Aug", price: 410 },
          { month: "Sep", price: 405 },
          { month: "Oct", price: 415 },
          { month: "Nov", price: 425 },
          { month: "Dec", price: 430 },
        ],
        priceDistribution: [
          { range: "$0-200k", count: 12 },
          { range: "$200k-400k", count: 45 },
          { range: "$400k-600k", count: 32 },
          { range: "$600k-800k", count: 18 },
          { range: "$800k-1M", count: 8 },
          { range: "$1M+", count: 5 },
        ],
        popularFeatures: [
          { feature: "Hardwood Floors", score: 85 },
          { feature: "Updated Kitchen", score: 78 },
          { feature: "Large Backyard", score: 62 },
          { feature: "Home Office", score: 58 },
          { feature: "Smart Home", score: 45 },
          { feature: "Pool", score: 25 },
        ],
        searchTrends: [
          { term: "Downtown", frequency: 68 },
          { term: "Pool", frequency: 52 },
          { term: "Modern", frequency: 48 },
          { term: "Garage", frequency: 45 },
          { term: "Waterfront", frequency: 36 },
          { term: "School District", frequency: 32 },
          { term: "New Construction", frequency: 28 },
          { term: "Views", frequency: 24 },
        ],
        topNeighborhoods: [
          { name: "Downtown", interest: 89, change: 5.2 },
          { name: "Highland Park", interest: 76, change: 3.8 },
          { name: "Riverside", interest: 72, change: 7.1 },
          { name: "West End", interest: 65, change: -2.3 },
          { name: "North Hills", interest: 58, change: 1.5 },
        ],
      };
      setData(dummyData);
      setLoading(false);
    }, 0);
  }, []);

  useEffect(() => {
    if (!loading && data) {
      renderMarketTrendChart();
      renderPriceDistributionChart();
      renderPopularFeaturesChart();
      renderSearchTrendsChart();
    }
  }, [loading, data]);

  const renderMarketTrendChart = () => {
    if (marketTrendChartRef.current) {
      d3.select(marketTrendChartRef.current).selectAll("*").remove();

      const margin = { top: 20, right: 30, bottom: 40, left: 50 };
      const width =
        marketTrendChartRef.current.clientWidth - margin.left - margin.right;
      const height = 300 - margin.top - margin.bottom;

      const svg = d3
        .select(marketTrendChartRef.current)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const x = d3
        .scaleBand()
        .domain(data.marketTrends.map((d) => d.month))
        .range([0, width])
        .padding(0.3);

      const y = d3
        .scaleLinear()
        .domain([
          d3.min(data.marketTrends, (d) => d.price) * 0.9,
          d3.max(data.marketTrends, (d) => d.price) * 1.1,
        ])
        .range([height, 0]);

      const line = d3
        .line()
        .x((d) => x(d.month) + x.bandwidth() / 2)
        .y((d) => y(d.price))
        .curve(d3.curveMonotoneX);

      // Add X axis
      svg
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .style("text-anchor", "middle");

      // Add Y axis
      svg.append("g").call(
        d3
          .axisLeft(y)
          .ticks(5)
          .tickFormat((d) => `$${d}k`)
      );

      // Add the line
      svg
        .append("path")
        .datum(data.marketTrends)
        .attr("fill", "none")
        .attr("stroke", "#3B82F6")
        .attr("stroke-width", 3)
        .attr("d", line);

      // Add dots
      svg
        .selectAll("dot")
        .data(data.marketTrends)
        .enter()
        .append("circle")
        .attr("cx", (d) => x(d.month) + x.bandwidth() / 2)
        .attr("cy", (d) => y(d.price))
        .attr("r", 5)
        .attr("fill", "#3B82F6");

      // Add grid lines
      svg
        .append("g")
        .attr("class", "grid")
        .call(d3.axisLeft(y).ticks(5).tickSize(-width).tickFormat(""))
        .attr("stroke-opacity", 0.1);
    }
  };

  const renderPriceDistributionChart = () => {
    if (priceDistributionChartRef.current) {
      d3.select(priceDistributionChartRef.current).selectAll("*").remove();

      const margin = { top: 20, right: 30, bottom: 40, left: 50 };
      const width =
        priceDistributionChartRef.current.clientWidth -
        margin.left -
        margin.right;
      const height = 300 - margin.top - margin.bottom;

      const svg = d3
        .select(priceDistributionChartRef.current)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const x = d3
        .scaleBand()
        .domain(data.priceDistribution.map((d) => d.range))
        .range([0, width])
        .padding(0.3);

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(data.priceDistribution, (d) => d.count) * 1.2])
        .range([height, 0]);

      // Add X axis
      svg
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .style("text-anchor", "middle");

      // Add Y axis
      svg.append("g").call(d3.axisLeft(y).ticks(5));

      // Add grid lines
      svg
        .append("g")
        .attr("class", "grid")
        .call(d3.axisLeft(y).ticks(5).tickSize(-width).tickFormat(""))
        .attr("stroke-opacity", 0.1);

      // Add bars
      svg
        .selectAll("bars")
        .data(data.priceDistribution)
        .enter()
        .append("rect")
        .attr("x", (d) => x(d.range))
        .attr("y", (d) => y(d.count))
        .attr("width", x.bandwidth())
        .attr("height", (d) => height - y(d.count))
        .attr("fill", "#3B82F6")
        .attr("rx", 4);
    }
  };

  const renderPopularFeaturesChart = () => {
    if (popularFeaturesChartRef.current) {
      d3.select(popularFeaturesChartRef.current).selectAll("*").remove();

      const margin = { top: 20, right: 30, bottom: 40, left: 120 };
      const width =
        popularFeaturesChartRef.current.clientWidth -
        margin.left -
        margin.right;
      const height = 300 - margin.top - margin.bottom;

      const svg = d3
        .select(popularFeaturesChartRef.current)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const y = d3
        .scaleBand()
        .domain(data.popularFeatures.map((d) => d.feature))
        .range([0, height])
        .padding(0.3);

      const x = d3.scaleLinear().domain([0, 100]).range([0, width]);

      // Add Y axis
      svg
        .append("g")
        .call(d3.axisLeft(y))
        .selectAll("text")
        .style("font-size", "12px");

      // Add X axis
      svg
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(
          d3
            .axisBottom(x)
            .ticks(5)
            .tickFormat((d) => `${d}%`)
        );

      // Add grid lines
      svg
        .append("g")
        .attr("class", "grid")
        .call(d3.axisBottom(x).ticks(5).tickSize(height).tickFormat(""))
        .attr("transform", `translate(0,0)`)
        .attr("stroke-opacity", 0.1);

      // Add bars
      svg
        .selectAll("bars")
        .data(data.popularFeatures)
        .enter()
        .append("rect")
        .attr("y", (d) => y(d.feature))
        .attr("x", 0)
        .attr("height", y.bandwidth())
        .attr("width", (d) => x(d.score))
        .attr("fill", "#3B82F6")
        .attr("rx", 4);

      // Add score labels
      svg
        .selectAll("text.score")
        .data(data.popularFeatures)
        .enter()
        .append("text")
        .attr("class", "score")
        .attr("y", (d) => y(d.feature) + y.bandwidth() / 2 + 4)
        .attr("x", (d) => x(d.score) + 5)
        .text((d) => `${d.score}%`)
        .attr("fill", "#4B5563")
        .attr("font-size", "12px");
    }
  };

  const renderSearchTrendsChart = () => {
    if (searchTrendsChartRef.current) {
      d3.select(searchTrendsChartRef.current).selectAll("*").remove();

      const margin = { top: 10, right: 10, bottom: 10, left: 10 };
      const width =
        searchTrendsChartRef.current.clientWidth - margin.left - margin.right;
      const height = 300 - margin.top - margin.bottom;

      const svg = d3
        .select(searchTrendsChartRef.current)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

      // Word cloud layout would be more complex
      // Simplified version with positioned text
      const fontScale = d3
        .scaleLinear()
        .domain([
          d3.min(data.searchTrends, (d) => d.frequency),
          d3.max(data.searchTrends, (d) => d.frequency),
        ])
        .range([14, 32]);

      const colorScale = d3
        .scaleOrdinal()
        .domain(data.searchTrends.map((d) => d.term))
        .range([
          "#3B82F6",
          "#60A5FA",
          "#93C5FD",
          "#2563EB",
          "#1D4ED8",
          "#BFDBFE",
          "#1E40AF",
          "#DBEAFE",
        ]);

      // Calculate positions (in a real word cloud, you'd use a special layout algorithm)
      const positions = [
        { x: -120, y: -80 },
        { x: 80, y: 60 },
        { x: -90, y: 40 },
        { x: 20, y: -60 },
        { x: 100, y: -20 },
        { x: -30, y: 100 },
        { x: -140, y: -20 },
        { x: 70, y: -90 },
      ];

      // Add terms
      svg
        .selectAll("text")
        .data(data.searchTrends)
        .enter()
        .append("text")
        .attr("x", (d, i) => positions[i].x)
        .attr("y", (d, i) => positions[i].y)
        .text((d) => d.term)
        .attr("font-size", (d) => `${fontScale(d.frequency)}px`)
        .attr("fill", (d) => colorScale(d.term))
        .attr("text-anchor", "middle")
        .attr("font-weight", "500");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Market Insights & Analytics
          </h1>
          <p className="text-gray-600 mt-2">
            Track market trends and analyze your property preferences
          </p>
        </div>
      </div>

      {/* Time Range Filter */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Calendar size={20} className="text-blue-600 mr-2" />
            <span className="text-gray-700 font-medium">Time Period:</span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setTimeRange("week")}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                timeRange === "week"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setTimeRange("month")}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                timeRange === "month"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setTimeRange("year")}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                timeRange === "year"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Year
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="container mx-auto px-4 flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="container mx-auto px-4">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Properties Viewed</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">
                    {data.summary.viewedProperties}
                  </h3>
                </div>
                <div
                  className={`flex items-center ${
                    data.summary.viewsChange >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {data.summary.viewsChange >= 0 ? (
                    <ArrowUp size={16} className="mr-1" />
                  ) : (
                    <ArrowDown size={16} className="mr-1" />
                  )}
                  <span className="font-medium">
                    {Math.abs(data.summary.viewsChange)}%
                  </span>
                </div>
              </div>
              <div className="mt-4 h-1 w-full bg-gray-200 rounded">
                <div
                  className="h-1 bg-blue-600 rounded"
                  style={{ width: "65%" }}
                ></div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Favorites Added</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">
                    {data.summary.favoritesAdded}
                  </h3>
                </div>
                <div
                  className={`flex items-center ${
                    data.summary.favoritesChange >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {data.summary.favoritesChange >= 0 ? (
                    <ArrowUp size={16} className="mr-1" />
                  ) : (
                    <ArrowDown size={16} className="mr-1" />
                  )}
                  <span className="font-medium">
                    {Math.abs(data.summary.favoritesChange)}%
                  </span>
                </div>
              </div>
              <div className="mt-4 h-1 w-full bg-gray-200 rounded">
                <div
                  className="h-1 bg-blue-600 rounded"
                  style={{ width: "40%" }}
                ></div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Searches Made</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">
                    {data.summary.searchesMade}
                  </h3>
                </div>
                <div
                  className={`flex items-center ${
                    data.summary.searchesChange >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {data.summary.searchesChange >= 0 ? (
                    <ArrowUp size={16} className="mr-1" />
                  ) : (
                    <ArrowDown size={16} className="mr-1" />
                  )}
                  <span className="font-medium">
                    {Math.abs(data.summary.searchesChange)}%
                  </span>
                </div>
              </div>
              <div className="mt-4 h-1 w-full bg-gray-200 rounded">
                <div
                  className="h-1 bg-blue-600 rounded"
                  style={{ width: "80%" }}
                ></div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-500 text-sm">
                    Recommendations Viewed
                  </p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">
                    {data.summary.recommendationsViewed}
                  </h3>
                </div>
                <div
                  className={`flex items-center ${
                    data.summary.recommendationsChange >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {data.summary.recommendationsChange >= 0 ? (
                    <ArrowUp size={16} className="mr-1" />
                  ) : (
                    <ArrowDown size={16} className="mr-1" />
                  )}
                  <span className="font-medium">
                    {Math.abs(data.summary.recommendationsChange)}%
                  </span>
                </div>
              </div>
              <div className="mt-4 h-1 w-full bg-gray-200 rounded">
                <div
                  className="h-1 bg-blue-600 rounded"
                  style={{ width: "50%" }}
                ></div>
              </div>
            </div>
          </div>

          {/* Main Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Market Trends */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <TrendingUp size={20} className="text-blue-600 mr-2" />
                  <h2 className="text-lg font-bold text-gray-800">
                    Market Trends
                  </h2>
                </div>
                <div className="flex items-center">
                  <button className="text-blue-600 flex items-center text-sm font-medium">
                    View Details <ArrowRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
              <div ref={marketTrendChartRef} className="w-full h-72"></div>
              <div className="mt-4 flex justify-between text-sm text-gray-500">
                <div>
                  Average Price:{" "}
                  <span className="font-medium text-gray-700">
                    $
                    {data.marketTrends.reduce(
                      (sum, item) => sum + item.price,
                      0
                    ) / data.marketTrends.length}
                    k
                  </span>
                </div>
                <div>
                  Yearly Change:{" "}
                  <span className="font-medium text-green-600">+8.4%</span>
                </div>
              </div>
            </div>

            {/* Price Distribution */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <BarChart size={20} className="text-blue-600 mr-2" />
                  <h2 className="text-lg font-bold text-gray-800">
                    Price Distribution
                  </h2>
                </div>
                <div className="flex items-center">
                  <button className="text-blue-600 flex items-center text-sm font-medium">
                    View Details <ArrowRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
              <div
                ref={priceDistributionChartRef}
                className="w-full h-72"
              ></div>
              <div className="mt-4 flex justify-between text-sm text-gray-500">
                <div>
                  Most Common:{" "}
                  <span className="font-medium text-gray-700">$200k-400k</span>
                </div>
                <div>
                  Median Price:{" "}
                  <span className="font-medium text-gray-700">$450k</span>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Popular Features */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Home size={20} className="text-blue-600 mr-2" />
                  <h2 className="text-lg font-bold text-gray-800">
                    Popular Features
                  </h2>
                </div>
                <div className="flex items-center">
                  <button className="text-blue-600 flex items-center text-sm font-medium">
                    View Details <ArrowRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
              <div ref={popularFeaturesChartRef} className="w-full h-72"></div>
            </div>

            {/* Search Trends */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Search size={20} className="text-blue-600 mr-2" />
                  <h2 className="text-lg font-bold text-gray-800">
                    Search Trends
                  </h2>
                </div>
                <div className="flex items-center">
                  <button className="text-blue-600 flex items-center text-sm font-medium">
                    View Details <ArrowRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
              <div ref={searchTrendsChartRef} className="w-full h-72"></div>
            </div>
          </div>

          {/* Top Neighborhoods */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Map size={20} className="text-blue-600 mr-2" />
                <h2 className="text-lg font-bold text-gray-800">
                  Top Neighborhoods
                </h2>
              </div>
              <div className="flex items-center">
                <button className="text-blue-600 flex items-center text-sm font-medium">
                  View All <ArrowRight size={16} className="ml-1" />
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Neighborhood
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Interest Score
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Change
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.topNeighborhoods.map((neighborhood, index) => (
                    <tr
                      key={index}
                      className={
                        index < data.topNeighborhoods.length - 1
                          ? "border-b border-gray-200"
                          : ""
                      }
                    >
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-800">
                          {neighborhood.name}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                            <div
                              className="bg-blue-600 h-2.5 rounded-full"
                              style={{ width: `${neighborhood.interest}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-700">
                            {neighborhood.interest}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div
                          className={`flex items-center ${
                            neighborhood.change >= 0
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {neighborhood.change >= 0 ? (
                            <ArrowUp size={16} className="mr-1" />
                          ) : (
                            <ArrowDown size={16} className="mr-1" />
                          )}
                          <span>{Math.abs(neighborhood.change)}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Export Section */}
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Data last updated: April 21, 2025 at 10:30 AM
            </div>
            <div className="flex items-center">
              <button className="flex items-center bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                <Download size={16} className="mr-2" />
                Export Report
              </button>
              <button className="flex items-center bg-blue-600 rounded-lg px-4 py-2 text-sm font-medium text-white ml-3 hover:bg-blue-700">
                Create Custom Report
              </button>
            </div>
          </div>

          {/* Custom Insights (Optional section) */}
          <div className="mt-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-md p-6 text-white">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Personalized Insights</h2>
              <button className="text-white flex items-center text-sm font-medium">
                View All <ArrowRight size={16} className="ml-1" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-filter backdrop-blur-sm">
                <div className="flex items-start mb-3">
                  <DollarSign className="mr-2 mt-1" size={18} />
                  <div>
                    <h3 className="font-medium">Price Drop Opportunities</h3>
                    <p className="text-sm text-blue-100 mt-1">
                      5 properties in your watchlist have reduced their prices
                      by an average of 8% this week.
                    </p>
                  </div>
                </div>
                <button className="text-sm font-medium flex items-center">
                  View Properties <ArrowRight size={14} className="ml-1" />
                </button>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-filter backdrop-blur-sm">
                <div className="flex items-start mb-3">
                  <TrendingUp className="mr-2 mt-1" size={18} />
                  <div>
                    <h3 className="font-medium">Market Prediction</h3>
                    <p className="text-sm text-blue-100 mt-1">
                      Based on current trends, Downtown area is expected to see
                      a 4-6% price increase in the next quarter.
                    </p>
                  </div>
                </div>
                <button className="text-sm font-medium flex items-center">
                  View Analysis <ArrowRight size={14} className="ml-1" />
                </button>
              </div>
            </div>
          </div>

          {/* Compare Markets Section */}
          <div className="mt-8 bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <PieChart size={20} className="text-blue-600 mr-2" />
                <h2 className="text-lg font-bold text-gray-800">
                  Compare Markets
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Primary Market
                </label>
                <div className="relative">
                  <select className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md">
                    <option>Downtown</option>
                    <option>Highland Park</option>
                    <option>Riverside</option>
                    <option>West End</option>
                    <option>North Hills</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <ChevronDown size={16} className="text-gray-400" />
                  </div>
                </div>
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Comparison Market
                </label>
                <div className="relative">
                  <select className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md">
                    <option>Riverside</option>
                    <option>Downtown</option>
                    <option>Highland Park</option>
                    <option>West End</option>
                    <option>North Hills</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <ChevronDown size={16} className="text-gray-400" />
                  </div>
                </div>
              </div>
              <div className="col-span-1 flex items-end">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 text-sm font-medium">
                  Compare Markets
                </button>
              </div>
            </div>
            <div className="mt-6 border-t border-gray-200 pt-4">
              <div className="text-center text-gray-500 text-sm">
                Select markets to compare detailed analytics and trends
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InsightsAnalytics;
