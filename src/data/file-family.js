import getApi from './api';

const details = {};

details['file-family'] = {
  type: 'file-family',
  title: 'file-family',
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


details['file-systems'] = {
  type: 'file-family',
  title: 'file-systems',
  variables: [],
  permissions: {
    inspect: {
      permissions: ["FILE_SYSTEM_INSPECT"],
      apis: [getApi('ListFileSystems')]
    },
    read: {
      permissions: ["FILE_SYSTEM_READ"],
      apis: [getApi('GetFileSystem'), getApi('GetSnapshot'), getApi('ListSnapshots')]
    },
    use: {
      permissions: ["FILE_SYSTEM_NFSv3_EXPORT", "FILE_SYSTEM_NFSv3_UNEXPORT"],
      apis: [],
      partial_apis: [
        getApi('CreateExport', "also need 'manage export-sets'"),
        getApi('DeleteExport', "also need 'manage export-sets'"),
      ]
    },
    manage: {
      permissions: ["FILE_SYSTEM_CREATE", "FILE_SYSTEM_UPDATE", "FILE_SYSTEM_DELETE", "FILE_SYSTEM_CREATE_SNAPSHOT", "FILE_SYSTEM_DELETE_SNAPSHOT"],
      apis: [
        getApi('CreateFileSystem', "If creating a file system encrypted with a Key Management master encryption key, also need 'use key-delegate' (for the caller) and 'read keys' (for the service principal)."), 
        getApi('UpdateFileSystem'), getApi('DeleteFileSystem'), getApi('CreateSnapshot'), getApi('DeleteSnapshot')]
    }
  }
}


details['mount-targets'] = {
  type: 'file-family',
  title: 'mount-targets',
  variables: [],
  permissions: {
    inspect: {
      permissions: ["MOUNT_TARGET_INSPECT"],
      apis: [getApi('ListMountTargets')]
    },
    read: {
      permissions: ["MOUNT_TARGET_READ"],
      apis: [getApi('GetMountTarget')]
    },
    use: {
      permissions: [],
      apis: []
    },
    manage: {
      permissions: ["MOUNT_TARGET_CREATE", "MOUNT_TARGET_UPDATE", "MOUNT_TARGET_DELETE"],
      apis: [getApi('UpdateMountTarget')],
      partial_apis: [
        getApi('CreateMountTarget', "also need 'use vnics', 'use subnets' and 'use private-ips'"),
        getApi('DeleteMountTarget', "also need 'use vnics', 'use subnets' and 'use private-ips'")
      ]
    }
  }
}


details['export-sets'] = {
  type: 'file-family',
  title: 'export-sets',
  variables: [],
  permissions: {
    inspect: {
      permissions: ["EXPORT_SET_INSPECT"],
      apis: [getApi('ListExportSets')]
    },
    read: {
      permissions: ["EXPORT_SET_READ"],
      apis: [getApi('GetExport'), getApi('GetExportSet'), getApi('ListExports')]
    },
    use: {
      permissions: [],
      apis: []
    },
    manage: {
      permissions: ["EXPORT_SET_CREATE", "EXPORT_SET_UPDATE", "EXPORT_SET_DELETE"],
      apis: [getApi('CreateExportSet'), getApi('UpdateExportSet'), getApi('DeleteExportSet')],
      partial_apis: [
        getApi('CreateExport', "also need 'use file-systems'"),
        getApi('DeleteExport', "also need 'use file-systems'"),
      ]
    }
  }
}

export default details;
