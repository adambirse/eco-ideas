import React from "react";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";

import {securePost} from "../../api/api";
import CreateAccountForm from "./CreateAccountForm";
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


describe("CreateAccountForm", () => {

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
            render(<CreateAccountForm/>, container);
        });

        expect(container.querySelector('input[id="email"]').placeholder).toEqual('email');
        expect(container.querySelector('input[id="password"]').placeholder).toEqual('password');
        expect(container.querySelector('input[type="submit"]').value).toEqual('submit');

    });

    it("create account success", async () => {

        const location = {pathname: '/create-account/'};

        await securePost.mockResolvedValue({status: 200});

        await act(async () => {
            render(<MemoryRouter>
                <CreateAccountForm location={location}/>
            </MemoryRouter>, container);
        const submitButton = document.querySelector('input[name="submit"]');
        submitButton.dispatchEvent(new MouseEvent("click", {bubbles: true}));
        });

        expect(securePost).toHaveBeenCalledTimes(1);

    });

    it("create account authentication failure", async () => {

        const location = {pathname: '/create-account/'};

        await securePost.mockRejectedValue({
            response: {
                status: 422,
                data: {
                    errors: "authentication errors"
                }
            }
        });

        await act(async () => {
            render(<MemoryRouter>
                <CreateAccountForm location={location}/>
            </MemoryRouter>, container);
        const submitButton = document.querySelector('input[name="submit"]');
        submitButton.dispatchEvent(new MouseEvent("click", {bubbles: true}));
        });

        expect(container.getElementsByTagName("p")[0].textContent).toBe("authentication errors");
        expect(securePost).toHaveBeenCalledTimes(1);

    });

    it("create account 404 failure", async () => {

        const location = {pathname: '/create-account/'};

        await securePost.mockRejectedValue({
            response: {
                status: 404,
                data: 'page not found'
            }
        });

        await act(async () => {
            render(<MemoryRouter>
                <CreateAccountForm location={location}/>
            </MemoryRouter>, container);
        const submitButton = document.querySelector('input[name="submit"]');
        submitButton.dispatchEvent(new MouseEvent("click", {bubbles: true}));
        });

        expect(container.getElementsByTagName("p")[0].textContent).toBe("page not found");
        expect(securePost).toHaveBeenCalledTimes(1);

    });

});