const config = {
  baseImagePath:
    process.env.NODE_ENV === "production"
      ? "/TerraNova/images" // Assuming TerraNova is your repo name
      : "/images",
};

export default config;
