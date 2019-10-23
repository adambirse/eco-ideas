import React from "react";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";

import ValidationPanel from "./validation-panel";

let container = null;

jest.mock("./validation-message", () => {
    return function render(props) {
        return (
            <div>
                <p>Dummy message - {props.message.param}</p>
            </div>
        );
    };
});

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

    const messages = [
        {param: 'param name 1', msg: "validation message 1"},
        {param: 'param name 2', msg: "validation message 2"},
        {param: 'param name 3', msg: "validation message 3"}
    ];
    act(() => {
        render(<ValidationPanel messages={messages}/>, container);
    });
    const elements = container.querySelectorAll("p");
    expect(elements[0].textContent).toEqual('Dummy message - param name 1');
    expect(elements[1].textContent).toEqual('Dummy message - param name 2');
    expect(elements[2].textContent).toEqual('Dummy message - param name 3');
});

it("renders with no messages", () => {

    act(() => {
        render(<ValidationPanel/>, container);
    });
    expect(container.querySelector("div").textContent).toBe("");
});

it("renders with empty messages", () => {

    act(() => {
        render(<ValidationPanel messages={[]}/>, container);
    });
    expect(container.querySelector("div").textContent).toBe("");

});
