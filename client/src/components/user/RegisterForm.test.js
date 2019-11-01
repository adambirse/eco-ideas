import React from "react";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";

import {post} from "../../api/api";
import RegisterForm from "./RegisterForm";
import {MemoryRouter} from 'react-router'

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


describe("RegisterForm", () => {

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
        post.mockClear();
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;

    });

    it("renders", async () => {

        act(() => {
            render(<RegisterForm/>, container);
        });

        expect(container.querySelector('input[id="email"]').placeholder).toEqual('email');
        expect(container.querySelector('input[type="submit"]').value).toEqual('submit');

    });

    it("register success", async () => {


        await post.mockResolvedValue({status: 200});

        await act(async () => {
            render(<MemoryRouter>
                <RegisterForm/>
            </MemoryRouter>, container);
            const submitButton = document.querySelector('input[name="submit"]');
            submitButton.dispatchEvent(new MouseEvent("click", {bubbles: true}));
        });

        expect(post).toHaveBeenCalledTimes(1);

    });

    it("register failure - validation", async () => {


        await post.mockRejectedValue({
            response: {
                status: 422,
                data: {
                    errors: "validation errors"
                }
            }
        });

        await act(async () => {
            render(<MemoryRouter>
                <RegisterForm/>
            </MemoryRouter>, container);
            const submitButton = document.querySelector('input[name="submit"]');
            submitButton.dispatchEvent(new MouseEvent("click", {bubbles: true}));
        });

        expect(container.getElementsByTagName("p")[0].textContent).toBe("validation errors");
        expect(post).toHaveBeenCalledTimes(1);

    });

    it("register 404 failure", async () => {


        await post.mockRejectedValue({
            response: {
                status: 404,
                data: 'page not found'
            }
        });

        await act(async () => {
            render(<MemoryRouter>
                <RegisterForm/>
            </MemoryRouter>, container);
            const submitButton = document.querySelector('input[name="submit"]');
            submitButton.dispatchEvent(new MouseEvent("click", {bubbles: true}));
        });


        expect(container.getElementsByTagName("p")[0].textContent).toBe("page not found");
        expect(post).toHaveBeenCalledTimes(1);

    });

});