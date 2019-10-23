import React from "react";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";

import Header from "./header";

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
        render(<Header/>, container);
    });

    expect(container.querySelector("h1").textContent
    ).toEqual("Eco Ideas");

});