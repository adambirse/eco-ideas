import axios from "axios";
import {get, post, securePost} from "./api";

jest.mock('axios');

beforeEach(() => {
    axios.get.mockClear();
    axios.post.mockClear();
});
it("test get success", async () => {

    const data = 'My data';

    axios.get.mockResolvedValue({data: data});

    const result = await get("resource");

    expect(result).toBe(data);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith("http://localhost:5000/api/resource");

});

it("test get failure", async () => {

    const exception = {response: "response"};

    axios.get.mockRejectedValue(exception);

       try {
        expect(await get("resource")).toThrow(exception);

    } catch (e) {
    }

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith("http://localhost:5000/api/resource");

});

it("test post success", async () => {

    const data = 'My data';

    axios.post.mockResolvedValue({status: 200});

    const result = await post(data,"resource");

    expect(result.status).toBe(200);
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith("http://localhost:5000/api/resource",data);

});

it("test post failure", async () => {

    const exception = {response: "response"};
    const data = 'My data';
    axios.post.mockRejectedValue(exception);

    try {
        expect(await post(data,"resource")).toThrow(exception);
    } catch (e) {
    }

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith("http://localhost:5000/api/resource",data);

});

it("test secure post success", async () => {

    const data = 'My data';

    axios.post.mockResolvedValue({status: 200});

    const result = await securePost(data,"resource");

    expect(result.status).toBe(200);
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith("http://localhost:5000/api/resource",data, {
        withCredentials: true
    });

});

it("test secure post failure", async () => {

    const exception = {response: "response"};
    const data = 'My data';
    axios.post.mockRejectedValue(exception);

    try {
        expect(await securePost(data,"resource")).toThrow(exception);
    } catch (e) {
    }

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith("http://localhost:5000/api/resource",data, {
        withCredentials: true
    });

});