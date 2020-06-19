const api = {
  ListClusters: "https://docs.cloud.oracle.com/en-us/iaas/api/#/en/containerengine/20180222/ClusterSummary/ListClusters",
  ListWorkRequests: "https://docs.cloud.oracle.com/en-us/iaas/api/#/en/containerengine/20180222/WorkRequestSummary/ListWorkRequests",
  GetCluster: "https://docs.cloud.oracle.com/en-us/iaas/api/#/en/containerengine/20180222/Cluster/GetCluster",
  GetWorkRequest: "https://docs.cloud.oracle.com/en-us/iaas/api/#/en/containerengine/20180222/WorkRequest/GetWorkRequest",
  ListWorkRequestErrors: "https://docs.cloud.oracle.com/en-us/iaas/api/#/en/containerengine/20180222/WorkRequestError/ListWorkRequestErrors",
  ListWorkRequestLogs: "https://docs.cloud.oracle.com/en-us/iaas/api/#/en/containerengine/20180222/WorkRequestLogEntry/ListWorkRequestLogs",
  GetClusterKubeconfig: ""
}
export default (name, note) => {
  return {
    title: name,
    url: api[name],
    note: note
  }
}
