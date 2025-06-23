import { ACTIONS } from "../../common/globals";
import { Taskboard_Activity } from "./taskboard_activity";

const MAX_STACK_ITEM_COUNT = 100;

/**
 * Taskboard_Activity_Stack 
 * taskboard activity stack for Taskboard_Activity items: 
 * see Taskboard_Activity class for structure
 */

export class Taskboard_Activity_Stack {
  #activities_main = [];
  #activities_copy = [];

  constructor() {
    this.#activities_main = [];

    // copy of the main stack for undo/redo functionality
    this.#activities_copy = [];

    this.#activities_copy.length = MAX_STACK_ITEM_COUNT;
  }

  _validate_activity(taskboard_activity) {
    // do any necessary validation here
    return true;
  }

  /**
   * add activity to stack
   * @param {Taskboard_Activity} activity 
   * @returns true if successful
   */
  push(activity) {
    if (!(this._validate_activity(activity))) 
    {
      console.log("invalid taskboard activity stack item");
      return false;
    }

    if( this.#activities_main.length >= MAX_STACK_ITEM_COUNT)
    {
      this.#activities_main.shift();
    }

    this.#activities_main.push(item);
    this.#activities_copy[this.#activities_main.length - 1] = item;

    return true;
  }

  pop() {
    return this.#activities_main.pop();
  }

  peek() {
    return this.#activities_main[this.#activities_main.length - 1] || null;
  }

  isEmpty() {
    return this.#activities_main.length === 0;
  }

  size() {
    return this.#activities_main.length;
  }

  clear() {
    this.#activities_main = [];
    this.#activities_copy = new Array(MAX_STACK_ITEM_COUNT);
  }

  print() {
    console.log(this.#activities_main);
  }
}
