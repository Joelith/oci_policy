import getApi from './api';

const details = {};

details['database-family'] = {
  type: 'database-family',
  title: 'database-family',
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


details['db-systems'] = {
  type: 'database-family',
  title: 'db-systems',
  variables: [],
  permissions: {
    inspect: {
      permissions: ["DB_SYSTEM_INSPECT"],
      apis: [getApi('ListDbSystems'), getApi('GetDbSystem'), getApi('ListDbSystemPatches'), getApi('ListDbSystemPatchHistoryEntries'), getApi('GetDbSystemPatch'), getApi('GetDbSystemPatchHistoryEntry'), ]
    },
    read: {
      permissions: [],
      apis: []
    },
    use: {
      permissions: ["DB_SYSTEM_UPDATE"],
      apis: [],
      partial_apis: [getApi('ChangeDBSystemCompartment', "also needs 'use db-homes', 'use databases' and 'inspect db-backups'")]
    },
    manage: {
      permissions: ["DB_SYSTEM_CREATE", "DB_SYSTEM_DELETE"],
      apis: [getApi('UpdateDBSystem')],
      partial_apis: [
        getApi('LaunchDBSystem', "also need 'manage db-homes', 'manage databases', 'use vnics' and 'use subnets'"),
        getApi('TerminateDbSystem', "also need 'manage db-homes', 'manage databases', 'use vnics' and 'use subnets'"),
      ]
    }
  }
}

details['db-nodes'] = {
  type: 'database-family',
  title: 'db-nodes',
  variables: [],
  permissions: {
    inspect: {
      permissions: ["DB_NODE_INSPECT", "DB_NODE_QUERY"],
      apis: [getApi('GetDbNode')]
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
      permissions: ["DB_NODE_POWER_ACTIONS"],
      apis: [getApi('DbNodeAction')]
    }
  }
}

details['db-homes'] = {
  type: 'database-family',
  title: 'db-homes',
  variables: [],
  permissions: {
    inspect: {
      permissions: ["DB_HOME_INSPECT"],
      apis: [getApi('ListDBHome'), getApi('GetDBHome'), getApi('ListDbHomePatches'), getApi('ListDbHomePatchHistoryEntries'), getApi('GetDbHomePatch'), getApi('GetDbHomePatchHistoryEntry'), ]
    },
    read: {
      permissions: [],
      apis: []
    },
    use: {
      permissions: ["DB_HOME_UPDATE"],
      apis: [getApi('UpdateDBHome')],
      partial_apis: [getApi('ChangeDbSystemCompartment', "also needs 'use db-systems', 'use databases' and 'inspect backups'")]
    },
    manage: {
      permissions: ["DB_HOME_CREATE", "DB_HOME_DELETE"],
      apis: [],
      partial_apis: [
        getApi('LaunchDBSystem', "also need 'manage db-systems', 'manage databases', 'use vnics' and 'use subnets', If automatic backups are enabled on the default database also needs 'manage backups'"),
        getApi('TerminateDbSystem', "also need 'manage db-systems', 'manage databases', 'use vnics' and 'use subnets', If automatic backups are enabled on the default database also needs 'manage backups'"),
        getApi('CreateDbHome', "also needs 'use db-systems' and 'manage databases'. If creating the Database Home by restoring from a backup, also needs 'read backups'"),
        getApi('DeleteDbHome', "also needs 'use db-systems' and 'manage databases'. If automatic backups are enabled on the default database, also needs 'manage backups'. If the performFinalBackup option is selected, also needs 'manage backups' and 'read databases'.")
      ]
    }
  }
}

details['databases'] = {
  type: 'database-family',
  title: 'databases',
  variables: [],
  permissions: {
    inspect: {
      permissions: ["DATABASE_INSPECT"],
      apis: [getApi('ListDatabases'), getApi('GetDatabase'), getApi('ListDataGuardAssociations'), getApi('GetDataGuardAssociation') ]
    },
    read: {
      permissions: ["DATABASE_CONTENT_READ"],
      apis: []
    },
    use: {
      permissions: ["DATABASE_CONTENT_WRITE", "DATABASE_UPDATE"],
      apis: [getApi('UpdateDatabase'), getApi('SwitchoverDataGuardAssociation'), getApi('FailoverDataGuardAssociation'), getApi('ReinstateDataGuardAssociation')],
      partial_apis: [
        getApi('CreateDataGuardAssociation'),
        getApi('ChangeDBSystemCompartment', "also needs 'use db-systems', 'use db-homes' and 'inspect db-backups'")
      ]
    },
    manage: {
      permissions: ["DATABASE_CREATE", "DATABASE_DELETE"],
      apis: [],
      partial_apis: [
        getApi('LaunchDBSystem', "also need 'manage db-homes', 'manage db-systems', 'use vnics' and 'use subnets'"),
        getApi('TerminateDbSystem', "also need 'manage db-homes', 'manage db-systems', 'use vnics' and 'use subnets'"),
      ]
    }
  }
}


details['backups'] = {
  type: 'database-family',
  title: 'backups',
  variables: [],
  permissions: {
    inspect: {
      permissions: ["DB_BACKUP_INSPECT"],
      apis: [getApi('GetBackup'), getApi('ListBackups') ],
      partial_apis: [
        getApi('ChangeDBSystemCompartment', "also needs 'use db-systems', 'use db-homes' and 'use db-databases'")
      ]
    },
    read: {
      permissions: ["DB_BACKUP_CONTENT_READ"],
      apis: [],
      partial_apis: [getApi('RestoreDatabase', "also needs 'use databases'")]
    },
    use: {
      permissions: [],
      apis: []
    },
    manage: {
      permissions: ["DB_BACKUP_CREATE", "DB_BACKUP_DELETE"],
      apis: [getApi('DeleteBackup')],
      partial_apis: [
        getApi('CreateBackup', "also need 'read databases'")
      ]
    }
  }
}

export default details;
