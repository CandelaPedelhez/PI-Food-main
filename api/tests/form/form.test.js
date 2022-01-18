import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import isReact from "is-react";

import CreateRecipe from "../../../client/src/components/CreateRecipe";

configure({ adapter: new Adapter() });

describe("<CreateRecipe/>", () => {

  beforeAll(() => expect(isReact.classComponent(CreateRecipe)).toBeFalsy());

  describe("Estructura", () => {
    let createRecipe;
    let store = mockStore(state);
    beforeEach(() => {
      createRecipe = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/recipe']}>
            <CreateHouse />
          </MemoryRouter>
        </Provider>
      );
    });

    it("Debería renderizar un form", () => {
      expect(createRecipe.find("form")).toHaveLength(1);
    });

    it('Debería renderizar un label con el texto "Name *"', () => {
      expect(createRecipe.find("label").at(0).text()).toEqual("Name *");
    });

    it('Debería renderizar un input con la propiedad "name" igual a "name"', () => {
      expect(createRecipe.find('input[name="name"]')).toHaveLength(1);
    });

    it('Debería renderizar un label con el texto "Summary *', () => {
      expect(createRecipe.find("label").at(1).text()).toEqual("Summary *");
    });

    it('Debería renderizar un label con el texto "Score"', () => {
      expect(createRecipe.find("label").at(2).text()).toEqual("Score");
    });

    it('Debería renderizar un input con la propiedad "name" igual a "score"', () => {
      expect(createRecipe.find('input[name="score"]')).toHaveLength(1);
    });

    it('Debería renderizar un button con "type" igual a "submit" y con texto "Create recipe"', () => {
      expect(createRecipe.find('button[type="submit"]')).toHaveLength(1);
      expect(createRecipe.find("button").at(0).text()).toEqual("Create recipe");
    });
  })})