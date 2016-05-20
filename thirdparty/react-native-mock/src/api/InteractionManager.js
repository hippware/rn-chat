import keyMirror from 'keymirror';
import invariant from 'invariant';

const { EventEmitter } = require('events');

const _emitter = new EventEmitter();

let _nextUpdateHandle = 0;
let _inc = 0;
let _deadline = -1;

const InteractionManager = {
  Events: keyMirror({
    interactionStart: true,
    interactionComplete: true,
  }),

  /**
   * Schedule a function to run after all interactions have completed.
   */
  runAfterInteractions(task) {
    return new Promise(resolve => {
      // TODO(lmr):
      // _scheduleUpdate();
      //if (task) {
      //  _taskQueue.enqueue(task);
      //}
      //const name = task && task.name || '?';
      //_taskQueue.enqueue({ run: resolve, name: 'resolve ' + name });
    });
  },

  /**
   * Notify manager that an interaction has started.
   */
  createInteractionHandle() {
    // TODO(lmr):
    // _scheduleUpdate();
    var handle = ++_inc;
    //_addInteractionSet.add(handle);
    return handle;
  },

  /**
   * Notify manager that an interaction has completed.
   */
  clearInteractionHandle(handle) {
    invariant(
      !!handle,
      'Must provide a handle to clear.'
    );
    // TODO(lmr):
    // _scheduleUpdate();
    //_addInteractionSet.delete(handle);
    //_deleteInteractionSet.add(handle);
  },

  addListener: _emitter.addListener.bind(_emitter),

  /**
   * A positive number will use setTimeout to schedule any tasks after the
   * eventLoopRunningTime hits the deadline value, otherwise all tasks will be
   * executed in one setImmediate batch (default).
   */
  setDeadline(deadline) {
    _deadline = deadline;
  },
};
