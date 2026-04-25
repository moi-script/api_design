

// pagination is to minimize the incomming large reponse from a GET request
// ex. a millions of data in a single call


// by using a diferent pages in button also connected in database
// query we can control the offset of specific request




// The page approach 

const buttons = [1, 2, 3, 4, 5]; // paginatoin buttons 

// query -> offset | limit

// display the buttons
// events 
// values -> query fetch -> reload 




// Infinite scroll 


// SERVER SIDE 


app.get('/api/items', async (req, res) => {
  const { cursor, limit = 10 } = req.query;
  
  // Logic: Find items where ID is greater than the cursor
  // Sorting is crucial here (e.g., by ID or Timestamp)
  const items = await db.collection('posts') // DATABASE SET UP
    .find(cursor ? { _id: { $gt: new ObjectId(cursor) } } : {})
    .sort({ _id: 1 }) 
    .limit(parseInt(limit) + 1) // Fetch 1 extra to check if there's a next page
    .toArray();

  const hasNextPage = items.length > limit;
  const data = hasNextPage ? items.slice(0, -1) : items; // Remove the extra item
  const lastItem = data[data.length - 1];

  res.json({
    data: data,
    meta: {
      nextCursor: lastItem ? lastItem._id : null,
      hasNextPage: hasNextPage
    }
  });
});



// CLIENT SIDE


// 1. Target the sentinel element at the bottom of your list
const sentinel = document.querySelector('#sentinel');
const listContainer = document.querySelector('#item-list');

let nextCursor = null; // Start with no cursor
let isLoading = false;

const loadMoreItems = async () => {
  if (isLoading) return;
  isLoading = true;

  // 2. Fetch data using the cursor
  const response = await fetch(`/api/items?cursor=${nextCursor || ''}&limit=10`);
  const { data, meta } = await response.json(); // backend set up 

  // 3. Append items to the DOM // display the data
  data.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item.name;
    listContainer.appendChild(li);
  });

  // 4. Update the cursor for the next fetch
  nextCursor = meta.nextCursor;
  isLoading = false;

  // 5. If no more data, stop observing
  if (!meta.hasNextPage) observer.unobserve(sentinel);
};

// 6. Initialize the Observer
const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    loadMoreItems();
  }
}, { threshold: 1.0 });

observer.observe(sentinel);