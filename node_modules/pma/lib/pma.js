module.exports = function (manager, op, packages) {
  if (['install', 'remove'].indexOf(op) === -1) {
    throw new Error('Operation ' + op + ' not supported');
  }

  if (manager === 'quill') {
    return ['quill', op === 'install' ? 'install' : 'uninstall'].concat(packages);
  }
  else if (manager === 'apt') {
    return ['apt-get', '-y', op].concat(packages);
  }
  else if (manager === 'yum') {
    return ['yum', '-y', op].concat(packages);
  }
  else if (manager === 'npm') {
    return ['npm', '-g', op].concat(packages);
  }
  else if (manager === 'rpm') {
    return ['rpm', op === 'install' ? '-i' : '-e'].concat(packages);
  }
  else if (manager === 'dpkg') {
    return ['dpkg', op === 'install' ? '-i' : '-r'].concat(packages);
  }
  else if (manager === 'brew') {
    return ['brew', op].concat(packages);
  }
  else if (manager === 'pkgin') {
    return ['pkgin', '-y', op].concat(packages);
  }
};
