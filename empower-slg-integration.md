# Person Re-identification Application

This file presents the functionality of the Person Re-identification Application.

## Base Files

### App.jsx

All webpages are declared in the App.jsx file.

### Extract Individuals Functionality

The first functionality implemented is the "Extract Individuals". The related files are:
1. **CreateGalleryPage.jsx**
    1. Page that handles the request creation
2. **GalleryPage.jsx**
    1. Page that shows a cluster.
    2. If a response contains a "suspect" field, user is redirected to "SuspectListPage"
    3. Renders each cluster along with a cluster thumbnail
3. **ClusterDetailPage.jsx**
    1. Lists the contents of a cluster

### Identify Across Media

The second functionality implemented is the "Identify Across Media". The related files are:
1. **SearchSuspect.jsx**
    1. Page that handles the request creation
2. **SuspectListPage.jsx**
    1. Page that lists suspects related to a job.
    2. User is redirescted to suspects details on click
3. **SuspectDetailPage.jsx**
    1. Lists the similarity of suspect to each cluster
    2. On click can redirect user to otherwise hidden cluster
