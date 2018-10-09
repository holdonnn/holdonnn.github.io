---
category: 'programming'
date: '2018-10-09'
title: 'Clustering'
description: 'Cluster analysis or clustering is the task of grouping a set of objects in such a way that objects in the same group '
image: '/img/programming/clustering/clustering.008.jpeg'
keywords: 'clustering,k-means,hierarchical agglomerative'
---

## Definition of clustering

Cluster analysis or clustering is the task of grouping a set of objects in such a way that objects in the same group (called a cluster) are more similar to each other than to those in other clusters.

Let's look at two basic and widely used clustering algorithms. hierarchical and k-means clusterings.

## The hierarchical clustering

Initially, each point is a cluster. Repeatedly combined the two nearest cluster into one.

![/img/programming/clustering/clustering.013.jpeg](/img/programming/clustering/clustering.013.jpeg "/img/programming/clustering/clustering.013.jpeg")

It's called Hierarchical agglomerative clustering.

The main output of Hierarchical Clustering is a dendrogram, which shows the hierarchical relationship between the clusters.

![/img/programming/clustering/clustering.014.jpeg](/img/programming/clustering/clustering.014.jpeg "/img/programming/clustering/clustering.014.jpeg")

## 3 Essential questions of HAC(Hierarchical agglomerative clustering)

Q 1 ) How to represent cluster of more than one point?

- Euclidean space → Centroid = The average of its points.
- Non-Euclidean space → There is no "average". using clustroid(closet all other points in the cluster) not centroid.

Q 2 ) How to determine the 'nearness' of clusters?

- Euclidean space → Distances by distances of centroids.
- Non-Euclidean space → Distances by distances of clustroid.

Q 3 ) When to stop combining clusters?

- If pick a number k upfront, We want data to falls into k classes.
- Before merging low cohesion clustering. Don't make bad clusters. The way to measure cohesion
    - 1) Diameters: maximum distance in points
    - 2) Radius: maximum distances from centroid(or clustroid)
    - 3) Density: points per volumes(derived from diameters/radius)

## HAC Complexity

It's too slow. The standard algorithm for hierarchical agglomerative clustering (HAC) has a time complexity of O(n^3) and requires O(n^2)memory, which makes it too slow for even medium data sets.

## K-means clustering

1. Assuming Euclidean space/distance, start by picking **k**(number of clusters) clusters.  
2. Assign points in the nearest cluster
3. After all points are assigned, update location of centroid of the **k** clusters**.**
4. Reassign all points to their closet centroid.  Sometimes moves points between clusters.
5. Repeat 3,4 util convergence. points and centroid don't move any further.

## How to select the right k clustering ?

- As the number of clustering increases. Average distance to centroid goes down.

![/img/programming/clustering/clustering.010.jpeg](/img/programming/clustering/clustering.010.jpeg "/img/programming/clustering/clustering.010.jpeg")

![/img/programming/clustering/clustering.011.jpeg](/img/programming/clustering/clustering.011.jpeg "/img/programming/clustering/clustering.011.jpeg")

![/img/programming/clustering/clustering.012.jpeg](/img/programming/clustering/clustering.012.jpeg "/img/programming/clustering/clustering.012.jpeg")

- Picking initial centroids of clusters.
    - Sampling then using hierarchical clustering to obtains k clusters.
    - Pick "dispersed" set of points.pick randomly first. then pick the next point which is as far as possible.

## K-means Complexity

O(kn) for N points, k clusters. linear goods. But the number of rounds to convergence can be  very large.

## Wrap up

Two alogrithms are basic and essential. There are many optimization techniques in dealing with data in the real world.

## reference

- [https://en.wikipedia.org/wiki/Cluster_analysis](https://en.wikipedia.org/wiki/Cluster_analysis)
- [https://en.wikipedia.org/wiki/Hierarchical_clustering](https://en.wikipedia.org/wiki/Hierarchical_clustering)
- [https://en.wikipedia.org/wiki/K-means_clustering](https://en.wikipedia.org/wiki/K-means_clustering)
- [https://www.displayr.com/what-is-hierarchical-clustering/](https://www.displayr.com/what-is-hierarchical-clustering/)
- [https://www.youtube.com/watch?v=rg2cjfMsCk4](https://www.youtube.com/watch?v=rg2cjfMsCk4)
- [https://www.youtube.com/watch?v=RD0nNK51Fp8](https://www.youtube.com/watch?v=RD0nNK51Fp8)