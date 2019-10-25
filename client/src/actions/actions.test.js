import addRole from "./actions";

it("add Role", () => {
    const result = addRole('role');
    expect(result.role).toEqual('role');
    expect(result.type).toEqual('ADD_ROLE');
});