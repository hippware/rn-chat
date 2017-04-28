import assert from 'assert';
import autobind from 'autobind-decorator';
import Profile from './model/Profile';

function wrap(target, boundFn, ...args) {
    console.log('FUNCTION:', boundFn.sceneName, 'IS CALLED with ARGS', ...args);
    if (boundFn.initializer) {
        console.log(boundFn.initializer.apply(target, args));
    }
    if (boundFn.action) {
        boundFn.action.apply(target, args);
    }
    if (boundFn.view) {
        boundFn.view.apply(target, args);
    }
}
const tabs = 'TABS';
const root = 'ROOT';

function scene(target, key, descriptor) {
    const inner = function (target, key, descriptor, value) {
        console.log('SCENE:', key);
        console.log('VAL:', value);
        const fn = descriptor.value;
        var boundFn = (...args) => wrap(target, boundFn, ...args);
        boundFn.sceneName = key;
        boundFn.action = fn;
        boundFn.value = value;
        boundFn.initializer = descriptor.initializer;
        target.addScene(boundFn);

        return {
            configurable: true,
            get: function get() {
                Object.defineProperty(this, key, {
                    value: boundFn,
                    configurable: true,
                    writable: true,
                });
                return boundFn;
            },
        };
    };

    if (!key) {
        const value = target;
        return (target, key, descriptor) => inner(target, key, descriptor, value);
    } else {
        return inner(target, key, descriptor);
    }
}

export default class NavigationStore {
    state;
    current;
    static scenes = {};
    static root;

    constructor(state = {}) {
        assert(state, 'Initial state is not defined');
        assert(NavigationStore.root, 'NavigationStore.root is not defined!');
        this.state = state;
        this.current = this.state;
    }

    addScene(scene) {
        assert(scene, 'Scene is not defined');
        assert(scene.sceneName, 'Not valid scene');
        if (scene.value === root) {
            NavigationStore.root = scene;
        }
        NavigationStore.scenes[scene.sceneName] = scene;
    }

    localPush() {}

    push(...args) {
        console.log(args);
        return [this.localPush, args];
    }

    jump(...args) {
        console.log('JUMP', args);
        return [this.localPush, args];
    }

    @scene(root)
    modal = [this.root, this.privacyPolicy, this.termsOfService];
    @scene(tabs)
    root = [this.launch, this.promo, this.logged];
    @scene privacyPolicy;
    @scene termsOfService;
    @scene promo;
    @scene logged = [this.home, this.friends];
    @scene launch;
    @scene home;
    @scene friends;

    @scene profileDetail(item: Profile) {}
}
class Overlay {
    view;
}
class Scene {
    overlay: Overlay;
    key;
    view;

    constructor(key, props) {}
}
class Stack extends Scene {
    constructor(key, routes: [Scene], props = {}) {
        super(key, props);
    }
}

class Tabs extends Scene {
    constructor(key, routes: [Scene], props = {}) {
        super(key, props);
    }
}
