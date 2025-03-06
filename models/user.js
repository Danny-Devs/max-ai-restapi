const userModel = {
  id: String,
  username: String,
  email: String,
  password: String,
  createdAt: Date
};

// Temporary in-memory storage
const users = [];

export { userModel, users }; 