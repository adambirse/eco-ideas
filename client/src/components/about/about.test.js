import React from "react";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";

import About from "./about";

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
        render(<About/>, container);
    });

    expect(container.querySelector("h2").textContent
    ).toEqual("About me");

    const elements = container.querySelectorAll("p");
    expect(elements[0].textContent).toEqual('This is my react and node application for practicing my development skills.');
    expect(elements[1].textContent).toEqual('It makes use of Terraform, Kubernetes and Circle CI for deployment. Automated testing is carried out with Cypress.');
    });