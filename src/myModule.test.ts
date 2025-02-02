import {myFunction} from "./myModule.js"
import {test, expect} from "vitest";

test('should return string', () => {
   expect(myFunction()).toBe("Hello World!");
});