function get(key) {
  return JSON.parse(localStorage.getItem(key)) ?? "NA";
}

function set(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function remove(key) {
  localStorage.removeItem(key);
}

function clear() {
  localStorage.clear();
}

const LocalStorage = {
  set,
  get,
  remove,
  clear,
};

export { LocalStorage };
