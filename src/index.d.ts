import { Params } from "./p";

declare global {
  /*~ Here, declare things that go in the global namespace, or augment
   *~ existing declarations in the global namespace
   */
  interface Window {
      p(params: Params): void;
  }

  // class P {
  //   config: Params;
  //   constructor(params?: Params);
  //   checkIdIsEmpty(e: string): void;
  //   createIframe(): void;
  // }
}

export {};