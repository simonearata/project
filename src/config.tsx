export const apiConfig = {
  environments: {
    dev: {
      apiUrl: "http://localhost:1337/api/",
      /* apiKey: "HVspWXQ_fjQAfHeNm3mPzpJkNZn2LQBM", */
    },
    qlt: {
      apiUrl: "http://localhost:1337/api/",
      /* apiKey: "HVspWXQ_fjQAfHeNm3mPzpJkNZn2LQBM", */
    },
    prod: {
      apiUrl: "http://localhost:1337/api/",
      /* apiKey: "HVspWXQ_fjQAfHeNm3mPzpJkNZn2LQBM", */
    },
  },

  environmentsPolygons: {
    dev: {
      apiUrl: "https://api.polygon.io/v2/aggs/ticker/",
      apiKey: "HVspWXQ_fjQAfHeNm3mPzpJkNZn2LQBM",
    },
    qlt: {
      apiUrl: "https://api.polygon.io/v2/aggs/ticker/",
      apiKey: "HVspWXQ_fjQAfHeNm3mPzpJkNZn2LQBM",
    },
    prod: {
      apiUrl: "https://api.polygon.io/v1/open-close/",
      apiKey: "HVspWXQ_fjQAfHeNm3mPzpJkNZn2LQBM",
    },
  },
};
