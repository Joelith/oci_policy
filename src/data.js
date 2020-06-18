
const api = {
  ListClusters: "https://docs.cloud.oracle.com/en-us/iaas/api/#/en/containerengine/20180222/ClusterSummary/ListClusters",
  ListWorkRequests: "https://docs.cloud.oracle.com/en-us/iaas/api/#/en/containerengine/20180222/WorkRequestSummary/ListWorkRequests",
  GetCluster: "https://docs.cloud.oracle.com/en-us/iaas/api/#/en/containerengine/20180222/Cluster/GetCluster",
  GetWorkRequest: "https://docs.cloud.oracle.com/en-us/iaas/api/#/en/containerengine/20180222/WorkRequest/GetWorkRequest",
  ListWorkRequestErrors: "https://docs.cloud.oracle.com/en-us/iaas/api/#/en/containerengine/20180222/WorkRequestError/ListWorkRequestErrors",
  ListWorkRequestLogs: "https://docs.cloud.oracle.com/en-us/iaas/api/#/en/containerengine/20180222/WorkRequestLogEntry/ListWorkRequestLogs",
  GetClusterKubeconfig: ""
}
const getApi = (name, note) => {
  return {
    title: name,
    url: api[name],
    note: note
  }
}


let data = {};
const clean = (info) => {
  info.permissions.read.permissions = info.permissions.inspect.permissions.concat(info.permissions.read.permissions);
  info.permissions.read.apis = info.permissions.inspect.apis.concat(info.permissions.read.apis);

  info.permissions.use.permissions = info.permissions.read.permissions.concat(info.permissions.use.permissions);
  info.permissions.use.apis = info.permissions.read.apis.concat(info.permissions.use.apis);

  info.permissions.manage.permissions = info.permissions.use.permissions.concat(info.permissions.manage.permissions);
  info.permissions.manage.apis = info.permissions.use.apis.concat(info.permissions.manage.apis);

  if (!data[info.type]) data[info.type] = {
    type: info.type,
    title: info.type,
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
  data[info.type].permissions.inspect.permissions = data[info.type].permissions.inspect.permissions.concat(info.permissions.inspect.permissions);
  data[info.type].permissions.inspect.apis = data[info.type].permissions.inspect.apis.concat(info.permissions.inspect.apis);

  data[info.type].permissions.read.permissions = data[info.type].permissions.read.permissions.concat(info.permissions.read.permissions);
  data[info.type].permissions.read.apis = data[info.type].permissions.read.apis.concat(info.permissions.read.apis);

  data[info.type].permissions.use.permissions = data[info.type].permissions.use.permissions.concat(info.permissions.use.permissions);
  data[info.type].permissions.use.apis = data[info.type].permissions.use.apis.concat(info.permissions.use.apis);

  data[info.type].permissions.manage.permissions = data[info.type].permissions.manage.permissions.concat(info.permissions.manage.permissions);
  data[info.type].permissions.manage.apis = data[info.type].permissions.manage.apis.concat(info.permissions.manage.apis);
  data[info.type].permissions.manage.partial_apis = data[info.type].permissions.manage.partial_apis.concat(info.permissions.manage.partial_apis || []);

  return info;
}

const buildAll = () => {
  const _families = data.filter((item) => {
    if (item.type == item.title) return item;
  });
  let variables = [];
  let inspect = {
    apis: [],
    permissions: []
  };
  let read = {
    apis: [],
    permissions: []
  };
  let use = {
    apis: [],
    permissions: []
  };
  let manage = {
    apis: [],
    permissions: []
  };
  _families.map((fam) => {
    inspect.apis = inspect.apis.concat(fam.permissions.inspect.apis);
    inspect.permissions = inspect.permissions.concat(fam.permissions.inspect.permissions);

    read.apis = read.apis.concat(fam.permissions.read.apis);
    read.permissions = read.permissions.concat(fam.permissions.read.permissions);

    use.apis = use.apis.concat(fam.permissions.use.apis);
    use.permissions = use.permissions.concat(fam.permissions.use.permissions);

    manage.apis = manage.apis.concat(fam.permissions.manage.apis);
    manage.permissions = manage.permissions.concat(fam.permissions.manage.permissions);

  });

  return {
    title: 'all-resources',
    variables: variables,
    permissions: {
      inspect: inspect,
      read: read,
      use: use,
      manage: manage
    }
  }
}

const clusters = {
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

const cluster_node_pools = {
  type: 'cluster-family',
  title: 'cluster_node_pools',
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

const cluster_work_requests = {
  type: 'cluster-family',
  title: 'cluster_work_requests',
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


data.clusters = clean(clusters);
data.cluster_node_pools = clean(cluster_node_pools);
data.cluster_work_requests = clean(cluster_work_requests);

data.vcns = clean({
  type: 'virtual-network-family',
  title: 'vcns',
  permissions: {
    inspect: {
      permissions: ["VCN_READ"],
      apis: [getApi('ListVcns'), getApi('GetVcn')],
      partial_apis: [
        getApi('CreateNatGateway', "also need 'manage nat-gateways' and 'manage vcns' or just use 'manage virtual-network-family'"),
        getApi('DeleteNatGateway', "also need 'manage nat-gateways' and 'manage vcns' or just use 'manage virtual-network-family'"),
      ]
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
      permissions: ["VCN_ATTACH", "VCN_DETACH", "VCN_UPDATE", "VCN_CREATE", "VCN_DELETE", "VCN_MOVE"],
      apis: [getApi('CreateVcn'), getApi('UpdateVcn'), getApi('DeleteVcn'), getApi('ChangeVcnCompartment')],
      partial_apis: [
        getApi('CreateSubnet', "also need 'manage route-tables', 'manage security-lists', and 'manage dhcp-options' or just use 'manage virtual-network-family'"),
        getApi('DeleteSubnet', "also need 'manage route-tables', 'manage security-lists', and 'manage dhcp-options' or just use 'manage virtual-network-family'"),
        getApi('CreateInternetGateway', "also need 'manage internet-gateways'"),
        getApi('DeleteInternetGateway', "also need 'manage internet-gateways'"),
        getApi('CreateLocalPeeringGateway', "also need 'manage local-peering-gateways' and 'manage route-tables' if you associate a route table during creation"),
        getApi('DeleteLocalPeeringGateway', "also need 'manage local-peering-gateways'"),
        getApi('CreateNatGateway', "also need 'manage nat-gateways'"),
        getApi('DeleteNatGateway', "also need 'manage nat-gateways'"),
        getApi('CreateNetworkSecurityGroup', "also need 'manage network-security-groups'"),
        getApi('DeleteNetworkSecurityGroup', "also need 'manage network-security-groups'"),
        getApi('CreateRouteTable', "also need 'manage route-tables', 'manage internet-gateways', 'manage drgs', 'manage private-ips', 'manage local-peering-gateways', 'use nat-gateways' and 'use service-gateways'"),
        getApi('CreateServiceGateway', "also need 'manage service-gateways'"),
        getApi('DeleteServiceGateway', "also need 'manage service-gateways'"),
        getApi('CreateSecurityList', "also need 'manage service-lists'"),
        getApi('DeleteSecurityList', "also need 'manage service-lists'"),
        getApi('CreateDhcpOptions', "also need 'manage dhcp-options'"),
        getApi('DeleteDhcpOptions', "also need 'manage dhcp-options'"),
        getApi('CreateDrgAttachment', "also need 'manage drg' and 'manage route-tables"),
        getApi('DeleteDrgAttachment', "also need 'manage drg' and 'manage route-tables")
      ]
    }
  }
});

data.subnets = clean({
  type: 'virtual-network-family',
  title: 'subnets',
  permissions: {
    inspect: {
      permissions: ["SUBNET_READ"],
      apis: [getApi('ListSubnets'), getApi('GetSubnet')]
    },
    read: {
      permissions: [],
      apis: []
    },
    use: {
      permissions: ["SUBNET_ATTACH", "SUBNET_DETACH"],
      apis: [],
      partial_apis: [
        getApi('LaunchInstance', "also need 'use vnics', 'use network-security-groups' and 'manage instance-family'"),
        getApi('TerminateInstance', "also need 'manage instance-family' and 'use volumes' if a volume is attached"),
        getApi('AttachVnic', "also need 'manage instances', 'use network-security-groups' and either 'use vnics' or 'use instance-family'"),
        getApi('DetachVnic', "also need 'manage instances' and either 'use vnics' or 'use instance-family'"),
        getApi('CreatePrivateIp', "also need 'use private-ips' and 'use vnics'"),
        getApi('DeletePrivateIp', "also need 'use private-ips' and 'use vnics'")
      ]
    },
    manage: {
      permissions: ["SUBNET_CREATE", "SUBNET_UPDATE", "SUBNET_DELETE", "SUBNET_MOVE"],
      apis: [getApi('ChangeSubnetCompartment')],
      partial_apis: [
        getApi('CreateSubnet', "also need 'manage vcns', 'manage route-tables', 'manage security-lists', 'manage dhcp-options'"),
        getApi('DeleteSubnet', "also need 'manage vcns', 'manage route-tables', 'manage security-lists', 'manage dhcp-options'"),
        getApi('UpdateSubnet', "also need 'manage route-tables' if changing which route table is associated with the subnet, 'manage security-lists' if chaning which security lists are associated with the subnet and manage dhcp-options' if changing which set of DHCP options is associated with the subnet")
      ]
    }
  }
});


data = Object.values(data);
data.unshift(buildAll());

export default data;
