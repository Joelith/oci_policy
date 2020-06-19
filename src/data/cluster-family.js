import getApi from './api';

const details = {};

details['cluster-family'] = {
  type: 'cluster-family',
  title: 'cluster-family',
  variables: [],
  permissions: {
    inspect: {
      permissions: [],
      apis: []
    },
    read: {
      permissions: [],
      apis: []
    },
    use: {
      permissions: [],
      apis: []
    },
    manage: {
      permissions: [],
      apis: [],
      partial_apis: []
    }
  }
}

details.clusters = {
  type: 'cluster-family',
  title: 'clusters',
  variables: [{
    "value": "target.cluster.id",
    "title": "The Cluster ID",
    "type": "Resource Specific"
  }],
  permissions: {
    inspect: {
      permissions: ["CLUSTER_INSPECT"],
      apis: [getApi('ListClusters'), getApi('ListWorkRequests')]
    },
    read: {
      permissions: ["CLUSTER_READ"],
      apis: [getApi('GetCluster')]
    },
    use: {
      permissions: ["CLUSTER_USE"],
      apis: [getApi('GetWorkRequest'), getApi('ListWorkRequestErrors'), getApi('ListWorkRequestLogs'), getApi('GetClusterKubeconfig')]
    },
    manage: {
      permissions: ["CLUSTER_CREATE", "CLUSTER_DELETE", "CLUSTER_UPDATE", "CLUSTER_MANAGE"],
      apis: []
    }
  }
}

details['cluster-node-pools'] = {
  type: 'cluster-family',
  title: 'cluster-node-pools',
  variables: [{
    "value": "target.nodepool.id",
    "title": "The Node Pool ID",
    "type": "Resource Specific"
  }],
  permissions: {
    inspect: {
      permissions: ["CLUSTER_NODE_POOL_INSPECT"],
      apis: [getApi('ListNodePools'), getApi('ListWorkRequests')]
    },
    read: {
      permissions: ["CLUSTER_NODE_POOL_READ"],
      apis: [getApi('GetNodePool'), getApi('GetWorkRequest'), getApi('ListWorkRequestErrors'), getApi('ListWorkRequestLogs')]
    },
    use: {
      permissions: [],
      apis: []
    },
    manage: {
      permissions: ["CLUSTER_NODE_POOL_CREATE", "CLUSTER_NODE_POOL_DELETE", "CLUSTER_NODE_POOL_UPDATE"],
      apis: [],
      partial_apis: [
        getApi('CreateNodePool', "also need 'manage instance-family', 'use subnets', 'use vnics', and 'inspect compartments'"), 
        getApi('DeleteNodePool', "also need 'manage instance-family', 'use subnets', 'use vnics', and 'inspect compartments'"),
        getApi('UpdateNodePool', "also need 'manage instance-family', 'use subnets', 'use vnics', and 'inspect compartments'")
      ]
    }
  }
}

details['cluster-work-requests'] = {
  type: 'cluster-family',
  title: 'cluster-work-requests',
  permissions: {
    inspect: {
      permissions: ["CLUSTER_WORK_REQUEST_INSPECT"],
      apis: [getApi('ListWorkRequests')]
    },
    read: {
      permissions: ["CLUSTER_WORK_REQUEST_READ"],
      apis: [getApi('GetWorkRequest'), getApi('ListWorkRequestErrors'), getApi('ListWorkRequestLogs')]
    },
    use: {
      permissions: [],
      apis: []
    },
    manage: {
      permissions: ["CLUSTER_WORK_REQUEST_DELETE"],
      apis: [getApi('DeleteWorkRequest')]
    }
  }
}
export default details;