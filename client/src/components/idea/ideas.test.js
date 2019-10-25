import React from "react";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";

import {get} from "../../api/api";
import Ideas from "./ideas";

let container = null;

jest.mock("../../api/api");

jest.mock("./idea", () => {
    return function render() {
        return (
            <div>
                <p>Im a idea</p>
            </div>
        );
    };
});

jest.mock("../filter/filter", () => {
    return function render() {
        return (
            <div>
                <p>Im a filter</p>
            </div>
        );
    };
});

const data = [];
data.push({id: 1, title: 'title 1', text: 'text 1'});
data.push({id: 2, title: 'title 2', text: 'text 2'});
data.push({id: 3, title: 'title 3', text: 'text 3'});

describe("Ideas", () => {

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
        get.mockClear();
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;

    });

    it("renders with data", () => {

        get.mockImplementation((resource, handleSuccess, handleFailure) => {
            handleSuccess(data);
        });

        act(() => {
            render(<Ideas/>, container);
        });


        expect(get).toHaveBeenCalledTimes(1);
        expect(container.querySelector("h2").textContent).toBe("List of Ideas");
        expect(container.querySelector("p").textContent).toBe("Im a filter");

        const scrollableDiv = container.querySelector('.scrollable');
        expect(scrollableDiv.childElementCount).toBe(data.length);
        scrollableDiv.childNodes.forEach(child => {
            expect(child.textContent).toBe('Im a idea');
        })
    });

    it("renders without data", () => {

        get.mockImplementation((resource, handleSuccess, handleFailure) => {
            handleSuccess([]);
        });

        act(() => {
            render(<Ideas/>, container);
        });


        expect(get).toHaveBeenCalledTimes(1);
        expect(container.querySelector("h2").textContent).toBe("List of Ideas");
        expect(container.querySelector("h3").textContent).toBe("No Ideas Found");
        expect(container.querySelector("p").textContent).toBe("Im a filter");

    });

});