import React from "react";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";

import Filter from "./filter";

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
        render(<Filter />, container);
    });
    expect(container.querySelector("label").textContent).toBe("Filter:");

    expect(container.querySelector('input[name="submit"]').value).toEqual('Filter');
    expect(container.querySelector('input[name="reset"]').value).toEqual('Reset');
    expect(container.querySelector('input[type="text"]').placeholder).toEqual('filter by title');

});

it("submit callback works", () => {
    const onSubmit = jest.fn();
    const onReset = jest.fn();

    act(() => {
        render(<Filter handleSearch={onSubmit} handleReset={onReset}/>, container);
    });

    const submitButton = document.querySelector('input[name="submit"]');
    submitButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onReset).toHaveBeenCalledTimes(0);

});

it("reset callback works", () => {
    const onSubmit = jest.fn();
    const onReset = jest.fn();

    act(() => {
        render(<Filter handleSearch={onSubmit} handleReset={onReset}/>, container);
    });

    const resetButton = document.querySelector('input[name="reset"]');
    resetButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    expect(onSubmit).toHaveBeenCalledTimes(0);
    expect(onReset).toHaveBeenCalledTimes(1);

});