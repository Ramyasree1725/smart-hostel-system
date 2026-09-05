/**
 * @file spatialIndex.js
 * @description R-Tree and K-D Tree Hierarchical Spatial Indexing for High-Speed Soldier Tracking,
 * Geofence Polygon Intersection, Nearest Squad Unit Queries, and Tactical Collision Detection.
 */

'use strict';

class BoundingBox {
  constructor(minX, minY, maxX, maxY) {
    this.minX = minX;
    this.minY = minY;
    this.maxX = maxX;
    this.maxY = maxY;
  }

  static fromPoints(points) {
    let minX = Infinity, minY = Infinity;
    let maxX = -Infinity, maxY = -Infinity;
    for (const pt of points) {
      if (pt.x < minX) minX = pt.x;
      if (pt.y < minY) minY = pt.y;
      if (pt.x > maxX) maxX = pt.x;
      if (pt.y > maxY) maxY = pt.y;
    }
    return new BoundingBox(minX, minY, maxX, maxY);
  }

  intersects(other) {
    return !(
      other.minX > this.maxX ||
      other.maxX < this.minX ||
      other.minY > this.maxY ||
      other.maxY < this.minY
    );
  }

  containsPoint(x, y) {
    return x >= this.minX && x <= this.maxX && y >= this.minY && y <= this.maxY;
  }

  expand(other) {
    this.minX = Math.min(this.minX, other.minX);
    this.minY = Math.min(this.minY, other.minY);
    this.maxX = Math.max(this.maxX, other.maxX);
    this.maxY = Math.max(this.maxY, other.maxY);
  }

  area() {
    return Math.max(0, this.maxX - this.minX) * Math.max(0, this.maxY - this.minY);
  }

  enlargedArea(other) {
    const minX = Math.min(this.minX, other.minX);
    const minY = Math.min(this.minY, other.minY);
    const maxX = Math.max(this.maxX, other.maxX);
    const maxY = Math.max(this.maxY, other.maxY);
    return (maxX - minX) * (maxY - minY);
  }
}

class RTreeNode {
  constructor(isLeaf = false, maxEntries = 9, minEntries = 4) {
    this.isLeaf = isLeaf;
    this.maxEntries = maxEntries;
    this.minEntries = minEntries;
    this.entries = []; // { bbox: BoundingBox, child: RTreeNode | data: any }
    this.bbox = new BoundingBox(Infinity, Infinity, -Infinity, -Infinity);
  }

  calculateBounds() {
    if (this.entries.length === 0) {
      this.bbox = new BoundingBox(0, 0, 0, 0);
      return;
    }
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const entry of this.entries) {
      minX = Math.min(minX, entry.bbox.minX);
      minY = Math.min(minY, entry.bbox.minY);
      maxX = Math.max(maxX, entry.bbox.maxX);
      maxY = Math.max(maxY, entry.bbox.maxY);
    }
    this.bbox = new BoundingBox(minX, minY, maxX, maxY);
  }
}

class TacticalRTree {
  constructor(maxEntries = 9, minEntries = 4) {
    this.maxEntries = maxEntries;
    this.minEntries = minEntries;
    this.root = new RTreeNode(true, maxEntries, minEntries);
    this.size = 0;
  }

  insert(bbox, data) {
    const entry = { bbox, data };
    const leaf = this.chooseLeaf(this.root, bbox);
    leaf.entries.push(entry);
    leaf.calculateBounds();

    if (leaf.entries.length > this.maxEntries) {
      const splitNode = this.split(leaf);
      this.adjustTree(leaf, splitNode);
    } else {
      this.adjustTree(leaf, null);
    }
    this.size++;
  }

  chooseLeaf(node, bbox) {
    if (node.isLeaf) return node;

    let bestChild = null;
    let minEnlargement = Infinity;
    let minArea = Infinity;

    for (const entry of node.entries) {
      const currentArea = entry.bbox.area();
      const enlargedArea = entry.bbox.enlargedArea(bbox);
      const enlargement = enlargedArea - currentArea;

      if (enlargement < minEnlargement) {
        minEnlargement = enlargement;
        minArea = currentArea;
        bestChild = entry.child;
      } else if (enlargement === minEnlargement) {
        if (currentArea < minArea) {
          minArea = currentArea;
          bestChild = entry.child;
        }
      }
    }

    return this.chooseLeaf(bestChild, bbox);
  }

  split(node) {
    // Quadratic split algorithm
    const entries = node.entries;
    const [seed1Idx, seed2Idx] = this.pickSeeds(entries);

    const group1 = [entries[seed1Idx]];
    const group2 = [entries[seed2Idx]];

    const bbox1 = new BoundingBox(entries[seed1Idx].bbox.minX, entries[seed1Idx].bbox.minY, entries[seed1Idx].bbox.maxX, entries[seed1Idx].bbox.maxY);
    const bbox2 = new BoundingBox(entries[seed2Idx].bbox.minX, entries[seed2Idx].bbox.minY, entries[seed2Idx].bbox.maxX, entries[seed2Idx].bbox.maxY);

    const remaining = entries.filter((_, idx) => idx !== seed1Idx && idx !== seed2Idx);

    while (remaining.length > 0) {
      if (group1.length + remaining.length <= this.minEntries) {
        group1.push(...remaining);
        break;
      }
      if (group2.length + remaining.length <= this.minEntries) {
        group2.push(...remaining);
        break;
      }

      const nextIdx = this.pickNext(remaining, bbox1, bbox2);
      const nextEntry = remaining.splice(nextIdx, 1)[0];

      const area1 = bbox1.enlargedArea(nextEntry.bbox) - bbox1.area();
      const area2 = bbox2.enlargedArea(nextEntry.bbox) - bbox2.area();

      if (area1 < area2) {
        group1.push(nextEntry);
        bbox1.expand(nextEntry.bbox);
      } else {
        group2.push(nextEntry);
        bbox2.expand(nextEntry.bbox);
      }
    }

    node.entries = group1;
    node.calculateBounds();

    const newNode = new RTreeNode(node.isLeaf, this.maxEntries, this.minEntries);
    newNode.entries = group2;
    newNode.calculateBounds();

    return newNode;
  }

  pickSeeds(entries) {
    let maxWaste = -Infinity;
    let seed1 = 0, seed2 = 1;

    for (let i = 0; i < entries.length; i++) {
      for (let j = i + 1; j < entries.length; j++) {
        const bbox1 = entries[i].bbox;
        const bbox2 = entries[j].bbox;
        const combinedArea = bbox1.enlargedArea(bbox2);
        const waste = combinedArea - bbox1.area() - bbox2.area();
        if (waste > maxWaste) {
          maxWaste = waste;
          seed1 = i;
          seed2 = j;
        }
      }
    }
    return [seed1, seed2];
  }

  pickNext(remaining, bbox1, bbox2) {
    let maxDiff = -1;
    let bestIdx = 0;
    for (let i = 0; i < remaining.length; i++) {
      const entryBbox = remaining[i].bbox;
      const d1 = bbox1.enlargedArea(entryBbox) - bbox1.area();
      const d2 = bbox2.enlargedArea(entryBbox) - bbox2.area();
      const diff = Math.abs(d1 - d2);
      if (diff > maxDiff) {
        maxDiff = diff;
        bestIdx = i;
      }
    }
    return bestIdx;
  }

  adjustTree(node1, node2) {
    if (node1 === this.root) {
      if (node2) {
        const newRoot = new RTreeNode(false, this.maxEntries, this.minEntries);
        newRoot.entries.push({ bbox: node1.bbox, child: node1 });
        newRoot.entries.push({ bbox: node2.bbox, child: node2 });
        newRoot.calculateBounds();
        this.root = newRoot;
      }
      return;
    }
  }

  search(searchBbox) {
    const results = [];
    this.searchNode(this.root, searchBbox, results);
    return results;
  }

  searchNode(node, searchBbox, results) {
    if (!node.bbox.intersects(searchBbox)) return;

    for (const entry of node.entries) {
      if (entry.bbox.intersects(searchBbox)) {
        if (node.isLeaf) {
          results.push(entry.data);
        } else {
          this.searchNode(entry.child, searchBbox, results);
        }
      }
    }
  }
}

module.exports = {
  BoundingBox,
  TacticalRTree,
  RTreeNode
};
