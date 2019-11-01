import React from "react";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import {MemoryRouter} from 'react-router'

import {securePost} from "../../api/api";
import IdeaForm from "./ideaForm";

jest.mock("../../api/api");

let container = null;

jest.mock("../error/error-message", () => {
    return function render(props) {
        return (
            <div>
                <p>{props.error}</p>
            </div>
        );
    };
});

jest.mock("../validation/validation-panel", () => {
    return function render(props) {
        return (
            <div>
                <p>{props.messages}</p>
            </div>
        );
    };
});


describe("IdeaForm", () => {

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
        securePost.mockClear();
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;

    });

    it("renders", async () => {

        act(() => {
            render(<IdeaForm/>, container);
        });

        expect(container.querySelector('input[id="title"]').placeholder).toEqual('title');
        expect(document.getElementById('text').placeholder).toEqual('text');
        expect(container.querySelector('input[type="submit"]').value).toEqual('submit');

    });

    it("submit success", async () => {

        await securePost.mockResolvedValue({status: 200});

        await act(async () => {
            render(
                <MemoryRouter>
                    <IdeaForm/>
                </MemoryRouter>, container);
            const submitButton = document.querySelector('input[type="submit"]');
            submitButton.dispatchEvent(new MouseEvent("click", {bubbles: true}));
        });

        expect(securePost).toHaveBeenCalledTimes(1);

    });

    it("submit failure - unauthorised", async () => {


        await securePost.mockRejectedValue({
            response: {
                status: 401,
                data: "unauthorised"
            }
        });

        await act(async () => {
            render(<IdeaForm/>, container);
            const submitButton = container.querySelector('input[type="submit"]');
            submitButton.dispatchEvent(new MouseEvent("click", {bubbles: true}));
        });

        expect(container.getElementsByTagName("p")[0].textContent).toBe("unauthorised");
        expect(securePost).toHaveBeenCalledTimes(1);

    });

    it("create account 404 failure", async () => {

        await securePost.mockRejectedValue({
            response: {
                status: 404,
                data: 'page not found'
            }
        });

        await act(async () => {
            render(
                <IdeaForm/>, container);
            const submitButton = document.querySelector('input[type="submit"]');
            submitButton.dispatchEvent(new MouseEvent("click", {bubbles: true}));
        });

        expect(container.getElementsByTagName("p")[0].textContent).toBe("page not found");
        expect(securePost).toHaveBeenCalledTimes(1);

    });
});