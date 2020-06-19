import getApi from './api';

const details = {};

details['instance-family'] = {
  type: 'instance-family',
  title: 'instance-family',
  variables: [{
    value: 'target.boot-volume.kms-key.id',
    title: 'Whether compute instances can be launched with boot volumes created without a Vault service master encryption key',
    type: 'Resource Specific'
  }],  
  permissions: {
    inspect: {
      permissions: ["VNIC_READ", "VNIC_ATTACHMENT_READ", "VOLUME_ATTACHMENT_INSPECT"],
      apis: []
    },
    read: {
      permissions: ["VOLUME_ATTACHMENT_READ"],
      apis: []
    },
    use: {
      permissions: ["VNIC_ATTACH", "VNIC_DETACH", "VOLUME_ATTACHMENT_UPDATE"],
      apis: []
    },
    manage: {
      permissions: ["VOLUME_ATTACHMENT_CREATE", "VOLUME_ATTACHMENT_DELETE"],
      apis: [],
      partial_apis: []
    }
  }
}

details['instances'] = {
  type: 'instance-family',
  title: 'instances',
  variables: [{
    value: 'target.boot-volume.kms-key.id',
    title: 'Whether compute instances can be launched with boot volumes created without a Vault service master encryption key',
    type: 'Resource Specific'
  }], 
  permissions: {
    inspect: {
      permissions: ["INSTANCE_INSPECT"],
      apis: [],
      partial_apis: [
        getApi('GetConsoleHistory', "also need 'inspect console-histories'"),
        getApi('ListConsoleHistories', "also need 'inspect console-histories'"),
        getApi('ListVnicAttachments', "also need 'inspect vnic-attachments'"),
        getApi('ListVolumeAttachments', "also need 'inspect volumes' and 'inspect volume-attachments'"),
        getApi('GetVolumeAttachments', "also need 'inspect volumes' and 'inspect volume-attachments'")
      ]
    },
    read: {
      permissions: ["INSTANCE_READ"],
      apis: [getApi('ListInstances', 'includes any user-provided metadata added to the instance'), getApi('GetInstance', 'includes any user-provided metadata added to the instance')],
      partial_apis: [
        getApi('CaptureConsoleHistory', "also need 'manage console-histories' and 'read instance-images'"),
        getApi('ShowConsoleHistoryData', "also need 'read console-histories' and 'read instance-images'"),
        getApi('CreateInstanceConfiguration', "if using the CreateInstanceConfigurationFromInstanceDetails subtype. Also need 'inspect vnics', 'inspect vnic-attachments', 'inspect volumes', and 'inspect volume-attachments'")
      ]
    },
    use: {
      permissions: ["INSTANCE_UPDATE", "INSTANCE_CREATE_IMAGE", "INSTANCE_POWER_ACTIONS", "INSTANCE_ATTACH_VOLUME", "INSTANCE_DETACH_VOLUME"],
      apis: [getApi('UpdateInstance'), getApi('InstanceAction')],
      partial_apis: [
        getApi('CreateImage', "also need 'manage instance-images"),
        getApi('AttachVolume', "also need 'manage volume-attachments' and 'use volumes'"),
        getApi('DetachVolume', "also need 'manage volume-attachments' and 'use volumes'")
      ]
    },
    manage: {
      permissions: ["INSTANCE_CREATE", "INSTANCE_DELTE", "INSTANCE_ATTACH_SECONDARY_VNIC", "INSTANCE_DETACH_SECONDARY_VNIC", "INSTANCE_MOVE"],
      apis: [getApi('ChangeInstanceCompartment')],
      partial_apis: [
        getApi('LaunchInstance', "also need 'read instance-images', 'use vnics', 'use subnets', 'use network-security-groups' and 'read app-catalog-listing'. To launch instances using the console, also need 'inspec vcns'"),
        getApi('TerminateInstance', "also need 'use vnics', 'use subnets'; also need 'manage volume-attachments' and 'use volumes' if a volume is attached"),
        getApi('AttachVnic', "also need 'use subnets', 'use network-security-groups', and either 'use vnics' or 'use instance-family'"),
        getApi('DetachVnic', "also need 'use subnets' and either 'use vnics' or 'use instance-family'"),
        getApi('GetWorkRequest', 'for work requests related to instances. Also need permission for LaunchInstance'),
        getApi('ListWorkRequestErrors', 'for work requests related to instances. Also need permission for LaunchInstance'),
        getApi('ListWorkRequestLogs', 'for work requests related to instances. Also need permission for LaunchInstance')
      ]
    }
  }
};

details['console-histories'] = {
  type: 'instance-family',
  title: 'console-histories',
  variables: [{
    value: 'target.boot-volume.kms-key.id',
    title: 'Whether compute instances can be launched with boot volumes created without a Vault service master encryption key',
    type: 'Resource Specific'
  }], 
  permissions: {
    inspect: {
      permissions: ["CONSOLE_HISTORY_INSPECT"],
      apis: [],
      partial_apis: [
        getApi('GetConsoleHistory', "also need 'inspect instances'"),
        getApi('ListConsoleHistories', "also need 'inspect instances'")
      ]
    },
    read: {
      permissions: ["CONSOLE_HISTORY_READ"],
      apis: [],
      partial_apis: [
        getApi('ShowConsoleHistoryData', "also need 'read instances' and 'read instance-images'")      
      ]
    },
    use: {
      permissions: [],
      apis: []
    },
    manage: {
      permissions: ["CONSOLE_HISTORY_CREATE", "CONSOLE_HISTORY_DELETE"],
      apis: [getApi('DeleteConsoleHistory')],
      partial_apis: [
        getApi('CaptureConsoleHistory', "also need 'read instances' and 'read instance-images'")
      ]
    }
  }
};

details['instance-console-connection'] = {
  type: 'instance-family',
  title: 'instance-console-connection',
  variables: [{
    value: 'target.boot-volume.kms-key.id',
    title: 'Whether compute instances can be launched with boot volumes created without a Vault service master encryption key',
    type: 'Resource Specific'
  }], 
  permissions: {
    inspect: {
      permissions: ["INSTANCE_CONSOLE_CONNECTION_INSPECT"],
      apis: [],
      partial_apis: [
        getApi('ListInstanceConsoleConnections', "also need 'inspect instances' and 'read instances'")
      ]
    },
    read: {
      permissions: ["INSTANCE_CONSOLE_CONNECTION_READ"],
      apis: [],
      partial_apis: [
        getApi('GetInstanceConsoleConnection', "also need 'read instances'")      
      ]
    },
    use: {
      permissions: [],
      apis: []
    },
    manage: {
      permissions: ["INSTANCE_CONSOLE_CONNECTION_CREATE", "INSTANCE_CONSOLE_CONNECTION_DELETE"],
      apis: [getApi('DeleteInstanceConsoleConnection')],
      partial_apis: [
        getApi('CreateInstanceConsoleConnection', "also need 'read instances'")
      ]
    }
  }
};

details['instance-images'] = {
  type: 'instance-family',
  title: 'instance-images',
  variables: [{
    value: 'target.boot-volume.kms-key.id',
    title: 'Whether compute instances can be launched with boot volumes created without a Vault service master encryption key',
    type: 'Resource Specific'
  }], 
  permissions: {
    inspect: {
      permissions: ["INSTANCE_IMAGE_INSPECT"],
      apis: [getApi('ListImages'), getApi('GetImage')]
    },
    read: {
      permissions: ["INSTANCE_IMAGE_READ"],
      apis: [],
      partial_apis: [
        getApi('LaunchInstance', "also need 'manage instances', 'use vnics', 'use subnets' and 'use network-security-groups'"),
        getApi('CaptureConsoleHistory', "also need 'read instances' and 'manage console-histories'"),
        getApi('ShowConsoleHistoryData', "also need 'read instances' and 'read console-histories'")      
      ]
    },
    use: {
      permissions: ["INSTANCE_IMAGE_UPDATE"],
      apis: [getApi('UpdateImage')]
    },
    manage: {
      permissions: ["INSTANCE_IMAGE_CREATE", "INSTANCE_IMAGE_DELETE", "INSTANCE_IMAGE_MOVE"],
      apis: [getApi('DeleteImage'), getApi('ChangeImageCompartment')],
      partial_apis: [
        getApi('CreateImage', "also need 'use instances'"),
        getApi('GetWorkRequest', 'for work requests related to instance-images. Also need permission for CreateImage'),
        getApi('ListWorkRequestErrors', 'for work requests related to instance-images. Also need permission for CreateImage'),
        getApi('ListWorkRequestLogs', 'for work requests related to instance-images. Also need permission for CreateImage')
      ]
    }
  }
};

details['app-catalog-listing'] = {
  type: 'instance-family',
  title: 'app-catalog-listing',
  variables: [{
    value: 'target.boot-volume.kms-key.id',
    title: 'Whether compute instances can be launched with boot volumes created without a Vault service master encryption key',
    type: 'Resource Specific'
  }], 
  permissions: {
    inspect: {
      permissions: ["APP_CATALOG_LISTING_INSPECT"],
      apis: [getApi('ListAppCatalogSubscriptions')]
    },
    read: {
      permissions: ["APP_CATALOG_LISTING_READ"],
      apis: [],
      partial_apis: [
        getApi('LaunchInstance', "also need 'manage instances', 'use vnics', 'use subnets' and 'use network-security-groups'")
      ]
    },
    use: {
      permissions: ["APP_CATALOG_LISTING_SUBSCRIBE"],
      apis: [getApi('CreateAppCatalogSubscription'), getApi('DeleteAppCatalogSubscription')]
    },
    manage: {
      permissions: [],
      apis: []
    }
  }
};


export default details;
