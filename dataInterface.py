from google.cloud import firestore

# Replace 'your-project-id' with your actual Google Cloud project ID
project_id = 'ecosia-411103'

# Create a Firestore client
db = firestore.Client(project=project_id)

# Add data to Firestore
def add_data():
    data = {
        'num_searches': 0
    }
    
    # Add a document to the 'users' collection with a randomly generated ID
    db.collection('users').add(data)
    print('Data added successfully.')

# Retrieve data from Firestore
def get_data():
    # Retrieve all documents from the 'users' collection
    users_ref = db.collection('users')
    docs = users_ref.stream()
    fetchData = {}
    for doc in docs:
        print(f'{doc.id} => {doc.to_dict()}')
        fetchData["id"] = doc.id
        fetchData["data"] = doc.to_dict()
    return fetchData

# Update data in Firestore
def update_data(document_id, updated_data):
    doc_ref = db.collection('users').document(document_id)
    doc_ref.update(updated_data)
    print(f'Data updated successfully.')

# Delete data from Firestore
def delete_data(document_id):
    doc_ref = db.collection('users').document(document_id)
    doc_ref.delete()
    print(f'Data deleted successfully.')

def increment_searchHistory():
    data = get_data()
    data["data"]["num_searches"] += 1
    update_data(data["id"], data["data"])
    
if __name__ == '__main__':
    increment_searchHistory()

    # Retrieve data
    print("Data right now: ")
    get_data()

    # Add data
    #add_data()

    # Update data
    """document_id_to_update = 'your_document_id_here'  # Replace with the actual document ID
    updated_data = {'num_searches': 5}  # Replace with the updated data
    update_data(document_id_to_update, updated_data)"""

    # Retrieve updated data
    #get_data()
    
    # Delete data
    """document_ids = ['Fk7HZJltatbjVMR85lk7', '94JEEURGjhqPaCOtcB4s', 'O8v2nFevwPE13N6HJlDp']
    for docId in document_ids:
        document_id_to_delete = docId  # Replace with the actual document ID
        delete_data(document_id_to_delete)"""

    # Retrieve data after deletion
    #get_data()
