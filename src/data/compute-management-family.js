import getApi from './api';

const details = {};

details['compute-management-family'] = {
  type: 'compute-management-family',
  title: 'compute-management-family',
  variables: [{
    value: 'target.boot-volume.kms-key.id',
    title: 'Whether compute instances can be launched with boot volumes created without a Vault service master encryption key',
    type: 'Resource Specific'
  }],  
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

details['instance-configurations'] = {
  type: 'compute-management-family',
  title: 'instance-configurations',
  variables: [{
    value: 'target.boot-volume.kms-key.id',
    title: 'Whether compute instances can be launched with boot volumes created without a Vault service master encryption key',
    type: 'Resource Specific'
  }], 
  permissions: {
    inspect: {
      permissions: ["INSTANCE_CONFIGURATION_INSPECT"],
      apis: [getApi('ListInstanceConfigurations')]
    },
    read: {
      permissions: ["INSTANCE_CONFIGURATION_READ"],
      apis: [getApi('GetInstanceConfiguration')]
    },
    use: {
      permissions: [],
      apis: []
    },
    manage: {
      permissions: ["INSTANCE_CONFIGURATION_CREATE", "INSTANCE_CONFIGURATION_UPDATE", "INSTANCE_CONFIGURATION_LAUNCH", "INSTANCE_CONFIGURATION_DELETE", "INSTANCE_CONFIGURATION_MOVE"],
      apis: [
        getApi('CreateInstanceConfiguration', 'if using the CreateInstanceConfigurationDetails subtype'),
        getApi('UpdateInstanceConfiguration'), getApi('LaunchInstanceConfiguration'), getApi('DeleteInstanceConfiguration'), 
        getApi('ChangeInstanceConfigurationCompartment')
      ]
    }
  }
};

details['instance-pools'] = {
  type: 'compute-management-family',
  title: 'instance-pools',
  variables: [{
    value: 'target.boot-volume.kms-key.id',
    title: 'Whether compute instances can be launched with boot volumes created without a Vault service master encryption key',
    type: 'Resource Specific'
  }], 
  permissions: {
    inspect: {
      permissions: ["INSTANCE_POOL_INSPECT"],
      apis: [getApi('ListInstancePools')]
    },
    read: {
      permissions: ["INSTANCE_POOL_READ"],
      apis: [getApi('GetInstancePool'), getApi('ListInstancePoolInstances')]
    },
    use: {
      permissions: ["INSTANCE_POOL_POWER_ACTIONS"],
      apis: [],
      partial_apis: [
        getApi('ResetInstancePool', "also need 'use instances'"),
        getApi('SoftresetInstancePool', "also need 'use instances'"),
        getApi('StartInstancePool', "also need 'use instances'"), 
        getApi('StopInstancePool', "also need 'use instances'")
      ]
    },
    manage: {
      permissions: ["INSTANCE_POOL_CREATE", "INSTANCE_POOL_UPDATE", "INSTANCE_POOL_DELETE", "INSTANCE_POOL_MOVE"],
      apis: [
        getApi('UpdateInstancePool'), getApi('ChangeInstancePoolCompartment')
      ],
      partial_apis: [
        getApi('CreateInstancePool', "also need 'manage instances', 'read instance-images', 'use vnics' and 'use subnets'"), 
        getApi('TerminateInstancePool', "also need 'manage instances', 'use vnics', 'use subnets', 'manage volume-attachments' and 'use volumes'"),
        getApi('GetWorkRequest', 'for work requests related to instance-pools. Also need permission for CreateInstancePool or TerminateInstancePool'),
        getApi('ListWorkRequestLogs', 'for work requests related to instance-pools. Also need permission for CreateInstancePool or TerminateInstancePool'),
        getApi('ListWorkRequestErrors', 'for work requests related to instance-pools. Also need permission for CreateInstancePool or TerminateInstancePool')
      ]
    }
  }
};


details['cluster-networks'] = {
  type: 'compute-management-family',
  title: 'cluster-networks',
  variables: [{
    value: 'target.boot-volume.kms-key.id',
    title: 'Whether compute instances can be launched with boot volumes created without a Vault service master encryption key',
    type: 'Resource Specific'
  }], 
  permissions: {
    inspect: {
      permissions: ["CLUSTER_NETWORK_INSPECT"],
      apis: [getApi('ListClusterNetworks')]
    },
    read: {
      permissions: ["CLUSTER_NETWORK_READ"],
      apis: [getApi('GetClusterNetwork')],
      partial_apis: [getApi('ListClusterNetworkInstance', "also need 'read instance-pools'")]
    },
    use: {
      permissions: [],
      apis: []
    },
    manage: {
      permissions: ["CLUSTER_NETWORK_CREATE", "CLUSTER_NETWORK_UPDATE", "CLUSTER_NETWORK_DELETE", "CLUSTER_NETWORK_MOVE"],
      apis: [
        getApi('UpdateClusterNetwork'), getApi('ChangeClusterNetworkCompartment')
      ],
      partial_apis: [
        getApi('CreateClusterNetwork', "also need 'manage instances', 'manage instance-pools', read instance-images', 'use vnics' and 'use subnets'"), 
        getApi('TerminateClusterNetwork', "also need 'manage instances', 'manage instance-pools', 'use vnics', 'use subnets', 'manage volume-attachments' and 'use volumes'"),
        getApi('GetWorkRequest', 'for work requests related to cluster-networks. Also need permission for CreateClusterNetwork or TerminateClusterNetwork'),
        getApi('ListWorkRequestLogs', 'for work requests related to cluster-networks. Also need permission for CreateClusterNetwork or TerminateClusterNetwork'),
        getApi('ListWorkRequestErrors', 'for work requests related to cluster-networks. Also need permission for CreateClusterNetwork or TerminateClusterNetwork')
      ]
    }
  }
};


export default details;
