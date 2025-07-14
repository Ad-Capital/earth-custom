/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// MongoDB Playground for Order Form
// Create a new database if it doesn't exist
use("artwork_orders");

// Create a collection for orders if it doesn't exist
db.createCollection("orders");

// Sample document insertion based on your form structure
db.orders.insertOne({
  fullName: "John Doe",
  email: "john.doe@example.com",
  phone: "+1234567890",
  preferredCommunication: "email",
  artworkType: "painting",
  medium: "oil",
  size: 'medium (12-24")',
  colorPalette: "Warm tones with earth colors",
  imageUrls: ["https://example.com/reference1.jpg"],
  purpose: "personal collection",
  shippingAddress: {
    addressLine1: "123 Art Street",
    addressLine2: "Apt 456",
    city: "Creative City",
    state: "Artistic State",
    postalCode: "12345",
    country: "United States",
  },
  additionalNotes: "I'd like the artwork to be inspired by African landscapes",
  newsletter: true,
  orderDate: new Date(),
});

// Query to find all orders
db.orders.find();

// Query to find orders by email
db.orders.find({ email: "john.doe@example.com" });

// Query to find orders by artwork type
db.orders.find({ artworkType: "painting" });

// Query to find orders from a specific country
db.orders.find({ "shippingAddress.country": "United States" });

// Create index on email for faster queries
db.orders.createIndex({ email: 1 });

// Create index on orderDate for sorting
db.orders.createIndex({ orderDate: -1 });

// Aggregation to get count of orders by artwork type
db.orders.aggregate([
  { $group: { _id: "$artworkType", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
]);

// Aggregation to get count of orders by country
db.orders.aggregate([
  { $group: { _id: "$shippingAddress.country", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
]);
