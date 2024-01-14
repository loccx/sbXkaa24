const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} = require("firebase/firestore");

// Firebase configuration
const firebaseConfig = {
  projectId: "ecosia-411103",
  // ... other configuration properties
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firestore database instance
const db = getFirestore(app);

// Add data to Firestore
async function addData() {
  const data = { num_searches: 0 };

  try {
    const docRef = await addDoc(collection(db, "users"), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}

// Retrieve data from Firestore
async function getData() {
  const usersCol = collection(db, "users");
  try {
    const snapshot = await getDocs(usersCol);
    const fetchData = {};
    snapshot.forEach((doc) => {
      if (fetchData) {
        fetchData.id = doc.id;
        fetchData.data = doc.data();
      }
    });
    console.log(fetchData)
    return fetchData;
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
}

// Update data in Firestore
async function updateData(documentId, updatedData) {
  const docRef = doc(db, "users", documentId);

  try {
    await updateDoc(docRef, updatedData);
    console.log("Document updated successfully");
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}

// Delete data from Firestore
async function deleteData(documentId) {
  const docRef = doc(db, "users", documentId);

  try {
    await deleteDoc(docRef);
    console.log("Document deleted successfully");
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
}

async function deleteAllInCollection(collectionName) {
  const collectionRef = collection(db, collectionName);
  try {
    const snapshot = await getDocs(collectionRef);
    const deletePromises = [];
    snapshot.forEach((doc) => {
      deletePromises.push(deleteDoc(doc.ref));
    });
    await Promise.all(deletePromises);
    console.log("All documents in the collection have been deleted");
  } catch (error) {
    console.error("Error deleting documents: ", error);
  }
}

async function incrementSearchHistory() {
  const data = await getData();
  if (data && data.data && data.id) {
    const updatedData = {
      ...data.data,
      num_searches: data.data.num_searches + 1,
    };
    await updateData(data.id, updatedData);
  }
}

module.exports = {
  addData,
  getData,
  deleteAllInCollection,
  incrementSearchHistory,
};


