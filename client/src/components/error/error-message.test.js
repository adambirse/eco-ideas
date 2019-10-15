import React from "react";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";

import ErrorMessage from "./error-message";

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

it("renders with error message", () => {
    act(() => {
        render(<ErrorMessage error="my error"/>, container);
    });
    expect(container.querySelector(".alert").textContent).toBe("my error");
});

it("renders without error message", () => {
    act(() => {
        render(<ErrorMessage />, container);
    });
    expect(container.querySelector(".alert").textContent).toBe("");

});