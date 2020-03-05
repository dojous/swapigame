import React from "react";
import { render, act, waitForElementToBeRemoved } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import axiosMock from "axios";
import App from "./App";

jest.mock("axios");

describe("one player version", () => {
  test("should render correct list of resources", async () => {
    axiosMock.get.mockResolvedValueOnce({
      data: {
        people: "https://swapi.co/api/people/",
        planets: "https://swapi.co/api/planets/",
        films: "https://swapi.co/api/films/",
        species: "https://swapi.co/api/species/",
        vehicles: "https://swapi.co/api/vehicles/",
        starships: "https://swapi.co/api/starships/"
      }
    });
    await act(async () => {
      const { container, getByText } = render(
        <Router>
          <App />
        </Router>
      );
      await waitForElementToBeRemoved(() =>
        getByText("Loading swapi-game data")
      );
      expect(container).toMatchSnapshot("start screen");
    });
  });
});
