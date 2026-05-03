import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import App from "../App";
import Landing from "../views/Landing";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    HydrateFallback: () => <div>Loading...</div>, 
    children: [
      {
        path: "",
        lazy: async () => {
          const { default: Component } = await import("../views/Landing");
          return { Component };
        },
      },
      {
        path: "brands",
        lazy: async () => {
          const { default: Component } = await import("../views/Brands");
          return { Component };
        },
      },
      {
        path: "brands/:name",
        lazy: async () => {
          const { default: Component } = await import("../views/BrandComingSoon");
          return { Component };
        },
      },
      {
        path: "*",
        lazy: async () => {
          const { default: Component } = await import("../views/NotFound");
          return { Component };
        },
      },
    ],
  },
]);

export default router;