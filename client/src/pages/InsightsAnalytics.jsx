import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import { motion } from "framer-motion";
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

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

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
          { month: "Jan", price: 80 },
          { month: "Feb", price: 85 },
          { month: "Mar", price: 82 },
          { month: "Apr", price: 88 },
          { month: "May", price: 90 },
          { month: "Jun", price: 95 },
          { month: "Jul", price: 98 },
          { month: "Aug", price: 100 },
          { month: "Sep", price: 97 },
          { month: "Oct", price: 102 },
          { month: "Nov", price: 105 },
          { month: "Dec", price: 108 },
        ],
        priceDistribution: [
          { range: "৳50L-1C", count: 25 },
          { range: "৳1C-2C", count: 48 },
          { range: "৳2C-3C", count: 35 },
          { range: "৳3C-5C", count: 20 },
          { range: "৳5C-8C", count: 12 },
          { range: "৳8C+", count: 5 },
        ],
        popularFeatures: [
          { feature: "South Facing", score: 85 },
          { feature: "Ready Flat", score: 78 },
          { feature: "Car Parking", score: 72 },
          { feature: "Generator", score: 65 },
          { feature: "Lift System", score: 58 },
          { feature: "Gas Connection", score: 52 },
        ],
        searchTrends: [
          { term: "Gulshan", frequency: 68 },
          { term: "Dhanmondi", frequency: 62 },
          { term: "Bashundhara", frequency: 58 },
          { term: "Banani", frequency: 52 },
          { term: "Uttara", frequency: 48 },
          { term: "Mirpur", frequency: 42 },
          { term: "Mohammadpur", frequency: 38 },
          { term: "Baridhara", frequency: 32 },
        ],
        topNeighborhoods: [
          { name: "Gulshan", interest: 89, change: 5.2 },
          { name: "Dhanmondi", interest: 82, change: 4.8 },
          { name: "Bashundhara", interest: 78, change: 7.1 },
          { name: "Banani", interest: 75, change: -2.3 },
          { name: "Uttara", interest: 72, change: 3.5 },
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
          .tickFormat((d) => `৳${d}L`)
      );

      // Add the animated line
      svg
        .append("path")
        .datum(data.marketTrends)
        .attr("fill", "none")
        .attr("stroke", "#3B82F6")
        .attr("stroke-width", 3)
        .attr("d", line)
        .style("opacity", 0)
        .transition()
        .duration(1000)
        .style("opacity", 1);

      // Add animated dots
      svg
        .selectAll("circle")
        .data(data.marketTrends)
        .enter()
        .append("circle")
        .attr("cx", (d) => x(d.month) + x.bandwidth() / 2)
        .attr("cy", (d) => y(d.price))
        .attr("r", 0)
        .attr("fill", "#3B82F6")
        .transition()
        .delay((d, i) => i * 100)
        .duration(500)
        .attr("r", 5);

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

      // Add animated bars
      svg
        .selectAll("rect")
        .data(data.priceDistribution)
        .enter()
        .append("rect")
        .attr("x", (d) => x(d.range))
        .attr("width", x.bandwidth())
        .attr("y", height)
        .attr("height", 0)
        .attr("fill", "#3B82F6")
        .attr("rx", 4)
        .transition()
        .duration(1000)
        .attr("y", (d) => y(d.count))
        .attr("height", (d) => height - y(d.count));
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
    <div className="bg-gray-50 min-h-screen pb-12 pt-16">
      {/* Header with fade in animation */}
      <motion.div
        className="bg-white shadow"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Market Insights & Analytics
          </h1>
          <p className="text-gray-600 mt-2">
            Track market trends and analyze your property preferences
          </p>
        </div>
      </motion.div>

      {/* Time Range Filter with slide in animation */}
      <motion.div
        className="container mx-auto px-4 py-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
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
      </motion.div>

      {loading ? (
        <div className="container mx-auto px-4 flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <motion.div
          className="container mx-auto px-4"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* Summary Stats with stagger animation */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div variants={fadeInUp} className="bg-white rounded-xl shadow-md p-6">
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
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-white rounded-xl shadow-md p-6">
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
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-white rounded-xl shadow-md p-6">
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
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-white rounded-xl shadow-md p-6">
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
            </motion.div>
          </motion.div>

          {/* Main Charts with fade in animation */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
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
                    ৳
                    {data.marketTrends.reduce(
                      (sum, item) => sum + item.price,
                      0
                    ) / data.marketTrends.length}
                    L
                  </span>
                </div>
                <div>
                  Yearly Change:{" "}
                  <span className="font-medium text-green-600">+8.4%</span>
                </div>
              </div>
            </div>

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
                  <span className="font-medium text-gray-700">৳1C-2C</span>
                </div>
                <div>
                  Median Price:{" "}
                  <span className="font-medium text-gray-700">৳2.5C</span>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
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
                      5 properties in your watchlist in Dhanmondi have reduced
                      their prices by an average of 5% this week.
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
                      Based on current trends, Gulshan area is expected to see a
                      6-8% price increase in the next quarter.
                    </p>
                  </div>
                </div>
                <button className="text-sm font-medium flex items-center">
                  View Analysis <ArrowRight size={14} className="ml-1" />
                </button>
              </div>
            </div>
          </div>

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
                    <option>Gulshan</option>
                    <option>Dhanmondi</option>
                    <option>Banani</option>
                    <option>Bashundhara</option>
                    <option>Uttara</option>
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
                    <option>Mirpur</option>
                    <option>Mohammadpur</option>
                    <option>Baridhara</option>
                    <option>Motijheel</option>
                    <option>Niketan</option>
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
                Select areas to compare detailed analytics and market trends across Dhaka
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default InsightsAnalytics;
