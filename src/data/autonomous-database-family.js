import getApi from './api';

const details = {};

details['autonomous-database-family'] = {
  type: 'autonomous-database-family',
  title: 'autonomous-database-family',
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


details['autonomous-databases'] = {
  type: 'autonomous-database-family',
  title: 'autonomous-databases',
  variables: [],
  permissions: {
    inspect: {
      permissions: ["AUTONOMOUS_DATABASE_INSPECT"],
      apis: [getApi('GetAutonomousDatabase'), getApi('ListAutonomousDatabases')]
    },
    read: {
      permissions: ["AUTONOMOUS_DATABASE_CONTENT_READ"],
      apis: [],
      partial_apis: [getApi('CreateAutonomousDatabaseBackup', "also needs 'manage autonomous-backups'")]
    },
    use: {
      permissions: ["AUTONOMOUS_DATABASE_CONTENT_WRITE"],
      apis: [getApi('UpdateAutonomousDatabase')],
      partial_apis: [
        getApi('RestoreAutonomousDatabase', "also needs 'read autonomous-backups'"),
        getApi('ChangeAutonomousDatabaseCompartment', "also needs 'read autonomous-backups'")
      ]
    },
    manage: {
      permissions: ["AUTONOMOUS_DATABASE_CREATE", "AUTONOMOUS_DATABASE_DELETE"],
      apis: [getApi('CreateAutonomousDatabase')]
    }
  }
}

details['autonomous-backups'] = {
  type: 'autonomous-database-family',
  title: 'autonomous-backups',
  variables: [],
  permissions: {
    inspect: {
      permissions: ["AUTONOMOUS_DB_BACKUP_INSPECT"],
      apis: [getApi('ListAutonomousDatabaseBackups'), getApi('GetAutonomousDatabaseBackup')]
    },
    read: {
      permissions: ["AUTONOMOUS_DB_BACKUP_CONTENT_READ"],
      apis: [],
      partial_apis: [
        getApi('RestoreAutonomousDatabase', "also needs 'use autonomous-databases"),
        getApi('ChangeAutonomousDatabaseCompartment', "also needs 'use autonomous-databases")
      ]
    },
    use: {
      permissions: [],
      apis: []
    },
    manage: {
      permissions: ["AUTONOMOUS_DB_BACKUP_CREATE", "AUTONOMOUS_DB_BACKUP_DELETE"],
      apis: [getApi('DeleteAutonomousDatabaseBackup')],
      partial_apis: [getApi('CreateAutonomousDatabaseBackup', "also needs 'use autonomous-databases'")]
    }
  }
}

details['autonomous-container-databases'] = {
  type: 'autonomous-database-family',
  title: 'autonomous-container-databases',
  variables: [],
  permissions: {
    inspect: {
      permissions: ["AUTONOMOUS_CONTAINER_DATABASE_INSPECT"],
      apis: [getApi('ListAutonomousContainerDatabases'), getApi('GetAutonomousContainerDatabase')]
    },
    read: {
      permissions: [],
      apis: []
    },
    use: {
      permissions: ["AUTONOMOUS_CONTAINER_DATABASE_UPDATE"],
      apis: [getApi('UpdateAutonomousContainerDatabase'), getApi('ChangeAutonomousContainerDatabaseCompartment')],
      partial_apis: [getApi('CreateAutonomousDatabase', "also needs 'manage autonomous-databases'")]
    },
    manage: {
      permissions: ["AUTONOMOUS_CONTAINER_DATABASE_CREATE", "AUTONOMOUS_CONTAINER_DATABASE_DELETE"],
      apis: [],
      partial_apis: [
        getApi('CreateAutonomousContainerDatabase', "also need 'use autonomous-exadata-infrastructures'"),
        getApi('TerminateAutonomousContainerDatabase', "also need 'use autonomous-exadata-infrastructures'"),
      ]
    }
  }
}

details['autonomous-exadata-infrastructures'] = {
  type: 'autonomous-database-family',
  title: 'autonomous-exadata-infrastructures',
  variables: [],
  permissions: {
    inspect: {
      permissions: ["AUTONOMOUS_EXADATA_INFRASTRUCTURE_INSPECT"],
      apis: [getApi('ListAutonomousExadataInfrastructures'), getApi('GetAutonomousExadataInfrastructure')]
    },
    read: {
      permissions: [],
      apis: []
    },
    use: {
      permissions: ["AUTONOMOUS_EXADATA_INFRASTRUCTURE_UPDATE"],
      apis: [getApi('UpdateAutonomousExadataInfrastructure'), getApi('ChangeAutonomousExadataInfrastructureCompartment')],
      partial_apis: [
        getApi('CreateAutonomousContainerDatabase', "also need 'use autonomous-container-databases'"),
        getApi('TerminateAutonomousContainerDatabase', "also need 'use autonomous-container-databases'"),
      ]
    },
    manage: {
      permissions: ["AUTONOMOUS_EXADATA_INFRASTRUCTURE_CREATE", "AUTONOMOUS_EXADATA_INFRASTRUCTURE_DELETE"],
      apis: [],
      partial_apis: [
        getApi('LaunchAutonomousExadataInfrastructure', "also need 'use vnics' and 'use subnets'"),
        getApi('TerminateAutonomousExadataInfrastructure', "also need 'use vnics' and 'use subnets'")
      ]
    }
  }
}

export default details;
