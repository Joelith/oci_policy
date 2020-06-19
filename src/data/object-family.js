import getApi from './api';

const details = {};

details['object-family'] = {
  type: 'object-family',
  title: 'object-family',
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


details['objectstorage-namespaces'] = {
  type: 'object-family',
  title: 'objectstorage-namespaces',
  variables: [],
  permissions: {
    inspect: {
      permissions: [],
      apis: []
    },
    read: {
      permissions: ["OBJECTSTORAGE_NAMESPACE_READ"],
      apis: [getApi('GetNamespace'), getApi('GetNamespaceMetadata')]
    },
    use: {
      permissions: [],
      apis: []
    },
    manage: {
      permissions: ["OBJECTSTORAGE_NAMESPACE_UPDATE"],
      apis: [getApi('UpdateNamespaceMetadata')],
      partial_apis: []
    }
  }
}

details['object-family'] = {
  type: 'object-family',
  title: 'object-family',
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

details['object-family'] = {
  type: 'object-family',
  title: 'object-family',
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

details['data-transfer-jobs'] = {
  type: 'data-transfer-jobs',
  title: 'data-transfer-jobs',
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


export default details;
