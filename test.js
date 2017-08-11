parent =  { index: 2,
  routes:
    [ { routeName: '_register',
      key: 'Init-id-1502360072887-0',
      params: { title: 'Register', init: true } },
      { params: { title: 'Replace', init: true, routeName: 'home' },
        key: 'id-1502360072887-2',
        routeName: 'home' } ] };

console.log("POP PREVIOUS", parent, parent.index - 1, parent.routes.splice(parent.index - 1, 1));
