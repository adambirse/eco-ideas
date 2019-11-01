import React from "react";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import {MemoryRouter} from 'react-router'

import {securePost} from "../../api/api";
import ConnectedLoginForm, {LoginForm} from "./LoginForm";

jest.mock("../../api/api");

let container = null;

jest.mock("../error/error-message", () => {
    return function render(props) {
        expect(props.error).toBe("could not create account");
        return (
            <div>
                <p>{props.error}</p>
            </div>
        );
    };
});

jest.mock("../validation/validation-panel", () => {
    return function render(props) {
        expect(props.messages).toBe("authentication errors");
        return (
            <div>
                <p>{props.messages}</p>
            </div>
        );
    };
});


describe("LoginForm", () => {

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
            render(<LoginForm/>, container);
        });

        expect(container.querySelector('input[id="email"]').placeholder).toEqual('email');
        expect(container.querySelector('input[id="password"]').placeholder).toEqual('password');
        expect(container.querySelector('input[type="submit"]').value).toEqual('submit');

    });

    it("create account success", async () => {

        const mockStore = configureMockStore();
        const store = mockStore({});
        await securePost.mockResolvedValue({status: 200});

        await act(async () => {
            render( <Provider store={store}>
                <MemoryRouter>
                <ConnectedLoginForm/>
                </MemoryRouter>
            </Provider>,container);
        });

        const submitButton = document.querySelector('input[name="submit"]');
        submitButton.dispatchEvent(new MouseEvent("click", {bubbles: true}));

        expect(securePost).toHaveBeenCalledTimes(1);

    });

    it("create account failure", async () => {


        await securePost.mockRejectedValue({
            response: {
                status: 422,
                data: {
                    error: "could not create account"
                }
            }
        });

        await act(async () => {
            render(<LoginForm/>,container);
        });

        const submitButton = document.querySelector('input[name="submit"]');
        submitButton.dispatchEvent(new MouseEvent("click", {bubbles: true}));

        expect(securePost).toHaveBeenCalledTimes(1);

    });
});