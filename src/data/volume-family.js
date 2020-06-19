import getApi from './api';

const details = {};

details['volume-family'] = {
  type: 'volume-family',
  title: 'volume-family',
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

details['volumes'] = {
  type: 'volume-family',
  title: 'volumes',
  variables: [{
    value: 'target.boot-volume.kms-key.id',
    title: 'Whether compute instances can be launched with boot volumes created without a Vault service master encryption key',
    type: 'Resource Specific'
  }], 
  permissions: {
    inspect: {
      permissions: ["VOLUME_INSPECT"],
      apis: [getApi('ListVolumes'), getApi('GetVolume')],
      partial_apis: [
        getApi('ListVolumeBackups', "also need 'inspect volume-backups'"),
        getApi('GetVolumeBackup', "also need 'inspect volume-backups'"),
        getApi('UpdateVolumeBackup', "also need 'read volume-backups'"),
        getApi('DeleteVolumeBackup', "also need 'manage volume-backups'"),
        getApi('GetVolumeAttachment', "also need 'inspect instances' and 'inspect volume-attachments'. If you to get the CHAP secret it it exists, 'read volume-attachments' is required'"),
        getApi('CreateInstanceConfiguration', "if using the CreateInstanceConfigurationFromInstanceDetails subtype. Also need 'read instances', 'inspect vnics', 'inspect vnic-attachments', and 'inspect volume-attachments'")
      ]
    },
    read: {
      permissions: [],
      apis: []
    },
    use: {
      permissions: ["VOLUME_UPDATE", "VOLUME_WRITE"],
      apis: [],
      partial_apis: [
        getApi('AttachVolume', "also need 'manage volume-attachments' and 'use instances'"),
        getApi('DetachVolume', "also need 'manage volume-attachments' and 'use instances'"),
        getApi('CreateVolumeBackup', "also need 'manage volume-backups'")
      ]
    },
    manage: {
      permissions: ["VOLUME_CREATE", "VOLUME_DELETE", "VOLUME_MOVE"],
      apis: [
        getApi('CreateVolume', "If creating a volume from a backup, also need 'read volume-backups'. If creating a volue encrypted with a vault service master encryption key also need 'use key-delegate' for the caller and 'read keys' for the service principal"), 
        getApi('DeleteVolume'), 
        getApi('ChangeVolumeCompartment', "when moving volumes between compartments the 'move voume' permission is needed for both source and destination compartments")],
      partial_apis: []
    }
  }
}

details['volume-attachments'] = {
  type: 'volume-family',
  title: 'volume-attachments',
  variables: [{
    value: 'target.boot-volume.kms-key.id',
    title: 'Whether compute instances can be launched with boot volumes created without a Vault service master encryption key',
    type: 'Resource Specific'
  }],   
  permissions: {
    inspect: {
      permissions: ["VOLUME_ATTACHMENT_INSPECT"],
      apis: [getApi('ListVolumeAttachments')],
      partial_apis: [
        getApi('GetVolumeAttachment', "also need 'inspect volumes' and 'inspect instances'"),
        getApi('CreateInstanceConfiguration', "if using the CreateInstanceConfigurationFromInstanceDetails subtype. Also need 'read instances', 'inspect vnics', 'inspect vnic-attachments', and 'inspect volumes'")
      ]
    },
    read: {
      permissions: ["VOLUME_ATTACHMENT_READ"],
      apis: []
    },
    use: {
      permissions: ["VOLUME_ATTACHMENT_UPDATE"],
      apis: []
    },
    manage: {
      permissions: ["VOLUME_ATTACHMENT_CREATE", "VOLUME_ATTACHMENT_DELETE"],
      apis: [],
      partial_apis: [
        getApi('AttachVolume', "also need 'use volumes' and 'use instances'"),
        getApi('DetachVolume', "also need 'use volumes' and 'use instances'")        
      ]
    }
  }
}

details['volume-backups'] = {
  type: 'volume-family',
  title: 'volume-backups',
  variables: [{
    value: 'target.boot-volume.kms-key.id',
    title: 'Whether compute instances can be launched with boot volumes created without a Vault service master encryption key',
    type: 'Resource Specific'
  }],
  permissions: {
    inspect: {
      permissions: ["VOLUME_BACKUP_INSPECT"],
      apis: [],
      partial_apis: [
        getApi('ListVolumeBackups', "also need 'inspect volumes'"),
        getApi('GetVolumeBackup', "also need 'inspect volumes'")
      ]
    },
    read: {
      permissions: ["VOLUME_BACKUP_READ"],
      apis: [],
      partial_apis: [getApi('CreateVolume', "also need 'manage volumes' when creating a volume from a backup")]
    },
    use: {
      permissions: ["VOLUME_BACKUP_COPY", "VOLUME_BACKUP_UPDATE"],
      apis: [],
      partial_apis: [
        getApi('UpdateVolumeBackup', "also need 'inspect volumes'"),
        getApi('CopyVolumeBackup', "also need 'create volume backups' in desination region")
      ]
    },
    manage: {
      permissions: ["VOLUME_BACKUP_CREATE", "VOLUME_BACKUP_DELETE", "VOLUME_BACKUP_MOVE"],
      apis: [getApi('ChangeVolumeBackupCompartment', "When moving volume backups between compartments the 'move volume-backup' permission is needed for both source and destination compartments")],
      partial_apis: [
        getApi('CreateVolumeBackup', "also need 'use volumes'"),
        getApi('DeleteVolumeBackup', "also need 'use volumes'")        
      ]
    }
  }
}

details['boot-volume-backups'] = {
  type: 'volume-family',
  title: 'boot-volume-backups',
  variables: [{
    value: 'target.boot-volume.kms-key.id',
    title: 'Whether compute instances can be launched with boot volumes created without a Vault service master encryption key',
    type: 'Resource Specific'
  }],
  permissions: {
    inspect: {
      permissions: ["BOOT_VOLUME_BACKUP_INSPECT"],
      apis: [],
      partial_apis: [
        getApi('ListBootVolumeBackups', "also need 'inspect volumes'"),
        getApi('GetBootVolumeBackup', "also need 'inspect volumes'")
      ]
    },
    read: {
      permissions: ["BOOT_VOLUME_BACKUP_READ"],
      apis: [],
      partial_apis: [getApi('CreateBootVolume', "also need 'manage volumes' when creating a volume from a backup")]
    },
    use: {
      permissions: ["BOOT_VOLUME_BACKUP_COPY", "BOOT_VOLUME_BACKUP_UPDATE"],
      apis: [],
      partial_apis: [
        getApi('UpdateBootVolumeBackup', "also need 'inspect volumes'"),
        getApi('CopyBootVolumeBackup', "also need 'create boot volume backups' in desination region")
      ]
    },
    manage: {
      permissions: ["BOOT_VOLUME_BACKUP_CREATE", "BOOT_VOLUME_BACKUP_DELETE", "BOOT_VOLUME_BACKUP_MOVE"],
      apis: [getApi('ChangeVolumeBackupCompartment', "When moving bootvolume backups between compartments the 'move boot volume-backup' permission is needed for both source and destination compartments")],
      partial_apis: [
        getApi('CreateBootVolumeBackup', "also need 'use volumes'"),
        getApi('DeleteBootVolumeBackup', "also need 'use volumes'")        
      ]
    }
  }
}

details['backup-policies'] = {
  type: 'volume-family',
  title: 'backup-policies',
  variables: [{
    value: 'target.boot-volume.kms-key.id',
    title: 'Whether compute instances can be launched with boot volumes created without a Vault service master encryption key',
    type: 'Resource Specific'
  }],
  permissions: {
    inspect: {
      permissions: ["BACKUP_POLICY_INSPECT"],
      apis: [getApi('ListVolumeBackupPolicies'), getApi('GetVolumeBackupPolicy')]
    },
    read: {
      permissions: [],
      apis: [],
    },
    use: {
      permissions: ["BACKUP_POLICIES_UPDATE"],
      apis: [getApi('UpdateVolumeBackupPolicy')]
    },
    manage: {
      permissions: ["BACKUP_POLICIES_CREATE", "BACKUP_POLICIES_DELETE"],
      apis: [getApi('CreateVolumeBackupPolicy'), getApi('DeleteVolumeBackupPolicy')],

    }
  }
}

details['backup-policy-assignments'] = {
  type: 'volume-family',
  title: 'backup-policy-assignments',
  variables: [{
    value: 'target.boot-volume.kms-key.id',
    title: 'Whether compute instances can be launched with boot volumes created without a Vault service master encryption key',
    type: 'Resource Specific'
  }],
  permissions: {
    inspect: {
      permissions: ["BACKUP_POLICY_ASSIGNMENT_INSPECT"],
      apis: [getApi('GetVolumeBackupPolicyAssignment')],
      partial_apis: [getApi('GetVolumeBackupPolicyAssetAssignment', "also need 'inspect volumes'")]
    },
    read: {
      permissions: [],
      apis: [],
    },
    use: {
      permissions: [],
      apis: []
    },
    manage: {
      permissions: ["BACKUP_POLICY_ASSIGNMENT_CREATE", "BACKUP_POLICY_ASSIGNMENT_DELETE"],
      apis: [getApi('CreateVolumeBackupPolicyAssignment'), getApi('DeleteVolumeBackupPolicyAssignment')]
    }
  }
}

details['volume-groups'] = {
  type: 'volume-family',
  title: 'volume-groups',
  variables: [{
    value: 'target.boot-volume.kms-key.id',
    title: 'Whether compute instances can be launched with boot volumes created without a Vault service master encryption key',
    type: 'Resource Specific'
  }],
  permissions: {
    inspect: {
      permissions: ["VOLUME_GROUP_INSPECT"],
      apis: [getApi('ListVolumeGroups'), getApi('GetVolumeGroup')]
    },
    read: {
      permissions: [],
      apis: [],
    },
    use: {
      permissions: [],
      apis: []
    },
    manage: {
      permissions: ["VOLUME_GROUP_UPDATE", "VOLUME_GROUP_CREATE", "VOLUME_GROUP_DELETE", "VOLUME_GROUP_MOVE"],
      apis: [getApi('DeleteVolumeGroup')],
      partial_apis: [
        getApi('UpdateVolumeGroup', "also need 'inspect volume' for the volumes in the request"),
        getApi('CreateVolumeGroup', "also need a number of other permissions depending on the scenario. Check the documentation"),
        getApi('ChangeVolumeGroupCompartment', "also need 'move volume' or 'move boot volume' for the volumes in the request. When moving volume groups between compartments, the 'move volume group' and 'move volume permissions' are needed for both source and destination compartments.")
      ]
    }
  }
}

details['volume-group-backups'] = {
  type: 'volume-family',
  title: 'volume-group-backups',
  variables: [{
    value: 'target.boot-volume.kms-key.id',
    title: 'Whether compute instances can be launched with boot volumes created without a Vault service master encryption key',
    type: 'Resource Specific'
  }],
  permissions: {
    inspect: {
      permissions: ["VOLUME_GROUP_BACKUP_INSPECT"],
      apis: [getApi('ListVolumeGroupBackups'), getApi('GetVolumeGroupBackup')]
    },
    read: {
      permissions: [],
      apis: [],
    },
    use: {
      permissions: [],
      apis: []
    },
    manage: {
      permissions: ["VOLUME_GROUP_BACKUP_UPDATE", "VOLUME_GROUP_BACKUP_CREATE", "VOLUME_GROUP_BACKUP_DELETE", "VOLUME_GROUP_BACKUP_MOVE"],
      apis: [getApi('UpdateVolumeGroupBackup')],
      partial_apis: [
        getApi('CreateVolumeGroup', "also need a number of other permissions depending on the scenario. Check the documentation"),
        getApi('DeleteVolumeGroupBackup', "also need 'delete volume backup' or 'delete boot volume backup'"),
        getApi('ChangeVolumeGroupCompartment', "also need 'move volume backup' or 'move boot volume backup' for the volumes in the request. When moving volume groups between compartments, the 'move volume group backup' and 'move volume backup permissions' are needed for both source and destination compartments.")
      ]
    }
  }
}


export default details;
