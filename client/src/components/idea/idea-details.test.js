import React from "react";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";

import IdeaDetails from "./idea-details";

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("renders", () => {
    act(() => {
        render(<IdeaDetails text = "Idea details text"/>, container);
    });

    expect(container.querySelector("div").classList.contains("panel")).toBe(true);

    expect(container.querySelector("h5").textContent
    ).toEqual("Details:");

    expect(container.querySelector("p").textContent
    ).toEqual("Idea details text");

    });