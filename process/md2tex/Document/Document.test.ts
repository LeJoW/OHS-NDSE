import { Document } from "./Document";

const content = `Nothing to see here.
But set a title :
    
# Fancy title`;

test("blocks", function () {
    expect(new Document(content).getContent()).toStrictEqual(content);
});
