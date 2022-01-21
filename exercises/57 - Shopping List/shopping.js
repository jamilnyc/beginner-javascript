const shoppingForm = document.querySelector('.shopping');
const list = document.querySelector('.list');

let items = [];

function handleSubmit(e) {
  e.preventDefault();
  // Inputs are properties of the form
  const name = e.currentTarget.item.value;
  if (!name) {
    return;
  }
  const item = {
    name,
    id: Date.now(),
    complete: false,
  };

  items.push(item);
  console.log(`There are now ${items.length} items in your state`);
  //   e.currentTarget.item.value = '';
  e.currentTarget.reset();

  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function displayItems() {
  const html = items
    .map(
      (item) => `<li class="shopping-item">
        <input 
          type="checkbox" 
          value="${item.id}"
          ${item.complete ? 'checked' : ''}
        >
        <span class="itemName">${item.name}</span>
        <button aria-label="Remove ${item.name}" value="${
        item.id
      }">&times;</button>
        </li>`
    )
    .join('');
  console.log(html);
  list.innerHTML = html;
}

function mirrorToLocalStorage() {
  localStorage.setItem('items', JSON.stringify(items));
}

function restoreFromLocalStorage() {
  const storedItems = JSON.parse(localStorage.getItem('items'));
  if (storedItems.length) {
    items.push(...storedItems);
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
  }
}

function deleteItem(id) {
  console.log('DELETING ITEM', id);
  items = items.filter((item) => item.id !== id);
}

function markAsComplete(id) {
  console.log(`Completing ${id}`);
  const itemRef = items.find((item) => item.id === id);
  itemRef.complete = !itemRef.complete;
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

list.addEventListener('click', (e) => {
  // currentTarget is thing that is listening
  // target is actual element that was clicked
  if (e.target.matches('button')) {
    deleteItem(parseInt(e.target.value));
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
  } else if (e.target.matches('input[type="checkbox"]')) {
    markAsComplete(parseInt(e.target.value));
  }
});

shoppingForm.addEventListener('submit', handleSubmit);
list.addEventListener('itemsUpdated', displayItems);
list.addEventListener('itemsUpdated', mirrorToLocalStorage);

restoreFromLocalStorage();
