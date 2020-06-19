import getApi from './api';

const details = {};

details['auto-scaling-configurations'] = {
  type: 'auto-scaling-configurations',
  title: 'auto-scaling-configurations',
  variables: [{
    value: 'target.boot-volume.kms-key.id',
    title: 'Whether compute instances can be launched with boot volumes created without a Vault service master encryption key',
    type: 'Resource Specific'
  }],  
  permissions: {
    inspect: {
      permissions: ["AUTO_SCALING_CONFIGURATION_INSPECT"],
      apis: [getApi('ListAutoScalingConfigurations'), getApi('ListAutoScalingPolicies')]
    },
    read: {
      permissions: ["AUTO_SCALING_CONFIGURATION_READ"],
      apis: [getApi('GetAutoScalingConfiguration'), getApi('GetAutoScalingPolicy')]
    },
    use: {
      permissions: [],
      apis: []
    },
    manage: {
      permissions: ["AUTO_SCALING_CONFIGURATION_CREATE", "AUTO_SCALING_CONFIGURATION_UPDATE", "AUTO_SCALING_CONFIGURATION_DELETE", "AUTO_SCALING_CONFIGURATION_MOVE"],
      apis: [getApi('ChangeAutoScalingConfigurationCompartment')],
      partial_apis: [
        getApi('CreateAutoScalingConfiguration', "also need 'manage instance-pools'"),
        getApi('UpdateAutoScalingConfiguration', "also need 'manage instance-pools'"),
        getApi('DeleteAutoScalingConfiguration', "also need 'manage instance-pools'"),
        getApi('CreateAutoScalingPolicy', "also need 'manage instance-pools'"),
        getApi('UpdateAutoScalingPolicy', "also need 'manage instance-pools'"),
        getApi('DeleteAutoScalingPolicy', "also need 'manage instance-pools'"),
      ]
    }
  }
}

details['dedicated-vm-hosts'] = {
  type: 'dedicated-vm-hosts',
  title: 'dedicated-vm-hosts',
  variables: [{
    value: 'target.boot-volume.kms-key.id',
    title: 'Whether compute instances can be launched with boot volumes created without a Vault service master encryption key',
    type: 'Resource Specific'
  }],  
  permissions: {
    inspect: {
      permissions: ["DEDICATED_VM_HOST_INSPECT"],
      apis: [getApi('ListDedicatedVmHosts')]
    },
    read: {
      permissions: ["DEDICATED_VM_HOST_READ"],
      apis: [getApi('GetDedicatedVmHost'), getApi('ListDedicatedVmHostInstances')]
    },
    use: {
      permissions: ["DEDICATED_VM_HOST_LAUNCH_INSTANCE", "DEDICATED_VM_HOST_UPDATE"],
      apis: [getApi('UpdateDedicatedVmHost')],
      partial_apis: [getApi('LaunchInstance', "also need 'create instance' in the compartment to launch the instance and 'dedicated-vm-host launch instance' in the compartment for the dedicated virtual machine host")]
    },
    manage: {
      permissions: ["DEDICATED_VM_HOST_CREATE", "DEDICATED_VM_HOST_MOVE", "DEDICATED_VM_HOST_DELETE"],
      apis: [getApi('CreateDedicatedVmHost'), getApi('DeleteDedicatedVmHost'), getApi('ChangeDedicatedVmHostCompartment')]
    }
  }
}


details['work-requests'] = {
  type: 'work-requests',
  title: 'work-requests',
  variables: [{
    value: 'target.boot-volume.kms-key.id',
    title: 'Whether compute instances can be launched with boot volumes created without a Vault service master encryption key',
    type: 'Resource Specific'
  }],  permissions: {
    inspect: {
      permissions: ["WORKREQUEST_INSPECT"],
      apis: [getApi('ListWorkRequests')]
    },
    read: {
      permissions: [],
      apis: []
    },
    use: {
      permissions: [],
      apis: [],
      partial_apis: []
    },
    manage: {
      permissions: [],
      apis: []
    }
  }
}
export default details;
