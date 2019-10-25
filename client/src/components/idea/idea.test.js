import React from "react";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";

import Idea from "./idea";

let container = null;

jest.mock("./idea-details", () => {
    return function render(props) {
        return (
            <div>
                <p>{props.text}</p>
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

it("renders with inactive panel", () => {

    act(() => {
        render(<Idea key={1} id={1} title={'title'} text={'text'}/>, container);
    });
    expect(container.querySelector("button").textContent).toBe("title");

});

it("renders with button press", () => {

    act(() => {
        render(<Idea key={1} id={1} title={'title'} text={'text'}/>, container);
    });
    const button = document.querySelector('button');
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    expect(container.querySelector("button").textContent).toBe("title");
    expect(container.querySelector("p").textContent).toBe("text");

});


