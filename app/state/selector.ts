import { selector } from "recoil";
import { exampleState } from "./atoms";

export const exampleSelector = selector<string>({
  key: "exampleSelector",
  get: ({ get }) => {
    const stateValue = get(exampleState);
    return stateValue.toUpperCase(); // Durumu büyük harfe çeviriyor
  },
});
