import React from "react";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";

import ValidationMessage from "./validation-message";

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

it("renders with validation message", () => {
    act(() => {
        render(<ValidationMessage message={{param: 'param name', msg: "validation message"}}/>, container);
    });
    expect(container.querySelector("p").textContent).toBe("Field param name is invalid - validation message");
});

it("renders without validation message", () => {

    act(() => {
        render(<ValidationMessage />, container);
    });
    expect(container.querySelector("div").textContent).toBe("");

});